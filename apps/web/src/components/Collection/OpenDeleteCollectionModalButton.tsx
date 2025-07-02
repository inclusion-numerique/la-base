'use client'

import { DeleteCollectionDynamicModal } from '@app/web/components/Collection/DeleteCollection/DeleteCollectionModal'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import Button, { type ButtonProps } from '@codegouvfr/react-dsfr/Button'
import React, { type ReactNode } from 'react'

const OpenDeleteCollectionModalButton = ({
  collectionId,
  className,
  children,
  size = 'small',
  priority = 'tertiary no outline',
}: {
  collectionId: string
  className?: string
  children?: ReactNode
  size?: ButtonProps['size']
  priority?: ButtonProps['priority']
}) => {
  const open = DeleteCollectionDynamicModal.useOpen()

  return children === undefined ? (
    <Button
      title="Supprimer la collection"
      size={size}
      iconId="fr-icon-delete-line"
      priority={priority}
      onClick={() => open({ collectionId })}
      className={className}
    />
  ) : (
    <Button
      size={size}
      priority={priority}
      onClick={() => open({ collectionId })}
      className={className}
    >
      {children}
    </Button>
  )
}

export default withTrpc(OpenDeleteCollectionModalButton)
