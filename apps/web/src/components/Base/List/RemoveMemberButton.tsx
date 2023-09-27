'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Button from '@codegouvfr/react-dsfr/Button'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import { BaseMember } from '@app/web/server/bases/getBase'

const RemoveMemberButton = ({ member }: { member: BaseMember }) => {
  const mutate = trpc.baseMember.remove.useMutation()
  const router = useRouter()

  const onRemove = async () => {
    try {
      await mutate.mutateAsync({
        baseId: member.baseId,
        memberId: member.member.id,
      })
      router.refresh()
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

export default withTrpc(RemoveMemberButton)
