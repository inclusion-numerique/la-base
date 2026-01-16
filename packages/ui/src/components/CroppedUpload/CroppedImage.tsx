import ImageInfo from '@app/ui/components/ImageInfo'
import { ImageForForm } from '@app/web/server/image/imageTypes'
import {
  imageAllowedMimeTypes,
  imageUploadHint,
} from '@app/web/server/rpc/image/imageValidation'
import Button from '@codegouvfr/react-dsfr/Button'
import { Upload } from '@codegouvfr/react-dsfr/Upload'
import classNames from 'classnames'
import type Cropper from 'cropperjs'
import { ReactNode } from 'react'
import styles from './CroppedUpload.module.css'
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
  inputTestId,
  deleteTestId,
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
  inputTestId?: string
  deleteTestId?: string
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
          {croppedBox && imageBox ? (
            <img
              alt=""
              className={styles.image}
              src={imageSource}
              style={{
                marginTop: (-croppedBox.y * height) / croppedBox.height,
                marginLeft: (-croppedBox.x * height * ratio) / croppedBox.width,
                height: (imageBox.naturalHeight * height) / croppedBox.height,
                width:
                  (imageBox.naturalWidth * height * ratio) / croppedBox.width,
              }}
            />
          ) : (
            <div
              style={{
                height,
                width: height * ratio,
                backgroundImage: `url("${imageSource}")`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}
            />
          )}
        </div>
        <div
          className={classNames(
            styles.existingImage,
            'fr-flex-sm fr-display-block',
          )}
        >
          {imageToUpload || image ? (
            <ImageInfo
              name={imageToUpload?.name ?? image?.upload.name ?? ''}
              size={imageToUpload?.size ?? image?.upload.size ?? null}
            />
          ) : null}
          <div
            className={classNames(styles.imageActions, 'fr-mt-sm-0 fr-mt-2w')}
          >
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
              data-testid={deleteTestId}
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
        ...({
          'data-testid': inputTestId,
        } as React.InputHTMLAttributes<HTMLInputElement>),
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
