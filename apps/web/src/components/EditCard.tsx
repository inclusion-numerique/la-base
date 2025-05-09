'use client'

import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import Button from '@codegouvfr/react-dsfr/Button'
import ButtonsGroup from '@codegouvfr/react-dsfr/ButtonsGroup'
import { useRouter } from 'next/navigation'
import React, { type ReactNode, useState } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import type { UpdateBaseCommand } from '../server/bases/updateBase'
import type { ChangeBaseCommand } from '../server/resources/feature/ChangeBase'
import type { ChangeIndexationCommand } from '../server/resources/feature/ChangeIndexation'
import type { ChangeVisibilityCommand } from '../server/resources/feature/ChangeVisibility'
import Card from './Card'

const EditCard = <
  T extends
    | UpdateBaseCommand
    | ChangeBaseCommand
    | ChangeVisibilityCommand
    | ChangeIndexationCommand,
  V = unknown,
>({
  id,
  className,
  title,
  titleAs: CardTitle = 'h3',
  description,
  edition,
  view,
  form,
  mutation,
  noRefresh,
}: {
  id?: string
  className?: string
  title: string
  titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  description?: string
  edition: ReactNode
  view: ReactNode
  form: UseFormReturn<T>
  mutation: (data: T) => Promise<V>
  noRefresh?: boolean
}) => {
  const router = useRouter()
  const [editMode, setEditMode] = useState(false)

  const onSubmit = async (data: T) => {
    try {
      await mutation(data)
      setEditMode(false)
      if (!noRefresh) {
        router.refresh()
      }
    } catch (error) {
      applyZodValidationMutationErrorsToForm(error, form.setError)
    }
  }

  return (
    <Card
      id={id}
      className={className}
      title={
        <div className="fr-flex fr-justify-content-space-between fr-align-items-center">
          <CardTitle className="fr-mb-0 fr-h5">{title}</CardTitle>
          {!editMode && setEditMode && (
            <Button
              data-testid="edit-card-button"
              priority="secondary"
              iconId="fr-icon-edit-line"
              title="Modifier"
              onClick={() => setEditMode(true)}
            />
          )}
        </div>
      }
      description={description}
      titleAs="div"
      contentSeparator
    >
      {editMode ? (
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {edition}
          <ButtonsGroup
            inlineLayoutWhen="always"
            alignment="right"
            buttons={[
              {
                children: 'Annuler',
                priority: 'secondary',
                onClick: () => setEditMode(false),
                disabled: form.formState.isSubmitting,
              },
              {
                children: 'Enregistrer',
                type: 'submit',
                disabled: form.formState.isSubmitting,
                nativeButtonProps: {
                  'data-testid': 'edit-card-save-button',
                },
              },
            ]}
          />
        </form>
      ) : (
        view
      )}
    </Card>
  )
}

export default EditCard
