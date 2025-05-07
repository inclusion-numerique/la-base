'use client'

import { createToast } from '@app/ui/toast/createToast'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import ButtonsGroup from '@codegouvfr/react-dsfr/ButtonsGroup'
import { useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import { trpc } from '@app/web/trpc'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { BaseInvitation } from '@app/web/features/base/invitation/db/getBaseInvitation'

const BaseInvitationButtons = ({
  invitation,
}: {
  invitation: BaseInvitation
}): ReactNode => {
  const router = useRouter()

  const acceptMutation = trpc.baseMember.acceptInvitation.useMutation()
  const declineMutation = trpc.baseMember.declineInvitation.useMutation()

  if (invitation == null) {
    router.push('/')
    return
  }
  const isLoading = acceptMutation.isPending || declineMutation.isPending

  const onAccept = async () => {
    await acceptMutation.mutateAsync(invitation)

    createToast({
      priority: 'success',
      message: 'Vous avez accepté l’invitation',
    })

    router.push(`/bases/${invitation.base.slug}`)
  }

  const onDecline = async () => {
    await declineMutation.mutateAsync(invitation)
    router.push(`/invitations/base/${invitation.acceptationToken}/refuser`)
  }

  return (
    <ButtonsGroup
      buttons={[
        {
          children: 'Accepter l’invitation',
          onClick: onAccept,
          ...buttonLoadingClassname(isLoading),
        },
        {
          children: 'Refuser l’invitation',
          onClick: onDecline,
          priority: 'secondary',
          ...buttonLoadingClassname(isLoading),
        },
      ]}
    />
  )
}

export default withTrpc(BaseInvitationButtons)
