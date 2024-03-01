import React from 'react'
import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import { ResourceListItem } from '@app/web/server/resources/getResourcesList'
import { SessionUser } from '@app/web/auth/sessionUser'
import {
  PaginationParams,
  SearchParams,
} from '@app/web/server/search/searchQueryParams'
import SaveResourceInCollectionModal from '@app/web/components/Resource/SaveResourceInCollectionModal'
import DeleteResource from '@app/web/components/Resource/DeleteResource/DeleteResource'
import ResourceCard from '@app/web/components/Resource/ResourceCard'
import EmptyBox from '@app/web/components/EmptyBox'
import ResultSortingSelect from '@app/web/components/Search/ResultSortingSelect'
import {
  resourceAuthorization,
  ResourceRoles,
} from '@app/web/authorization/models/resourceAuthorization'
import styles from './SearchContents.module.css'

const ResourcesSearchResults = ({
  totalCount,
  resources,
  user,
  searchParams,
  paginationParams,
}: {
  totalCount: number
  resources: ResourceListItem[]
  user: SessionUser | null
  searchParams: SearchParams
  paginationParams: PaginationParams
}) => (
  <>
    <div className={styles.header}>
      <p className="fr-text--lg fr-mb-0">
        <b>
          {totalCount} Ressource{sPluriel(totalCount)}
        </b>
      </p>
      <ResultSortingSelect
        paginationParams={paginationParams}
        searchParams={searchParams}
        tab="ressources"
      />
    </div>
    {resources.length > 0 ? (
      resources.map((resource) => (
        <ResourceCard
          key={resource.slug}
          isContributor={resourceAuthorization(resource, user).hasRole(
            ResourceRoles.ResourceContributor,
          )}
          resource={resource}
          user={user}
        />
      ))
    ) : (
      <EmptyBox
        className="fr-mt-6v"
        title="Aucun résultat pour votre recherche"
      >
        Veuillez réessayer avec différents mots-clés.
      </EmptyBox>
    )}
    {!!user && <SaveResourceInCollectionModal user={user} />}
    {!!user && <DeleteResource />}
  </>
)

export default ResourcesSearchResults
