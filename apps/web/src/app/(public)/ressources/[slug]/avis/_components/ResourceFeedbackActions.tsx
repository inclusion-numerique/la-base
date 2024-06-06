import React from 'react'
import ButtonsGroup from '@codegouvfr/react-dsfr/ButtonsGroup'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'

const {
  Component: DeleteModal,
  close: closeDeleteModal,
  buttonProps: deleteModalNativeButtonProps,
} = createModal({
  id: `delete-resource-feedback`,
  isOpenedByDefault: false,
})

export const ResourceFeedbackActions = ({
  isOwner,
  isLoading,
  onEdit,
  onDelete,
  className,
}: {
  isOwner: boolean
  isLoading: boolean
  onEdit: () => void
  onDelete: (closeDeleteModal: () => void) => void
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
              ...deleteModalNativeButtonProps,
              'data-testid': 'delete-feedback',
            },
            iconId: 'fr-icon-delete-bin-line',
            title: "Supprimer l'avis",
          },
        ]}
      />
      <DeleteModal
        title="Supprimer votre avis"
        buttons={[
          {
            children: 'Annuler',
            priority: 'secondary',
            disabled: isLoading,
            onClick: closeDeleteModal,
          },
          {
            children: 'Supprimer',
            ...buttonLoadingClassname(isLoading, 'fr-btn--danger'),
            onClick: () => onDelete(closeDeleteModal),
          },
        ]}
      >
        Êtes-vous sûr de vouloir supprimer votre avis sur cette ressource ?
      </DeleteModal>
    </div>
  )
