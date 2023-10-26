'use client'

import React from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { SessionUser } from '@app/web/auth/sessionUser'
import SaveResourceInCollectionModal from './SaveResourceInCollectionModal'

const SaveResourceInCollectionButton = ({
  id,
  className,
  user,
  resourceId,
}: {
  id?: string
  className?: string
  user: SessionUser | null
  resourceId: string
}) => {
  const {
    Component: SaveModal,
    buttonProps: saveModalButtonProps,
    open,
  } = createModal({
    id: `save-resource-in-collection-modal-${id}`,
    isOpenedByDefault: false,
  })

  return user ? (
    <>
      <SaveModal title="Ajouter à la collection">
        <SaveResourceInCollectionModal user={user} resourceId={resourceId} />
      </SaveModal>
      <Button
        priority="secondary"
        iconId="fr-icon-bookmark-line"
        className={className}
        onClick={() => open()}
        {...saveModalButtonProps}
      >
        Enregistrer
      </Button>
    </>
  ) : null
}

export default SaveResourceInCollectionButton
