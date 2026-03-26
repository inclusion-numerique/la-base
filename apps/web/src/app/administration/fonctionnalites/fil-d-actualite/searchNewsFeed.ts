import {
  NewsFeedDataTable,
  type NewsFeedDataTableSearchParams,
} from '@app/web/app/administration/fonctionnalites/fil-d-actualite/NewsFeedDataTable'
import { queryNewsFeedsForList } from '@app/web/app/administration/fonctionnalites/fil-d-actualite/queryNewsFeedsForList'
import { getDataTableOrderBy } from '@app/web/data-table/getDataTableOrderBy'
import { takeAndSkipFromPage } from '@app/web/data-table/takeAndSkipFromPage'
import { DEFAULT_PAGE, toNumberOr } from '@app/web/data-table/toNumberOr'
import { toQueryParts } from '@app/web/data-table/toQueryParts'
import { prismaClient } from '@app/web/prismaClient'
import type { Prisma } from '@prisma/client'

type SearchNewsFeedOptions = {
  searchParams: NewsFeedDataTableSearchParams
}

const DEFAULT_PAGE_SIZE = 100

export const searchNewsFeed = async (options: SearchNewsFeedOptions) => {
  const searchParams = options.searchParams ?? {}

  const orderBy = getDataTableOrderBy(searchParams, NewsFeedDataTable)

  const { take, skip } = takeAndSkipFromPage({
    page: toNumberOr(searchParams?.page)(DEFAULT_PAGE),
    pageSize: toNumberOr(searchParams?.lignes)(DEFAULT_PAGE_SIZE),
  })

  const matchesWhere = {
    AND: [
      {
        AND: toQueryParts(searchParams).map((part) => ({
          OR: [
            { user: { firstName: { contains: part, mode: 'insensitive' } } },
            { user: { lastName: { contains: part, mode: 'insensitive' } } },
            { user: { email: { contains: part, mode: 'insensitive' } } },
          ],
        })),
      },
    ],
  } satisfies Prisma.NewsFeedWhereInput

  const newsFeeds = await queryNewsFeedsForList({
    where: matchesWhere,
    take,
    skip,
    orderBy,
  })

  const matchesCount = await prismaClient.newsFeed.count({
    where: matchesWhere,
  })

  const totalPages = take ? Math.ceil(matchesCount / take) : 1

  return {
    newsFeeds,
    matchesCount,
    moreResults: Math.max(matchesCount - (take ?? 0), 0),
    totalPages,
  }
}

export type SearchNewsFeedResult = Awaited<ReturnType<typeof searchNewsFeed>>
