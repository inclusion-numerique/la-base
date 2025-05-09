import type { SessionUser } from '@app/web/auth/sessionUser'
import { prismaClient } from '@app/web/prismaClient'
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

export const getProfileBaseFollows = (profileId: string) => {
  const where = computeBaseFollowsListWhereForUser({ id: profileId })
  return prismaClient.baseFollow.findMany({
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
