import { Command } from '@commander-js/extra-typings'
import {
  GetObjectCommand,
  ListObjectsV2Command,
  S3Client,
} from '@aws-sdk/client-s3'
import { output } from '@app/cli/output'
import { resolve as pathResolve } from 'node:path'
import { createWriteStream, existsSync, mkdirSync } from 'node:fs'
import { exec as callbackExec } from 'node:child_process'
import { promisify } from 'node:util'

const exec = promisify(callbackExec)

const downloadDirectory = pathResolve(__dirname, '../../../../../var')
const legacyBackupFile = pathResolve(downloadDirectory, 'legacy_backup.sql')

const downloadLegacyBackupFile = async ({
  key,
  bucket,
  s3Client,
}: {
  s3Client: S3Client
  key: string
  bucket: string
}) => {
  const data = await s3Client.send(
    new GetObjectCommand({ Bucket: bucket, Key: key }),
  )
  const inputStream = data.Body
  if (!inputStream || !('pipe' in inputStream)) {
    throw new Error('Cannot create stream from backup file data')
  }
  if (!existsSync(downloadDirectory)) {
    mkdirSync(downloadDirectory)
  }

  return new Promise((resolve, reject) => {
    const outputStream = createWriteStream(legacyBackupFile)
    inputStream.pipe(outputStream)
    outputStream.on('finish', resolve)
    outputStream.on('error', reject)
  })
}

const restoreDatabase = async () => {
  if (!process.env.MIGRATION_DATABASE_URL) {
    throw new Error('Missing env var MIGRATION_DATABASE_URL')
  }

  await exec(
    `psql ${process.env.MIGRATION_DATABASE_URL} -c 'DROP SCHEMA public CASCADE; CREATE SCHEMA public; DROP ROLE IF EXISTS moine; CREATE ROLE moine;'`,
  )

  await exec(
    `psql ${process.env.MIGRATION_DATABASE_URL} < ${legacyBackupFile}`,
    {
      maxBuffer: 5 * 1024 * 1024,
    },
  )
}

/**
 * This command outputs available secrets names
 */
// eslint-disable-next-line unicorn/prevent-abbreviations
export const importLegacyDatabase = new Command()
  .command('legacy:import-database')
  .action(async () => {
    const s3Client = new S3Client({
      // Region is required but not used for this host
      region: 'region',
      credentials: {
        accessKeyId: process.env.LEGACY_DB_S3_ACCESS_KEY ?? '',
        secretAccessKey: process.env.LEGACY_DB_S3_SECRET_KEY ?? '',
      },
      // region: ServerWebAppConfig.S3.region,
      endpoint: `https://${process.env.LEGACY_DB_S3_HOST ?? ''}`,
    })

    const bucket = process.env.LEGACY_DB_S3_BUCKET ?? ''

    const backups = await s3Client.send(
      new ListObjectsV2Command({
        Bucket: bucket,
        // We expect to be fully migrated by 2024 🤓
        Prefix: '2023',
        MaxKeys: 365,
      }),
    )

    const mostRecentBackup = backups.Contents?.at(-1)

    if (!mostRecentBackup) {
      console.error('Could not access sql backups')
      process.exit(1)
      return
    }

    if (
      !mostRecentBackup.Key ||
      !mostRecentBackup.Size ||
      !mostRecentBackup.Key ||
      !mostRecentBackup.LastModified
    ) {
      output('Invalid most recent backup metadata', mostRecentBackup)
      process.exit(1)
      return
    }

    const sizeInMB = mostRecentBackup.Size / 1_000_000

    output(
      `Most recent backup found for ${
        mostRecentBackup.LastModified.toISOString() ?? ''
      }, size: ${sizeInMB.toFixed(2)} MB`,
    )
    output('Downloading backup...')

    await downloadLegacyBackupFile({
      s3Client,
      bucket,
      key: mostRecentBackup.Key,
    })
    output('Downloaded backup to', legacyBackupFile)

    output('Restoring database...')
    await restoreDatabase()
    output('Migration database successfully restored from latest backup! 🎉')
  })
