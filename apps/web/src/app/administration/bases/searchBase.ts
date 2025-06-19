import {
  BasesDataTable,
  type BasesDataTableSearchParams,
} from '@app/web/app/administration/bases/BasesDataTable'
import { queryBasesForList } from '@app/web/app/administration/bases/queryBasesForList'
import { getDataTableOrderBy } from '@app/web/data-table/getDataTableOrderBy'
import { takeAndSkipFromPage } from '@app/web/data-table/takeAndSkipFromPage'
import { DEFAULT_PAGE, toNumberOr } from '@app/web/data-table/toNumberOr'
import { toQueryParts } from '@app/web/data-table/toQueryParts'
import { prismaClient } from '@app/web/prismaClient'
import type { Prisma } from '@prisma/client'

type SearchBaseOptions = {
  searchParams: BasesDataTableSearchParams
}

const DEFAULT_PAGE_SIZE = 100

export const searchBase = async (options: SearchBaseOptions) => {
  const searchParams = options.searchParams ?? {}

  const orderBy = getDataTableOrderBy(searchParams, BasesDataTable)

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

  const bases = await queryBasesForList({
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
    bases,
    matchesCount,
    moreResults: Math.max(matchesCount - (take ?? 0), 0),
    totalPages,
  }
}

export type SearchBaseResult = Awaited<ReturnType<typeof searchBase>>
