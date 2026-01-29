'use client'

import CardList from '@app/ui/components/CardList'
import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import type { SessionUser } from '@app/web/auth/sessionUser'
import {
  ResourceRoles,
  resourceAuthorization,
} from '@app/web/authorization/models/resourceAuthorization'
import IconInSquare from '@app/web/components/IconInSquare'
import { CreateResourceButton } from '@app/web/components/Resource/CreateResourceModal'
import DeleteResourceModal from '@app/web/components/Resource/DeleteResource/DeleteResourceModal'
import ResourcesSortingSelect from '@app/web/components/Resource/List/ResourcesSorting'
import ResourceTab from '@app/web/components/Resource/List/ResourceTab'
import ResourceCard from '@app/web/components/Resource/ResourceCard'
import ResourcesSearch from '@app/web/components/Resource/ResourcesSearch'
import SaveResourceInCollectionModal from '@app/web/components/Resource/SaveResourceInCollectionModal'
import type { BaseResource } from '@app/web/server/bases/getBase'
import { PaginationParams } from '@app/web/server/search/searchQueryParams'
import { numberToString } from '@app/web/utils/formatNumber'
import { Tabs } from '@codegouvfr/react-dsfr/Tabs'
import { useMemo } from 'react'
import InviteContributorModal from '../Contributors/InviteContributorModal'
import styles from './Resources.module.css'

const Resources = ({
  isOwner = false,
  title,
  resources,
  user,
  canWrite,
  baseId,
  paginationParams,
  slug,
  totalCount,
}: {
  isOwner?: boolean
  title: string
  baseId: string | null
  resources: BaseResource[]
  user: SessionUser | null
  canWrite: boolean
  paginationParams: PaginationParams
  slug: string
  totalCount: number
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
    <div data-testid="resources-list">
      <div className="fr-grid-row fr-justify-content-space-between fr-direction-sm-row fr-direction-column-md-reverse fr-mb-md-5w fr-mb-3w fr-flex-gap-4v">
        <div className="fr-col-sm-auto fr-col-12">
          <div className="fr-flex fr-align-items-center fr-flex-gap-5v">
            <IconInSquare iconId="ri-file-text-line" />
            <h2 className="fr-mb-0 fr-h3 fr-text-label--blue-france">
              {title} · {totalCount}
            </h2>
          </div>
        </div>
        {canWrite && (
          <div
            data-testid="create-resource-button"
            className="fr-col-sm-auto fr-col-12 fr-mt-4w fr-mt-md-0"
          >
            <CreateResourceButton
              titleClassName="fr-text-label--blue-france"
              data-testid={
                baseId ? 'create-resource-in-base-button' : undefined
              }
              className="fr-btn--secondary fr-width-full fr-justify-content-center"
              baseId={baseId}
            />
          </div>
        )}
        {!isOwner && (
          <div className="fr-col-sm-auto fr-col-12">
            <ResourcesSearch initialSearch={paginationParams.search} />
          </div>
        )}
      </div>
      {!isOwner && (
        <div className={styles.header}>
          <h1 className="fr-text--lg fr-mb-0">
            {numberToString(totalCount)} Ressource
            {sPluriel(totalCount)}
          </h1>
          <ResourcesSortingSelect
            paginationParams={paginationParams}
            slug={slug}
            baseId={baseId}
          />
        </div>
      )}
      {canWrite ? (
        <Tabs
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
        <CardList ariaLabel="Liste des ressources">
          {resources.map((resource) => (
            <ResourceCard
              isContributor={resourceAuthorization(resource, user).hasRole(
                ResourceRoles.ResourceContributor,
              )}
              key={resource.id}
              resource={resource}
              user={user}
            />
          ))}
        </CardList>
      )}
      {!!user && <SaveResourceInCollectionModal user={user} />}
      <DeleteResourceModal />
      <InviteContributorModal />
    </div>
  )
}

export default Resources
