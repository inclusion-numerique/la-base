import { SessionUser } from '@app/web/auth/sessionUser'
import { getNewsFeed } from '@app/web/features/fil-d-actualite/db/getNewsFeed'
import { getUnseenResourcesCount } from '@app/web/features/fil-d-actualite/db/getNewsFeedPageContext'
import { cache } from 'react'

export const getNewsFeedNotifications = cache(
  async (user?: SessionUser | null) => {
    if (!user) {
      return null
    }
    const userNewsFeed = await getNewsFeed(user)

    const lastOpenedAt = userNewsFeed?.lastOpenedAt
    if (!lastOpenedAt) {
      return null
    }

    const count = await getUnseenResourcesCount(user.id, lastOpenedAt)
    return count
  },
)
