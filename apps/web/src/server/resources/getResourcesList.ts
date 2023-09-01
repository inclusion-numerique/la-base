import { SessionUser } from '@app/web/auth/sessionUser'
import { prismaClient } from '@app/web/prismaClient'

export const resourceListSelect = {
  title: true,
  slug: true,
  created: true,
  updated: true,
  description: true,
  isPublic: true,
  image: {
    select: {
      id: true,
      altText: true,
    },
  },
  createdBy: {
    select: {
      name: true,
      id: true,
    },
  },
  base: {
    select: {
      title: true,
      slug: true,
      isPublic: true,
    },
  },
} satisfies Parameters<typeof prismaClient.resource.findUnique>[0]['select']

export const getWhereResourcesList = (
  user?: Pick<SessionUser, 'id'> | null,
) => {
  const whereResourceIsPublic = {
    isPublic: true,
    base: { isPublic: true },
  }

  return {
    ...(user
      ? {
          OR: [
            whereResourceIsPublic,
            // Public or created by user
            { createdById: user.id },
          ],
        }
      : whereResourceIsPublic),
    deleted: null,
  }
}

export const getResourcesList = async ({
  take,
  user,
  skip,
}: {
  take?: number
  skip?: number
  user?: Pick<SessionUser, 'id'> | null
}) => {
  const where = getWhereResourcesList(user)

  return prismaClient.resource.findMany({
    where,
    select: resourceListSelect,
    orderBy: [
      {
        created: 'desc',
      },
    ],
    skip,
    take,
  })
}

export type ResourceListItem = Exclude<
  Awaited<ReturnType<typeof getResourcesList>>,
  null
>[number]
