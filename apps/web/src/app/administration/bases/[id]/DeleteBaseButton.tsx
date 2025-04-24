'use client'

import { createToast } from '@app/ui/toast/createToast'
import { useRouter } from 'next/navigation'
import Button from '@codegouvfr/react-dsfr/Button'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import classNames from 'classnames'
import { trpc } from '@app/web/trpc'
import { withTrpc } from '@app/web/components/trpc/withTrpc'

export const DeleteBaseConfirm = createModal({
  id: 'delete-base',
  isOpenedByDefault: false,
})

const DeleteBaseButton = ({ baseId }: { baseId: string }) => {
  const mutation = trpc.base.delete.useMutation()
  const router = useRouter()

  const onClick = async () => {
    try {
      await mutation.mutateAsync({ id: baseId })

      createToast({
        priority: 'success',
        message: 'Base supprimée',
      })
      router.push('/administration/bases')
      router.refresh()
    } catch {
      createToast({
        priority: 'error',
        message: 'Erreur lors de la suppression de la base',
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
        onClick={DeleteBaseConfirm.open}
      >
        Supprimer
      </Button>
      <DeleteBaseConfirm.Component
        title="Supprimer une base"
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
        <p>Cette base sera supprimée.</p>
      </DeleteBaseConfirm.Component>
    </>
  )
}

export default withTrpc(DeleteBaseButton)
