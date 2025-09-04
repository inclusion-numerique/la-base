import type { BackupDatabaseJob } from '@app/web/jobs/backup-database/backupDatabaseJob'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import { formatDate } from '@app/web/utils/formatDate'
import axios from 'axios'

const expirationsInDays: {
  [type in BackupDatabaseJob['payload']['type']]: number
} = {
  weekly: 600,
  daily: 90,
  hourly: 4,
}

type ScalewayCreateBackupResponse = {
  id: string
  instance_id: string
  database_name: string
  name: string
  status: string
  size: number | null
  expires_at: string
  created_at: string
  updated_at: string | null
  instance_name: string
  download_url: string | null
  download_url_expires_at: string | null
  same_region: boolean
  region: string
}

// Instance id is fr-par/uuid we only need the uuid for scaleway api calls
const databaseInstanceIdForApiCall = (instanceId: string) =>
  instanceId.split('/')[1]

export const executeBackupDatabaseJob = async ({
  payload: { databaseName, type },
}: BackupDatabaseJob) => {
  const fileName = `backup_${databaseName}_${type}_${formatDate(new Date(), 'yyyy-MM-dd-HHmmss')}`

  const expiresInDays = expirationsInDays[type]

  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + expiresInDays)

  const expiresAtISOString = expiresAt.toISOString()

  const response = await axios.post<ScalewayCreateBackupResponse>(
    'https://api.scaleway.com/rdb/v1/regions/fr-par/backups',
    {
      instance_id: databaseInstanceIdForApiCall(
        ServerWebAppConfig.Database.instanceId,
      ),
      database_name: databaseName,
      name: fileName,
      expires_at: expiresAtISOString,
    },
    {
      headers: {
        'X-Auth-Token': ServerWebAppConfig.Scaleway.secretKey,
        'Content-Type': 'application/json',
      },
    },
  )

  return {
    success: true,
    ...response.data,
  }
}
