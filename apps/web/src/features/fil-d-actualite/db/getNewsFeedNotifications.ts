import { SessionUser } from '@app/web/auth/sessionUser'
import { getNewsFeed } from '@app/web/features/fil-d-actualite/db/getNewsFeed'
import {
  getUnseenResourcesCount,
  NewsFeedFilters,
} from '@app/web/features/fil-d-actualite/db/getNewsFeedPageContext'
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

    return getUnseenResourcesCount(user.id, lastOpenedAt, filters)
  },
)

export type NewsFeedNotifications = Awaited<
  ReturnType<typeof getNewsFeedNotifications>
>
