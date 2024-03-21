import React, { ReactNode } from 'react'
import { ImageForForm } from '@app/web/server/image/imageTypes'
import ImageInfo from '@app/ui/components/ImageInfo'
import UploadImage from '../UploadImage/UploadImage'
import CroppedImagePreview from '../CroppedImagePreview/CroppedImagePreview'
import CropButton from './CropButton'
import DeleteButton from './DeleteButton'
import EmptyImagePlaceholder from './EmptyImagePlaceholder'
import { ImageWithName } from './utils'

const CroppedImage = ({
  label,
  height,
  ratio,
  round,
  disabled,
  error,
  croppedBox,
  imageBox,
  imageSource,
  imageToUpload,
  onCrop,
  onRemove,
  onUpload,
  emptyChildren,
  image,
  size,
}: {
  label?: string
  height: number
  ratio: number
  round?: boolean | 'quarter'
  disabled?: boolean
  error?: string
  croppedBox?: Cropper.Data
  imageBox?: Cropper.ImageData
  imageSource: string
  imageToUpload: ImageWithName | null
  onCrop: () => void
  onRemove: () => void
  onUpload: (file: ImageWithName) => void
  emptyChildren?: ReactNode
  image?: ImageForForm | null
  size?: { w: number; h: number }
}) => (
  <>
    {imageSource ? (
      <>
        <CroppedImagePreview
          height={height}
          ratio={ratio}
          round={round}
          croppedBox={croppedBox}
          imageBox={imageBox}
          imageSource={imageSource}
        />
        <div className="fr-flex fr-justify-content-space-between fr-align-items-center fr-flex-gap-8v fr-mb-2w">
          <ImageInfo
            name={imageToUpload?.name ?? image?.upload?.name}
            size={imageToUpload?.size ?? image?.upload?.size}
          />
          <CropButton onCrop={onCrop} disabled={disabled}>
            Recadrer
          </CropButton>
          <DeleteButton onRemove={onRemove} disabled={disabled}>
            Supprimer
          </DeleteButton>
        </div>
      </>
    ) : (
      <EmptyImagePlaceholder
        height={height}
        ratio={ratio}
        round={round}
        emptyChildren={emptyChildren}
      />
    )}
    <UploadImage
      label={label}
      disabled={disabled}
      error={error}
      imageToUpload={imageToUpload}
      onRemove={onRemove}
      onUpload={onUpload}
      size={size}
    />
  </>
)

export default CroppedImage
