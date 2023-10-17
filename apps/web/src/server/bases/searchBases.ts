import { prismaClient } from '@app/web/prismaClient'
import { SessionUser } from '@app/web/auth/sessionUser'
import { baseSelect } from '@app/web/server/bases/getBasesList'
import {
  defaultPaginationParams,
  defaultSearchParams,
  PaginationParams,
  SearchParams,
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
                  coalesce(${searchTerm}, '___empty___') = '___empty___'
              OR to_tsvector('french', unaccent(bases.title || ' ' || coalesce(bases.description, ''))) @@
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
             to_tsvector('french',
                         unaccent(bases.title || ' ' || coalesce(bases.description, '')))::text AS document_tsv,
             to_tsquery('french', unaccent(${searchTerm}))::text                                AS query,
             ts_rank(to_tsvector('french', unaccent(bases.title || ' ' || coalesce(bases.description, ''))),
                     to_tsquery('french', unaccent(${searchTerm})))                             AS rank,
             ts_rank_cd(to_tsvector('french', unaccent(bases.title || ' ' || coalesce(bases.description, ''))),
                        to_tsquery('french', unaccent(${searchTerm})))                          AS rank_cd
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
                  coalesce(${searchTerm}, '___empty___') = '___empty___'
              OR to_tsvector('french', unaccent(bases.title || ' ' || coalesce(bases.description, ''))) @@
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
      ORDER BY rank DESC, bases.updated DESC
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

  const unsortedBases = await prismaClient.base.findMany({
    where: {
      id: {
        in: searchResults.map(({ id }) => id),
      },
    },
    select: baseSelect,
  })

  return orderItemsByIndexMap(unsortedBases, resultIndexById)
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