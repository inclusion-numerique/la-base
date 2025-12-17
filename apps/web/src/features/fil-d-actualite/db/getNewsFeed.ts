import type { SessionUser } from '@app/web/auth/sessionUser'
import { prismaClient } from '@app/web/prismaClient'

export const getNewsFeed = async (user: SessionUser | null) => {
  if (!user) {
    return null
  }

  return prismaClient.newsFeed.findUnique({
    where: { userId: user.id },
  })
}

export type UserNewsFeed = Awaited<ReturnType<typeof getNewsFeed>>
