'use client'

import React, { ReactNode, useEffect, useRef, useState } from 'react'
import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { trpc } from '@app/web/trpc'
import { useFileUpload } from '@app/web/hooks/useFileUpload'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import { ReactCropperElement } from 'react-cropper'
import { ImageWithName, getDefaultCropping } from './utils'
import CroppedImage from './CroppedImage'
import Cropping from './Cropping'

const {
  Component: Modal,
  open: openModal,
  close: closeModal,
} = createModal({
  id: 'croppedUpload',
  isOpenedByDefault: false,
})

const CroppedUploadModal = <T extends FieldValues>({
  form,
  path,
  initialImageId,
  open,
  onClose,
  label,
  height,
  ratio,
  round,
  onChange,
  emptyChildren,
}: {
  form: UseFormReturn<T>
  path: Path<T>
  initialImageId?: string
  open: boolean
  onClose: () => void
  label?: string
  height: number
  ratio: number
  round?: boolean
  onChange: (imageId?: string) => void
  emptyChildren?: ReactNode
}) => {
  const [croppingMode, setCroppingMode] = useState(false)
  const cropperRef = useRef<ReactCropperElement>(null)
  const [imageBox, setImageBox] = useState<Cropper.ImageData>()
  const [croppedBox, setCroppedBox] = useState<Cropper.Data>()
  const [croppedBoxData, setCroppedBoxData] = useState<Cropper.CropBoxData>()
  const [canvasData, setCanvasData] = useState<Cropper.CanvasData>()
  const [imageToUpload, setImageToUpload] = useState<ImageWithName | null>(null)
  const [imageSource, setImageSource] = useState(
    initialImageId ? `/images/${initialImageId}.original` : '',
  )

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore : Wait for modal to be loaded
    if (window.dsfr) {
      if (open) {
        setCroppingMode(false)
        openModal()
      } else {
        closeModal()
      }
    }
  }, [open])

  // File upload hooks for storage
  const imageUpload = useFileUpload()

  // Image creation mutation
  const createImage = trpc.image.create.useMutation()
  const updateImage = trpc.image.update.useMutation()

  const onSubmit = async () => {
    try {
      let createdImage: string | undefined

      const cropValues =
        imageBox && croppedBox
          ? {
              cropHeight: croppedBox.height / imageBox.naturalHeight,
              cropWidth: croppedBox.width / imageBox.naturalWidth,
              cropTop: croppedBox.y / imageBox.naturalHeight,
              cropLeft: croppedBox.x / imageBox.naturalWidth,
            }
          : getDefaultCropping(ratio)

      if (imageToUpload) {
        const uploaded = await imageUpload.upload(imageToUpload)
        if ('error' in uploaded) {
          form.setError(path, { message: uploaded.error })
          return
        }

        const result = await createImage.mutateAsync({
          ...cropValues,
          file: uploaded,
        })
        createdImage = result.id
      } else if (imageSource && initialImageId) {
        await updateImage.mutateAsync({
          id: initialImageId,
          ...cropValues,
        })
        createdImage = initialImageId
      }
      onChange(createdImage)
    } catch (mutationError) {
      applyZodValidationMutationErrorsToForm(mutationError, form.setError)
    }
  }

  return (
    <Controller
      control={form.control}
      name={path}
      render={({ fieldState: { error }, formState: { isSubmitting } }) => (
        <Modal
          title="Modifier la photo de profil"
          buttons={[
            {
              doClosesModal: false,
              title: 'Annuler',
              priority: 'secondary',
              onClick: croppingMode ? () => setCroppingMode(false) : onClose,
              children: 'Annuler',
              type: 'button',
            },
            {
              doClosesModal: false,
              title: croppingMode ? 'Valider' : 'Enregistrer',
              type: 'button',
              disabled: isSubmitting,
              className: isSubmitting ? 'fr-btn--loading' : '',
              children: croppingMode ? 'Valider' : 'Enregistrer',
              onClick: croppingMode
                ? () => {
                    if (cropperRef.current) {
                      setImageBox(cropperRef.current.cropper.getImageData())
                      setCroppedBox(cropperRef.current.cropper.getData())
                      setCanvasData(cropperRef.current.cropper.getCanvasData())
                      setCroppedBoxData(
                        cropperRef.current.cropper.getCropBoxData(),
                      )
                    }
                    setCroppingMode(false)
                  }
                : onSubmit,
            },
          ]}
        >
          {imageSource && croppingMode && (
            <Cropping
              cropperRef={cropperRef}
              imageSource={imageSource}
              imageToUpload={imageToUpload}
              ratio={ratio}
              round={round}
            />
          )}
          <div className={croppingMode ? 'fr-hidden' : ''}>
            <CroppedImage
              emptyChildren={emptyChildren}
              label={label}
              height={height}
              ratio={ratio}
              round={round}
              disabled={isSubmitting}
              error={error ? error.message : undefined}
              croppedBox={croppedBox}
              imageBox={imageBox}
              imageSource={imageSource}
              imageToUpload={imageToUpload}
              onCrop={() => {
                setCroppingMode(true)
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
          </div>
        </Modal>
      )}
    />
  )
}

export default CroppedUploadModal
