'use client'

import React, { Dispatch, SetStateAction } from 'react'
import { useForm } from 'react-hook-form'
import Button from '@codegouvfr/react-dsfr/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import InputFormField from '@app/ui/components/Form/InputFormField'
import type { SendCommand } from '@app/web/components/Resource/Edition/Edition'
import {
  EditTitleAndDescriptionCommand,
  EditTitleAndDescriptionCommandValidation,
} from '@app/web/server/resources/feature/EditTitleAndDescription'
import { ResourceProjectionWithContext } from '@app/web/server/resources/getResourceFromEvents'
import {
  resourceDescriptionMaxLength,
  resourceTitleMaxLength,
} from '@app/web/server/rpc/resource/utils'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import EditableContent from './EditableContent'
import styles from './Edition.module.css'

const titleInfo = (title: string | null) =>
  `${title?.length ?? 0}/${resourceTitleMaxLength} caractères`
const descriptionInfo = (description: string | null) =>
  `${description?.length ?? 0}/${resourceDescriptionMaxLength} caractères`

const TitleEdition = ({
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
  const editionMode = editing === 'title'

  const {
    control,
    handleSubmit,
    setError,
    formState: { isSubmitting },
    watch,
  } = useForm<EditTitleAndDescriptionCommand>({
    resolver: zodResolver(EditTitleAndDescriptionCommandValidation),
    mode: 'onChange',
    defaultValues: {
      name: 'EditTitleAndDescription',
      payload: {
        resourceId: resource.id,
        title: resource.title,
        description: resource.description,
      },
    },
  })

  const onSubmit = async (data: EditTitleAndDescriptionCommand) => {
    try {
      await sendCommand(data)
      setEditing(null)
    } catch (error) {
      applyZodValidationMutationErrorsToForm(error, setError)
    }
  }

  const title = watch('payload.title')
  const description = watch('payload.description')

  return (
    <>
      <EditableContent
        showIcon={!editionMode}
        onEditClick={() => {
          setEditing('title')
        }}
        data-testid="edit-title-button"
      >
        <div className={styles.title}>Titre & description de la ressource</div>
      </EditableContent>
      {editionMode ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputFormField
            control={control}
            path="payload.title"
            label="Titre de la ressource"
            info={titleInfo(title)}
            data-testid="edit-title-input"
          />
          <InputFormField
            control={control}
            path="payload.description"
            type="textarea"
            label="Description courte de la ressource"
            hint="Décrivez en quelques mots votre ressource (nature, objectifs...). Cette description apparaîtra aussi dans les résultats du moteur de recherche."
            info={descriptionInfo(description)}
            data-testid="edit-description-input"
          />
          <Button
            priority="tertiary no outline"
            type="submit"
            iconId="fr-icon-check-line"
            disabled={isSubmitting}
            data-testid="edit-validation-button"
          >
            Valider
          </Button>
        </form>
      ) : (
        <>
          <h3>{resource.title}</h3>
          <div className="fr-text--xl">{resource.description}</div>
        </>
      )}
    </>
  )
}

export default TitleEdition
