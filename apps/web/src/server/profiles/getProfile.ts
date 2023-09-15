import { prismaClient } from '@app/web/prismaClient'

export const getMatchingProfils = async (filter: string, baseId: string) =>
  prismaClient.user.findMany({
    select: { id: true, name: true, email: true },
    where: {
      bases: {
        none: { baseId },
      },
      OR: [
        { firstName: { contains: filter, mode: 'insensitive' } },
        { lastName: { contains: filter, mode: 'insensitive' } },
        { name: { contains: filter, mode: 'insensitive' } },
        { email: { contains: filter, mode: 'insensitive' } },
      ],
    },
    take: 5,
  })

export const getProfilePageQuery = async (id: string) =>
  prismaClient.user.findUnique({
    select: {
      id: true,
      name: true,
      firstName: true,
      isPublic: true,
    },
    where: { id },
  })

export type MatchingProfil = Exclude<
  Awaited<ReturnType<typeof getMatchingProfils>>,
  null
>[number]

export type ProfilePageData = Exclude<
  Awaited<ReturnType<typeof getProfilePageQuery>>,
  null
>
