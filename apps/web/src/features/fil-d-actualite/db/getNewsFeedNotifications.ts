import { SessionUser } from '@app/web/auth/sessionUser'
import { getNewsFeed } from '@app/web/features/fil-d-actualite/db/getNewsFeed'
import {
  getFollowedUnseenResourcesCount,
  getUnseenResourcesCount,
  NewsFeedFilters,
} from '@app/web/server/newsFeed/getNewsFeedResources'
import { cache } from 'react'

export const getNewsFeedNotifications = cache(
  async (user?: SessionUser | null, filters?: NewsFeedFilters) => {
    if (!user) {
      return null
    }
    const userNewsFeed = await getNewsFeed(user)

    const lastOpenedAt = userNewsFeed?.lastOpenedAt
    if (!lastOpenedAt) {
      return null
    }

    const baseSlug = filters?.baseSlug
    const profileSlug = filters?.profileSlug

    if (baseSlug === 'tout' && profileSlug === 'tout') {
      return getFollowedUnseenResourcesCount(user.id, lastOpenedAt)
    }

    return getUnseenResourcesCount(user.id, lastOpenedAt, filters)
  },
)

export type NewsFeedNotifications = Awaited<
  ReturnType<typeof getNewsFeedNotifications>
>
