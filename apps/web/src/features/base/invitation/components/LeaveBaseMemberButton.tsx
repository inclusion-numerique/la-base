'use client'

import { createToast } from '@app/ui/toast/createToast'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { BaseMember } from '@app/web/server/bases/getBase'
import { trpc } from '@app/web/trpc'
import Button from '@codegouvfr/react-dsfr/Button'
import { useRouter } from 'next/navigation'
import React from 'react'

const LeaveBaseMemberButton = ({
  member,
  variant = 'leave-base',
}: {
  member: BaseMember
  variant?: 'leave-base' | 'refuse-invitation'
}) => {
  const mutate = trpc.baseMember.leave.useMutation()
  const router = useRouter()

  const onLeave = async () => {
    try {
      await mutate.mutateAsync({
        baseId: member.baseId,
        memberId: member.member.id,
      })
      router.refresh()
      createToast({
        priority: 'success',
        message:
          variant === 'leave-base' ? (
            <>Vous avez quitté la base</>
          ) : (
            <>Vous avez refusé l&apos;invitation</>
          ),
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
      title={`${variant === 'leave-base' ? 'Quitter' : 'Refuser'} la base`}
      data-testid="leave-base-member-button"
      size="small"
      onClick={onLeave}
    >
      {variant === 'leave-base' ? 'Quitter' : 'Refuser'}
      <span className="ri-logout-box-r-line fr-ml-1w" aria-hidden="true" />
    </Button>
  )
}

export default withTrpc(LeaveBaseMemberButton)
