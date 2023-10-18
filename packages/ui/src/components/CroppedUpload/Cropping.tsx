import React, { RefObject } from 'react'
import classNames from 'classnames'
import Cropper, { ReactCropperElement } from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import Button from '@codegouvfr/react-dsfr/Button'
import { formatByteSize } from '@app/ui/utils/formatByteSize'
import { DEFAULT_CROP, ImageWithName } from './utils'
import styles from './CroppedUpload.module.css'

const Cropping = ({
  ratio,
  round,
  imageSource,
  imageToUpload,
  cropperRef,
}: {
  ratio: number
  round?: boolean
  imageSource: string
  imageToUpload: ImageWithName | null
  cropperRef: RefObject<ReactCropperElement>
}) => {
  const zoomTo = (value: number) => {
    if (cropperRef.current) {
      cropperRef.current.cropper.zoom(value)
    }
  }

  return (
    <>
      Faire glisser l&lsquo;image pour l&lsquo;ajuster
      <div
        className={classNames(styles.cropping, {
          [styles.croppingRound]: round,
        })}
      >
        <Cropper
          className={styles.cropper}
          responsive
          viewMode={2}
          ref={cropperRef}
          src={imageSource}
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
    </>
  )
}

export default Cropping
