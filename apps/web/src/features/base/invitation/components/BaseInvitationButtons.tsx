'use client'

import { createToast } from '@app/ui/toast/createToast'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import { SessionUser } from '@app/web/auth/sessionUser'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { BaseInvitation } from '@app/web/features/base/invitation/db/getBaseInvitation'
import { trpc } from '@app/web/trpc'
import ButtonsGroup from '@codegouvfr/react-dsfr/ButtonsGroup'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'

const BaseInvitationButtons = ({
  invitation,
  user,
}: {
  invitation: BaseInvitation
  user: SessionUser | null
}): ReactNode => {
  const router = useRouter()

  const acceptMutation = trpc.baseMember.acceptInvitation.useMutation()
  const declineMutation = trpc.baseMember.declineInvitation.useMutation()

  if (invitation == null) {
    router.push('/')
    return
  }

  const acceptCtaTitle = invitation.member.signedUpAt
    ? "Accepter l'invitation"
    : "Accepter l'invitation et créer mon compte"
  const isLoading = acceptMutation.isPending || declineMutation.isPending
  const onAccept = async () => {
    await acceptMutation.mutateAsync(invitation)

    createToast({
      priority: 'success',
      message: 'Vous avez accepté l’invitation',
    })
    const signedUpUserRedirectUrl = !user
      ? `/connexion?suivant=/bases/${invitation.base.slug}&email=${invitation.member.email}`
      : `/bases/${invitation.base.slug}`

    const redirectUrl = invitation.member.signedUpAt
      ? signedUpUserRedirectUrl
      : `/creer-un-compte?suivant=/bases/${invitation.base.slug}&email=${invitation.member.email}`

    router.push(redirectUrl)
  }

  const onDecline = async () => {
    await declineMutation.mutateAsync(invitation)
    router.push(`/invitations/base/${invitation.acceptationToken}/refuser`)
  }

  return (
    <ButtonsGroup
      buttons={[
        {
          children: acceptCtaTitle,
          onClick: onAccept,
          ...buttonLoadingClassname(isLoading),
          nativeButtonProps: { 'data-testid': 'base-invitation-accept-button' },
        },
        {
          children: 'Refuser l’invitation',
          onClick: onDecline,
          priority: 'secondary',
          ...buttonLoadingClassname(isLoading),
          nativeButtonProps: {
            'data-testid': 'base-invitation-decline-button',
          },
        },
      ]}
    />
  )
}

export default withTrpc(BaseInvitationButtons)
