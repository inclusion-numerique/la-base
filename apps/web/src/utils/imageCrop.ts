import type { Image } from '@prisma/client'

export type ImageCropInformation = Pick<
  Image,
  'cropHeight' | 'cropWidth' | 'cropTop' | 'cropLeft'
>

export const isImageCropped = ({
  cropLeft,
  cropTop,
  cropWidth,
  cropHeight,
}: ImageCropInformation) =>
  cropLeft !== 0 || cropTop !== 0 || cropWidth !== 1 || cropHeight !== 1

export const imageCropToRegion = (
  { cropLeft, cropTop, cropWidth, cropHeight }: ImageCropInformation,
  { width, height }: { width: number; height: number },
) => {
  // Calculate initial dimensions
  let calculatedWidth = Math.ceil(cropWidth * width)
  let calculatedHeight = Math.ceil(cropHeight * height)
  let calculatedTop = Math.floor(cropTop * height)
  let calculatedLeft = Math.floor(cropLeft * width)

  // Ensure dimensions are within the bounds of the original image
  calculatedWidth = Math.min(calculatedWidth, width - calculatedLeft)
  calculatedHeight = Math.min(calculatedHeight, height - calculatedTop)
  calculatedLeft = Math.min(calculatedLeft, width - calculatedWidth)
  calculatedTop = Math.min(calculatedTop, height - calculatedHeight)

  return {
    width: calculatedWidth,
    height: calculatedHeight,
    top: calculatedTop,
    left: calculatedLeft,
  }
}
