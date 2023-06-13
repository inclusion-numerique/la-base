import React, { Dispatch, ReactNode, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import Button from '@codegouvfr/react-dsfr/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { ContentType } from '@prisma/client'
import SectionTitleEdition from '@app/web/components/Resource/Contents/SectionTitleEdition'
import type { SendCommand } from '@app/web/components/Resource/Edition/Edition'
import styles from '@app/web/components/Resource/Edition/Edition.module.css'
import { AddContentCommand } from '@app/web/server/resources/feature/AddContent'
import { EditContentCommand } from '@app/web/server/resources/feature/EditContent'
import {
  ContentProjection,
  ResourceProjection,
} from '@app/web/server/resources/feature/createResourceProjection'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import { removeNullAndUndefinedValues } from '@app/web/utils/removeNullAndUndefinedValues'
import {
  ContentPayload,
  ContentPayloadCommandValidation,
} from '@app/web/server/resources/feature/Content'
import ImageEdition from '@app/web/components/Resource/Contents/ImageEdition'
import FileEdition from '@app/web/components/Resource/Contents/FileEdition'
import LinkEdition from './LinkEdition'
import TextEdition from './TextEdition'

const ContentForm = ({
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
  | { mode: 'edit'; content: ContentProjection }
)) => {
  if (mode === 'edit' && !content) {
    throw new Error('Content is required in edit mode')
  }
  const form = useForm<ContentPayload>({
    resolver: zodResolver(ContentPayloadCommandValidation),
    mode: 'onChange',
    defaultValues: {
      type,
      ...(content ? removeNullAndUndefinedValues(content) : null),
    },
  })

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting, isDirty },
  } = form

  const onSubmit = async (data: ContentPayload) => {
    if (!isDirty) {
      // No change
      setEditing(null)
      return
    }
    try {
      const command =
        mode === 'add'
          ? ({
              name: 'AddContent',
              payload: { resourceId: resource.id, ...data },
            } satisfies AddContentCommand)
          : ({
              name: 'EditContent',
              payload: { resourceId: resource.id, id: content.id, ...data },
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
      formContent = <SectionTitleEdition form={form} />
      break
    }
    case 'Text': {
      formContent = <TextEdition form={form} />
      break
    }
    case 'Link': {
      formContent = <LinkEdition form={form} />
      break
    }
    case 'Image': {
      formContent = <ImageEdition form={form} />
      break
    }
    case 'File': {
      formContent = <FileEdition form={form} />
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

export default ContentForm
