import React, { ReactNode, useMemo } from 'react'
import classNames from 'classnames'
import Button from '@codegouvfr/react-dsfr/Button'
import { Upload } from '@codegouvfr/react-dsfr/Upload'
import { imageUploadHint } from '@app/web/server/rpc/image/imageValidation'
import { formatByteSize } from '@app/ui/utils/formatByteSize'
import styles from './CroppedUpload.module.css'
import { ImageWithName, getDefaultCropping } from './utils'

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
}: {
  label?: string
  height: number
  ratio: number
  round?: boolean
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
}) => {
  const defaultCropping = useMemo(() => getDefaultCropping(ratio), [ratio])

  return (
    <>
      {imageSource ? (
        <>
          <div
            className={classNames(styles.imageContainer, {
              [styles.round]: round,
            })}
            style={{ height, width: height * ratio }}
          >
            <img
              alt=""
              className={styles.image}
              src={imageSource}
              style={{
                ...(croppedBox && imageBox
                  ? {
                      marginTop: (-croppedBox.y * height) / croppedBox.height,
                      marginLeft:
                        (-croppedBox.x * height * ratio) / croppedBox.width,
                      height:
                        (imageBox.naturalHeight * height) / croppedBox.height,
                      width:
                        (imageBox.naturalWidth * height * ratio) /
                        croppedBox.width,
                    }
                  : {
                      width: `${100 / defaultCropping.cropWidth}%`,
                      height: `${100 / defaultCropping.cropHeight}%`,
                      transform: `translateX(-${
                        100 * defaultCropping.cropLeft
                      }%) translateY(-${100 * defaultCropping.cropTop}%)`,
                    }),
              }}
            />
          </div>
          <div className={styles.existingImage}>
            {imageToUpload && (
              <div className={styles.imageInformations}>
                <span
                  className={classNames(
                    styles.icon,
                    'fr-icon-image-line',
                    'fr-icon--sm',
                  )}
                />
                <div className={styles.imageName}>{imageToUpload.name}</div>·
                <div className={styles.imageSize}>
                  {formatByteSize(imageToUpload.size)}
                </div>
              </div>
            )}
            <div className={styles.imageActions}>
              <Button
                disabled={disabled}
                type="button"
                priority="tertiary no outline"
                iconId="fr-icon-crop-line"
                onClick={onCrop}
              >
                Recadrer
              </Button>
              <Button
                disabled={disabled}
                type="button"
                priority="tertiary no outline"
                iconId="fr-icon-delete-line"
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
              [styles.round]: round,
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
        hint={imageUploadHint}
        nativeInputProps={{
          value: imageToUpload ? imageToUpload.filename : '',
          accept: 'image/*',
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
}

export default CroppedImage
