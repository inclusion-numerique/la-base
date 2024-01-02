import React, { Dispatch, ReactNode, SetStateAction } from 'react'
import { useForm, UseFormReturn } from 'react-hook-form'
import Button from '@codegouvfr/react-dsfr/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { ContentType } from '@prisma/client'
import styles from '@app/web/components/Resource/Edition/Edition.module.css'
import SectionTitleContentEdition from '@app/web/components/Resource/Contents/SectionTitleContentEdition'
import type { SendCommand } from '@app/web/components/Resource/Edition/ResourceEdition'
import { AddContentCommand } from '@app/web/server/resources/feature/AddContent'
import { EditContentCommand } from '@app/web/server/resources/feature/EditContent'
import { ResourceProjection } from '@app/web/server/resources/feature/createResourceProjection'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import { removeNullAndUndefinedValues } from '@app/web/utils/removeNullAndUndefinedValues'
import {
  ClientContentPayload,
  ClientContentPayloadCommandValidation,
} from '@app/web/server/resources/feature/Content.client'
import { ContentProjectionWithContext } from '@app/web/server/resources/getResourceFromEvents'
import TextContentEdition from '@app/web/components/Resource/Contents/TextContentEdition'
import ImageContentEdition from '@app/web/components/Resource/Contents/ImageContentEdition'
import LinkContentEdition from '@app/web/components/Resource/Contents/LinkContentEdition'
import FileContentEdition from '@app/web/components/Resource/Contents/FileContentEdition'

const ResourceContentForm = ({
  content,
  setEditing,
  sendCommand,
  resource,
  mode,
  type,
  'data-testid': dataTestId,
  onDelete,
}: {
  type: ContentType
  resource: ResourceProjection
  setEditing: Dispatch<SetStateAction<string | null>>
  sendCommand: SendCommand
  'data-testid'?: string
  onDelete: () => void | Promise<void>
} & (
  | { mode: 'add'; content?: undefined }
  | { mode: 'edit'; content: ContentProjectionWithContext }
)) => {
  if (mode === 'edit' && !content) {
    throw new Error('Content is required in edit mode')
  }
  const form = useForm<ClientContentPayload>({
    resolver: zodResolver(ClientContentPayloadCommandValidation),
    mode: 'onChange',
    defaultValues: {
      type,
      uploadFile: undefined,
      imageUploadFile: undefined,
      text: type === 'Text' ? '' : undefined,
      ...(content ? removeNullAndUndefinedValues(content) : null),
    },
  })

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting, isDirty },
  } = form

  const onSubmit = async (data: ClientContentPayload) => {
    if (!isDirty) {
      // No change
      setEditing(null)
      return
    }

    const payloadData = { ...data }
    if ('uploadFile' in payloadData) {
      delete payloadData.uploadFile
    }
    if ('imageUploadFile' in payloadData) {
      delete payloadData.imageUploadFile
    }

    const payload: AddContentCommand['payload'] = {
      resourceId: resource.id,
      ...payloadData,
    }

    try {
      const command =
        mode === 'add'
          ? ({
              name: 'AddContent',
              payload,
            } satisfies AddContentCommand)
          : ({
              name: 'EditContent',
              payload: { id: content.id, ...payload },
            } satisfies EditContentCommand)

      await sendCommand(command)
      setEditing(null)
    } catch (error) {
      applyZodValidationMutationErrorsToForm(error, setError)
    }
  }

  let formContent: ReactNode

  switch (type) {
    case 'SectionTitle': {
      formContent = <SectionTitleContentEdition form={form} />
      break
    }
    case 'Text': {
      formContent = <TextContentEdition form={form} />
      break
    }
    case 'Link': {
      formContent = <LinkContentEdition form={form} />
      break
    }
    case 'Image': {
      formContent = (
        <ImageContentEdition
          form={form as UseFormReturn<ClientContentPayload & { type: 'Image' }>}
          content={content}
        />
      )
      break
    }
    case 'File': {
      formContent = (
        <FileContentEdition
          form={form as UseFormReturn<ClientContentPayload & { type: 'File' }>}
          content={content}
        />
      )
      break
    }
    default: {
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      throw new Error(`Invalid content type ${type}`)
    }
  }

  return (
    <div className={styles.contentFormContainer}>
      <form onSubmit={handleSubmit(onSubmit)} data-testid={dataTestId}>
        {formContent}
        <div className={styles.contentAction}>
          <Button
            data-testid={dataTestId && `${dataTestId}__submit`}
            priority="tertiary no outline"
            iconId="fr-icon-check-line"
            type="submit"
            size="small"
            disabled={isSubmitting}
          >
            Valider
          </Button>
          <Button
            data-testid={dataTestId && `${dataTestId}__delete`}
            type="button"
            title="Supprimer le contenu"
            priority="tertiary no outline"
            iconId="fr-icon-delete-line"
            size="small"
            onClick={onDelete}
          />
        </div>
      </form>
    </div>
  )
}

export default ResourceContentForm
