'use client'

import React, { Dispatch, SetStateAction, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@codegouvfr/react-dsfr/Button'
import { Resource } from '@app/web/server/resources'
import InputFormField from '@app/ui/components/Form/InputFormField'
import {
  EditResourceTitle,
  EditResourceTitleValidation,
} from '@app/web/server/rpc/resource/editResource'
import EditableContent from './EditableContent'
import styles from './Edition.module.css'
import { ResourceModificationState } from '../enums/ResourceModificationState'

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

  const { control, handleSubmit, formState } = useForm<EditResourceTitle>({
    resolver: zodResolver(EditResourceTitleValidation),
    defaultValues: {
      id: resource.id,
      title: resource.title,
      description: resource.description,
    },
  })

  const onSubmit = async (data: EditResourceTitle) => {
    if (formState.isDirty) {
      await updateResource(data)
    } else {
      setModificationState(null)
    }
    setEditionMode(false)
  }

  return (
    <>
      <EditableContent
        showIcon={!editionMode}
        onEditClick={() => {
          setModificationState(ResourceModificationState.MODIFIED)
          setEditionMode(true)
        }}
      >
        <div className={styles.title}>Titre & description de la ressource</div>
      </EditableContent>
      {editionMode ? (
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputFormField
            control={control}
            path="title"
            label="Titre de la ressource"
          />
          <InputFormField
            control={control}
            path="description"
            type="textarea"
            label="Description courte de la ressource"
            hint="Décrivez en quelques mots votre ressource (nature, objectifs...). Cette description apparaîtra aussi dans les résultats du moteur de recherche."
          />
          <Button
            priority="tertiary no outline"
            type="submit"
            iconId="fr-icon-check-line"
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
