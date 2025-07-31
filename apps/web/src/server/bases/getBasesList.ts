import type { SessionUser } from '@app/web/auth/sessionUser'
import { prismaClient } from '@app/web/prismaClient'
import { getBaseResourcesViewsCount } from '@app/web/server/bases/baseResources'
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
    OR: [
      { members: { some: { memberId: profileId, accepted: { not: null } } } },
    ],
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

export const computeBasesListResourcesWhereForUser = (
  user?: Pick<SessionUser, 'id'> | null,
) => ({
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
})

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
        followerId: true,
      },
      where: {
        followerId: user?.id,
      },
    },
    _count: {
      select: {
        resources: {
          where: computeBasesListResourcesWhereForUser(user),
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
  const bases = await prismaClient.base.findMany({
    select: {
      ...baseSelect(user),
      resources: {
        where: computeBasesListResourcesWhereForUser(user),
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
  const baseIds = bases.map(({ id }) => id)

  const baseResourcesViewsCounts = await getBaseResourcesViewsCount(
    baseIds,
    computeBasesListResourcesWhereForUser(user),
  )

  return bases.map((base) => ({
    ...base,
    _count: {
      ...base._count,
      resourcesViews:
        baseResourcesViewsCounts.find(({ baseId }) => baseId === base.id)?._sum
          .viewsCount ?? 0,
    },
  }))
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

export type BaseProfileListItemWithAllFields = Exclude<
  Awaited<ReturnType<typeof getProfileBases>>,
  null
>[number]

type OptionalFields = {
  resources?: BaseProfileListItemWithAllFields['resources']
  members?: BaseProfileListItemWithAllFields['members']
}

type RequiredFields = Omit<
  BaseProfileListItemWithAllFields,
  'resources' | 'members'
>

export type BaseProfileListItem = RequiredFields & OptionalFields
