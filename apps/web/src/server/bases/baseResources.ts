import { prismaClient } from '@app/web/prismaClient'
import { Prisma } from '@prisma/client'

export const getBaseResourcesViewsCount = async (
  baseIds: string[],
  where: Prisma.ResourceWhereInput = {},
) =>
  prismaClient.resource.groupBy({
    by: ['baseId'],
    _sum: {
      viewsCount: true,
    },
    where: {
      baseId: {
        in: baseIds,
      },
      ...where,
    },
  })
