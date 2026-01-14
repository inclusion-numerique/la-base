'use client'

import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import { SessionUser } from '@app/web/auth/sessionUser'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { BaseJoinRequestByToken } from '@app/web/features/base/join-requests/db/getBaseJoinRequestByToken'
import { trpc } from '@app/web/trpc'
import ButtonsGroup from '@codegouvfr/react-dsfr/ButtonsGroup'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

const BaseJoinRequestButtons = ({
  joinRequest,
  user,
}: {
  joinRequest: BaseJoinRequestByToken
  user: SessionUser | null
}): ReactNode => {
  const router = useRouter()

  const acceptMutation = trpc.baseJoinRequest.accept.useMutation()
  const declineMutation = trpc.baseJoinRequest.decline.useMutation()

  if (!user) {
    return (
      <div className="fr-mb-8v">
        <p className="fr-text--sm fr-text-default--grey">
          Vous devez être connecté pour traiter cette demande.
        </p>
        <ButtonsGroup
          buttons={[
            {
              children: 'Se connecter',
              linkProps: { href: '/connexion' },
            },
          ]}
        />
      </div>
    )
  }

  if (!joinRequest.isCurrentUserAdmin) {
    return (
      <div className="fr-mb-8v">
        <p className="fr-text--sm fr-text-default--grey">
          Vous devez être administrateur de cette base pour traiter cette
          demande.
        </p>
      </div>
    )
  }

  const isLoading = acceptMutation.isPending || declineMutation.isPending

  const onAccept = async () => {
    await acceptMutation.mutateAsync({ requestId: joinRequest.id })
    router.refresh()
  }

  const onDecline = async () => {
    await declineMutation.mutateAsync({ requestId: joinRequest.id })
    router.push(`/demandes/base/${joinRequest.id}/refuser`)
  }

  return (
    <ButtonsGroup
      buttons={[
        {
          children: 'Accepter la demande',
          onClick: onAccept,
          ...buttonLoadingClassname(isLoading),
          nativeButtonProps: {
            'data-testid': 'base-join-request-accept-button',
          },
        },
        {
          children: 'Refuser la demande',
          onClick: onDecline,
          priority: 'secondary',
          ...buttonLoadingClassname(isLoading),
          nativeButtonProps: {
            'data-testid': 'base-join-request-decline-button',
          },
        },
      ]}
    />
  )
}

export default withTrpc(BaseJoinRequestButtons)
