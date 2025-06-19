import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import { S3Client } from '@aws-sdk/client-s3'

export const s3 = new S3Client({
  credentials: {
    accessKeyId: ServerWebAppConfig.S3.accessKey,
    secretAccessKey: ServerWebAppConfig.S3.secretKey,
  },
  region: ServerWebAppConfig.S3.region,
  endpoint: `https://${ServerWebAppConfig.S3.host}`,
})
