'use client'

import { createToast } from '@app/ui/toast/createToast'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import Button from '@codegouvfr/react-dsfr/Button'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'

export const DisconnectUserConfirm = createModal({
  id: 'disconnect-user',
  isOpenedByDefault: false,
})

const DisconnectUserButton = ({ userId }: { userId: string }) => {
  const mutation = trpc.profile.disconnectSessions.useMutation()
  const router = useRouter()

  const onClick = async () => {
    try {
      await mutation.mutateAsync({ userId })

      createToast({
        priority: 'success',
        message: "Sessions supprimées, l'utilisateur devra se reconnecter",
      })
      DisconnectUserConfirm.close()
      router.refresh()
    } catch {
      createToast({
        priority: 'error',
        message: "Erreur lors de la déconnexion de l'utilisateur",
      })
    }
  }

  const isLoading = mutation.isPending || mutation.isSuccess

  return (
    <>
      <Button
        iconId="fr-icon-logout-box-r-line"
        priority="secondary"
        disabled={isLoading}
        size="small"
        type="button"
        onClick={DisconnectUserConfirm.open}
      >
        Forcer la déconnexion
      </Button>
      <DisconnectUserConfirm.Component
        title="Forcer la déconnexion de cet utilisateur ?"
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
            title: 'Déconnecter',
            doClosesModal: false,
            children: 'Déconnecter',
            type: 'button',
            onClick,
            nativeButtonProps: {
              className: classNames(isLoading && 'fr-btn--loading'),
            },
          },
        ]}
      >
        <p>
          Toutes les sessions actives de cet utilisateur seront supprimées. Il
          devra se reconnecter via ProConnect ou par email.
        </p>
      </DisconnectUserConfirm.Component>
    </>
  )
}

export default withTrpc(DisconnectUserButton)
