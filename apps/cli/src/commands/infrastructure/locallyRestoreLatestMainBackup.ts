import { exec as callbackExec } from 'node:child_process'
import { createWriteStream, existsSync, statSync } from 'node:fs'
import path from 'node:path'
import { promisify } from 'node:util'
import { output } from '@app/cli/output'
import { createVarDirectory } from '@app/config/createVarDirectory'
import { varDirectory } from '@app/config/varDirectory'
import { prismaClient } from '@app/web/prismaClient'
import { Command } from '@commander-js/extra-typings'
import axios from 'axios'
import axiosRetry from 'axios-retry'

const exec = promisify(callbackExec)

const formatBytes = (bytes: number): string => {
  if (bytes === 0) return '0 B'
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  const k = 1024
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  const value = bytes / k ** i
  return `${value.toFixed(2)} ${units[i]}`
}

const mainBackupFile = path.resolve(
  varDirectory,
  `${process.env.BACKUP_DATABASE_NAME}_backup.dump.sql`,
)

type ScalewayDatabaseBackup = {
  id: string
  instance_id: string
  database_name: string
  name: string
  status:
    | 'unknown'
    | 'creating'
    | 'ready'
    | 'restoring'
    | 'deleting'
    | 'error'
    | 'exporting'
    | 'locked'
  size: number
  expires_at: string
  created_at: string
  updated_at: string
  instance_name: string
  download_url: string | null
  download_url_expires_at: string | null
  same_region: boolean
  region: string
}

const fetchAllBackups = async (
  client: ReturnType<typeof axios.create>,
  databaseInstanceId: string,
  backupDatabaseName: string,
): Promise<ScalewayDatabaseBackup[]> => {
  const allBackups: ScalewayDatabaseBackup[] = []
  let page = 1
  const pageSize = 100

  while (true) {
    const response = await client.get<{
      database_backups: ScalewayDatabaseBackup[]
    }>('/backups', {
      params: {
        order_by: 'created_at_desc',
        page_size: pageSize,
        page,
        instance_id: databaseInstanceId,
        database_name: backupDatabaseName,
      },
    })

    allBackups.push(...response.data.database_backups)

    if (response.data.database_backups.length < pageSize) {
      break
    }
    page++
  }

  return allBackups
}

export const locallyRestoreLatestMainBackup = new Command(
  'backup:locally-restore-latest-main',
)
  .description(
    'Restore the latest main backup from Scaleway to the local (DATABASE_URL env var) database ',
  )
  .option(
    '-d, --date <date>',
    'Date of the backup to restore (format: YYYY-MM-DD). If not provided, restores the latest backup.',
  )
  .option(
    '-l, --local',
    'Restore from previously already downloaded backup file',
  )
  .option('--list', 'List all available backup dates and exit')
  .option(
    '-t, --type <type>',
    'Filter backups by type (weekly, daily, hourly). If not provided, all types are considered.',
  )
  .action(async (options) => {
    const targetDate = options.date ? new Date(options.date) : null

    if (targetDate && Number.isNaN(targetDate.getTime())) {
      throw new Error(
        'Invalid date format. Please use YYYY-MM-DD format (e.g., 2025-12-09)',
      )
    }

    const databaseInstanceIdWithRegion = process.env.DATABASE_INSTANCE_ID ?? ''
    const databaseInstanceId = databaseInstanceIdWithRegion.split('/')[1]
    const backupDatabaseName = process.env.BACKUP_DATABASE_NAME ?? ''
    const secretKey = process.env.SCW_SECRET_KEY ?? ''
    const databaseUrl = process.env.DATABASE_URL ?? ''
    const databaseUrlObject = new URL(databaseUrl ?? '')
    const user = databaseUrlObject.username
    const database = databaseUrlObject.pathname.split('/')[1]
    const host = databaseUrlObject.hostname

    const variables = {
      databaseInstanceId,
      backupDatabaseName,
      secretKey,
      databaseUrl,
      user,
      database,
      host,
    }

    // Check that all above variables are not empty
    for (const [key, value] of Object.entries(variables)) {
      if (!value) {
        throw new Error(`Missing env var ${key}`)
      }
    }

    if (options.local) {
      output(`Using local backup file: ${mainBackupFile}`)
      if (!existsSync(mainBackupFile)) {
        throw new Error(
          `Local backup file not found at ${mainBackupFile}. Please download the backup first by running without the --local flag.`,
        )
      }
      const stats = statSync(mainBackupFile)
      output(
        `Local backup file found: ${formatBytes(stats.size)}, created ${stats.birthtime.toLocaleString()}`,
      )
    } else {
      const client = axios.create({
        baseURL: 'https://api.scaleway.com/rdb/v1/regions/fr-par',
        headers: {
          'X-Auth-Token': process.env.SCW_SECRET_KEY,
        },
      })
      axiosRetry(client, {
        retries: 3,
        retryDelay: (retryCount) => retryCount * 3000,
      })

      output('Listing backups (fetching all pages)...')
      const allBackups = await fetchAllBackups(
        client,
        databaseInstanceId,
        backupDatabaseName,
      )

      output(`Found ${allBackups.length} backups total`)
      // Filter by type if specified
      const typeFilteredBackups = options.type
        ? allBackups.filter((backup) =>
            backup.name.includes(`_${options.type}_`),
          )
        : allBackups

      if (options.type) {
        output(
          `Filtered to ${typeFilteredBackups.length} ${options.type} backups`,
        )
      }

      const elligibleBackups = typeFilteredBackups.filter(
        ({ status }) => status === 'ready' || status === 'exporting',
      )
      // List mode: show available dates and exit
      if (options.list) {
        output('\nAvailable backups:')
        const groupedByDate = new Map<string, string[]>()

        for (const backup of elligibleBackups) {
          const date = backup.created_at.split('T')[0]
          const type = backup.name.includes('_weekly_')
            ? 'weekly'
            : backup.name.includes('_daily_')
              ? 'daily'
              : 'hourly'

          if (!groupedByDate.has(date)) {
            groupedByDate.set(date, [])
          }
          groupedByDate.get(date)?.push(type)
        }

        const sortedDates = [...groupedByDate.keys()].sort().reverse()
        for (const date of sortedDates) {
          const types = [...new Set(groupedByDate.get(date))].join(', ')
          output(`  ${date} (${types})`)
        }

        output(
          `\nTotal: ${elligibleBackups.length} backups across ${sortedDates.length} dates`,
        )
        return
      }

      if (elligibleBackups.length === 0) {
        throw new Error('Invalid status for all backups')
      }

      let selectedBackup: ScalewayDatabaseBackup

      if (targetDate) {
        // Find backup matching the target date (same day)
        const matchingBackup = elligibleBackups.find((backup) => {
          const backupDate = new Date(backup.created_at)
          return (
            backupDate.getFullYear() === targetDate.getFullYear() &&
            backupDate.getMonth() === targetDate.getMonth() &&
            backupDate.getDate() === targetDate.getDate()
          )
        })

        if (!matchingBackup) {
          const availableDates = elligibleBackups
            .map((b) => b.created_at.split('T')[0])
            .join(', ')
          throw new Error(
            `No backup found for date ${options.date}. Available backups: ${availableDates}`,
          )
        }

        selectedBackup = matchingBackup
        output(
          `Found backup for ${options.date}: ${selectedBackup.name} - ${selectedBackup.created_at}`,
        )
      } else {
        selectedBackup = elligibleBackups[0]
        output(
          `Found latest backup: ${selectedBackup.name} - ${selectedBackup.created_at}`,
        )
      }

      if (selectedBackup.download_url) {
        output('Backup already exported')
      } else {
        output('Exporting backup')
        // It takes some time, status should be 'exporting' for a while
        const exportResponse = await client.post<ScalewayDatabaseBackup>(
          `/backups/${selectedBackup.id}/export`,
        )

        selectedBackup = exportResponse.data
      }

      let waitCount = 0
      while (!selectedBackup.download_url) {
        if (waitCount > 10) {
          throw new Error('Timeout waiting for backup export')
        }
        await new Promise((resolve) => {
          setTimeout(resolve, 3000)
        })
        const statusResponse = await client.get<ScalewayDatabaseBackup>(
          `/backups/${selectedBackup.id}`,
        )
        selectedBackup = statusResponse.data
        waitCount += 1
      }

      if (!selectedBackup.download_url) {
        throw new Error('No download url available')
      }

      output(`Backup is ready for download at ${selectedBackup.download_url}`)
      output(`Downloading backup to ${mainBackupFile}`)

      createVarDirectory()

      const downloadResponse = await axios.get<NodeJS.ReadableStream>(
        selectedBackup.download_url,
        {
          // Downloading as stream to keep encoding of pgdump file (binary) and avoid memory issues
          responseType: 'stream',
        },
      )

      const writeStream = createWriteStream(mainBackupFile)

      downloadResponse.data.pipe(writeStream)

      await new Promise((resolve, reject) => {
        writeStream.on('finish', () => resolve(undefined))
        writeStream.on('error', reject)
      })
    }
    output('Clearing database tables and enum types before loading data')

    const tables = await prismaClient.$queryRaw<
      { tablename: string }[]
    >` SELECT tablename
       FROM pg_tables
       WHERE schemaname = current_schema()`

    if (tables.length > 0) {
      await prismaClient.$queryRawUnsafe(
        `DROP TABLE IF EXISTS "${tables
          .map(({ tablename }) => tablename)
          .join('", "')}" CASCADE`,
      )
    }

    const enums = await prismaClient.$queryRaw<
      {
        schema: string
        name: string
      }[]
    >`
        SELECT n.nspname as schema, t.typname as name
        FROM pg_type t
                 LEFT JOIN pg_enum e ON t.oid = e.enumtypid
                 LEFT JOIN pg_catalog.pg_namespace n ON n.oid = t.typnamespace
        WHERE pg_catalog.pg_type_is_visible(t.oid)
          AND n.nspname = current_schema()
          AND t.typcategory = 'E'
        GROUP BY schema, name
    `

    // Delete all enum types
    if (enums.length > 0) {
      for (const { name } of enums) {
        await prismaClient.$queryRawUnsafe(
          `DROP TYPE IF EXISTS "${name}" CASCADE`,
        )
      }
    }

    output('Restoring database from backup file')
    await exec(
      `pg_restore --no-owner --no-acl -d ${databaseUrl} < ${mainBackupFile}`,
      {
        maxBuffer: 5 * 1024 * 1024,
      },
    )

    output(`Granting all privileges to "${user}" role`)
    await exec(
      `psql ${databaseUrl} -c 'GRANT ALL PRIVILEGES ON DATABASE "${database}" TO "${user}";'`,
    )

    output(`Restored database to ${host}/${database} for "${user}" role`)
  })
