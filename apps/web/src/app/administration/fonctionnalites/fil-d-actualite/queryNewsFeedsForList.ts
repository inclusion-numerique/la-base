import { prismaClient } from '@app/web/prismaClient'
import type { Prisma } from '@prisma/client'

export const newsFeedForListSelect = {
  userId: true,
  monthlyNewsletter: true,
  hasCompleteOnboarding: true,
  lastOpenedAt: true,
  created: true,
  themes: true,
  professionalSectors: true,
  user: {
    select: {
      id: true,
      name: true,
      firstName: true,
      lastName: true,
      email: true,
    },
  },
} satisfies Prisma.NewsFeedSelect

export const queryNewsFeedsForList = async ({
  skip,
  take,
  where,
  orderBy,
}: {
  where: Prisma.NewsFeedWhereInput
  take?: number
  skip?: number
  orderBy?: Prisma.NewsFeedOrderByWithRelationInput[]
}) =>
  prismaClient.newsFeed.findMany({
    where,
    take,
    skip,
    select: newsFeedForListSelect,
    orderBy: [
      ...(orderBy ?? []),
      {
        created: 'desc',
      },
    ],
  })

export type NewsFeedForList = Awaited<
  ReturnType<typeof queryNewsFeedsForList>
>[number]
