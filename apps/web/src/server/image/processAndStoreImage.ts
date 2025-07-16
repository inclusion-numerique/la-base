import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import { output } from '@app/web/utils/output'
import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3'
import { Image } from '@prisma/client'
import * as Sentry from '@sentry/nextjs'
import { s3 } from '../s3/s3'
import { imageProcessingQueue } from './imageProcessingQueue'
import { processImage } from './processImage'

export const executeProcessing = async ({
  image,
  quality,
  width,
  processedImageKey,
}: {
  image: Pick<
    Image,
    'id' | 'uploadKey' | 'cropWidth' | 'cropTop' | 'cropLeft' | 'cropHeight'
  >
  quality: number
  width?: number
  processedImageKey: string
}) => {
  // Image is not cached, we need to compute it for given quality and width
  const originalImageObject = await s3.send(
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
      `Error processing image ${image.id} ${processedImageKey}: ${
        'message' in error
          ? (error as { message: string }).message
          : 'Unknown error'
      }`,
    )
    Sentry.captureException(errorWithContext)
    output.error(errorWithContext.message)
    throw errorWithContext
  })

  // Caching result in bucket
  await s3
    .send(
      new PutObjectCommand({
        Bucket: ServerWebAppConfig.S3.uploadsBucket,
        Key: processedImageKey,
        Body: imageData,
        ACL: 'public-read',
        ContentType: 'image/webp', // processed image is always webp
      }),
    )
    .catch((error) => {
      Sentry.captureException(error)
    })
}

export const processAndStoreImage = async ({
  image,
  quality,
  width,
  processedImageKey,
}: {
  image: Pick<
    Image,
    'id' | 'uploadKey' | 'cropWidth' | 'cropTop' | 'cropLeft' | 'cropHeight'
  >
  quality: number
  width?: number
  processedImageKey: string
}): Promise<void> => {
  const isInQueue = imageProcessingQueue.get(processedImageKey)

  if (isInQueue) {
    return isInQueue
  }

  const imageProcessingPromise = executeProcessing({
    image,
    quality,
    width,
    processedImageKey,
  })

  imageProcessingQueue.add({
    processedImageKey,
    processingPromise: imageProcessingPromise,
  })

  return imageProcessingPromise
}
