'use client'

import { createToast } from '@app/ui/toast/createToast'
import { useRouter } from 'next/navigation'
import Button from '@codegouvfr/react-dsfr/Button'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import classNames from 'classnames'
import { trpc } from '@app/web/trpc'
import { withTrpc } from '@app/web/components/trpc/withTrpc'

export const DeleteUserConfirm = createModal({
  id: 'delete-user',
  isOpenedByDefault: false,
})

const DeleteUserButton = ({ userId }: { userId: string }) => {
  const mutation = trpc.profile.delete.useMutation()
  const router = useRouter()

  const onClick = async () => {
    try {
      await mutation.mutateAsync({ userId })

      createToast({
        priority: 'success',
        message: 'Profil supprimé',
      })
      router.push('/administration/utilisateurs')
      router.refresh()
    } catch {
      createToast({
        priority: 'error',
        message: 'Erreur lors de la suppression du profil',
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
        onClick={DeleteUserConfirm.open}
      >
        Supprimer
      </Button>
      <DeleteUserConfirm.Component
        title="Supprimer un utilisateur"
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
        <p>
          Cet utilisateur sera supprimé ainsi que son profil, ses bases,
          collections et ressources.
        </p>
      </DeleteUserConfirm.Component>
    </>
  )
}

export default withTrpc(DeleteUserButton)
