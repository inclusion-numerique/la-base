import React, { ReactNode } from 'react'
import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import { ResourceListItem } from '@app/web/server/resources/getResourcesList'
import { SessionUser } from '@app/web/auth/sessionUser'
import SaveResourceInCollectionModal from '@app/web/components/Resource/SaveResourceInCollectionModal'
import DeleteResourceModal from '@app/web/components/Resource/DeleteResource/DeleteResourceModal'
import ResourceCard from '@app/web/components/Resource/ResourceCard'
import EmptyBox from '@app/web/components/EmptyBox'
import {
  resourceAuthorization,
  ResourceRoles,
} from '@app/web/authorization/models/resourceAuthorization'
import { numberToString } from '@app/web/utils/formatNumber'
import styles from './SearchContents.module.css'

const ResourcesSearchResults = ({
  totalCount,
  resources,
  user,
  children,
}: {
  totalCount: number
  resources: ResourceListItem[]
  user: SessionUser | null
  children: ReactNode
}) => (
  <>
    <div className={styles.header}>
      <h1 className="fr-text--lg fr-mb-0">
        {numberToString(totalCount)} Ressource{sPluriel(totalCount)}
      </h1>
      {children}
    </div>
    {resources.length > 0 ? (
      resources.map((resource) => (
        <ResourceCard
          key={resource.slug}
          isContributor={
            resourceAuthorization(resource, user).hasRole(
              ResourceRoles.ResourceContributor,
            ) ||
            resourceAuthorization(resource, user).hasRole(
              ResourceRoles.ResourceCreator,
            )
          }
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
    <DeleteResourceModal />
  </>
)

export default ResourcesSearchResults
