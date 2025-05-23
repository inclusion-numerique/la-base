import type { SessionUser } from '@app/web/auth/sessionUser'
import { prismaClient } from '@app/web/prismaClient'
import { isDefinedAndNotNull } from '@app/web/utils/isDefinedAndNotNull'
import type { Prisma } from '@prisma/client'

const getWhereBasesList = (
  user?: Pick<SessionUser, 'id'> | null,
  where: Prisma.BaseWhereInput = {},
): Prisma.BaseWhereInput => {
  const whereBaseIsPublic = {
    isPublic: true,
  }

  return {
    deleted: null,
    AND: [
      user
        ? {
            OR: [
              // Public
              whereBaseIsPublic,
              // Created by user
              { createdById: user.id },
              // user is member,
              {
                members: {
                  some: { memberId: user.id, accepted: { not: null } },
                },
              },
            ],
          }
        : whereBaseIsPublic,
      where,
    ],
  }
}

const getWhereBasesProfileList = (
  profileId: string,
  user?: Pick<SessionUser, 'id'> | null,
) =>
  getWhereBasesList(user, {
    OR: [{ members: { some: { memberId: profileId } } }],
  })

const getWhereBasesQuery = (
  query?: string,
): Prisma.BaseWhereInput | undefined => {
  if (!query) {
    return undefined
  }

  return { title: { contains: query, mode: 'insensitive' } }
}

export const getProfileBasesCount = async (
  profileId: string,
  user: Pick<SessionUser, 'id'> | null,
) => {
  const where = getWhereBasesProfileList(profileId, user)

  return prismaClient.base.count({
    where,
  })
}

export const baseSelect = (user: { id: string } | null) =>
  ({
    id: true,
    title: true,
    excerpt: true,
    isPublic: true,
    slug: true,
    department: true,
    image: {
      select: {
        id: true,
      },
    },
    coverImage: {
      select: {
        id: true,
      },
    },
    followedBy: {
      select: {
        id: true,
      },
      where: {
        followerId: user?.id,
      },
    },
    _count: {
      select: {
        resources: {
          where: {
            OR: [
              // Public published resources (visible to all users)
              {
                deleted: null,
                published: { not: null },
                isPublic: true,
              },
              // All resources created by the querying user (any status)
              user?.id
                ? {
                    deleted: null,
                    createdById: user.id,
                  }
                : null,
              // All resources if user is a member
              user?.id
                ? {
                    deleted: null,
                    base: {
                      deleted: null,
                      members: {
                        some: {
                          accepted: { not: null },
                          memberId: user.id,
                        },
                      },
                    },
                  }
                : null,
            ].filter(isDefinedAndNotNull),
          },
        },
        followedBy: true,
      },
    },
  }) satisfies Prisma.BaseSelect

export const getProfileBases = async (
  profileId: string,
  user: Pick<SessionUser, 'id'> | null,
) => {
  const where = getWhereBasesProfileList(profileId, user)
  return prismaClient.base.findMany({
    select: {
      ...baseSelect(user),
      resources: {
        include: {
          contributors: {
            select: {
              contributorId: true,
            },
          },
        },
      },
      members: {
        where: {
          accepted: { not: null },
        },
        select: {
          baseId: true,
          accepted: true,
          memberId: true,
          member: true,
          isAdmin: true,
        },
      },
    },
    where,
  })
}

export const getBases = async ({
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
  const where = getWhereBasesList(user, getWhereBasesQuery(query))
  return prismaClient.base.findMany({
    select: baseSelect(user ?? null),
    where,
    take,
    skip,
  })
}

export type ProfileBasesList = Awaited<ReturnType<typeof getProfileBases>>

export const getBasesCount = ({
  user,
  query,
}: {
  user?: Pick<SessionUser, 'id'> | null
  query?: string
}) =>
  prismaClient.base.count({
    where: getWhereBasesList(user, getWhereBasesQuery(query)),
  })

export type BaseListItemWithAllFields = Exclude<
  Awaited<ReturnType<typeof getProfileBases>>,
  null
>[number]

type OptionalFields = {
  resources?: BaseListItemWithAllFields['resources']
  members?: BaseListItemWithAllFields['members']
}

type RequiredFields = Omit<BaseListItemWithAllFields, 'resources' | 'members'>

export type BaseListItem = RequiredFields & OptionalFields
