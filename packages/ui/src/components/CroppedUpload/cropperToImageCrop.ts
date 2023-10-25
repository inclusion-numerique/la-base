import type { Cropper } from 'react-cropper'
import { defaultCropValues } from '@app/web/server/image/defaultCropValues'

const normalize = (value: number, by: number) =>
  Math.min(Math.max(value / by, 0), 1)

export const cropperDataToImageCrop = ({
  imageData,
  data,
}: {
  imageData: Pick<Cropper.ImageData, 'naturalWidth' | 'naturalHeight'>
  data: Pick<Cropper.Data, 'height' | 'width' | 'x' | 'y'>
}) => ({
  cropHeight: normalize(data.height, imageData.naturalHeight),
  cropWidth: normalize(data.width, imageData.naturalWidth),
  cropTop: normalize(data.y, imageData.naturalHeight),
  cropLeft: normalize(data.x, imageData.naturalWidth),
})

export const cropperToImageCrop = (cropper?: Cropper) =>
  cropper
    ? cropperDataToImageCrop({
        imageData: cropper.getImageData(),
        data: cropper.getData(),
      })
    : defaultCropValues

export type ImageCropData = {
  originalHeight: number
  originalWidth: number
  cropHeight: number
  cropWidth: number
  cropTop: number
  cropLeft: number
}

export const imageCropToCropperInitialData = ({
  originalHeight,
  originalWidth,
  cropHeight,
  cropWidth,
  cropTop,
  cropLeft,
}: ImageCropData) => ({
  // TODO check if ok relative to Cropper img size
  height: cropHeight * originalHeight,
  width: cropWidth * originalWidth,
  y: cropTop * originalHeight,
  x: cropLeft * originalWidth,
})
