import { uploadedImageLoader } from '@app/web/utils/uploadedImageLoader'

export type GenerateUploadedImageSourceSetsInput = {
  // Id of the Image model
  id: string
  breakpoints: { media: string; width: number; quality?: number }[]
  quality?: number
}

const supportedPixelDensities = [1, 2, 3]

export const generateUploadedImageSourceSets = ({
  id,
  quality: defaultQuality,
  breakpoints,
}: GenerateUploadedImageSourceSetsInput) =>
  breakpoints.map(({ media, width, quality }) => ({
    media,
    srcSet: supportedPixelDensities
      .map(
        (density) =>
          `${uploadedImageLoader({
            src: id,
            width: width * density,
            quality: quality ?? defaultQuality,
          })} ${density}x`,
      )
      .join(', '),
  }))
