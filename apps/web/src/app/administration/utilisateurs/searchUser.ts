import {
  UtilisateursDataTable,
  type UtilisateursDataTableSearchParams,
} from '@app/web/app/administration/utilisateurs/UtilisateursDataTable'
import { queryUtilisateursForList } from '@app/web/app/administration/utilisateurs/queryUtilisateursForList'
import { getDataTableOrderBy } from '@app/web/data-table/getDataTableOrderBy'
import { takeAndSkipFromPage } from '@app/web/data-table/takeAndSkipFromPage'
import { DEFAULT_PAGE, toNumberOr } from '@app/web/data-table/toNumberOr'
import { toQueryParts } from '@app/web/data-table/toQueryParts'
import { prismaClient } from '@app/web/prismaClient'
import type { Prisma } from '@prisma/client'

type SearchUtilisateurOptions = {
  searchParams: UtilisateursDataTableSearchParams
}

const DEFAULT_PAGE_SIZE = 100

export const searchUser = async (options: SearchUtilisateurOptions) => {
  const searchParams = options.searchParams ?? {}

  const orderBy = getDataTableOrderBy(searchParams, UtilisateursDataTable)

  const { take, skip } = takeAndSkipFromPage({
    page: toNumberOr(searchParams?.page)(DEFAULT_PAGE),
    pageSize: toNumberOr(searchParams?.lignes)(DEFAULT_PAGE_SIZE),
  })

  const matchesWhere = {
    AND: [
      {
        AND: toQueryParts(searchParams).map((part) => ({
          OR: [
            { firstName: { contains: part, mode: 'insensitive' } },
            { lastName: { contains: part, mode: 'insensitive' } },
            { email: { contains: part, mode: 'insensitive' } },
          ],
        })),
      },
    ],
  } satisfies Prisma.UserWhereInput

  const utilisateurs = await queryUtilisateursForList({
    where: matchesWhere,
    take,
    skip,
    orderBy,
  })

  const matchesCount = await prismaClient.user.count({
    where: matchesWhere,
  })

  const totalPages = take ? Math.ceil(matchesCount / take) : 1

  return {
    utilisateurs,
    matchesCount,
    moreResults: Math.max(matchesCount - (take ?? 0), 0),
    totalPages,
  }
}

export type SearchUtilisateurResult = Awaited<ReturnType<typeof searchUser>>
