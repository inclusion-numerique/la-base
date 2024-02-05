import { prismaClient } from '@app/web/prismaClient'
import { SessionUser } from '@app/web/auth/sessionUser'
import {
  defaultPaginationParams,
  defaultSearchParams,
  PaginationParams,
  SearchParams,
  type Sorting,
} from '@app/web/server/search/searchQueryParams'
import { orderItemsByIndexMap } from '@app/web/server/search/orderItemsByIndexMap'
import { profileListSelect } from '@app/web/server/profiles/getProfilesList'
import { searchToTsQueryInput } from '@app/web/server/search/searchToTsQueryInput'

/**
 * We are using advanced postgresql features not supported by Prisma for search.
 * We have to use raw SQL queries.
 * Raw SQL queries are only in search function files.
 * ⚠️ Keep in sync with prisma where filters for user rights / visibility
 * ⚠️ We cannot reuse query fragments from prismaClient with raw sql without opting out of security features. Keep conditions in sync in the 2 functions.
 */

export const countProfiles = async (
  searchParams: Pick<SearchParams, 'query'>,
  user: Pick<SessionUser, 'id'> | null,
) => {
  const searchTerm = searchToTsQueryInput(searchParams.query)
  const userId = user?.id ?? null

  const result = await prismaClient.$queryRaw<{ count: number }[]>`
      SELECT COUNT(DISTINCT users.id)::integer as count
      FROM users
      WHERE (
          ${searchTerm ?? ''} = ''
              OR to_tsvector('french',
                             unaccent(coalesce(users.name, '') || ' ' || coalesce(users.location, '') || ' ' ||
                                      coalesce(users.title, '') || ' ' || coalesce(users.description, ''))) @@
                 to_tsquery('french', unaccent(${searchTerm}))
          )
        AND (
          /* Authorization*/
          /* User is public  */
          users.is_public = true
              /* User is private and user is self */
              OR users.id = ${userId}::uuid
          )
        AND (
          users.deleted IS NULL
          )
  `

  return result[0]?.count ?? 0
}

export const rankProfiles = async (
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
      WITH data AS (SELECT users.id                                                  AS id,
                           users.slug                                                AS slug,
                           users.created                                             AS created,
                           ts_rank_cd(to_tsvector('french',
                                                  unaccent(coalesce(users.name, '') || ' ' ||
                                                           coalesce(users.location, '') || ' ' ||
                                                           coalesce(users.title, '') || ' ' ||
                                                           coalesce(users.description, ''))),
                                      to_tsquery('french', unaccent(${searchTerm}))) AS rank,
                           COUNT(DISTINCT profile_follows.id)                        AS follows_count,
                           COUNT(DISTINCT filtered_resource_events.resource_id)      AS resources_count
                    FROM users
                             LEFT JOIN profile_follows ON users.id = profile_follows.profile_id
                             LEFT JOIN (
                        /* To find the resources on which the user is a contributor, we find the events where the user is the author */
                        SELECT resource_events.resource_id AS resource_id, resource_events.by_id AS by_id
                        FROM resource_events
                                 /* We right join to filter only public and available resources */
                                 RIGHT JOIN resources ON resource_events.resource_id = resources.id
                        WHERE resources.deleted IS NULL
                          AND resources.is_public = true
                          AND resources.published IS NOT NULL) AS filtered_resource_events
                                       ON users.id = filtered_resource_events.by_id
                    WHERE (
                        coalesce(${searchTerm}, '___empty___') = '___empty___'
                            OR to_tsvector('french',
                                           unaccent(coalesce(users.name, '') || ' ' || coalesce(users.location, '') ||
                                                    ' ' ||
                                                    coalesce(users.title, '') || ' ' ||
                                                    coalesce(users.description, ''))) @@
                               to_tsquery('french', unaccent(${searchTerm}))
                        )
                      AND (
                        /* Authorization*/
                        /* User is public  */
                        users.is_public = true
                            /* User is private and user is self */
                            OR users.id = ${userId}::uuid
                        )
                      AND (
                        users.deleted IS NULL
                        )
                    GROUP BY users.id)
      SELECT *
      FROM data
      ORDER BY CASE
                   /* This is the only ASC order */
                   WHEN ${paginationParams.sort === 'ancien'} THEN created
                   END ASC,
               CASE
                   /* Order by DESC the right data depending on the sort */
                   WHEN ${paginationParams.sort === 'pertinence'} THEN rank
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

export const searchProfiles = async (
  searchParams: SearchParams,
  paginationParams: PaginationParams,
  user: Pick<SessionUser, 'id'> | null,
) => {
  const { searchResults, resultIndexById } = await rankProfiles(
    searchParams,
    paginationParams,
    user,
  )

  const users = await prismaClient.user.findMany({
    where: {
      id: {
        in: searchResults.map(({ id }) => id),
      },
    },
    select: profileListSelect(user),
  })

  return orderItemsByIndexMap(users, resultIndexById)
}

export type SearchProfilesResult = Awaited<ReturnType<typeof searchProfiles>>

export const quickSearchProfiles = async (
  query: string,
  user: Pick<SessionUser, 'id'> | null,
) => {
  const { searchResults, resultIndexById } = await rankProfiles(
    { ...defaultSearchParams, query },
    { ...defaultPaginationParams, perPage: 3 },
    user,
  )

  const unsortedUsers = await prismaClient.user.findMany({
    where: {
      id: {
        in: searchResults.map(({ id }) => id),
      },
    },
    select: {
      id: true,
      name: true,
      slug: true,
      firstName: true,
      lastName: true,
      image: {
        select: {
          id: true,
          altText: true,
        },
      },
    },
  })

  return orderItemsByIndexMap(unsortedUsers, resultIndexById)
}
