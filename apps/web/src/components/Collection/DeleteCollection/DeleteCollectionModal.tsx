'use client'

import { createDynamicModal } from '@app/ui/components/Modal/createDynamicModal'
import { createToast } from '@app/ui/toast/createToast'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'

export const DeleteCollectionDynamicModal = createDynamicModal({
  id: 'delete-collection-modal',
  isOpenedByDefault: false,
  initialState: {
    collectionId: null as string | null,
  },
})

const DeleteCollectionModal = ({ redirectTo }: { redirectTo?: string }) => {
  const { collectionId } = DeleteCollectionDynamicModal.useState()

  const router = useRouter()
  const mutation = trpc.collection.delete.useMutation()

  const onDelete = async () => {
    if (!collectionId) {
      return
    }
    try {
      await mutation.mutateAsync({
        id: collectionId,
      })
      if (redirectTo) {
        router.push(redirectTo)
      } else {
        router.refresh()
      }

      createToast({
        priority: 'success',
        message: <>La collection a bien été supprimée</>,
      })
    } catch {
      createToast({
        priority: 'error',
        message:
          'Une erreur est survenue lors de la suppression de la collection',
      })
      router.refresh()
      mutation.reset()
    }
  }

  return (
    <DeleteCollectionDynamicModal.Component
      title="Supprimer la collection"
      buttons={[
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
          type: 'button',
          onClick: onDelete,
          nativeButtonProps: {
            className: classNames(
              'fr-btn--danger',
              mutation.isPending && 'fr-btn--loading',
            ),
            'data-testid': 'delete-collection-modal-submit',
          },
        },
      ]}
    >
      <p className="fr-mb-2w">
        Êtes-vous sûr de vouloir supprimer votre collection ? Cette action est
        irréversible et entraîne la suppression définitive de la suppression
        définitive de la collection.
      </p>
    </DeleteCollectionDynamicModal.Component>
  )
}

export default withTrpc(DeleteCollectionModal)
