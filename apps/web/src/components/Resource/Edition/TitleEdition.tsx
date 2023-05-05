'use client'

import React, { Dispatch, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@codegouvfr/react-dsfr/Button'
import { Resource } from '@app/web/server/resources'
import InputFormField from '@app/ui/components/Form/InputFormField'
import {
  EditResourceTitle,
  editResourceTitleValidation,
} from '@app/web/server/rpc/resource/editResource'
import {
  resourceDescriptionMaxLength,
  resourceTitleMaxLength,
} from '@app/web/server/rpc/resource/utils'
import EditableContent from './EditableContent'
import styles from './Edition.module.css'
import { ResourceModificationState } from '../enums/ResourceModificationState'

const titleInfo = (title: string | null) =>
  `${title?.length ?? 0}/${resourceTitleMaxLength} caractères`
const descriptionInfo = (description: string | null) =>
  `${description?.length ?? 0}/${resourceDescriptionMaxLength} caractères`

const TitleEdition = ({
  resource,
  setModificationState,
  updateResource,
}: {
  resource: Resource
  setModificationState: Dispatch<
    SetStateAction<ResourceModificationState | null>
  >
  updateResource: (data: EditResourceTitle) => Promise<void>
}) => {
  const [editionMode, setEditionMode] = useState(false)

  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<EditResourceTitle>({
    resolver: zodResolver(editResourceTitleValidation),
    mode: 'onChange',
    defaultValues: {
      id: resource.id,
      title: resource.title,
      description: resource.description,
    },
  })

  const onSubmit = async (data: EditResourceTitle) => {
    setEditionMode(false)
    await updateResource(data)
  }

  return (
    <>
      <EditableContent
        showIcon={!editionMode}
        onEditClick={() => {
          setModificationState(ResourceModificationState.MODIFIED)
          setEditionMode(true)
        }}
        data-testid="edit-title-button"
      >
        <div className={styles.title}>Titre & description de la ressource</div>
      </EditableContent>
      {editionMode ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputFormField
            control={control}
            path="title"
            label="Titre de la ressource"
            info={titleInfo}
            data-testid="edit-title-input"
          />
          <InputFormField
            control={control}
            path="description"
            type="textarea"
            label="Description courte de la ressource"
            hint="Décrivez en quelques mots votre ressource (nature, objectifs...). Cette description apparaîtra aussi dans les résultats du moteur de recherche."
            info={descriptionInfo}
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
