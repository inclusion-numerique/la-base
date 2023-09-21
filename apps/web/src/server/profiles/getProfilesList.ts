import { Prisma } from '@prisma/client'
import { SessionUser } from '@app/web/auth/sessionUser'
import { prismaClient } from '@app/web/prismaClient'

export const profileSelect = {
  id: true,
  name: true,
} satisfies Prisma.UserSelect

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
}: {
  user?: Pick<SessionUser, 'id'> | null
  query?: string
}) => {
  const where = getWhereProfilesList(user, getWhereProfilesQuery(query))
  return prismaClient.user.findMany({
    select: profileSelect,
    where,
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
