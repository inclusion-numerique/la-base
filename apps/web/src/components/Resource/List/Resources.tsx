import React, { useMemo } from 'react'
import { Tabs } from '@codegouvfr/react-dsfr/Tabs'
import { SessionUser } from '@app/web/auth/sessionUser'
import { BaseResource } from '@app/web/server/bases/getBase'
import { CreateResourceButton } from '@app/web/components/Resource/CreateResourceModal'
import DeleteResource from '@app/web/components/Resource/DeleteResource/DeleteResource'
import SaveResourceInCollectionModal from '@app/web/components/Resource/SaveResourceInCollectionModal'
import ResourceTab from '@app/web/components/Resource/List/ResourceTab'
import ResourceCard from '@app/web/components/Resource/ResourceCard'
import {
  resourceAuthorization,
  ResourceRoles,
} from '@app/web/authorization/models/resourceAuthorization'

const Resources = ({
  resources,
  user,
  canWrite,
  baseId,
}: {
  baseId: string | null
  resources: BaseResource[]
  user: SessionUser | null
  canWrite: boolean
}) => {
  const drafts = useMemo(
    () => resources.filter((resource) => resource.isPublic === null),
    [resources],
  )
  const publics = useMemo(
    () => resources.filter((resource) => resource.isPublic === true),
    [resources],
  )
  const privates = useMemo(
    () => resources.filter((resource) => resource.isPublic === false),
    [resources],
  )

  return (
    <div data-testid="base-resources">
      <div className="fr-grid-row fr-justify-content-space-between fr-direction-sm-row fr-direction-column-reverse fr-mb-4w">
        <div className="fr-col-sm-auto fr-col-12">
          <h2 className="fr-mb-0 fr-h3">Ressources · {resources.length}</h2>
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
          tabs={[
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
      {!!user && <DeleteResource />}
    </div>
  )
}

export default Resources
