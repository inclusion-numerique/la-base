'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Button from '@codegouvfr/react-dsfr/Button'
import { createToast } from '@app/ui/toast/createToast'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import { BaseMember } from '@app/web/server/bases/getBase'

const LeaveBaseMemberButton = ({
  member,
  title = 'Quitter',
}: {
  member: BaseMember
  title?: string
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
          title === 'Quitter' ? (
            <>Vous avez quitté la base</>
          ) : (
            <>Vous avez refusé l&apos;invitation</>
          ),
      })
    } catch (error) {
      console.error('User could not leave the base', error)
      createToast({
        priority: 'error',
        message:
          'Une erreur est survenue lorsque vous avez quitté la base, merci de réessayer ultérieurement',
      })
    }
  }

  return (
    <Button
      priority="tertiary no outline"
      title={`${title} la base`}
      data-testid="leave-base-member-button"
      size="small"
      onClick={onLeave}
    >
      {title}
      <span className="ri-logout-box-r-line fr-ml-1w" aria-hidden="true" />
    </Button>
  )
}

export default withTrpc(LeaveBaseMemberButton)
