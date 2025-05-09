import { imageCropToRegion, isImageCropped } from '@app/web/utils/imageCrop'
import type { GetObjectCommandOutput } from '@aws-sdk/client-s3'
import type { Image } from '@prisma/client'
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
  const sharpImage = sharp(await originalImageBuffer.transformToByteArray())
  const { height: originalHeight, width: originalWidth } =
    await sharpImage.metadata()

  if (!originalHeight || !originalWidth) {
    // This is an invalid image
    // TODO Tell sentry about it
    throw new Error('Invalid image file')
  }
  if (isImageCropped(image)) {
    sharpImage.extract(
      imageCropToRegion(image, {
        height: originalHeight,
        width: originalWidth,
      }),
    )
  }

  // Do not resize if image is smaller than requested target width
  if (width && originalWidth > width) {
    sharpImage.resize(width)
  }

  const imageData = await sharpImage.webp({ quality }).toBuffer()

  return imageData
}
