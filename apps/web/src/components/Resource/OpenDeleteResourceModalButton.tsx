'use client'

import React, { ReactNode } from 'react'
import Button, { ButtonProps } from '@codegouvfr/react-dsfr/Button'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { DeleteResourceDynamicModal } from './DeleteResource/DeleteResourceModal'

const OpenDeleteResourceModalButton = ({
  resourceId,
  className,
  children,
  size = 'small',
  priority = 'tertiary no outline',
}: {
  resourceId: string
  className?: string
  children?: ReactNode
  size?: ButtonProps['size']
  priority?: ButtonProps['priority']
}) => {
  const open = DeleteResourceDynamicModal.useOpen()

  return children === undefined ? (
    <Button
      title="Supprimer la ressource"
      size={size}
      iconId="fr-icon-delete-line"
      priority={priority}
      onClick={() => open({ resourceId })}
      className={className}
    />
  ) : (
    <Button
      size={size}
      priority={priority}
      onClick={() => open({ resourceId })}
      className={className}
    >
      {children}
    </Button>
  )
}

export default withTrpc(OpenDeleteResourceModalButton)
