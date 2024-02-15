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
      SELECT COUNT(DISTINCT bases.id)::integer as count
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
              /* Base is private and user is creator */
              /* Null will never match as created_by_id is not nullable */
              OR bases.created_by_id = ${userId}::uuid
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
      WITH data AS (SELECT bases.id                                                  AS id,
                           bases.slug                                                AS slug,
                           bases.created                                             AS created,
                           COUNT(DISTINCT base_follows.id)                           AS follows_count,
                           COUNT(DISTINCT resources.id)                              AS resources_count,
                           ts_rank_cd(to_tsvector('french', unaccent(bases.title)),
                                      to_tsquery('french', unaccent(${searchTerm}))) AS rank_title,
                           ts_rank_cd(to_tsvector('french',
                                                  coalesce(regexp_replace(bases.description, '<[^>]*>?', '', 'g'), '')),
                                      to_tsquery('french', unaccent(${searchTerm}))) AS rank_description
                    FROM bases
                             /* Join base member only to have only one row per base */
                             /* Null will never match as member_id is not nullable */
                             LEFT JOIN base_members
                                       ON bases.id = base_members.base_id AND
                                          base_members.member_id = ${userId}::uuid AND
                                          base_members.accepted IS NOT NULL
                             LEFT JOIN base_follows ON bases.id = base_follows.base_id
                             LEFT JOIN resources ON bases.id = resources.base_id AND
                                                    resources.deleted IS NULL AND
                                                    resources.is_public = true AND
                                                    resources.published IS NOT NULL
                    WHERE
                        /* base status check */
                        bases.deleted IS NULL
                        /* Search term check */
                      AND (
                        ${searchTerm ?? ''} = ''
                            OR to_tsvector('french', unaccent(bases.title || ' ' ||
                                                              coalesce(
                                                                      regexp_replace(bases.description, '<[^>]*>?', '', 'g'),
                                                                      ''))) @@
                               to_tsquery('french', unaccent(${searchTerm}))
                        )
                      AND (
                        /* Authorization*/
                        /* Base is public  */
                        bases.is_public = true
                            /* Base is private and user is creator */
                            /* Null will never match as created_by_id is not nullable */
                            OR bases.created_by_id = ${userId}::uuid
                            /* User is member of base */
                            OR base_members.id IS NOT NULL
                        )
                      AND (
                        ${searchParams.departements.length === 0}
                            OR bases.department = ANY (${searchParams.departements}::text[])
                        )
                    GROUP BY bases.id)
      SELECT *
      FROM data
      ORDER BY CASE
                   /* This is the only ASC order */
                   WHEN ${paginationParams.sort === 'ancien'} THEN created
                   END ASC,
               CASE
                   /* Order by DESC the right data depending on the sort */
                   WHEN ${paginationParams.sort === 'pertinence'} THEN ((8 * rank_title) + rank_description)
                   WHEN ${paginationParams.sort === 'suivis'} THEN follows_count
                   WHEN ${paginationParams.sort === 'ressources'} THEN resources_count
                   END DESC,
               CASE
                   /* All these sort options use the most recent in case of equality */
                   WHEN ${(['recent', 'pertinence', 'suivis', 'ressources'] satisfies Sorting[] as Sorting[]).includes(paginationParams.sort)}
                       THEN created
                   END DESC
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

  const bases = await prismaClient.base.findMany({
    where: {
      id: {
        in: searchResults.map(({ id }) => id),
      },
    },
    select: baseSelect(user),
  })

  return orderItemsByIndexMap(bases, resultIndexById)
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
