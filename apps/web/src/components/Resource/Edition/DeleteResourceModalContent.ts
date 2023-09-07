import { ModalProps } from '@codegouvfr/react-dsfr/Modal'

export const deleteResourceModalProps = (onDelete: () => void): ModalProps => ({
  title: 'Supprimer la ressource',
  buttons: [
    {
      title: 'Annuler',
      priority: 'secondary',
      doClosesModal: true,
      children: 'Annuler',
      type: 'button',
    },
    {
      title: 'Supprimer',
      doClosesModal: true,
      children: 'Supprimer',
      type: 'submit',
      onClick: onDelete,
      nativeButtonProps: {
        className: 'fr-btn--danger',
        'data-testid': 'edition-action-bar-delete',
      },
    },
  ],
  children:
    'Confirmez-vous la suppression de la ressource ? Tous les contenus de la ressource seront supprimés avec elle.',
})
