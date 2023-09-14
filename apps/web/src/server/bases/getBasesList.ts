import type { Prisma } from '@prisma/client'
import { SessionUser } from '@app/web/auth/sessionUser'
import { prismaClient } from '@app/web/prismaClient'

const getWhereBasesList = (
  user?: Pick<SessionUser, 'id'> | null,
  where: Prisma.BaseWhereInput = {},
): Prisma.BaseWhereInput => {
  const whereBaseIsPublic = {
    isPublic: true,
    ...where,
  }

  return {
    ...(user
      ? {
          OR: [
            whereBaseIsPublic,
            // Public or created by user
            { ownerId: user.id },
          ],
        }
      : whereBaseIsPublic),
    deleted: null,
  }
}

export const getProfileBasesCount = async (
  profileId: string,
  user: Pick<SessionUser, 'id'>,
) => {
  const where = getWhereBasesList(user, { ownerId: profileId })

  return prismaClient.base.count({
    where,
  })
}

const baseSelect = {
  id: true,
  title: true,
  isPublic: true,
  slug: true,
  department: true,
  _count: {
    select: {
      resources: {
        where: {
          deleted: null,
        },
      },
    },
  },
} satisfies Prisma.BaseSelect

export const getProfileBases = async (
  profileId: string,
  user: Pick<SessionUser, 'id'>,
) => {
  const where = getWhereBasesList(user, { ownerId: profileId })
  return prismaClient.base.findMany({
    select: baseSelect,
    where,
  })
}

export const getBases = async (user: Pick<SessionUser, 'id'>) => {
  const where = getWhereBasesList(user)
  return prismaClient.base.findMany({
    select: baseSelect,
    where,
  })
}

export type BaseListItem = Exclude<
  Awaited<ReturnType<typeof getProfileBases>>,
  null
>[number]
