'use client'

import React, { ReactNode, useState } from 'react'
import { UseFormReturn } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import ButtonsGroup from '@codegouvfr/react-dsfr/ButtonsGroup'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import { UpdateProfileCommand } from '../server/profiles/updateProfile'
import { UpdateBaseCommand } from '../server/bases/updateBase'
import { ChangeBaseCommand } from '../server/resources/feature/ChangeBase'
import { ChangeVisibilityCommand } from '../server/resources/feature/ChangeVisibility'
import { ChangeIndexationCommand } from '../server/resources/feature/ChangeIndexation'
import Card from './Card'

const EditCard = <
  T extends
    | UpdateProfileCommand
    | UpdateBaseCommand
    | ChangeBaseCommand
    | ChangeVisibilityCommand
    | ChangeIndexationCommand,
>({
  id,
  className,
  title,
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
  description?: string
  edition: ReactNode
  view: ReactNode
  form: UseFormReturn<T>
  mutation: (data: T) => Promise<void>
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
      title={title}
      description={description}
      editMode={editMode}
      setEditMode={setEditMode}
      className={className}
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
