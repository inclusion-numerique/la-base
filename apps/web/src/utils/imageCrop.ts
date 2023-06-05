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

/**
 * We have some wierd negative legacy values. We ensure they are clean.
 */
const between0and1 = (value: number) => Math.min(Math.max(value, 0), 1)

export const imageCropToRegion = (
  { cropLeft, cropTop, cropWidth, cropHeight }: ImageCropInformation,
  { width, height }: { width: number; height: number },
) => ({
  width: Math.ceil(between0and1(cropWidth) * width),
  height: Math.ceil(between0and1(cropHeight) * height),
  top: Math.floor(between0and1(cropTop) * height),
  left: Math.floor(between0and1(cropLeft) * width),
})
