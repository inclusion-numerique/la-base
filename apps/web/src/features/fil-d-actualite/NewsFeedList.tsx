'use client'

import {
  ResourceRoles,
  resourceAuthorization,
} from '@app/web/authorization/models/resourceAuthorization'
import ResourceCard from '@app/web/components/Resource/ResourceCard'
import SaveResourceInCollectionModal from '@app/web/components/Resource/SaveResourceInCollectionModal'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { NewsFeedOwnershipInformation } from '@app/web/features/fil-d-actualite/components/NewsFeedOwnershipInformation'
import { NewsFeedPageContext } from '@app/web/features/fil-d-actualite/db/getNewsFeedPageContext'
import { useNewsFeedPagination } from '@app/web/hooks/useNewsFeedPagination'
import { NewsFeedParams } from '@app/web/server/newsFeed/newsFeedUrls'
import { Spinner } from '@app/web/ui/Spinner'
import Button from '@codegouvfr/react-dsfr/Button'
import { useCallback, useEffect, useRef } from 'react'

const NewsFeedList = ({
  newsFeedPageContext,
  params,
  baseUrl,
}: {
  newsFeedPageContext: NewsFeedPageContext
  params: NewsFeedParams
  baseUrl: string
}) => {
  const { userNewsFeed, resources, user } = newsFeedPageContext

  const filters = {
    themes: params.thematique ? [params.thematique] : [],
    professionalSectors: params.secteur ? [params.secteur] : [],
    profileSlug: params.profil,
    baseSlug: params.base,
    lastOpenedAt: userNewsFeed.lastOpenedAt,
  }
  const {
    resources: paginatedResources,
    loadMore,
    isFetching,
    hasMore,
  } = useNewsFeedPagination(resources, filters)
  const listRef = useRef<HTMLUListElement>(null)
  const previousCountRef = useRef(paginatedResources.length)

  const handleLoadMore = useCallback(() => {
    previousCountRef.current = paginatedResources.length
    loadMore()
  }, [loadMore, paginatedResources.length])

  useEffect(() => {
    if (paginatedResources.length > previousCountRef.current) {
      const items = listRef.current?.children
      if (items && items[previousCountRef.current]) {
        const firstNewItem = items[previousCountRef.current] as HTMLElement
        firstNewItem.setAttribute('tabindex', '-1')
        firstNewItem.focus()
      }
      previousCountRef.current = paginatedResources.length
    }
  }, [paginatedResources.length])
  const hasFilter =
    (!!params.thematique && params.thematique !== 'tout') ||
    (!!params.secteur && params.secteur !== 'tout')
  return (
    <>
      <ul ref={listRef} className="fr-raw-list">
        {paginatedResources.map((resource) => (
          <li key={resource.slug}>
            <ResourceCard
              context="newsFeed"
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
              withDate={false}
              copyLinkUrl={`${baseUrl}/ressources/${resource.slug}`}
            >
              <NewsFeedOwnershipInformation
                resource={resource}
                newsFeedPageContext={newsFeedPageContext}
                hasFilter={hasFilter}
              />
            </ResourceCard>
          </li>
        ))}
      </ul>
      {hasMore && (
        <div className="fr-text--center fr-hidden fr-unhidden-sm fr-flex fr-justify-content-center">
          <Button
            priority="secondary"
            onClick={handleLoadMore}
            disabled={isFetching}
          >
            {isFetching ? (
              <>
                <Spinner size="small" className="fr-mr-2v" />
                Chargement...
              </>
            ) : (
              'Voir plus de ressources'
            )}
          </Button>
        </div>
      )}
      {hasMore && (
        <div className="fr-text--center fr-hidden-sm">
          <Button
            priority="secondary"
            className="fr-flex fr-width-full fr-justify-content-center"
            onClick={handleLoadMore}
            disabled={isFetching}
          >
            {isFetching ? (
              <>
                <Spinner size="small" className="fr-mr-2v" />
                Chargement...
              </>
            ) : (
              'Voir plus de ressources'
            )}
          </Button>
        </div>
      )}
      <SaveResourceInCollectionModal user={user} />
    </>
  )
}

export default withTrpc(NewsFeedList)
