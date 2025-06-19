import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import { s3 } from '@app/web/server/s3/s3'
import { GetObjectCommand } from '@aws-sdk/client-s3'
import type { Image } from '@prisma/client'
import sharp from 'sharp'

export const computeImageMetadata = async ({
  cropWidth,
  cropHeight,
  uploadKey,
}: Pick<
  Image,
  'uploadKey' | 'cropWidth' | 'cropTop' | 'cropLeft' | 'cropHeight'
>) => {
  // We get image file from storage
  const object = await s3.send(
    new GetObjectCommand({
      Bucket: ServerWebAppConfig.S3.uploadsBucket,
      Key: uploadKey,
    }),
  )

  if (!object.Body) {
    throw new Error('Image file not found')
  }
  const sharpImage = sharp(await object.Body.transformToByteArray())
  const { height: originalHeight, width: originalWidth } =
    await sharpImage.metadata()

  if (!originalWidth || !originalHeight) {
    // This is an invalid image
    // TODO Tell sentry about it
    throw new Error('Invalid image file')
  }

  const width = Math.floor(cropWidth * originalWidth)
  const height = Math.floor(cropHeight * originalHeight)

  return {
    originalWidth,
    originalHeight,
    originalRatio: originalWidth / originalHeight,
    width,
    height,
    ratio: width / height,
  }
}
