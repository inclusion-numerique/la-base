import { ImageCropInformation } from '@app/web/utils/imageCrop'

export const defaultImageCrop = {
  cropLeft: 0,
  cropTop: 0,
  cropHeight: 1,
  cropWidth: 1,
} satisfies Readonly<ImageCropInformation>
