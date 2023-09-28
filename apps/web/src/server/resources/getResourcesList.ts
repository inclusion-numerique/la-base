import type { Prisma } from '@prisma/client'
import { SessionUser } from '@app/web/auth/sessionUser'
import { prismaClient } from '@app/web/prismaClient'

export const resourceListSelect = {
  id: true,
  title: true,
  slug: true,
  created: true,
  updated: true,
  published: true,
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
  where: Prisma.ResourceWhereInput = {},
): Prisma.ResourceWhereInput => {
  const whereResourceIsPublic = {
    isPublic: true,
  }

  const authorizationWhere: Prisma.ResourceWhereInput = user
    ? {
        OR: [
          whereResourceIsPublic,
          // Public or created by user
          { createdById: user.id },
          // User is a contributor
          {
            contributors: {
              some: {
                contributorId: user.id,
              },
            },
          },
          // User is member of base
          {
            base: {
              members: {
                some: {
                  accepted: { not: null },
                  memberId: user.id,
                },
              },
            },
          },
        ],
      }
    : whereResourceIsPublic

  const baseNotDeleted: Prisma.ResourceWhereInput = {
    OR: [
      {
        base: {
          deleted: null,
        },
      },
      { baseId: null },
    ],
  }

  return {
    deleted: null,
    AND: [authorizationWhere, baseNotDeleted, where],
  }
}

const getWhereResourcesQuery = (
  query?: string,
): Prisma.ResourceWhereInput | undefined => {
  if (!query) {
    return undefined
  }

  return {
    OR: [
      { title: { contains: query, mode: 'insensitive' } },
      { description: { contains: query, mode: 'insensitive' } },
    ],
  }
}

export const getResourcesList = async ({
  take,
  user,
  skip,
  query,
}: {
  take?: number
  skip?: number
  user?: Pick<SessionUser, 'id'> | null
  query?: string
}) => {
  const where = getWhereResourcesList(user, getWhereResourcesQuery(query))

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

export const getResourcesCount = ({
  user,
  query,
}: {
  user?: Pick<SessionUser, 'id'> | null
  query?: string
}) =>
  prismaClient.resource.count({
    where: getWhereResourcesList(user, getWhereResourcesQuery(query)),
  })

export const getProfileResources = async (
  profileId: string,
  user: Pick<SessionUser, 'id'> | null,
) => {
  const where = getWhereResourcesList(user, { createdById: profileId })

  return prismaClient.resource.findMany({
    where,
    select: resourceListSelect,
    orderBy: [
      {
        created: 'desc',
      },
    ],
  })
}

export const getProfileResourcesCount = async (
  profileId: string,
  user: Pick<SessionUser, 'id'> | null,
) => {
  const where = getWhereResourcesList(user, { createdById: profileId })

  return prismaClient.resource.count({
    where,
  })
}

export type ResourceListItem = Exclude<
  Awaited<ReturnType<typeof getResourcesList>>,
  null
>[number]
