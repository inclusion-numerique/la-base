import React, { ReactNode } from 'react'
import classNames from 'classnames'
import Button from '@codegouvfr/react-dsfr/Button'
import { Upload } from '@codegouvfr/react-dsfr/Upload'
import {
  imageAllowedMimeTypes,
  imageUploadHint,
} from '@app/web/server/rpc/image/imageValidation'
import { ImageForForm } from '@app/web/server/image/imageTypes'
import ImageInfo from '@app/ui/components/ImageInfo'
import styles from './CroppedUpload.module.css'
import { ImageWithName } from './utils'

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
        <div
          className={classNames(styles.imageContainer, {
            [styles.round]: round === true,
            [styles.roundQuarter]: round === 'quarter',
          })}
          style={{ height, width: height * ratio }}
        >
          <img
            alt=""
            className={styles.image}
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
        <div className={styles.existingImage}>
          {imageToUpload || image ? (
            <ImageInfo
              name={imageToUpload?.name ?? image?.upload.name ?? ''}
              size={imageToUpload?.size ?? image?.upload.size ?? null}
            />
          ) : null}
          <div className={styles.imageActions}>
            <Button
              disabled={disabled}
              type="button"
              priority="tertiary no outline"
              iconId="fr-icon-crop-line"
              iconPosition="right"
              onClick={onCrop}
            >
              Recadrer
            </Button>
            <Button
              disabled={disabled}
              type="button"
              priority="tertiary no outline"
              iconId="fr-icon-delete-line"
              iconPosition="right"
              onClick={onRemove}
            >
              Supprimer
            </Button>
          </div>
        </div>
      </>
    ) : (
      emptyChildren && (
        <div
          className={classNames(styles.imageContainer, {
            [styles.round]: round === true,
            [styles.roundQuarter]: round === 'quarter',
          })}
          style={{ height, width: height * ratio }}
        >
          {emptyChildren}
        </div>
      )
    )}

    <Upload
      disabled={disabled}
      state={error ? 'error' : 'default'}
      stateRelatedMessage={error}
      label={label}
      hint={imageUploadHint(size)}
      nativeInputProps={{
        value: imageToUpload ? imageToUpload.filename : '',
        accept: imageAllowedMimeTypes.join(','),
        onChange: (event) => {
          // We want to emit a File from this onchange instead of the field value (that is the default implementation)
          const { files, value } = event.target
          if (!files) {
            onRemove()
            return
          }
          const file = files[0] as ImageWithName
          if (file) {
            file.filename = value
          }
          onUpload(file)
        },
      }}
    />
  </>
)

export default CroppedImage
