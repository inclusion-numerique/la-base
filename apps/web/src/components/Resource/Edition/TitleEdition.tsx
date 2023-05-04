'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import Button from '@codegouvfr/react-dsfr/Button'
import { Resource } from '@app/web/server/resources'
import InputFormField from '@app/ui/components/Form/InputFormField'
import EditableContent from './EditableContent'
import styles from './Edition.module.css'

const TitleFormValidation = z.object({
  title: z.string(),
  description: z.string(),
})
type TitleFormData = z.infer<typeof TitleFormValidation>

const TitleEdition = ({ resource }: { resource: Resource }) => {
  const [editionMode, setEditionMode] = useState(false)
  const form = useForm<TitleFormData>({
    resolver: zodResolver(TitleFormValidation),
    defaultValues: {
      title: resource.title,
      description: resource.description,
    },
  })

  const onSubmit = (data: TitleFormData) => {
    console.log(data)
    setEditionMode(false)
  }

  return (
    <>
      <EditableContent
        showIcon={!editionMode}
        onEditClick={() => setEditionMode(true)}
      >
        <div className={styles.title}>Titre & description de la ressource</div>
      </EditableContent>
      {editionMode ? (
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <InputFormField
            control={form.control}
            path="title"
            label="Titre de la ressource"
          />
          <InputFormField
            control={form.control}
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
