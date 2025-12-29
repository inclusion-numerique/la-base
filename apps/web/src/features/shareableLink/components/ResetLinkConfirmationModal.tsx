'use client'

import { createDynamicModal } from '@app/ui/components/Modal/createDynamicModal'
import { createToast } from '@app/ui/toast/createToast'
import { trpc } from '@app/web/trpc'
import { getServerUrl } from '@app/web/utils/baseUrl'
import Button from '@codegouvfr/react-dsfr/Button'

export const ResetLinkConfirmationDynamicModal = createDynamicModal({
  isOpenedByDefault: false,
  id: 'reset-link-confirmation-modal',
  initialState: {
    shareableLinkId: null as string | null,
    entityType: null as 'base' | 'resource' | null,
  },
})

const ResetLinkConfirmationModal = () => {
  const { shareableLinkId, entityType } =
    ResetLinkConfirmationDynamicModal.useState()
  const rotateShareableLinkMutation =
    trpc.shareableLink.rotateShareableLink.useMutation()

  const resetLink = async () => {
    if (!shareableLinkId) return

    try {
      const result = await rotateShareableLinkMutation.mutateAsync({
        id: shareableLinkId,
      })

      const shareUrl = getServerUrl(
        `/${entityType === 'base' ? 'bases' : 'ressources'}/${result.id}`,
        { absolutePath: true },
      )
      await navigator.clipboard.writeText(shareUrl)

      createToast({
        priority: 'success',
        message:
          'Nouveau lien de partage généré et copié dans le presse-papiers',
      })
    } catch {
      createToast({
        priority: 'error',
        message: 'Erreur lors de la réinitialisation du lien',
      })
    }
    ResetLinkConfirmationDynamicModal.close()
  }

  const handleCancel = () => {
    ResetLinkConfirmationDynamicModal.close()
  }

  return (
    <ResetLinkConfirmationDynamicModal.Component
      size="medium"
      title="Réinitialiser le lien"
    >
      <div className="fr-mb-4w">
        <p>
          En le réinitialisant, le lien de partage actuel ne sera plus valide.
          Souhaitez-vous vraiment le réinitialiser ?
        </p>
      </div>

      <div className="fr-flex fr-direction-row fr-flex-gap-4v fr-justify-content-end">
        <Button priority="secondary" onClick={handleCancel} type="button">
          Annuler
        </Button>
        <Button priority="primary" onClick={resetLink} type="button">
          Réinitialiser
        </Button>
      </div>
    </ResetLinkConfirmationDynamicModal.Component>
  )
}

export default ResetLinkConfirmationModal
