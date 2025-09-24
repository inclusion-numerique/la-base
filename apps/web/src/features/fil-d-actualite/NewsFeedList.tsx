import { SessionUser } from '@app/web/auth/sessionUser'
import {
  ResourceRoles,
  resourceAuthorization,
} from '@app/web/authorization/models/resourceAuthorization'
import ResourceCard from '@app/web/components/Resource/ResourceCard'
import { NewsFeedOwnershipInformation } from '@app/web/features/fil-d-actualite/components/NewsFeedOwnershipInformation'
import { NewsFeedResource } from '@app/web/features/fil-d-actualite/db/getNewsFeedPageContext'
import { NewsFeed } from '@prisma/client'

export const NewsFeedList = ({
  resources,
  user,
  userNewsFeed,
}: {
  resources: NewsFeedResource[]
  user: SessionUser
  userNewsFeed: NewsFeed
}) => {
  return (
    <>
      {resources.map((resource) => (
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
    </>
  )
}
