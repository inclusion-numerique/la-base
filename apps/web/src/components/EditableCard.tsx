'use client'

import Button from '@codegouvfr/react-dsfr/Button'
import ButtonsGroup from '@codegouvfr/react-dsfr/ButtonsGroup'
import React, {
  type ComponentProps,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from 'react'

const EditableCard = ({
  id,
  title,
  subtitle,
  preview,
  editing,
  editModeState,
  buttons = [],
}: {
  id: string
  title: ReactNode
  subtitle?: ReactNode
  preview: ReactNode
  editing: ReactNode
  editModeState: [boolean, Dispatch<SetStateAction<boolean>>]
  buttons?: {
    children: ReactNode
    form?: string
    type?: 'button' | 'submit' | 'reset'
    onClick?: () => void
    nativeButtonProps?: ComponentProps<'button'> &
      Record<`data-${string}`, string | boolean | null | undefined>
  }[]
}) => {
  const [isEditMode, setEditMode] = editModeState

  const toggleEditMode = () => setEditMode(!isEditMode)

  return (
    <div className="fr-card fr-card--editable">
      <div className="fr-card__body">
        <div className="fr-card__header fr-card__separator">
          <div>
            <h2 id={id} className="fr-card__title">
              {title}
            </h2>
            {subtitle}
          </div>
          {!isEditMode && (
            <Button
              data-testid={`${id}-edit-card-button`}
              priority="secondary"
              iconId="fr-icon-edit-line"
              title="Modifier"
              onClick={toggleEditMode}
            />
          )}
        </div>
        {isEditMode && editing && (
          <div className="fr-card__content">{editing}</div>
        )}
        {!isEditMode && preview && (
          <div className="fr-card__content">{preview}</div>
        )}
        {isEditMode && (
          <div className="fr-card__footer">
            <ButtonsGroup
              alignment="right"
              inlineLayoutWhen="always"
              buttons={[
                {
                  children: 'Annuler',
                  type: 'button',
                  priority: 'secondary',
                  onClick: toggleEditMode,
                },
                ...buttons,
              ]}
            />
          </div>
        )}
      </div>
    </div>
  )
}

export default EditableCard
