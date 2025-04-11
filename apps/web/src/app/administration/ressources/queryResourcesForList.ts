import type { Prisma } from '@prisma/client'
import { prismaClient } from '@app/web/prismaClient'

export const searchResourcesSelect = {
  id: true,
  title: true,
  created: true,
  isPublic: true,
  published: true,
  base: { select: { title: true } },
  createdBy: { select: { name: true } },
  _count: true,
} satisfies Prisma.ResourceSelect

export const queryResourcesForList = async ({
  skip,
  take,
  where,
  orderBy,
}: {
  where: Prisma.ResourceWhereInput
  take?: number
  skip?: number
  orderBy?: Prisma.ResourceOrderByWithRelationInput[]
}) =>
  prismaClient.resource
    .findMany({
      where,
      take,
      skip,
      select: searchResourcesSelect,
      orderBy: [
        ...(orderBy ?? []),
        {
          created: 'asc',
        },
      ],
    })
    .then((resources) =>
      resources.map(
        (resource) =>
          // TODO: transform for easier use in UI ?
          resource,
      ),
    )

export type ResourceForList = Awaited<
  ReturnType<typeof queryResourcesForList>
>[number]
