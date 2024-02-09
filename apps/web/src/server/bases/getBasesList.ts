import type { Prisma } from '@prisma/client'
import { SessionUser } from '@app/web/auth/sessionUser'
import { prismaClient } from '@app/web/prismaClient'

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
              // Created by user
              { createdById: user.id },
              // user has accepted to be member
              {
                members: {
                  some: {
                    AND: [{ memberId: user.id }, { accepted: { not: null } }],
                  },
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
      { createdById: profileId },
      { members: { some: { memberId: profileId } } },
    ],
  })

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
            deleted: null,
            published: { not: null },
            isPublic: true,
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
    select: baseSelect(user),
    where,
  })
}

export type BaseListItem = Exclude<
  Awaited<ReturnType<typeof getProfileBases>>,
  null
>[number]
