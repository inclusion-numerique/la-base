import type { ButtonProps } from '@codegouvfr/react-dsfr/Button'
import ButtonsGroup from '@codegouvfr/react-dsfr/ButtonsGroup'
import React from 'react'

export const ResourceFeedbackActions = ({
  isOwner,
  nativeButtonProps,
  onEdit,
  className,
}: {
  isOwner: boolean
  nativeButtonProps: ButtonProps['nativeButtonProps']
  onEdit: () => void
  className?: string
}) =>
  isOwner && (
    <div className={className}>
      <ButtonsGroup
        inlineLayoutWhen="always"
        buttons={[
          {
            type: 'button',
            size: 'small',
            priority: 'tertiary no outline',
            className: 'fr-pr-0 fr-pl-1w fr-my-0 fr-py-0',
            iconId: 'fr-icon-edit-line',
            title: "Modifier l'avis",
            onClick: onEdit,
            nativeButtonProps: {
              'data-testid': 'update-feedback',
            },
          },
          {
            type: 'button',
            size: 'small',
            priority: 'tertiary no outline',
            className: 'fr-pr-0 fr-pl-1w fr-my-0 fr-py-0',
            nativeButtonProps: {
              ...nativeButtonProps,
              'data-testid': 'delete-feedback',
            },
            iconId: 'fr-icon-delete-bin-line',
            title: "Supprimer l'avis",
          },
        ]}
      />
    </div>
  )
