import { Prisma } from '@prisma/client'
import { SessionUser } from '@app/web/auth/sessionUser'
import { prismaClient } from '@app/web/prismaClient'

export const profileListSelect = (user: { id: string } | null) =>
  ({
    id: true,
    name: true,
    firstName: true,
    lastName: true,
    slug: true,
    image: {
      select: {
        id: true,
        altText: true,
      },
    },
    followedBy: {
      where: {
        followerId: user?.id,
      },
      select: {
        id: true,
      },
    },
    // This is not ideal, but to avoid subqueries or manual sql, we use events to
    // count resources contributed by the user
    // Then a function is used to compute the count in memory
    // See countProfileResources()
    resourceEvent: {
      distinct: ['resourceId'],
      select: {
        resourceId: true,
      },
      where: {
        resource: {
          deleted: null,
        },
      },
    },
    createdResources: {
      select: {
        id: true,
      },
      where: {
        deleted: null,
        isPublic: true,
        published: {
          not: null,
        },
      },
    },
    resources: {
      select: {
        resourceId: true,
      },
      where: {
        resource: {
          deleted: null,
          isPublic: true,
          published: {
            not: null,
          },
        },
      },
    },
    _count: {
      select: {
        followedBy: true,
      },
    },
  }) satisfies Prisma.UserSelect

export const getWhereProfilesList = (
  user?: Pick<SessionUser, 'id'> | null,
  where: Prisma.UserWhereInput = {},
): Prisma.UserWhereInput => {
  const whereProfileIsPublic = {
    isPublic: true,
  }

  return {
    AND: [
      user
        ? {
            OR: [whereProfileIsPublic, { id: user.id }],
          }
        : whereProfileIsPublic,
      where,
    ],
  }
}

const getWhereProfilesQuery = (
  query?: string,
): Prisma.UserWhereInput | undefined => {
  if (!query) {
    return undefined
  }

  return {
    OR: [
      { name: { contains: query, mode: 'insensitive' } },
      { email: { contains: query, mode: 'insensitive' } },
    ],
  }
}

export const getProfiles = async ({
  user,
  query,
  take,
  skip,
}: {
  user?: Pick<SessionUser, 'id'> | null
  query?: string
  take?: number
  skip?: number
}) => {
  const where = getWhereProfilesList(user, getWhereProfilesQuery(query))
  return prismaClient.user.findMany({
    select: profileListSelect(user ?? null),
    where,
    take,
    skip,
  })
}

export const getProfilesCount = ({
  user,
  query,
}: {
  user?: Pick<SessionUser, 'id'> | null
  query?: string
}) =>
  prismaClient.user.count({
    where: getWhereProfilesList(user, getWhereProfilesQuery(query)),
  })

export type ProfileListItem = Exclude<
  Awaited<ReturnType<typeof getProfiles>>,
  null
>[number]
