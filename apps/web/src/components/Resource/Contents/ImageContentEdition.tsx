import { UseFormReturn } from 'react-hook-form'
import InputFormField from '@app/ui/components/Form/InputFormField'
import React, { useEffect, useState } from 'react'
import * as Sentry from '@sentry/nextjs'
import ImageContentDetails from '@app/web/components/Resource/Contents/ImageContentDetails'
import {
  contentCaptionMaxLength,
  contentTitleMaxLength,
} from '@app/web/server/rpc/resource/utils'
import { ClientContentPayload } from '@app/web/server/resources/feature/Content.client'
import { ContentProjectionWithContext } from '@app/web/server/resources/getResourceFromEvents'
import { trpc } from '@app/web/trpc'
import FileUploadForm from '@app/web/components/Resource/Edition/FileUploadForm'
import { useFileUpload } from '@app/web/hooks/useFileUpload'
import { imageUploadHint } from '@app/web/server/rpc/image/imageValidation'
import styles from './ImageContentEdition.module.css'

const titleInfo = (title?: string | null) =>
  `${title?.length ?? 0}/${contentTitleMaxLength} caractères`

const captionInfo = (caption?: string | null) =>
  `${caption?.length ?? 0}/${contentCaptionMaxLength} caractères`

const ImageContentEdition = ({
  form: {
    control,
    watch,
    setError,
    setValue,
    formState: { errors },
  },
  content,
}: {
  form: UseFormReturn<ClientContentPayload & { type: 'Image' }>
  content?: Pick<ContentProjectionWithContext, 'image' | 'imageAltText'>
}) => {
  const imageUploadValue = watch('imageUploadFile')

  const [imageInfo, setImageInfo] = useState(content?.image)

  // Image upload hooks for storage
  const imageUpload = useFileUpload()
  const { upload } = imageUpload

  // Image model creation mutation
  const createImage = trpc.image.create.useMutation()

  const imageIdError = errors.imageId?.message

  useEffect(() => {
    if (!imageUploadValue) {
      return
    }

    const uploadImageAndSetKey = async () => {
      if (!imageUploadValue) {
        return
      }
      // Upload image and get uploaded image key
      const uploaded = await upload(imageUploadValue)
      if ('error' in uploaded) {
        setError('imageUploadFile', {
          message: uploaded.error,
        })
        // Upload failed, error will be displayed from hooks states
        return
      }

      // Create upload model
      const imageModel = await createImage.mutateAsync({
        file: uploaded,
      })

      setValue('imageUploadFile', null)
      setValue('imageId', imageModel.id, { shouldValidate: true })
      setImageInfo(imageModel)
    }

    uploadImageAndSetKey().catch((error) => {
      Sentry.captureException(error)
    })
  }, [imageUploadValue])

  return (
    <>
      <InputFormField
        data-testid="link-title-input"
        control={control}
        path="title"
        label="Titre de l'image"
        info={titleInfo}
      />
      <div className={styles.imageContainer}>
        {imageInfo && (
          <ImageContentDetails
            image={imageInfo}
            imageAltText={content?.imageAltText ?? ''}
            infoContainerClassName={styles.imageInfoContainer}
          />
        )}
        <FileUploadForm
          label={imageInfo ? "Remplacer l'image" : 'Ajouter une image'}
          fileFieldHint={imageUploadHint({ w: 1764, h: 1260 })}
          fileUpload={imageUpload}
          path="imageUploadFile"
          control={control}
          className={styles.inputContainer}
          error={imageIdError}
        />
      </div>
      <InputFormField
        className="fr-mt-4v"
        type="textarea"
        data-testid="link-caption-input"
        label="Texte alternatif"
        hint="Rédigez une brève description de cette image dans un soucis d’accessibilité."
        control={control}
        path="imageAltText"
      />
      <InputFormField
        className="fr-mt-4v"
        type="textarea"
        data-testid="link-caption-input"
        control={control}
        path="caption"
        label="Légende"
        info={captionInfo}
      />
    </>
  )
}

export default ImageContentEdition
