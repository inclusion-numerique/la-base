'use client'

import { SessionUser } from '@app/web/auth/sessionUser'
import {
  ResourceRoles,
  resourceAuthorization,
} from '@app/web/authorization/models/resourceAuthorization'
import ResourceCard from '@app/web/components/Resource/ResourceCard'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { NewsFeedOwnershipInformation } from '@app/web/features/fil-d-actualite/components/NewsFeedOwnershipInformation'
import { NewsFeedResource } from '@app/web/features/fil-d-actualite/db/getNewsFeedPageContext'
import { useNewsFeedPagination } from '@app/web/hooks/useNewsFeedPagination'
import { Spinner } from '@app/web/ui/Spinner'
import Button from '@codegouvfr/react-dsfr/Button'
import { NewsFeed } from '@prisma/client'

const NewsFeedList = ({
  resources,
  user,
  userNewsFeed,
  filters = { themes: [], professionalSectors: [] },
}: {
  resources: NewsFeedResource[]
  user: SessionUser
  userNewsFeed: NewsFeed
  filters?: {
    themes: string[]
    professionalSectors: string[]
    profileSlug?: string
    baseSlug?: string
  }
}) => {
  const {
    resources: paginatedResources,
    loadMore,
    isFetching,
  } = useNewsFeedPagination(resources, filters)

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
        >
          <NewsFeedOwnershipInformation
            resource={resource}
            userNewsFeed={userNewsFeed}
          />
        </ResourceCard>
      ))}
      <div className="fr-text--center">
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
    </>
  )
}

export default withTrpc(NewsFeedList)
