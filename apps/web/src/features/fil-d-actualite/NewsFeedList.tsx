'use client'

import {
  ResourceRoles,
  resourceAuthorization,
} from '@app/web/authorization/models/resourceAuthorization'
import ResourceCard from '@app/web/components/Resource/ResourceCard'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { NewsFeedOwnershipInformation } from '@app/web/features/fil-d-actualite/components/NewsFeedOwnershipInformation'
import { NewsFeedPageContext } from '@app/web/features/fil-d-actualite/db/getNewsFeedPageContext'
import { useNewsFeedPagination } from '@app/web/hooks/useNewsFeedPagination'
import { NewsFeedParams } from '@app/web/server/newsFeed/newsFeedUrls'
import { trpc } from '@app/web/trpc'
import { Spinner } from '@app/web/ui/Spinner'
import Button from '@codegouvfr/react-dsfr/Button'
import { useEffect } from 'react'

const NewsFeedList = ({
  newsFeedPageContext,
  params,
}: {
  newsFeedPageContext: NewsFeedPageContext
  params: NewsFeedParams
}) => {
  const { userNewsFeed, resources, user } = newsFeedPageContext
  const utils = trpc.useUtils()

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
  } = useNewsFeedPagination(resources, filters)

  useEffect(() => {
    utils.newsFeed.newsBadgeCount.invalidate()
  }, [utils.newsFeed.newsBadgeCount])

  return (
    <>
      {paginatedResources.map((resource) => (
        <ResourceCard
          context="newsFeed"
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
          withDate={false}
        >
          <NewsFeedOwnershipInformation
            resource={resource}
            newsFeedPageContext={newsFeedPageContext}
          />
        </ResourceCard>
      ))}
      <div className="fr-text--center fr-hidden fr-unhidden-sm fr-flex fr-justify-content-center">
        <Button priority="secondary" onClick={loadMore} disabled={isFetching}>
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
      <div className="fr-text--center fr-hidden-sm">
        <Button
          priority="secondary"
          className="fr-flex fr-width-full fr-justify-content-center"
          onClick={loadMore}
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
    </>
  )
}

export default withTrpc(NewsFeedList)
