import type { SessionUser } from '@app/web/auth/sessionUser'
import { prismaClient } from '@app/web/prismaClient'
import { getBaseResourcesViewsCount } from '@app/web/server/bases/baseResources'
import {
  baseSelect,
  computeBasesListResourcesWhereForUser,
} from '@app/web/server/bases/getBasesList'
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
    title: 5,
    description: 3,
  },
  threshold: 3,
}

export const countBases = async (
  searchParams: Pick<SearchParams, 'query' | 'departements'>,
  user: Pick<SessionUser, 'id'> | null,
) => {
  const searchTerm = cleanSearchTerm(searchParams.query) ?? ''
  const userId = user?.id ?? null

  const result = await prismaClient.$queryRaw<{ count: number }[]>`
      WITH search AS (SELECT unaccent(${searchTerm}) AS term),
           bases AS (SELECT bases.id,
                            bases.slug,
                            bases.title,
                            bases.description
                     FROM bases
                              /* Join base member for querying user */
                              LEFT JOIN base_members
                                        ON bases.id = base_members.base_id AND
                                           base_members.member_id = ${userId}::uuid AND
                                           base_members.accepted IS NOT NULL
                     WHERE
                         /* Authorization*/
                         (
                             /* Base is public  */
                             bases.is_public = true
                                 OR (
                                 /* Base is private and user is member */
                                 base_members.id IS NOT NULL
                                 )
                             )
                       AND bases.deleted IS NULL
                       AND (${searchParams.departements.length === 0}
                         OR bases.department = ANY (${searchParams.departements}::text[])
                         )
                     GROUP BY bases.id),
           scored_bases AS (SELECT bases.*,
                                   (
                                       word_similarity((SELECT term FROM search),
                                                       unaccent(coalesce(bases.title, ''))) *
                                       ${ranking.weights.title} +
                                       word_similarity((SELECT term FROM search),
                                                       unaccent(coalesce(bases.description, ''))) *
                                       ${ranking.weights.description}
                                       ) AS score
                            FROM bases),
           matching_bases AS (SELECT *
                              FROM scored_bases
                              WHERE (SELECT term FROM search) = ''
                                 OR score > ${ranking.threshold})
      SELECT COUNT(*)::integer as count
      FROM matching_bases

  `

  return result[0]?.count ?? 0
}

export const rankBases = async (
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
                                        resources.base_id       as base_id,
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
           bases AS (SELECT bases.id,
                            bases.slug,
                            bases.created,
                            bases.title,
                            bases.description,
                            bases.department,
                            COUNT(DISTINCT base_follows.id)                     AS follows_count,
                            (COALESCE(COUNT(DISTINCT public_resources.id), 0) +
                             COALESCE(COUNT(DISTINCT private_resources.id), 0)) AS resources_count
                     FROM bases
                              LEFT JOIN base_follows ON bases.id = base_follows.base_id
                         /* Join with public published resources */
                              LEFT JOIN resources as public_resources ON (
                         bases.id = public_resources.base_id
                             AND public_resources.deleted IS NULL
                             AND public_resources.is_public = true
                             AND public_resources.published IS NOT NULL
                         )
                         /* Join with private resources */
                              LEFT JOIN private_resources ON bases.id = private_resources.base_id
                         /* Join base member for querying user */
                              LEFT JOIN base_members
                                        ON bases.id = base_members.base_id AND
                                           base_members.member_id = ${userId}::uuid AND
                                           base_members.accepted IS NOT NULL
                     WHERE
                         /* Authorization*/
                         (
                             /* Base is public  */
                             bases.is_public = true
                                 OR (
                                 /* Base is private and user is member */
                                 base_members.id IS NOT NULL
                                 )
                             )
                       AND bases.deleted IS NULL
                       AND (${searchParams.departements.length === 0}
                         OR bases.department = ANY (${searchParams.departements}::text[])
                         )
                     GROUP BY bases.id),
           scored_bases AS (SELECT bases.*,
                                   (
                                       word_similarity((SELECT term FROM search),
                                                       unaccent(coalesce(bases.title, ''))) *
                                       ${ranking.weights.title} +
                                       word_similarity((SELECT term FROM search),
                                                       unaccent(coalesce(bases.description, ''))) *
                                       ${ranking.weights.description}
                                       ) AS score
                            FROM bases),
           matching_bases AS (SELECT *
                              FROM scored_bases
                              WHERE (SELECT term FROM search) = ''
                                 OR score > ${ranking.threshold})
      SELECT id, score, resources_count
      FROM matching_bases
      ORDER BY CASE
                   /* This is the only ASC order */
                   WHEN ${paginationParams.sort === 'ancien'} THEN created
                   END ASC,
               CASE
                   WHEN ${paginationParams.sort === 'a-z'} THEN LOWER(title)
                   END ASC,
               CASE
                   WHEN ${paginationParams.sort === 'z-a'} THEN LOWER(title)
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
  const baseIds = searchResults.map(({ id }) => id)

  const bases = await prismaClient.base.findMany({
    where: {
      id: {
        in: baseIds,
      },
    },
    select: baseSelect(user),
  })

  const baseResourcesViewsCounts = await getBaseResourcesViewsCount(
    baseIds,
    computeBasesListResourcesWhereForUser(user),
  )

  const basesWithResourcesViews = bases.map((base) => ({
    ...base,
    _count: {
      ...base._count,
      resourcesViews:
        baseResourcesViewsCounts.find(({ baseId }) => baseId === base.id)?._sum
          .viewsCount ?? 0,
    },
  }))

  return orderItemsByIndexMap(basesWithResourcesViews, resultIndexById)
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
