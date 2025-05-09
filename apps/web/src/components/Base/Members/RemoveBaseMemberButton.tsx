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
      console.error('Something went wrong...')
    }
  }

  return (
    <Button
      priority="tertiary no outline"
      iconId="fr-icon-delete-line"
      title="Retirer le membre de la base"
      data-testid="remove-member-button"
      size="small"
      onClick={onRemove}
    />
  )
}

export default withTrpc(RemoveBaseMemberButton)
