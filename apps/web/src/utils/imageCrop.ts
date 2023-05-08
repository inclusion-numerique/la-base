import { Image } from '@prisma/client'

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
) => ({
  width: Math.ceil(cropWidth * width),
  height: Math.ceil(cropHeight * height),
  top: Math.floor(cropTop * height),
  left: Math.floor(cropLeft * width),
})
