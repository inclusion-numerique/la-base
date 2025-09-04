import { queryResourcesForList } from '@app/web/app/administration/ressources/queryResourcesForList'
import {
  ResourcesDataTable,
  type ResourcesDataTableSearchParams,
} from '@app/web/app/administration/ressources/ResourcesDataTable'
import { getDataTableOrderBy } from '@app/web/data-table/getDataTableOrderBy'
import { takeAndSkipFromPage } from '@app/web/data-table/takeAndSkipFromPage'
import { DEFAULT_PAGE, toNumberOr } from '@app/web/data-table/toNumberOr'
import { toQueryParts } from '@app/web/data-table/toQueryParts'
import { prismaClient } from '@app/web/prismaClient'
import type { Prisma } from '@prisma/client'

type SearchResourceOptions = {
  searchParams: ResourcesDataTableSearchParams
}

const DEFAULT_PAGE_SIZE = 100

export const searchResource = async (options: SearchResourceOptions) => {
  const searchParams = options.searchParams ?? {}

  const orderBy = getDataTableOrderBy(searchParams, ResourcesDataTable)

  const { take, skip } = takeAndSkipFromPage({
    page: toNumberOr(searchParams?.page)(DEFAULT_PAGE),
    pageSize: toNumberOr(searchParams?.lignes)(DEFAULT_PAGE_SIZE),
  })

  const matchesWhere = {
    AND: [
      { deleted: null },
      {
        AND: toQueryParts(searchParams).map((part) => ({
          OR: [{ title: { contains: part, mode: 'insensitive' } }],
        })),
      },
    ],
  } satisfies Prisma.ResourceWhereInput

  const resources = await queryResourcesForList({
    where: matchesWhere,
    take,
    skip,
    orderBy,
  })

  const matchesCount = await prismaClient.resource.count({
    where: matchesWhere,
  })

  const totalPages = take ? Math.ceil(matchesCount / take) : 1

  return {
    resources,
    matchesCount,
    moreResults: Math.max(matchesCount - (take ?? 0), 0),
    totalPages,
  }
}

export type SearchResourceResult = Awaited<ReturnType<typeof searchResource>>
