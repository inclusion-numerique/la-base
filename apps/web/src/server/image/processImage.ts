import { imageCropToRegion, isImageCropped } from '@app/web/utils/imageCrop'
import type { GetObjectCommandOutput } from '@aws-sdk/client-s3'
import type { Image } from '@prisma/client'
import * as Sentry from '@sentry/nextjs'
import sharp from 'sharp'

export const processImage = async ({
  originalImageBuffer,
  image,
  quality,
  width,
}: {
  originalImageBuffer: Exclude<GetObjectCommandOutput['Body'], undefined>
  image: Pick<
    Image,
    'id' | 'uploadKey' | 'cropWidth' | 'cropTop' | 'cropLeft' | 'cropHeight'
  >
  quality: number
  width?: number
}) => {
  let sharpImage: sharp.Sharp | null = null

  try {
    // Create sharp instance with memory limits
    sharpImage = sharp(await originalImageBuffer.transformToByteArray(), {
      limitInputPixels: 268402689, // 16k x 16k max
      failOnError: true,
    })

    const { height: originalHeight, width: originalWidth } =
      await sharpImage.metadata()

    if (!originalHeight || !originalWidth) {
      throw new Error('Invalid image file')
    }

    if (isImageCropped(image)) {
      sharpImage = sharpImage.extract(
        imageCropToRegion(image, {
          height: originalHeight,
          width: originalWidth,
        }),
      )
    }

    // Do not resize if image is smaller than requested target width
    if (width && originalWidth > width) {
      sharpImage = sharpImage.resize(width)
    }

    const imageData = await sharpImage.webp({ quality }).toBuffer()

    return imageData
  } catch (error) {
    // Report to Sentry for monitoring
    Sentry?.captureException(error, {
      tags: {
        component: 'image-processing',
        imageId: image.id,
      },
      extra: {
        imageId: image.id,
        quality,
        width,
        error: error instanceof Error ? error.message : String(error),
      },
    })

    // biome-ignore lint/suspicious/noConsole: needed for debugging
    console.error('Image processing error:', error)
    throw error
  } finally {
    // Explicitly clean up sharp instance
    if (sharpImage) {
      try {
        sharpImage.destroy()
      } catch (cleanupError) {
        // biome-ignore lint/suspicious/noConsole: needed for debugging
        console.warn('Failed to cleanup sharp instance:', cleanupError)
      }
    }
  }
}
