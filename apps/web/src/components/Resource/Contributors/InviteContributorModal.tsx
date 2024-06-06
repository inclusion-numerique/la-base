'use client'

import React from 'react'
import { createDynamicModal } from '@app/ui/components/Modal/createDynamicModal'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { ResourceListItem } from '@app/web/server/resources/getResourcesList'
import InviteResourceContributors from './InviteResourceContributors'

export const InviteContributorDynamicModal = createDynamicModal({
  id: 'invite-contributor-resource-modal',
  isOpenedByDefault: false,
  initialState: {
    resource: null as ResourceListItem | null,
  },
})

const InviteContributorModal = () => {
  const { resource } = InviteContributorDynamicModal.useState()

  return (
    <InviteContributorDynamicModal.Component
      title="Inviter des contributeurs"
      className="fr-modal--overflow-visible"
    >
      <p className="fr-mb-4w">
        Les contributeurs peuvent voir, éditer, inviter d’autres contributeurs
        et supprimer la ressource.
      </p>
      {resource && (
        <InviteResourceContributors
          resource={resource}
          onSuccess={() => InviteContributorDynamicModal.close()}
        />
      )}
    </InviteContributorDynamicModal.Component>
  )
}

export default withTrpc(InviteContributorModal)
