'use client'

import { createToast } from '@app/ui/toast/createToast'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { BaseMember } from '@app/web/server/bases/getBase'
import { trpc } from '@app/web/trpc'
import Button from '@codegouvfr/react-dsfr/Button'
import { useRouter } from 'next/navigation'
import React from 'react'

const DeclineBaseInviteMemberButton = ({ member }: { member: BaseMember }) => {
  const mutate = trpc.baseMember.leave.useMutation()
  const router = useRouter()

  const onDecline = async () => {
    try {
      await mutate.mutateAsync({
        baseId: member.baseId,
        memberId: member.member.id,
      })
      router.refresh()
      createToast({
        priority: 'success',
        message: <>Vous avez refusé l&apos;invitation</>,
      })
    } catch {
      createToast({
        priority: 'error',
        message: 'Une erreur est survenue, merci de réessayer ultérieurement',
      })
    }
  }

  return (
    <Button
      priority="tertiary no outline"
      title="Refuser l'invitation à la base"
      data-testid="decline-base-invitation-member-button"
      size="small"
      onClick={onDecline}
    >
      Refuser
      <span className="ri-logout-box-r-line fr-ml-1w" aria-hidden="true" />
    </Button>
  )
}

export default withTrpc(DeclineBaseInviteMemberButton)
