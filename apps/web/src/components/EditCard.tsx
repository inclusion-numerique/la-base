'use client'

import React, { ReactNode, useState } from 'react'
import classNames from 'classnames'
import { UseFormReturn } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import Button from '@codegouvfr/react-dsfr/Button'
import ButtonsGroup from '@codegouvfr/react-dsfr/ButtonsGroup'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import { UpdateProfileCommand } from '../server/profiles/updateProfile'
import { UpdateBaseCommand } from '../server/bases/updateBase'
import styles from './EditCard.module.css'

const EditCard = <T extends UpdateProfileCommand | UpdateBaseCommand>({
  className,
  title,
  description,
  edition,
  view,
  form,
  mutation,
}: {
  className?: string
  title: string
  description?: string
  edition: ReactNode
  view: ReactNode
  form: UseFormReturn<T>
  mutation: (data: T) => Promise<void>
}) => {
  const router = useRouter()
  const [editMode, setEditMode] = useState(false)

  const onSubmit = async (data: T) => {
    try {
      await mutation(data)
      setEditMode(false)
      router.refresh()
    } catch (error) {
      applyZodValidationMutationErrorsToForm(error, form.setError)
    }
  }

  return (
    <div className={classNames(className, styles.card)}>
      <div>
        <div className={styles.title}>
          <h5 className="fr-mb-0">{title}</h5>
          {!editMode && (
            <Button
              data-testid="edit-card-button"
              priority="secondary"
              iconId="fr-icon-edit-line"
              title="Modifier"
              onClick={() => setEditMode(true)}
            />
          )}
        </div>
      </div>
      {description && (
        <div className={styles.description}>
          <span className="fr-text--sm fr-mb-0">{description}</span>
        </div>
      )}
      <hr className="fr-mt-4w fr-pb-4w" />
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
    </div>
  )
}

export default EditCard
