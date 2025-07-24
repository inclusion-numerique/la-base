'use client'

import { createDynamicModal } from '@app/ui/components/Modal/createDynamicModal'
import { createToast } from '@app/ui/toast/createToast'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'

export const DeleteResourceDynamicModal = createDynamicModal({
  id: 'delete-resource-modal',
  isOpenedByDefault: false,
  initialState: {
    resourceId: null as string | null,
  },
})

const DeleteResourceModal = ({ redirectTo }: { redirectTo?: string }) => {
  const { resourceId } = DeleteResourceDynamicModal.useState()

  const router = useRouter()
  const mutation = trpc.resource.mutate.useMutation()

  const onDelete = async () => {
    if (!resourceId) {
      return
    }
    try {
      await mutation.mutateAsync({
        name: 'Delete',
        payload: {
          resourceId,
        },
      })
      if (redirectTo) {
        router.push(redirectTo)
      }
      router.refresh()
      createToast({
        priority: 'success',
        message: <>La ressource a bien été supprimée</>,
      })
    } catch {
      createToast({
        priority: 'error',
        message:
          'Une erreur est survenue lors de la suppression de la ressource',
      })
      mutation.reset()
    }
  }

  return (
    <DeleteResourceDynamicModal.Component
      title="Supprimer la ressource"
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
            'data-testid': 'delete-resource-modal-submit',
          },
        },
      ]}
    >
      <p>
        Confirmez-vous la suppression de la ressource ? Tous les contenus de la
        ressource seront supprimés avec elle.
      </p>
      {mutation.error && (
        <p className="fr-error-text" data-testid="delete-resource-error">
          {mutation.error.message}
        </p>
      )}
    </DeleteResourceDynamicModal.Component>
  )
}

export default withTrpc(DeleteResourceModal)
