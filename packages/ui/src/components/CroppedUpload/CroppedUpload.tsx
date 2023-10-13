'use client'

import React, { useEffect, useMemo, useRef, useState } from 'react'
import classNames from 'classnames'
import Cropper, { ReactCropperElement } from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import Button from '@codegouvfr/react-dsfr/Button'
import { Upload } from '@codegouvfr/react-dsfr/Upload'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { imageUploadHint } from '@app/web/server/rpc/image/imageValidation'
import { formatByteSize } from '@app/ui/utils/formatByteSize'
import styles from './CroppedUpload.module.css'

type ImageWithName = File & { filename: string }
export type CroppedImage = {
  file: File
  cropHeight?: number
  cropWidth?: number
  cropTop?: number
  cropLeft?: number
}

const DEFAULT_CROP = 0.8

const CroppedUpload = ({
  id,
  label,
  height,
  ratio,
  round,
  onChange,
  disabled,
  error,
}: {
  id: string
  label?: string
  height: number
  ratio: number
  round?: boolean
  onChange: (data: CroppedImage) => void
  disabled?: boolean
  error?: string
}) => {
  const { Component: CropModal, open: openCropModal } = createModal({
    id: `crop-${id}`,
    isOpenedByDefault: false,
  })

  const defaultCropping = useMemo(
    () => ({
      cropHeight: DEFAULT_CROP / ratio,
      cropWidth: DEFAULT_CROP,
      cropTop: 0.5 - DEFAULT_CROP / ratio / 2,
      cropLeft: 0.1,
    }),
    [ratio],
  )

  const cropperRef = useRef<ReactCropperElement>(null)
  const [imageBox, setImageBox] = useState<Cropper.ImageData>()
  const [croppedBox, setCroppedBox] = useState<Cropper.Data>()
  const [imageToUpload, setImageToUpload] = useState<ImageWithName | null>(null)
  const [imageToUploadUrl, setImageToUploadUrl] = useState('')

  const zoomTo = (value: number) => {
    if (cropperRef.current) {
      cropperRef.current.cropper.zoom(value)
    }
  }

  useEffect(() => {
    if (imageToUpload) {
      onChange({
        file: imageToUpload,
        ...(imageBox && croppedBox
          ? {
              cropHeight: croppedBox.height / imageBox.naturalHeight,
              cropWidth: croppedBox.width / imageBox.naturalWidth,
              cropTop: croppedBox.y / imageBox.naturalHeight,
              cropLeft: croppedBox.x / imageBox.naturalWidth,
            }
          : defaultCropping),
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageToUpload, imageBox, croppedBox, defaultCropping])

  return (
    <>
      {imageToUploadUrl && imageToUpload && (
        <>
          <CropModal
            title="Recadrer l'image"
            buttons={[
              {
                type: 'button',
                title: 'Annuler',
                priority: 'secondary',
                children: 'Annuler',
                doClosesModal: true,
              },
              {
                type: 'button',
                title: 'Valider',
                children: 'Valider',
                doClosesModal: true,
                onClick: () => {
                  if (cropperRef.current) {
                    setImageBox(cropperRef.current.cropper.getImageData())
                    setCroppedBox(cropperRef.current.cropper.getData())
                  }
                },
              },
            ]}
          >
            Faire glisser l&lsquo;image pour l&lsquo;ajuster
            <div
              className={classNames(styles.cropping, {
                [styles.croppingRound]: round,
              })}
            >
              <Cropper
                viewMode={2}
                ref={cropperRef}
                src={imageToUploadUrl}
                guides={false}
                aspectRatio={ratio}
                autoCropArea={DEFAULT_CROP}
              />
              <div className={styles.zoomButtons}>
                <Button
                  type="button"
                  priority="secondary"
                  title="Zoomer"
                  iconId="fr-icon-add-line"
                  size="small"
                  onClick={() => {
                    zoomTo(0.2)
                  }}
                />
                <Button
                  type="button"
                  priority="secondary"
                  title="Dézoomer"
                  iconId="fr-icon-subtract-line"
                  size="small"
                  onClick={() => {
                    zoomTo(-0.2)
                  }}
                />
              </div>
            </div>
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
          </CropModal>
          <div
            className={classNames(styles.imageContainer, {
              [styles.round]: round,
            })}
            style={{ height, width: height * ratio }}
          >
            <img
              alt=""
              className={styles.image}
              src={imageToUploadUrl}
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
            <div className={styles.imageActions}>
              <Button
                disabled={disabled}
                type="button"
                priority="tertiary no outline"
                iconId="fr-icon-crop-line"
                onClick={openCropModal}
              >
                Recadrer
              </Button>
              <Button
                disabled={disabled}
                type="button"
                priority="tertiary no outline"
                iconId="fr-icon-delete-line"
                onClick={() => {
                  setImageToUpload(null)
                  setImageToUploadUrl('')
                }}
              >
                Supprimer
              </Button>
            </div>
          </div>
        </>
      )}

      <Upload
        disabled={disabled}
        state={error ? 'error' : 'default'}
        stateRelatedMessage={error}
        label={`${imageToUpload ? 'Remplacer la photo' : 'Ajouter une photo'}${
          label ? ` ${label}` : ''
        }`}
        hint={imageUploadHint}
        nativeInputProps={{
          value: imageToUpload ? imageToUpload.filename : '',
          accept: 'image/*',
          onChange: (event) => {
            // We want to emit a File from this onchange instead of the field value (that is the default implementation)
            const { files, value } = event.target
            if (!files) {
              setImageToUpload(null)
              setImageToUploadUrl('')
              return
            }
            const file = files[0] as ImageWithName
            if (file) {
              file.filename = value
            }
            setImageToUpload(file)
            setImageToUploadUrl(URL.createObjectURL(file))
          },
        }}
      />
    </>
  )
}

export default CroppedUpload
