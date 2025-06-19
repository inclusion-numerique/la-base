import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import { S3Client } from '@aws-sdk/client-s3'

export const legacyS3Client = new S3Client({
  // Region is required but not used for this host
  region: 'region',
  credentials: {
    accessKeyId: ServerWebAppConfig.LegacyS3.accessKey,
    secretAccessKey: ServerWebAppConfig.LegacyS3.secretKey,
  },
  // region: ServerWebAppConfig.S3.region,
  endpoint: `https://${ServerWebAppConfig.LegacyS3.host}`,
})
