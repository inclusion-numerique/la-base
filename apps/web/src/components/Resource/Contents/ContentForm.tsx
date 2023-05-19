import React, { Dispatch, ReactNode, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import Alert from '@codegouvfr/react-dsfr/Alert'
import Button from '@codegouvfr/react-dsfr/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import SectionTitleEdition from '@app/web/components/Resource/Contents/SectionTitleEdition'
import styles from '@app/web/components/Resource/Edition/Edition.module.css'
import {
  AddContentCommand,
  AddContentCommandValidation,
} from '@app/web/server/resources/feature/AddContent'
import {
  EditContentCommand,
  EditContentCommandValidation,
} from '@app/web/server/resources/feature/EditContent'
import {
  ContentProjection,
  ResourceProjection,
} from '@app/web/server/resources/feature/createResourceProjection'
import { ResourceMutationCommand } from '@app/web/server/resources/feature/features'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import { removeNullAndUndefinedValues } from '@app/web/utils/removeNullAndUndefinedValues'
import { ContentType } from '@prisma/client'
import TextEdition from './TextEdition'

const ContentForm = ({
  content,
  setEditing,
  sendCommand,
  resource,
  mode,
  type,
}: {
  type: ContentType
  resource: ResourceProjection
  setEditing: Dispatch<SetStateAction<string | null>>
  sendCommand: (command: ResourceMutationCommand) => Promise<void>
} & (
  | { mode: 'add'; content?: undefined }
  | { mode: 'edit'; content: ContentProjection }
)) => {
  if (mode === 'edit' && !content) {
    throw new Error('Content is required in edit mode')
  }
  const form = useForm<AddContentCommand | EditContentCommand>(
    mode === 'add'
      ? {
          resolver: zodResolver(AddContentCommandValidation),
          mode: 'onChange',
          defaultValues: {
            name: 'AddContent',
            payload: {
              resourceId: resource.id,
              type,
            },
          },
        }
      : {
          resolver: zodResolver(EditContentCommandValidation),
          mode: 'onChange',
          defaultValues: {
            name: 'EditContent',
            payload: {
              ...removeNullAndUndefinedValues(content),
              resourceId: resource.id,
            },
          },
        },
  )

  const {
    handleSubmit,
    setError,
    formState: { isSubmitting },
  } = form

  const onSubmit = async (data: AddContentCommand | EditContentCommand) => {
    try {
      await sendCommand(data)
      setEditing(null)
    } catch (error) {
      applyZodValidationMutationErrorsToForm(error, setError)
    }
  }

  const onDelete = async () => {
    if (mode === 'add') {
      setEditing(null)
      return
    }
    try {
      await sendCommand({
        name: 'RemoveContent',
        payload: { resourceId: resource.id, id: content.id },
      })
      setEditing(null)
    } catch (error) {
      console.error(error)
      // TODO handle deletion error (no internet / already deleted)
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
    default: {
      formContent = (
        <Alert
          severity="info"
          title={`Formulaire de contenu ${type} en cours d'implémentation`}
        />
      )
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      data-testid={`content-${type}-edition-form`}
    >
      {formContent}
      <div className={styles.contentAction}>
        {mode === 'edit' && (
          <Button
            type="button"
            iconId={'ri-draggable' as never}
            title="Drag"
            priority="tertiary no outline"
            className={styles.dragButton}
          />
        )}
        <Button
          data-testid="content-validation-button"
          priority="tertiary no outline"
          iconId="fr-icon-edit-line"
          type="submit"
          disabled={isSubmitting}
        >
          Valider
        </Button>
        <Button
          type="button"
          title="Supprimer le contenu"
          priority="tertiary no outline"
          iconId="fr-icon-delete-line"
          size="small"
          onClick={onDelete}
        />
      </div>
    </form>
  )
}

export default ContentForm
