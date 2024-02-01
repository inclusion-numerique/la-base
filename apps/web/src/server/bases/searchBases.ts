import type { Prisma } from '@prisma/client'
import { prismaClient } from '@app/web/prismaClient'
import { SessionUser } from '@app/web/auth/sessionUser'
import { baseSelect } from '@app/web/server/bases/getBasesList'
import {
  defaultPaginationParams,
  defaultSearchParams,
  PaginationParams,
  SearchParams,
  type Sorting,
} from '@app/web/server/search/searchQueryParams'
import { orderItemsByIndexMap } from '@app/web/server/search/orderItemsByIndexMap'
import { searchToTsQueryInput } from '@app/web/server/search/searchToTsQueryInput'

/**
 * We are using advanced postgresql features not supported by Prisma for search.
 * We have to use raw SQL queries.
 * Raw SQL queries are only in search function files.
 * ⚠️ Keep in sync with prisma where filters for user rights / visibility
 * ⚠️ We cannot reuse query fragments from prismaClient with raw sql without opting out of security features. Keep conditions in sync in the 2 functions.
 */

// TODO Département
export const countBases = async (
  searchParams: Pick<SearchParams, 'query' | 'departements'>,
  user: Pick<SessionUser, 'id'> | null,
) => {
  const searchTerm = searchToTsQueryInput(searchParams.query)
  const userId = user?.id ?? null

  const result = await prismaClient.$queryRaw<{ count: number }[]>`
      SELECT count(*)::integer as count
      FROM bases
               /* Join base member only to have only one row per base */
               /* Null will never match as member_id is not nullable */
               LEFT JOIN base_members
                         ON bases.id = base_members.base_id AND base_members.member_id = ${userId}::uuid AND
                            base_members.accepted IS NOT NULL
      WHERE
          /* base status check */
          bases.deleted IS NULL
          /* Search term check */
        AND (
          ${searchTerm ?? ''} = ''
              OR to_tsvector('french', unaccent(bases.title || ' ' ||
                                                coalesce(regexp_replace(bases.description, '<[^>]*>?', '', 'g'),
                                                         ''))) @@
                 to_tsquery('french', unaccent(${searchTerm}))
          )
        AND (
          /* Authorization*/
          /* Base is public  */
          bases.is_public = true
              /* Base is private and user is owner */
              /* Null will never match as owner_id is not nullable */
              OR bases.owner_id = ${userId}::uuid
              /* User is member of base */
              OR base_members.id IS NOT NULL
          )
        AND (
          ${searchParams.departements.length === 0}
              OR bases.department = ANY (${searchParams.departements}::text[])
          )
  `

  return result[0]?.count ?? 0
}

// TODO Département

export const rankBases = async (
  searchParams: SearchParams,
  paginationParams: PaginationParams,
  user: Pick<SessionUser, 'id'> | null,
) => {
  // To keep good dev ux, we first fetch the ids of the resources matching the search
  // Then we fetch the full resources with all the data from prisma to have good types

  const searchTerm = searchToTsQueryInput(searchParams.query)
  const userId = user?.id ?? null
  const searchResults = await prismaClient.$queryRaw<
    {
      id: string
      document_tsv: string
      query: string
      rank: number
      // An alternative to rank, may have different result (uses proximity not just vector matching)
      rank_cd: number
    }[]
  >`
      SELECT bases.id,
             ts_rank_cd(to_tsvector('french', unaccent(bases.title)),
                        to_tsquery('french', unaccent(${searchTerm}))) AS rank_title,
             ts_rank_cd(to_tsvector('french', coalesce(regexp_replace(bases.description, '<[^>]*>?', '', 'g'), '')),
                        to_tsquery('french', unaccent(${searchTerm}))) AS rank_description
      FROM bases
               /* Join base member only to have only one row per base */
               /* Null will never match as member_id is not nullable */
               LEFT JOIN base_members
                         ON bases.id = base_members.base_id AND base_members.member_id = ${userId}::uuid AND
                            base_members.accepted IS NOT NULL
      WHERE
          /* base status check */
          bases.deleted IS NULL
          /* Search term check */
        AND (
          ${searchTerm ?? ''} = ''
              OR to_tsvector('french', unaccent(bases.title || ' ' ||
                                                coalesce(regexp_replace(bases.description, '<[^>]*>?', '', 'g'),
                                                         ''))) @@
                 to_tsquery('french', unaccent(${searchTerm}))
          )
        AND (
          /* Authorization*/
          /* Base is public  */
          bases.is_public = true
              /* Base is private and user is owner */
              /* Null will never match as owner_id is not nullable */
              OR bases.owner_id = ${userId}::uuid
              /* User is member of base */
              OR base_members.id IS NOT NULL
          )
        AND (
          ${searchParams.departements.length === 0}
              OR bases.department = ANY (${searchParams.departements}::text[])
          )
      /* Order by updated desc to have most recent first on empty query */
      ORDER BY rank_title DESC, rank_description DESC, bases.created DESC
      LIMIT ${paginationParams.perPage} OFFSET ${
        (paginationParams.page - 1) * paginationParams.perPage
      };
  `
  // Where IN does not garantee same order as the ids array so we have to sort the results in memory
  const resultIndexById = new Map(
    searchResults.map(({ id }, index) => [id, index]),
  )

  return {
    searchResults,
    resultIndexById,
  }
}

export const baseOrderBySorting = (
  sorting: Sorting,
):
  | undefined
  | Prisma.BaseOrderByWithRelationAndSearchRelevanceInput
  | Prisma.BaseOrderByWithRelationAndSearchRelevanceInput[] => {
  if (sorting === 'recent') {
    return { created: 'desc' }
  }
  if (sorting === 'ancien') {
    return { created: 'asc' }
  }
  if (sorting === 'suivis') {
    return [{ followedBy: { _count: 'desc' } }, { created: 'desc' }]
  }

  // No order by for 'pertinent' because rank from search query will be used
  return undefined
}

export const searchBases = async (
  searchParams: SearchParams,
  paginationParams: PaginationParams,
  user: Pick<SessionUser, 'id'> | null,
) => {
  const { searchResults, resultIndexById } = await rankBases(
    searchParams,
    paginationParams,
    user,
  )

  const bases = await prismaClient.base.findMany({
    where: {
      id: {
        in: searchResults.map(({ id }) => id),
      },
    },
    select: baseSelect(user),
    orderBy: baseOrderBySorting(paginationParams.sort),
  })

  return paginationParams.sort === 'pertinence'
    ? orderItemsByIndexMap(bases, resultIndexById)
    : bases
}

export type SearchBasesResult = Awaited<ReturnType<typeof searchBases>>

export const quickSearchBases = async (
  query: string,
  user: Pick<SessionUser, 'id'> | null,
) => {
  const { searchResults, resultIndexById } = await rankBases(
    { ...defaultSearchParams, query },
    { ...defaultPaginationParams, perPage: 3 },
    user,
  )

  const unsortedBases = await prismaClient.base.findMany({
    where: {
      id: {
        in: searchResults.map(({ id }) => id),
      },
    },
    select: {
      id: true,
      title: true,
      slug: true,
      image: {
        select: {
          id: true,
          altText: true,
        },
      },
    },
  })

  return orderItemsByIndexMap(unsortedBases, resultIndexById)
}

export type QuickSearchBasesResult = Awaited<
  ReturnType<typeof quickSearchBases>
>
