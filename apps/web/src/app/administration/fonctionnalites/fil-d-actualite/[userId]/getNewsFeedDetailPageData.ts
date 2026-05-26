import { prismaClient } from '@app/web/prismaClient'

export const getNewsFeedDetailPageData = async (userId: string) => {
  const newsFeed = await prismaClient.newsFeed.findUnique({
    where: { userId },
    select: {
      userId: true,
      monthlyNewsletter: true,
      hasCompleteOnboarding: true,
      lastOpenedAt: true,
      created: true,
      updated: true,
      themes: true,
      professionalSectors: true,
      user: {
        select: {
          id: true,
          name: true,
          firstName: true,
          lastName: true,
          email: true,
          slug: true,
          created: true,
        },
      },
    },
  })

  return newsFeed
}

export type NewsFeedDetailData = NonNullable<
  Awaited<ReturnType<typeof getNewsFeedDetailPageData>>
>
