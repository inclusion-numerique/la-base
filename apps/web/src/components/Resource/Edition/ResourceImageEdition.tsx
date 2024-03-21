'use client'

import CroppedUpload from '@app/ui/components/CroppedUpload/CroppedUpload'
import { CroppedImageType } from '@app/ui/components/CroppedUpload/utils'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import React, { Dispatch, SetStateAction, useEffect } from 'react'
import { Controller, Path, useForm } from 'react-hook-form'
import { z } from 'zod'
import * as Sentry from '@sentry/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import { fileValidation } from '@app/ui/components/Form/utils/fileValidation.client'
import type { SendCommand } from '@app/web/components/Resource/Edition/ResourceEdition'
import { useFileUpload } from '@app/web/hooks/useFileUpload'
import { ResourceProjectionWithContext } from '@app/web/server/resources/getResourceFromEvents'
import { imageFileValidationOptions } from '@app/web/server/rpc/image/imageValidation'
import { trpc } from '@app/web/trpc'

const CropImageModal = createModal({
  id: 'crop-resource-image',
  isOpenedByDefault: false,
})

const imageFileValidation = fileValidation({
  ...imageFileValidationOptions,
  required: true,
})

const ImageEditionFormValidation = z.object({
  file: imageFileValidation,
})

type ImageEditionFormData = z.infer<typeof ImageEditionFormValidation>

const ResourceImageEdition = ({
  resource,
  sendCommand,
  setEditing,
  editing,
}: {
  resource: Pick<ResourceProjectionWithContext, 'id' | 'image'>
  sendCommand: SendCommand
  editing: string | null
  setEditing: Dispatch<SetStateAction<string | null>>
}) => {
  const isEditingImage = editing === 'image'
  const isEditingAnotherContent = !!editing && !isEditingImage

  // File upload hooks for storage
  const fileUpload = useFileUpload()

  // Image creation mutation
  const createImage = trpc.image.create.useMutation()

  const {
    control,
    setValue,
    formState: { isSubmitting },
    reset,
    handleSubmit,
    watch,
    setError,
  } = useForm<ImageEditionFormData>({
    resolver: zodResolver(ImageEditionFormValidation),
  })

  const onSubmit = async (data: CroppedImageType) => {
    if (data.file == null) return
    // When the user submits a file, it has been validated client side by fileValidation()

    // 1. We set edition state to avoid other operations while uploading
    setEditing('image')

    // 2. We create a signed url and upload the file to the storage
    const uploaded = await fileUpload.upload(data.file)
    if ('error' in uploaded) {
      setEditing(null)

      // eslint-disable-next-line unicorn/no-useless-undefined
      setValue('file', undefined as unknown as File)
      setError('file', {
        message: uploaded.error,
      })
      // Upload failed, error will be displayed from hooks states
      return
    }

    // 3. We create an image based on the uploaded file
    const imageCreationResult = await createImage.mutateAsync({
      ...data,
      file: uploaded,
    })

    // 4. We send the edition command with the created image id
    await sendCommand({
      name: 'EditImage',
      payload: {
        imageId: imageCreationResult.id,
        resourceId: resource.id,
      },
    })

    // 5. We reset the form
    setEditing(null)
    reset()
    fileUpload.reset()
  }

  const onDelete = async () => {
    // 1. Set edition state to avoid other operations while deleting

    setEditing('image')

    // 2. We send the edition command without image id
    await sendCommand({
      name: 'EditImage',
      payload: {
        imageId: null,
        resourceId: resource.id,
      },
    })

    // 3. We reset the form
    setEditing(null)
    reset()
    fileUpload.reset()
  }

  const disabled = isSubmitting || isEditingAnotherContent

  // Form is automatically submited without user validation on image file change
  useEffect(() => {
    const subscription = watch((value) => {
      if (value.file && !isEditingImage) {
        handleSubmit(onSubmit)().catch((error) => {
          Sentry.captureException(error)
        })
      }
    })
    return () => subscription.unsubscribe()
  }, [watch, isEditingImage, setEditing, handleSubmit, onSubmit])

  const handleCropImage = async (data?: CroppedImageType) => {
    if (data?.file != null) {
      await onSubmit(data)
    } else if (data?.id == null) {
      await onDelete()
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="fr-border">
        <div className="fr-px-3w">
          <Controller
            control={control}
            name={'imageId' as Path<{ file: File }>}
            render={({ fieldState: { error } }) => (
              <CroppedUpload
                image={resource.image}
                modal={CropImageModal}
                disabled={disabled}
                ratio={1.66}
                height={195}
                size={{ w: 1764, h: 1060 }}
                onChange={handleCropImage}
                error={error?.message}
              />
            )}
          />
        </div>
      </div>
    </form>
  )
}

export default ResourceImageEdition
