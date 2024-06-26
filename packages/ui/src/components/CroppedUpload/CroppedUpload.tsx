'use client'

import React, {
  FormEventHandler,
  KeyboardEventHandler,
  useEffect,
  useRef,
  useState,
} from 'react'
import { ReactCropperElement } from 'react-cropper'
import { createPortal } from 'react-dom'
import { ImageForForm } from '@app/web/server/image/imageTypes'
import type { CreateModalReturn } from '@app/ui/utils/modalTypes'
import { cropperToImageCrop } from '@app/ui/components/CroppedUpload/cropperToImageCrop'
import { CroppedImageType, ImageWithName } from './utils'
import Cropping from './Cropping'
import CroppedImage from './CroppedImage'

const CroppedUpload = ({
  modal,
  label,
  height,
  ratio,
  round,
  onChange,
  disabled,
  error,
  image,
  size,
}: {
  modal: CreateModalReturn
  label?: string
  height: number
  ratio: number
  round?: boolean | 'quarter'
  onChange: (data?: CroppedImageType) => void
  disabled?: boolean
  error?: string
  image?: ImageForForm | null
  size?: { w: number; h: number }
}) => {
  const cropperRef = useRef<ReactCropperElement>(null)

  const [imageBox, setImageBox] = useState<Cropper.ImageData>()
  const [croppedBox, setCroppedBox] = useState<Cropper.Data>()
  const [, setCroppedBoxData] = useState<Cropper.CropBoxData>()
  const [, setCanvasData] = useState<Cropper.CanvasData>()
  const [imageToUpload, setImageToUpload] = useState<ImageWithName | null>(null)
  const [imageSource, setImageSource] = useState(
    image ? `/images/${image.id}.original` : '',
  )

  useEffect(() => {
    if (imageToUpload) {
      onChange({
        file: imageToUpload,
        ...cropperToImageCrop(cropperRef.current?.cropper),
      })
    } else {
      onChange({
        id: image?.id,
        ...cropperToImageCrop(cropperRef.current?.cropper),
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageToUpload, imageBox, croppedBox])

  const onCropSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    const cropper = cropperRef.current?.cropper
    if (cropper) {
      setImageBox(cropper.getImageData())
      setCroppedBox(cropper.getData())
      setCanvasData(cropper.getCanvasData())
      setCroppedBoxData(cropper.getCropBoxData())
    }
    modal.close()
    event?.preventDefault()
    event?.stopPropagation()
  }

  const formRef = useRef<HTMLFormElement>(null)

  // Submit form on enter (the form submit is not triggered for some reason...)
  const onFormKeyUp: KeyboardEventHandler<HTMLFormElement> = (event) => {
    if (
      event.key === 'Enter' &&
      event.target &&
      'tagName' in event.target &&
      event.target.tagName !== 'BUTTON'
    ) {
      onCropSubmit(event)
    }
  }

  // For SSR compatibility, we have to render the form + modal only on the browser after first render
  // This is because we need the portal to be rendered outside of any parent form and this is not a server side feature
  const [clientRendered, setClientRendered] = useState(false)
  useEffect(() => {
    setClientRendered(true)
  }, [setClientRendered])

  return (
    <>
      {clientRendered &&
        createPortal(
          // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
          <form ref={formRef} onSubmit={onCropSubmit} onKeyUp={onFormKeyUp}>
            <modal.Component
              title="Recadrer l’image"
              buttons={[
                {
                  type: 'button',
                  title: 'Annuler',
                  priority: 'secondary',
                  children: 'Annuler',
                  doClosesModal: true,
                },
                {
                  type: 'submit',
                  title: 'Valider',
                  children: 'Valider',
                },
              ]}
            >
              {!!imageSource && (
                <Cropping
                  cropperRef={cropperRef}
                  imageSource={imageSource}
                  imageToUpload={imageToUpload}
                  ratio={ratio}
                  round={round}
                  image={image}
                />
              )}
            </modal.Component>
          </form>,
          document.body,
        )}
      <CroppedImage
        label={label}
        height={height}
        ratio={ratio}
        size={size}
        round={round}
        disabled={disabled}
        error={error}
        croppedBox={croppedBox}
        image={image}
        imageBox={imageBox}
        imageSource={imageSource}
        imageToUpload={imageToUpload}
        onCrop={modal.open}
        onRemove={() => {
          setImageSource('')
          setImageToUpload(null)
          onChange({ id: undefined })
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
