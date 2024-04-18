'use client'

import React from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { DeleteResourceDynamicModal } from '@app/web/components/Resource/DeleteResource/DeleteResource'

const DeleteResourceButton = ({
  resourceId,
  variant = 'icon-only',
  className,
}: {
  resourceId: string
  variant?: 'icon-only' | 'tertiary'
  className?: string
}) => {
  const open = DeleteResourceDynamicModal.useOpen()

  return variant === 'icon-only' ? (
    <Button
      title="Supprimer la ressource"
      iconId="fr-icon-delete-line"
      priority="tertiary no outline"
      onClick={() => open({ resourceId })}
      className={className}
    />
  ) : (
    <Button
      iconId="fr-icon-delete-line"
      priority="tertiary"
      onClick={() => open({ resourceId })}
      className={className}
    >
      Supprimer
    </Button>
  )
}

export default withTrpc(DeleteResourceButton)
