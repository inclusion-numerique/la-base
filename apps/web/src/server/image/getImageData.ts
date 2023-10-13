import {
  GetObjectCommand,
  NoSuchKey,
  PutObjectCommand,
} from '@aws-sdk/client-s3'
import * as Sentry from '@sentry/nextjs'
import { Image, Upload } from '@prisma/client'
import { legacyS3Client } from '@app/web/server/s3/legacyS3'
import { s3 } from '@app/web/server/s3/s3'
import { isImageCropped } from '@app/web/utils/imageCrop'
import { ServerWebAppConfig } from '@app/web/webAppConfig'
import { processImage } from '@app/web/server/image/processImage'

const computeCropKey = ({
  cropTop,
  cropHeight,
  cropLeft,
  cropWidth,
}: {
  cropTop: number
  cropHeight: number
  cropLeft: number
  cropWidth: number
}) =>
  isImageCropped({ cropTop, cropHeight, cropLeft, cropWidth })
    ? `${cropTop}_${cropHeight}_${cropLeft}_${cropWidth}`
    : 'nocrop'

const computeImageVersionCacheKey = ({
  image: { id, uploadKey, cropTop, cropHeight, cropLeft, cropWidth },
  quality,
  width,
}: {
  image: Pick<
    Image,
    'id' | 'uploadKey' | 'cropWidth' | 'cropTop' | 'cropLeft' | 'cropHeight'
  >
  quality: number
  width?: number
}) =>
  // Add the numbers cropTop, cropHeight, cropLeft, cropWidth as a unique string separted by _
  `images/${id}/${uploadKey}_${computeCropKey({
    cropTop,
    cropHeight,
    cropLeft,
    cropWidth,
  })}_${width ?? 'original'}_${quality}.webp`

export const getImageData = async ({
  image,
  quality,
  width,
}: {
  image: Pick<
    Image,
    'id' | 'uploadKey' | 'cropWidth' | 'cropTop' | 'cropLeft' | 'cropHeight'
  > & { upload: Pick<Upload, 'legacyKey'> }
  quality: number
  width?: number
}): Promise<Buffer | ReadableStream> => {
  const cachedImageKey = computeImageVersionCacheKey({
    image,
    quality,
    width,
  })

  const cachedImageObject = await s3
    .send(
      new GetObjectCommand({
        Bucket: ServerWebAppConfig.S3.uploadsBucket,
        Key: cachedImageKey,
      }),
    )
    .catch((error) => {
      if (error instanceof NoSuchKey) {
        return null
      }
      throw error
    })

  if (cachedImageObject?.Body) {
    // Image is already cached
    return cachedImageObject.Body.transformToWebStream()
  }

  const start = Date.now()

  // Image is not cached, we need to compute it for given quality and width
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

  const imageData = await processImage({
    originalImageBuffer: originalImageObject.Body,
    image,
    quality,
    width,
  }).catch((error) => {
    const errorWithContext = new Error(
      `Error processing image ${image.id} ${cachedImageKey}: ${
        'message' in error
          ? (error as { message: string }).message
          : 'Unknown error'
      }`,
    )
    Sentry.captureException(errorWithContext)
    console.error(errorWithContext.message)
    throw errorWithContext
  })

  // Caching result in background for speeding up response time
  s3.send(
    new PutObjectCommand({
      Bucket: ServerWebAppConfig.S3.uploadsBucket,
      Key: cachedImageKey,
      Body: imageData,
    }),
  ).catch((error) => {
    Sentry.captureException(error)
  })

  console.info(`Processed ${cachedImageKey} in ${Date.now() - start}ms`)

  return imageData
}
