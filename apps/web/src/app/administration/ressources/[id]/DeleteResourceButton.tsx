'use client'

import { createToast } from '@app/ui/toast/createToast'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import Button from '@codegouvfr/react-dsfr/Button'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'

export const DeleteResourceConfirm = createModal({
  id: 'delete-resource',
  isOpenedByDefault: false,
})

const DeleteResourceButton = ({ resourceId }: { resourceId: string }) => {
  const mutation = trpc.resource.delete.useMutation()
  const router = useRouter()

  const onClick = async () => {
    try {
      await mutation.mutateAsync({ resourceId })

      createToast({
        priority: 'success',
        message: 'Ressource supprimée',
      })
      router.push('/administration/ressources')
      router.refresh()
    } catch {
      createToast({
        priority: 'error',
        message: 'Erreur lors de la suppression de la ressource',
      })
    }
  }

  const isLoading = mutation.isPending || mutation.isSuccess

  return (
    <>
      <Button
        iconId="fr-icon-delete-line"
        className="fr-btn--danger"
        disabled={isLoading}
        size="small"
        type="button"
        onClick={DeleteResourceConfirm.open}
      >
        Supprimer
      </Button>
      <DeleteResourceConfirm.Component
        title="Supprimer une ressource"
        buttons={[
          {
            title: 'Annuler',
            priority: 'secondary',
            doClosesModal: true,
            children: 'Annuler',
            type: 'button',
            disabled: isLoading,
          },
          {
            title: 'Supprimer',
            doClosesModal: false,
            children: 'Supprimer',
            type: 'button',
            onClick,
            nativeButtonProps: {
              className: classNames(
                'fr-btn--danger',
                isLoading && 'fr-btn--loading',
              ),
            },
          },
        ]}
      >
        <p>Cette ressource sera supprimée.</p>
      </DeleteResourceConfirm.Component>
    </>
  )
}

export default withTrpc(DeleteResourceButton)
