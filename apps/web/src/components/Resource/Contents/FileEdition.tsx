import { UseFormReturn } from 'react-hook-form'
import InputFormField from '@app/ui/components/Form/InputFormField'
import React, { useEffect, useState } from 'react'
import { maximumFileSizeInBytes } from '@app/ui/components/Form/utils/fileValidation.server'
import { formatByteSize } from '@app/ui/utils/formatByteSize'
import * as Sentry from '@sentry/nextjs'
import FileUploadForm from '@app/web/components/Resource/Edition/FileUploadForm'
import {
  contentCaptionMaxLength,
  contentTitleMaxLength,
} from '@app/web/server/rpc/resource/utils'
import { ClientContentPayload } from '@app/web/server/resources/feature/Content.client'
import { useFileUpload } from '@app/web/hooks/useFileUpload'
import { ContentProjectionWithContext } from '@app/web/server/resources/getResourceFromEvents'
import { trpc } from '@app/web/trpc'
import FileDetails from '@app/web/components/Resource/Contents/FileDetails'
import styles from './FileEdition.module.css'

const titleInfo = (title?: string | null) =>
  `${title?.length ?? 0}/${contentTitleMaxLength} caractères`

const captionInfo = (caption?: string | null) =>
  `${caption?.length ?? 0}/${contentCaptionMaxLength} caractères`

const FileEdition = ({
  form: {
    control,
    watch,
    setError,
    setValue,
    formState: { errors },
  },
  content,
}: {
  form: UseFormReturn<ClientContentPayload & { type: 'File' }>
  content?: ContentProjectionWithContext
}) => {
  const uploadFileValue = watch('uploadFile')
  const fileKeyError = errors.fileKey?.message

  const [fileInfo, setFileInfo] = useState(content?.file)

  // File upload hooks for storage
  const fileUpload = useFileUpload()
  const { upload } = fileUpload

  // Upload model creation mutation
  const createUpload = trpc.upload.create.useMutation()

  useEffect(() => {
    if (!uploadFileValue) {
      return
    }

    const uploadFileAndSetKey = async () => {
      if (!uploadFileValue) {
        return
      }
      // Upload file and get uploaded file key
      const uploaded = await upload(uploadFileValue)
      if ('error' in uploaded) {
        setError('uploadFile', {
          message: uploaded.error,
        })
        // Upload failed, error will be displayed from hooks states
        return
      }

      // Create upload model
      const uploadModel = await createUpload.mutateAsync({
        file: uploaded,
      })

      setValue('uploadFile', null)
      setValue('fileKey', uploadModel.key, { shouldValidate: true })
      setFileInfo(uploadModel)
    }

    uploadFileAndSetKey().catch((error) => {
      Sentry.captureException(error)
    })
  }, [uploadFileValue])

  return (
    <>
      <InputFormField
        data-testid="link-title-input"
        control={control}
        path="title"
        label="Titre du fichier"
        info={titleInfo}
      />
      <div className={styles.fileContainer}>
        {fileInfo && (
          <div className={styles.filePreview}>
            <FileDetails file={fileInfo} />
          </div>
        )}
        <FileUploadForm
          label={fileInfo ? 'Remplacer le fichier' : 'Ajouter un fichier'}
          fileFieldHint={`Taille maximale : ${formatByteSize(
            maximumFileSizeInBytes,
          )}. Tous les formats sont supportés.`}
          fileUpload={fileUpload}
          control={control}
          path="uploadFile"
          className={styles.inputContainer}
          error={fileKeyError}
        />
      </div>
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

export default FileEdition
