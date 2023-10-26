'use client'

import React, { ReactNode, useRef, useState } from 'react'
import { Controller, FieldValues, Path, UseFormReturn } from 'react-hook-form'
import { trpc } from '@app/web/trpc'
import { useFileUpload } from '@app/web/hooks/useFileUpload'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import { ReactCropperElement } from 'react-cropper'
import { createPortal } from 'react-dom'
import { ImageForForm } from '@app/web/server/image/imageTypes'
import { defaultCropValues } from '@app/web/server/image/defaultCropValues'
import { CreateModalReturn } from '@app/ui/utils/modalTypes'
import { useModalVisibility } from '@app/ui/hooks/useModalVisibility'
import { cropperDataToImageCrop } from '@app/ui/components/CroppedUpload/cropperToImageCrop'
import { ImageWithName } from './utils'
import CroppedImage from './CroppedImage'
import Cropping from './Cropping'

const CroppedUploadModal = <T extends FieldValues>({
  form,
  path,
  modal,
  title,
  label,
  height,
  ratio,
  round,
  onChange,
  emptyChildren,
  image,
}: {
  title: string
  modal: CreateModalReturn
  form: UseFormReturn<T>
  path: Path<T>
  label?: string
  height: number
  ratio: number
  round?: boolean
  onChange: (imageId: string | null) => void
  emptyChildren?: ReactNode
  image?: ImageForForm | null
}) => {
  const [croppingMode, setCroppingMode] = useState(false)
  const cropperRef = useRef<ReactCropperElement>(null)
  const [imageBox, setImageBox] = useState<Cropper.ImageData>()
  const [croppedBox, setCroppedBox] = useState<Cropper.Data>()
  const [croppedBoxData, setCroppedBoxData] = useState<Cropper.CropBoxData>()
  const [canvasData, setCanvasData] = useState<Cropper.CanvasData>()
  const [imageToUpload, setImageToUpload] = useState<ImageWithName | null>(null)
  const [imageSource, setImageSource] = useState(
    image ? `/images/${image.id}.original` : '',
  )

  // File upload hooks for storage
  const imageUpload = useFileUpload()

  // Image creation mutation
  const createImage = trpc.image.create.useMutation()
  const updateImage = trpc.image.update.useMutation()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const onSubmit = async () => {
    setIsSubmitting(true)

    const cropValues =
      imageBox && croppedBox
        ? cropperDataToImageCrop({
            imageData: imageBox,
            data: croppedBox,
          })
        : defaultCropValues

    // TODO Toast on error
    try {
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
        onChange(result.id)
        return
      }
      if (imageSource && image) {
        const newImage = await updateImage.mutateAsync({
          id: image.id,
          ...cropValues,
        })
        onChange(newImage.id)
        return
      }
      onChange(null)
    } catch (mutationError) {
      applyZodValidationMutationErrorsToForm(mutationError, form.setError)
    }
  }

  const onCancel = croppingMode ? () => setCroppingMode(false) : modal.close

  const onConfirm = croppingMode
    ? () => {
        if (cropperRef.current) {
          setImageBox(cropperRef.current.cropper.getImageData())
          setCroppedBox(cropperRef.current.cropper.getData())
          setCanvasData(cropperRef.current.cropper.getCanvasData())
          setCroppedBoxData(cropperRef.current.cropper.getCropBoxData())
        }
        setCroppingMode(false)
      }
    : onSubmit

  useModalVisibility(modal.id, {
    onClosed: () => {
      setCroppingMode(false)
      setIsSubmitting(false)
    },
  })

  return createPortal(
    <Controller
      control={form.control}
      name={path}
      render={({ fieldState: { error } }) => (
        <modal.Component
          title={title}
          buttons={[
            {
              doClosesModal: false,
              priority: 'secondary',
              onClick: onCancel,
              children: 'Annuler',
              type: 'button',
            },
            {
              doClosesModal: false,
              type: 'button',
              className: isSubmitting ? 'fr-btn--loading' : '',
              children: croppingMode ? 'Valider' : 'Enregistrer',
              onClick: onConfirm,
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
              image={image}
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
              image={image}
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
        </modal.Component>
      )}
    />,
    document.body,
  )
}

export default CroppedUploadModal
