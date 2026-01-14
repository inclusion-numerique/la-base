'use client'

import { ResetLinkConfirmationDynamicModal } from '@app/web/features/shareableLink/components/ResetLinkConfirmationModal'
import Button from '@codegouvfr/react-dsfr/Button'

export const OpenResetLinkConfirmationModal = ({
  shareableLinkId,
  entityType,
}: {
  entityType: 'base' | 'resource'
  shareableLinkId?: string | null
}) => {
  const open = ResetLinkConfirmationDynamicModal.useOpen()
  if (!shareableLinkId) return null

  return (
    <Button
      className="fr-link fr-text--underline fr-flex"
      priority="tertiary no outline"
      onClick={() => open({ shareableLinkId: shareableLinkId, entityType })}
      type="button"
    >
      Réinitialiser le lien
    </Button>
  )
}
