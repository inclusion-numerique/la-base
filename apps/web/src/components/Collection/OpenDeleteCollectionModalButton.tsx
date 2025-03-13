'use client'

import React, { ReactNode } from 'react'
import Button, { ButtonProps } from '@codegouvfr/react-dsfr/Button'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { DeleteCollectionDynamicModal } from '@app/web/components/Collection/DeleteCollection/DeleteCollectionModal'

const OpenDeleteCollectionModalButton = ({
  collectionId,
  collectionTitle,
  className,
  children,
  size = 'small',
  priority = 'tertiary no outline',
}: {
  collectionId: string
  collectionTitle: string
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
      onClick={() => open({ collectionId, collectionTitle })}
      className={className}
    />
  ) : (
    <Button
      size={size}
      priority={priority}
      onClick={() => open({ collectionId, collectionTitle })}
      className={className}
    >
      {children}
    </Button>
  )
}

export default withTrpc(OpenDeleteCollectionModalButton)
