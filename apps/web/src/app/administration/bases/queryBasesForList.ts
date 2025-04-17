import type { Prisma } from '@prisma/client'
import { prismaClient } from '@app/web/prismaClient'

export const searchBasesSelect = {
  id: true,
  title: true,
  created: true,
  isPublic: true,
  _count: {
    select: {
      members: {
        where: {
          accepted: { not: null },
          member: { deleted: null },
        },
      },
      collections: {
        where: { deleted: null },
      },
      followedBy: {
        where: { follower: { deleted: null } },
      },
      resources: {
        where: {
          deleted: null,
          lastPublished: { not: null },
        },
      },
    },
  },
} satisfies Prisma.BaseSelect

export const queryBasesForList = async ({
  skip,
  take,
  where,
  orderBy,
}: {
  where: Prisma.BaseWhereInput
  take?: number
  skip?: number
  orderBy?: Prisma.BaseOrderByWithRelationInput[]
}) =>
  prismaClient.base
    .findMany({
      where,
      take,
      skip,
      select: searchBasesSelect,
      orderBy: [
        ...(orderBy ?? []),
        {
          created: 'asc',
        },
      ],
    })
    .then((bases) =>
      bases.map(
        (base) =>
          // TODO: transform for easier use in UI ?
          base,
      ),
    )

export type BaseForList = Awaited<ReturnType<typeof queryBasesForList>>[number]
