'use client'

import React, { useEffect, useRef, useState } from 'react'
import { ReactCropperElement } from 'react-cropper'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { CroppedImageType, ImageWithName, getDefaultCropping } from './utils'
import Cropping from './Cropping'
import CroppedImage from './CroppedImage'

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
  onChange: (data?: CroppedImageType) => void
  disabled?: boolean
  error?: string
}) => {
  const cropperRef = useRef<ReactCropperElement>(null)

  const { Component: CropModal, open: openCropModal } = createModal({
    id: `crop-${id}`,
    isOpenedByDefault: false,
  })

  const [imageBox, setImageBox] = useState<Cropper.ImageData>()
  const [croppedBox, setCroppedBox] = useState<Cropper.Data>()
  const [croppedBoxData, setCroppedBoxData] = useState<Cropper.CropBoxData>()
  const [canvasData, setCanvasData] = useState<Cropper.CanvasData>()
  const [imageToUpload, setImageToUpload] = useState<ImageWithName | null>(null)
  const [imageSource, setImageSource] = useState('')

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
          : getDefaultCropping(ratio)),
      })
    } else {
      onChange()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageToUpload, imageBox, croppedBox])

  return (
    <>
      {imageSource && imageToUpload && (
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
                  setCanvasData(cropperRef.current.cropper.getCanvasData())
                  setCroppedBoxData(cropperRef.current.cropper.getCropBoxData())
                }
              },
            },
          ]}
        >
          <Cropping
            cropperRef={cropperRef}
            imageSource={imageSource}
            imageToUpload={imageToUpload}
            ratio={ratio}
            round={round}
          />
        </CropModal>
      )}
      <CroppedImage
        label={label}
        height={height}
        ratio={ratio}
        round={round}
        disabled={disabled}
        error={error}
        croppedBox={croppedBox}
        imageBox={imageBox}
        imageSource={imageSource}
        imageToUpload={imageToUpload}
        onCrop={() => {
          openCropModal()
          if (cropperRef.current && croppedBoxData && canvasData) {
            cropperRef.current.cropper.setCropBoxData(croppedBoxData)
            cropperRef.current.cropper.setCanvasData(canvasData)
          }
        }}
        onRemove={() => {
          setImageSource('')
          setImageToUpload(null)
        }}
        onUpload={(file: ImageWithName) => {
          setImageToUpload(file)
          setImageSource(URL.createObjectURL(file))
        }}
      />
    </>
  )
}

export default CroppedUpload
