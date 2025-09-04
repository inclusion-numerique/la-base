import type { SessionUser } from '@app/web/auth/sessionUser'
import { prismaClient } from '@app/web/prismaClient'
import { profileListSelect } from '@app/web/server/profiles/getProfilesList'
import { orderItemsByIndexMap } from '@app/web/server/search/orderItemsByIndexMap'
import {
  defaultPaginationParams,
  defaultSearchParams,
  type PaginationParams,
  type SearchParams,
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

const ranking = {
  weights: {
    name: 5,
    location: 3,
    title: 3,
    description: 3,
  },
  threshold: 3,
}

export const countProfiles = async (
  searchParams: Pick<SearchParams, 'query'>,
  user: Pick<SessionUser, 'id'> | null,
) => {
  const searchTerm = cleanSearchTerm(searchParams.query) ?? ''
  const userId = user?.id ?? null

  const result = await prismaClient.$queryRaw<{ count: number }[]>`
      WITH search AS (SELECT unaccent(${searchTerm}) AS term),
           profiles AS (SELECT users.name        AS name,
                               users.location    AS location,
                               users.title       AS title,
                               users.description AS description
                        FROM users
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
                                          word_similarity((SELECT term FROM search),
                                                          unaccent(coalesce(profiles.name, ''))) *
                                          ${ranking.weights.name} +
                                          word_similarity((SELECT term FROM search),
                                                          unaccent(coalesce(profiles.location, ''))) *
                                          ${ranking.weights.location} +
                                          word_similarity((SELECT term FROM search),
                                                          unaccent(coalesce(profiles.title, ''))) *
                                          ${ranking.weights.title} +
                                          word_similarity((SELECT term FROM search),
                                                          unaccent(coalesce(profiles.description, ''))) *
                                          ${ranking.weights.description}
                                          ) AS score
                               FROM profiles),
           matching_profiles AS (SELECT *
                                 FROM scored_profiles
                                 WHERE (SELECT term FROM search) = ''
                                    OR score > ${ranking.threshold})
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
           private_resources AS (SELECT resources.id            as id,
                                        resources.created_by_id as created_by_id
                                 FROM resources
                                          /* We join with the base member correspondig to the user id */
                                          LEFT JOIN bases ON (resources.base_id = bases.id AND bases.deleted IS NULL)
                                          LEFT JOIN base_members
                                                    ON bases.id = base_members.base_id AND
                                                       base_members.member_id = ${userId}::uuid AND
                                                       base_members.accepted IS NOT NULL
                                 WHERE
                                     /* Private resources (is_public false or null) with any status */
                                     (resources.is_public != true OR resources.published IS NULL)
                                   AND resources.deleted IS NULL
                                   AND (
                                     /* User is member of the non-deleted base owning the resource */
                                     (base_members.id IS NOT NULL)
                                         /* OR User is the creator of the private resource */
                                         OR resources.created_by_id = ${userId}::uuid)),
           profiles AS (SELECT users.id                                            AS id,
                               users.slug                                          AS slug,
                               users.created                                       AS created,
                               users.last_name                                     AS last_name,
                               users.name                                          AS name,
                               users.location                                      AS location,
                               users.title                                         AS title,
                               users.description                                   AS description,
                               COUNT(DISTINCT profile_follows.id)                  AS follows_count,
                               (COALESCE(COUNT(DISTINCT public_resources.id), 0) +
                                COALESCE(COUNT(DISTINCT private_resources.id), 0)) AS resources_count
                        FROM users
                                 LEFT JOIN profile_follows ON users.id = profile_follows.profile_id
                            /* Join with public published resources */
                                 LEFT JOIN resources as public_resources ON (
                            users.id = public_resources.created_by_id
                                AND public_resources.deleted IS NULL
                                AND public_resources.is_public = true
                                AND public_resources.published IS NOT NULL
                            )
                            /* Join with private resources */
                                 LEFT JOIN private_resources ON users.id = private_resources.created_by_id
                        WHERE (
                            /* Authorization*/
                            /* User is public  */
                            users.is_public = true
                                /* User is private and user is self */
                                OR users.id = ${userId}::uuid
                            )
                          AND users.deleted IS NULL

                        GROUP BY users.id),
           scored_profiles AS (SELECT profiles.*,
                                      (
                                          word_similarity((SELECT term FROM search),
                                                          unaccent(coalesce(profiles.name, ''))) *
                                          ${ranking.weights.name} +
                                          word_similarity((SELECT term FROM search),
                                                          unaccent(coalesce(profiles.location, ''))) *
                                          ${ranking.weights.location} +
                                          word_similarity((SELECT term FROM search),
                                                          unaccent(coalesce(profiles.title, ''))) *
                                          ${ranking.weights.title} +
                                          word_similarity((SELECT term FROM search),
                                                          unaccent(coalesce(profiles.description, ''))) *
                                          ${ranking.weights.description}
                                          ) AS score
                               FROM profiles),
           matching_profiles AS (SELECT *
                                 FROM scored_profiles
                                 WHERE (SELECT term FROM search) = ''
                                    OR score > ${ranking.threshold})
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
