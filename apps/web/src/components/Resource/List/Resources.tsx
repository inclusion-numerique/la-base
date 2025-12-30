'use client'

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
import SaveResourceInCollectionModal from '@app/web/components/Resource/SaveResourceInCollectionModal'
import type { BaseResource } from '@app/web/server/bases/getBase'
import { PaginationParams } from '@app/web/server/search/searchQueryParams'
import { numberToString } from '@app/web/utils/formatNumber'
import Button from '@codegouvfr/react-dsfr/Button'
import Input from '@codegouvfr/react-dsfr/Input'
import { Tabs } from '@codegouvfr/react-dsfr/Tabs'
import classNames from 'classnames'
import { useMemo, useState } from 'react'
import { useDebounceValue } from 'usehooks-ts'
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
}: {
  isOwner?: boolean
  title: string
  baseId: string | null
  resources: BaseResource[]
  user: SessionUser | null
  canWrite: boolean
  paginationParams: PaginationParams
  slug: string
}) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [debouncedSearchTerm] = useDebounceValue(searchTerm, 500)
  const filteredResources = useMemo(() => {
    if (!debouncedSearchTerm.trim()) {
      return resources
    }
    const lowercaseSearch = debouncedSearchTerm.toLowerCase()
    return resources.filter((resource) => {
      const titleMatch = resource.title.toLowerCase().includes(lowercaseSearch)
      const descriptionMatch =
        resource.excerpt?.toLowerCase().includes(lowercaseSearch) ?? false
      return titleMatch || descriptionMatch
    })
  }, [resources, debouncedSearchTerm])

  const drafts = useMemo(
    () => filteredResources.filter((resource) => resource.published === null),
    [filteredResources],
  )
  const publics = useMemo(
    () =>
      filteredResources.filter(
        (resource) => resource.isPublic === true && resource.published !== null,
      ),
    [filteredResources],
  )
  const privates = useMemo(
    () =>
      filteredResources.filter(
        (resource) =>
          resource.isPublic === false && resource.published !== null,
      ),
    [filteredResources],
  )

  return (
    <div data-testid="resources-list">
      <div className="fr-grid-row fr-justify-content-space-between fr-direction-sm-row fr-direction-column-md-reverse fr-mb-md-5w fr-mb-3w fr-flex-gap-4v">
        <div className="fr-col-sm-auto fr-col-12">
          <div className="fr-flex fr-align-items-center fr-flex-gap-5v">
            <IconInSquare iconId="ri-file-text-line" />
            <h2 className="fr-mb-0 fr-h3 fr-text-label--blue-france">
              {title} {canWrite && <>· {filteredResources.length}</>}
            </h2>
          </div>
        </div>
        <div className="fr-flex fr-direction-column fr-flex-gap-2v">
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
              <Input
                nativeInputProps={{
                  placeholder: 'Rechercher une ressource',
                  value: searchTerm,
                  onChange: (e) => setSearchTerm(e.target.value),
                }}
                classes={{ wrap: classNames(styles.searchBar, 'fr-mt-0') }}
                addon={
                  <Button
                    iconId="ri-search-line"
                    className="ri-xl"
                    priority="primary"
                    title="Rechercher une ressource"
                  />
                }
                label="Rechercher une ressource"
                hideLabel
              />
            </div>
          )}
        </div>
      </div>
      {!isOwner && (
        <div className={styles.header}>
          <h1 className="fr-text--lg fr-mb-0">
            {numberToString(filteredResources.length)} Ressource
            {sPluriel(filteredResources.length)}
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
        filteredResources.map((resource) => (
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
      <DeleteResourceModal />
      <InviteContributorModal />
    </div>
  )
}

export default Resources
