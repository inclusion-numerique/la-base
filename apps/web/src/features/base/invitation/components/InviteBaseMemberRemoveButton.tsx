'use client'

import { createToast } from '@app/ui/toast/createToast'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import type { BaseMember } from '@app/web/server/bases/getBase'
import { trpc } from '@app/web/trpc'
import Button from '@codegouvfr/react-dsfr/Button'
import { useRouter } from 'next/navigation'
import React from 'react'

const InviteBaseMemberRemoveButton = ({
  onDelete,
}: {
  onDelete: () => void
}) => {
  return (
    <Button
      priority="tertiary no outline"
      title="Retirer l'invitation du membre à la base"
      data-testid="remove-member-button"
      size="small"
      type="button"
      onClick={onDelete}
    >
      Retirer
      <span className="ri-close-circle-line fr-ml-1w" aria-hidden="true" />
    </Button>
  )
}

export default InviteBaseMemberRemoveButton
