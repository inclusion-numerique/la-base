import React, { RefObject } from 'react'
import classNames from 'classnames'
import Cropper, { ReactCropperElement } from 'react-cropper'
import 'cropperjs/dist/cropper.css'
import Button from '@codegouvfr/react-dsfr/Button'
import { ImageForForm } from '@app/web/server/image/imageTypes' // If Cropper is inside a modal, we need to prevent the modal from closing when mouse up outside of the cropper
import {
  ImageCropData,
  imageCropToCropperInitialData,
} from '@app/ui/components/CroppedUpload/cropperToImageCrop'
import { getEventDsfrOpenedModalParent } from '@app/ui/utils/getEventDsfrOpenedModalParent'
import ImageInfo from '@app/ui/components/ImageInfo'
import { ImageWithName } from './utils'
import styles from './CroppedUpload.module.css'
import CropStartEvent = Cropper.CropStartEvent
import CropEndEvent = Cropper.CropEndEvent

// If Cropper is inside a modal, we need to prevent the modal from closing when mouse up outside of the cropper
// This function will stop the event from propagating further on the
const stopDsfrModalClosePropagation = (event: Event) => {
  const openedModalParent = getEventDsfrOpenedModalParent(event)

  if (openedModalParent && event.target === openedModalParent) {
    event.stopPropagation()
  }
}

const onCropStart = (event: CropStartEvent) => {
  const openedModalParent = getEventDsfrOpenedModalParent(event)

  if (openedModalParent) {
    // Use capturing phase to catch the click event before any other listener does
    openedModalParent.addEventListener(
      'click',
      stopDsfrModalClosePropagation,
      true,
    )
  }
}

const onCropEnd = (event: CropEndEvent) => {
  // We want to remove the listener after the event has been processed/canceled
  setTimeout(() => {
    const openedModalParent = getEventDsfrOpenedModalParent(event)

    if (openedModalParent) {
      // Remove our capturing event listener
      openedModalParent.removeEventListener(
        'click',
        stopDsfrModalClosePropagation,
        true,
      )
    }
  }, 0)
}

const Cropping = ({
  ratio,
  round,
  imageSource,
  imageToUpload,
  cropperRef,
  image,
  initialImageCropData,
}: {
  ratio: number
  round?: boolean | 'quarter'
  imageSource: string
  image?: ImageForForm | null
  imageToUpload: ImageWithName | null
  cropperRef: RefObject<ReactCropperElement>
  initialImageCropData?: ImageCropData
}) => {
  const zoomTo = (value: number) => () => {
    if (cropperRef.current) {
      cropperRef.current.cropper.zoom(value)
    }
  }

  const data = initialImageCropData
    ? imageCropToCropperInitialData(initialImageCropData)
    : undefined

  return (
    <>
      Faire glisser l&lsquo;image pour l&lsquo;ajuster
      <div
        className={classNames(styles.cropping, {
          [styles.croppingRound]: round === true,
          [styles.croppingRoundQuarter]: round === 'quarter',
        })}
      >
        <Cropper
          data={data}
          className={styles.cropper}
          responsive
          viewMode={2}
          ref={cropperRef}
          src={imageSource}
          guides={false}
          aspectRatio={ratio}
          cropstart={onCropStart}
          cropend={onCropEnd}
          autoCrop
          autoCropArea={1}
        />
        <div className={styles.zoomButtons}>
          <Button
            type="button"
            priority="secondary"
            title="Zoomer"
            iconId="fr-icon-add-line"
            size="small"
            onClick={zoomTo(0.2)}
          />
          <Button
            type="button"
            priority="secondary"
            title="Dézoomer"
            iconId="fr-icon-subtract-line"
            size="small"
            onClick={zoomTo(-0.2)}
          />
        </div>
      </div>
      {(imageToUpload || image) && (
        <ImageInfo
          name={imageToUpload?.name ?? image?.upload?.name ?? ''}
          size={imageToUpload?.size ?? image?.upload?.size ?? null}
        />
      )}
    </>
  )
}

export default Cropping
