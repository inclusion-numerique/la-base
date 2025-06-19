import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import { legacyS3Client } from '@app/web/server/s3/legacyS3'
import { s3 } from '@app/web/server/s3/s3'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import type { Image, Upload } from '@prisma/client'

export const getOriginalImageData = async ({
  image,
}: {
  image: Pick<
    Image,
    'id' | 'uploadKey' | 'cropWidth' | 'cropTop' | 'cropLeft' | 'cropHeight'
  > & { upload: Pick<Upload, 'legacyKey'> }
}) => {
  const originalImageObject = image.upload.legacyKey
    ? await legacyS3Client.send(
        new GetObjectCommand({
          Bucket: ServerWebAppConfig.LegacyS3.uploadsBucket,
          Key: image.upload.legacyKey,
        }),
      )
    : await s3.send(
        new GetObjectCommand({
          Bucket: ServerWebAppConfig.S3.uploadsBucket,
          Key: image.uploadKey,
        }),
      )

  if (!originalImageObject.Body) {
    throw new Error('Image not found')
  }

  return originalImageObject.Body.transformToWebStream()
}
