'use client'

import { ChangeLicenceCommand } from '@app/web/server/resources/feature/ResourceChangeLicence'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import React, { type ReactNode, useState } from 'react'
import type { UseFormReturn } from 'react-hook-form'
import type { UpdateBaseCommand } from '../server/bases/updateBase'
import type { ChangeBaseCommand } from '../server/resources/feature/ChangeBase'
import type { ChangeIndexationCommand } from '../server/resources/feature/ChangeIndexation'
import type { ChangeVisibilityCommand } from '../server/resources/feature/ChangeVisibility'
import Card from './Card'
import styles from './EditCard.module.css'

const EditCard = <
  T extends
    | UpdateBaseCommand
    | ChangeBaseCommand
    | ChangeVisibilityCommand
    | ChangeLicenceCommand
    | ChangeIndexationCommand,
  V = unknown,
>({
  id,
  className,
  noBorder,
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
  noBorder?: boolean
  title: string
  titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  description?: ReactNode
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
      className={classNames(className, 'fr-border-radius--8 fr-border')}
      noBorder={noBorder}
      title={
        <div className="fr-flex fr-direction-column fr-direction-sm-row fr-justify-content-space-between fr-align-items-sm-center fr-flex-gap-3v">
          <CardTitle className="fr-mb-0 fr-h5 fr-text-label--blue-france">
            {title}
          </CardTitle>
          <div className="fr-hidden fr-unhidden-sm">
            {!editMode && setEditMode && (
              <Button
                data-testid="edit-card-button"
                className="fr-text--sm fr-text--medium fr-p-1v"
                size="small"
                priority="tertiary no outline"
                onClick={() => setEditMode(true)}
              >
                Modifier
                <span className="fr-icon-edit-line fr-ml-1w fr-icon--sm" />
              </Button>
            )}
          </div>
        </div>
      }
      description={
        <>
          {description}
          <div className="fr-hidden-sm fr-unhidden">
            <div className="fr-flex fr-justify-content-sm-center fr-justify-content-end">
              {!editMode && setEditMode && (
                <Button
                  data-testid="edit-card-button"
                  className="fr-text--sm fr-text--medium"
                  size="small"
                  priority="tertiary no outline"
                  onClick={() => setEditMode(true)}
                >
                  Modifier
                  <span className="fr-icon-edit-line fr-ml-1w fr-icon--sm" />
                </Button>
              )}
            </div>
          </div>
        </>
      }
      titleAs="div"
      contentSeparator
    >
      {editMode ? (
        <form onSubmit={form.handleSubmit(onSubmit)}>
          {edition}
          <div className="fr-flex fr-direction-column-reverse fr-direction-sm-row fr-justify-content-end fr-flex-gap-4v">
            <Button
              priority="secondary"
              className={styles.button}
              disabled={form.formState.isSubmitting}
              onClick={() => setEditMode(false)}
            >
              Annuler
            </Button>
            <Button
              priority="primary"
              className={styles.button}
              type="submit"
              disabled={form.formState.isSubmitting}
              nativeButtonProps={{
                'data-testid': 'edit-card-save-button',
              }}
            >
              Enregistrer
            </Button>
          </div>
        </form>
      ) : (
        view
      )}
    </Card>
  )
}

export default EditCard
