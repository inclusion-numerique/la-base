import React from 'react'
import { ImageForForm } from '@app/web/server/image/imageTypes'

/**
 * The preview of the cropped image uses the original image
 * We apply the same transformation to the preview image as the Cropper
 * If there is no Cropper yet, we use the normalized cropping info from the image model
 */
const simulatedCropImageStyle = ({
  height,
  ratio,
  croppedBox,
  imageBox,
  image,
}: {
  height: number
  ratio: number
  croppedBox?: Cropper.Data
  imageBox?: Cropper.ImageData
  image?: ImageForForm | null
}) => {
  if (croppedBox && imageBox) {
    return {
      marginTop: (-croppedBox.y * height) / croppedBox.height,
      marginLeft: (-croppedBox.x * height * ratio) / croppedBox.width,
      height: (imageBox.naturalHeight * height) / croppedBox.height,
      width: (imageBox.naturalWidth * height * ratio) / croppedBox.width,
    }
  }

  if (!image) {
    return {
      height: '100%',
      width: '100%',
    }
  }

  const { cropHeight, cropWidth, cropTop, cropLeft } = image

  return {
    width: `${100 / cropWidth}%`,
    height: `${100 / cropHeight}%`,
    transform: `translateX(-${100 * cropLeft}%) translateY(-${100 * cropTop}%)`,
  }
}

const CroppedImagePreview = ({
  height,
  ratio,
  round,
  croppedBox,
  imageBox,
  imageSource,
  image,
}: {
  height: number
  ratio: number
  round?: boolean | 'quarter'
  croppedBox?: Cropper.Data
  imageBox?: Cropper.ImageData
  imageSource: string
  image?: ImageForForm | null
}) => (
  <div
    className={`fr-mx-auto fr-mb-2w fr-overflow-hidden ${round === true && 'fr-border-radius-circle'} ${round === 'quarter' && 'fr-border-radius-rounded'}`}
    style={{ height, width: height * ratio }}
  >
    <img
      alt=""
      src={imageSource}
      style={simulatedCropImageStyle({
        height,
        ratio,
        image,
        croppedBox,
        imageBox,
      })}
    />
  </div>
)

export default CroppedImagePreview
