'use client'

import { createToast } from '@app/ui/toast/createToast'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import type { BaseMember } from '@app/web/server/bases/getBase'
import { trpc } from '@app/web/trpc'
import Button from '@codegouvfr/react-dsfr/Button'
import { useRouter } from 'next/navigation'
import React from 'react'

const RemoveBaseMemberButton = ({ member }: { member: BaseMember }) => {
  const mutate = trpc.baseMember.remove.useMutation()
  const router = useRouter()

  const onRemove = async () => {
    try {
      await mutate.mutateAsync({
        baseId: member.baseId,
        memberId: member.member.id,
      })
      router.refresh()
      createToast({
        priority: 'success',
        message: <>Le membre a bien été retiré</>,
      })
    } catch {
      createToast({
        priority: 'error',
        message:
          'Une erreur est survenue lorsque vous avez retiré le membre de la base, merci de réessayer ultérieurement',
      })
    }
  }

  return (
    <Button
      priority="tertiary no outline"
      title="Retirer le membre de la base"
      data-testid="remove-member-button"
      size="small"
      onClick={onRemove}
    >
      Retirer
      <span className="ri-close-circle-line fr-ml-1w" aria-hidden="true" />
    </Button>
  )
}

export default withTrpc(RemoveBaseMemberButton)
