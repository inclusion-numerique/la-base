import type { SessionUser } from '@app/web/auth/sessionUser'
import {
  ResourceRoles,
  resourceAuthorization,
} from '@app/web/authorization/models/resourceAuthorization'
import IconInSquare from '@app/web/components/IconInSquare'
import { CreateResourceButton } from '@app/web/components/Resource/CreateResourceModal'
import DeleteResourceModal from '@app/web/components/Resource/DeleteResource/DeleteResourceModal'
import ResourceTab from '@app/web/components/Resource/List/ResourceTab'
import ResourceCard from '@app/web/components/Resource/ResourceCard'
import SaveResourceInCollectionModal from '@app/web/components/Resource/SaveResourceInCollectionModal'
import type { BaseResource } from '@app/web/server/bases/getBase'
import { Tabs } from '@codegouvfr/react-dsfr/Tabs'
import React, { useMemo } from 'react'
import SaveCollectionModal from '../../Collection/SaveCollectionModal'
import InviteContributorModal from '../Contributors/InviteContributorModal'

const Resources = ({
  title,
  resources,
  user,
  canWrite,
  baseId,
}: {
  title: string
  baseId: string | null
  resources: BaseResource[]
  user: SessionUser | null
  canWrite: boolean
}) => {
  const drafts = useMemo(
    () => resources.filter((resource) => resource.published === null),
    [resources],
  )
  const publics = useMemo(
    () =>
      resources.filter(
        (resource) => resource.isPublic === true && resource.published !== null,
      ),
    [resources],
  )
  const privates = useMemo(
    () =>
      resources.filter(
        (resource) =>
          resource.isPublic === false && resource.published !== null,
      ),
    [resources],
  )

  return (
    <div data-testid="resources">
      <div className="fr-grid-row fr-justify-content-space-between fr-direction-sm-row fr-direction-column-reverse fr-mb-4w">
        <div className="fr-col-sm-auto fr-col-12">
          <div className="fr-flex fr-align-items-center fr-flex-gap-5v">
            <IconInSquare iconId="ri-file-text-line" />
            <h2 className="fr-mb-0 fr-h3 fr-text-label--blue-france">
              {title} · {resources.length}
            </h2>
          </div>
        </div>
        {canWrite && (
          <div
            data-testid="create-resource-button"
            className="fr-col-sm-auto fr-col-12 fr-mb-5w fr-mb-md-2w"
          >
            <CreateResourceButton
              data-testid={
                baseId ? 'create-resource-in-base-button' : undefined
              }
              className="fr-btn--secondary fr-width-full fr-justify-content-center"
              baseId={baseId}
            />
          </div>
        )}
      </div>
      {canWrite ? (
        <Tabs
          className="fr-overflow-hidden"
          tabs={[
            {
              label: `Publiques · ${publics.length}`,
              iconId: 'fr-icon-earth-line',
              content: (
                <ResourceTab
                  resources={publics}
                  user={user}
                  emptyText="Vous n'avez pas de ressources publiques."
                  data-testid="resources-public-tab"
                />
              ),
            },
            {
              label: `Privées · ${privates.length}`,
              iconId: 'fr-icon-lock-line',
              content: (
                <ResourceTab
                  resources={privates}
                  user={user}
                  emptyText="Vous n'avez pas de ressources privées."
                  data-testid="resources-private-tab"
                />
              ),
            },
            {
              label: `Brouillons · ${drafts.length}`,
              iconId: 'fr-icon-draft-line',
              content: (
                <ResourceTab
                  resources={drafts}
                  user={user}
                  emptyText="Vous n'avez pas de brouillons."
                  data-testid="resources-draft-tab"
                  isDraft
                />
              ),
            },
          ]}
        />
      ) : (
        resources.map((resource) => (
          <ResourceCard
            isContributor={resourceAuthorization(resource, user).hasRole(
              ResourceRoles.ResourceContributor,
            )}
            key={resource.id}
            resource={resource}
            user={user}
          />
        ))
      )}
      {!!user && <SaveResourceInCollectionModal user={user} />}
      {!!user && <SaveCollectionModal user={user} />}
      <DeleteResourceModal />
      <InviteContributorModal />
    </div>
  )
}

export default Resources
