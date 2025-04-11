import { SessionUser } from '@app/web/auth/sessionUser'
import { prismaClient } from '@app/web/prismaClient'
import { profileListSelect } from '@app/web/server/profiles/getProfilesList'
import { orderItemsByIndexMap } from '@app/web/server/search/orderItemsByIndexMap'
import {
  defaultPaginationParams,
  defaultSearchParams,
  PaginationParams,
  SearchParams,
  type Sorting,
} from '@app/web/server/search/searchQueryParams'
import { cleanSearchTerm } from '@app/web/server/search/searchToTsQueryInput'

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
  const searchTerm = cleanSearchTerm(searchParams.query) ?? ''
  const userId = user?.id ?? null

  const result = await prismaClient.$queryRaw<{ count: number }[]>`
      WITH search AS (SELECT unaccent(${searchTerm}) AS term),
      profiles AS (SELECT users.id                                                 AS id,
                                  users.slug                                                AS slug,
                                  users.created                                             AS created,
                                  users.last_name                                           AS last_name,
                                  users.name                                                AS name,
                                  users.location                                            AS location,
                                  users.title                                               AS title,
                                  users.description                                         AS description,
                                  COUNT(DISTINCT profile_follows.id)                        AS follows_count,
                                  COUNT(DISTINCT resources.id)                              AS resources_count
                        FROM users
                             LEFT JOIN profile_follows ON users.id = profile_follows.profile_id
                             LEFT JOIN resources ON users.id = resources.created_by_id
                                AND resources.deleted IS NULL
                                AND resources.is_public = true
                                AND resources.published IS NOT NULL
                    WHERE (
                        /* Authorization*/
                        /* User is public  */
                        users.is_public = true
                            /* User is private and user is self */
                            OR users.id = ${userId}::uuid
                        )
                      AND (
                        users.deleted IS NULL
                        )
                    GROUP BY users.id),
        scored_profiles AS (SELECT profiles.*,
                                (
                                    word_similarity((SELECT term FROM search), unaccent(coalesce(profiles.name, ''))) * 10 +
                                    word_similarity((SELECT term FROM search), unaccent(coalesce(profiles.location, ''))) * 3 +
                                    word_similarity((SELECT term FROM search), unaccent(coalesce(profiles.title, ''))) * 5 +
                                    word_similarity((SELECT term FROM search), unaccent(coalesce(profiles.description, ''))) * 1
                                ) AS score
                           FROM profiles),
         matching_profiles AS (SELECT *
                              FROM scored_profiles
                              WHERE (SELECT term FROM search) = ''
                                 OR score > 4)
      SELECT COUNT(*)::integer as count
      FROM matching_profiles
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

  const searchTerm = cleanSearchTerm(searchParams.query) ?? ''
  const userId = user?.id ?? null
  const searchResults = await prismaClient.$queryRaw<
    {
      id: string
      score: number
      resources_count: number
    }[]
  >`
          WITH search AS (SELECT unaccent(${searchTerm}) AS term),
          profiles AS (SELECT users.id                                                 AS id,
                                  users.slug                                                AS slug,
                                  users.created                                             AS created,
                                  users.last_name                                           AS last_name,
                                  users.name                                                AS name,
                                  users.location                                            AS location,
                                  users.title                                               AS title,
                                  users.description                                         AS description,
                                  COUNT(DISTINCT profile_follows.id)                        AS follows_count,
                                  COUNT(DISTINCT resources.id)                              AS resources_count
                        FROM users
                            LEFT JOIN profile_follows ON users.id = profile_follows.profile_id
                            LEFT JOIN resources ON users.id = resources.created_by_id
                                AND resources.deleted IS NULL
                                AND resources.is_public = true
                                AND resources.published IS NOT NULL
                    WHERE (
                        /* Authorization*/
                        /* User is public  */
                        users.is_public = true
                            /* User is private and user is self */
                            OR users.id = ${userId}::uuid
                        )
                      AND (
                        users.deleted IS NULL
                        )
                    GROUP BY users.id),
        scored_profiles AS (SELECT profiles.*,
                                (
                                    word_similarity((SELECT term FROM search), unaccent(coalesce(profiles.name, ''))) * 10 +
                                    word_similarity((SELECT term FROM search), unaccent(coalesce(profiles.location, ''))) * 3 +
                                    word_similarity((SELECT term FROM search), unaccent(coalesce(profiles.title, ''))) * 5 +
                                    word_similarity((SELECT term FROM search), unaccent(coalesce(profiles.description, ''))) * 1
                                ) AS score
                           FROM profiles),
         matching_profiles AS (SELECT *
                              FROM scored_profiles
                              WHERE (SELECT term FROM search) = ''
                                 OR score > 4)
      SELECT id, score, resources_count
      FROM matching_profiles
      ORDER BY CASE
                   /* This is the only ASC order */
                   WHEN ${paginationParams.sort === 'ancien'} THEN created
                   END ASC,
               CASE
                   WHEN ${paginationParams.sort === 'a-z'} THEN LOWER(last_name)
                   END ASC,
               CASE
                   WHEN ${paginationParams.sort === 'z-a'} THEN LOWER(last_name)
                   END DESC,
               CASE
                   /* Order by DESC the right data depending on the sort */
                   WHEN ${paginationParams.sort === 'pertinence'} THEN score
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

  const debugIndexById = new Map(
    searchResults.map(({ id, score, resources_count }, index) => [
      id,
      {
        score,
        index,
        resources_count,
      },
    ]),
  )
  console.log('profiles', debugIndexById)

  return {
    searchResults,
    resultIndexById,
    debugIndexById,
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
      emailVerified: {
        not: null,
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
      emailVerified: {
        not: null,
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
