import type { ImageCropInformation } from '@app/web/utils/imageCrop'

export type ImageMinimalData = {
  id: string
  altText: string | null
}

export type WithMinimalImageData = {
  image: ImageMinimalData | null
}

export type ImageForForm = ImageMinimalData &
  ImageCropInformation & {
    upload: {
      name: string
      mimeType: string
      size: number | null
    }
  }
