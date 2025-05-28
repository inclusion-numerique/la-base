import type { SessionUser } from '@app/web/auth/sessionUser'
import { prismaClient } from '@app/web/prismaClient'
import { getBaseResourcesViewsCount } from '@app/web/server/bases/baseResources'
import { baseSelect } from '@app/web/server/bases/getBasesList'
import { profileListSelect } from '@app/web/server/profiles/getProfilesList'
import type { Prisma } from '@prisma/client'

export const computeBaseFollowsListWhereForUser = (
  user: Pick<SessionUser, 'id'>,
  where: Prisma.BaseFollowWhereInput = {},
): Prisma.BaseFollowWhereInput => ({
  followerId: user.id,
  AND: [
    {
      base: {
        deleted: null,
      },
    },
    where,
  ],
})

export const computeProfileFollowsListWhereForUser = (
  user: Pick<SessionUser, 'id'>,
  where: Prisma.ProfileFollowWhereInput = {},
): Prisma.ProfileFollowWhereInput => ({
  followerId: user.id,
  AND: [
    {
      profile: {
        deleted: null,
      },
    },
    where,
  ],
})

export const getProfileFollowsCount = async (profileId: string) => {
  const baseFollows = await prismaClient.baseFollow.count({
    where: computeBaseFollowsListWhereForUser({ id: profileId }),
  })

  const profileFollows = await prismaClient.profileFollow.count({
    where: computeProfileFollowsListWhereForUser({ id: profileId }),
  })

  return {
    baseFollows,
    profileFollows,
    total: baseFollows + profileFollows,
  }
}

export const getProfileBaseFollows = async (profileId: string) => {
  const where = computeBaseFollowsListWhereForUser({ id: profileId })
  const basesFollows = await prismaClient.baseFollow.findMany({
    select: {
      id: true,
      followed: true,
      base: { select: baseSelect({ id: profileId }) },
    },
    where,
    orderBy: {
      followed: 'desc',
    },
  })

  const resourcesViews = await getBaseResourcesViewsCount(
    basesFollows.map(({ base }) => base.id),
  )

  return basesFollows.map((baseFollow) => ({
    ...baseFollow,
    base: {
      ...baseFollow.base,
      _count: {
        ...baseFollow.base._count,
        resourcesViews:
          resourcesViews.find(({ baseId }) => baseId === baseFollow.base.id)
            ?._sum.viewsCount ?? 0,
      },
    },
  }))
}

export type BaseFollowListItem = Exclude<
  Awaited<ReturnType<typeof getProfileBaseFollows>>,
  null
>[number]

export const getProfileProfileFollows = (profileId: string) => {
  const where = computeProfileFollowsListWhereForUser({ id: profileId })
  return prismaClient.profileFollow.findMany({
    select: {
      id: true,
      followed: true,
      profile: { select: profileListSelect({ id: profileId }) },
    },
    where,
    orderBy: {
      followed: 'desc',
    },
  })
}

export type ProfileFollowListItem = Exclude<
  Awaited<ReturnType<typeof getProfileProfileFollows>>,
  null
>
