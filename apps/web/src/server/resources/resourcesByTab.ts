import { prismaClient } from '@app/web/prismaClient'
import type { ResourcesTab } from '@app/web/server/search/searchQueryParams'
import type { Prisma } from '@prisma/client'

const resourcesTabWhere: Record<ResourcesTab, Prisma.ResourceWhereInput> = {
  publiques: { isPublic: true, published: { not: null } },
  privees: { isPublic: false, published: { not: null } },
  brouillons: { published: null },
}

export const getResourcesTabWhere = (tab?: ResourcesTab) =>
  tab ? resourcesTabWhere[tab] : {}

export const countResourcesByTab = async (
  where: Prisma.ResourceWhereInput,
): Promise<Record<ResourcesTab, number>> => {
  const [publiques, privees, brouillons] = await Promise.all([
    prismaClient.resource.count({
      where: { ...where, ...resourcesTabWhere.publiques },
    }),
    prismaClient.resource.count({
      where: { ...where, ...resourcesTabWhere.privees },
    }),
    prismaClient.resource.count({
      where: { ...where, ...resourcesTabWhere.brouillons },
    }),
  ])

  return { publiques, privees, brouillons }
}
