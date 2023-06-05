'use client'

import Image from 'next/image'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import * as Sentry from '@sentry/nextjs'
import { zodResolver } from '@hookform/resolvers/zod'
import FileFormField from '@app/ui/components/Form/FileFormField'
import { fileValidation } from '@app/ui/components/Form/utils/fileValidation.client'
import { formatByteSize } from '@app/ui/utils/formatByteSize'
import Button from '@codegouvfr/react-dsfr/Button'
import type { SendCommand } from '@app/web/components/Resource/Edition/Edition'
import ResponsiveUploadedImage from '@app/web/components/ResponsiveUploadedImage'
import { useFileUpload } from '@app/web/hooks/useFileUpload'
import { ResourceProjectionWithContext } from '@app/web/server/resources/getResourceFromEvents'
import {
  imageAllowedExtensions,
  imageFileValidationOptions,
  imageMaxSize,
} from '@app/web/server/rpc/image/imageValidation'
import { trpc } from '@app/web/trpc'
import styles from './ResourceImageEdition.module.css'

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
  resource: ResourceProjectionWithContext
  sendCommand: SendCommand
  editing: string | null
  setEditing: Dispatch<SetStateAction<string | null>>
}) => {
  const { id, image } = resource

  const isEditingImage = editing === 'image'
  const isEditingAnotherContent = !!editing && !isEditingImage

  // File upload hooks for storage
  const [uploadProgressInfo, setUploadProgressInfo] = useState('')
  const fileUpload = useFileUpload({
    onProgress: (progress) => {
      setUploadProgressInfo(`Téléversement de l'image en cours... ${progress}%`)
    },
  })

  // Image creation mutation
  const createImage = trpc.image.create.useMutation()

  const {
    control,
    formState: { isSubmitting },
    reset,
    handleSubmit,
    watch,
  } = useForm<ImageEditionFormData>({
    resolver: zodResolver(ImageEditionFormValidation),
  })

  const onSubmit = async (data: ImageEditionFormData) => {
    // When the user submits a file, it has been validated client side by fileValidation()

    // 1. We set edition state to avoid other operations while uploading
    setEditing('image')

    // 2. We create a signed url and upload the file to the storage
    const uploaded = await fileUpload.upload(data.file)
    if (!uploaded) {
      // Upload failed, error will be displayed from hooks states
      return
    }

    // 3. We create an image based on the uploaded file
    const imageCreationResult = await createImage.mutateAsync({
      file: uploaded,
    })

    // 4. We send the edition command with the created image id
    await sendCommand({
      name: 'EditImage',
      payload: {
        imageId: imageCreationResult.id,
        resourceId: id,
      },
    })

    // 5. We reset the form
    setEditing(null)
    reset()
    setUploadProgressInfo('')
  }

  const onDelete = async () => {
    // 1. Set edition state to avoid other operations while deleting

    setEditing('image')

    // 2. We send the edition command without image id
    await sendCommand({
      name: 'EditImage',
      payload: {
        imageId: null,
        resourceId: id,
      },
    })

    // 3. We reset the form
    setEditing(null)
    reset()
    setUploadProgressInfo('')
  }

  const fileFieldHint = `Taille maximale : ${formatByteSize(
    imageMaxSize,
  )}. Formats
              supportés : ${imageAllowedExtensions.join(', ')}.`
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
  }, [watch, isEditingImage, setEditing])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={image ? styles.container : styles.emptyContainer}>
        <div className={styles.imageContainer}>
          {image ? (
            <ResponsiveUploadedImage
              id={image.id}
              alt={image.altText ?? ''}
              data-testid="resource-image"
              breakpoints={[
                { media: '(max-width: 320px)', width: 320 - 32 },
                { media: '(max-width: 576px)', width: 576 - 32 },
                { media: '(max-width: 768px)', width: 768 - 32 },
                { media: '(min-width: 768px)', width: 800 },
              ]}
            />
          ) : (
            <Image
              src="/images/image-placeholder.svg"
              alt="Image vide"
              data-testid="resource-image-placeholder"
              width={56}
              height={56}
            />
          )}
        </div>
        <div className={styles.inputContainer}>
          <FileFormField
            label={
              image
                ? "Remplacer l'image de présentation"
                : 'Ajouter une image de présentation pour attirer les visiteurs'
            }
            hint={fileFieldHint}
            data-testid="resource-image-file-field"
            control={control}
            path="file"
            disabled={disabled}
            info={uploadProgressInfo}
          />
          {!!image && (
            <Button
              iconId="fr-icon-delete-bin-line"
              type="button"
              size="small"
              title="Supprimer l'image de présentation"
              priority="tertiary no outline"
              onClick={onDelete}
              nativeButtonProps={{
                'data-testid': 'resource-image-delete',
              }}
            />
          )}
        </div>
      </div>
    </form>
  )
}

export default ResourceImageEdition
