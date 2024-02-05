import {
  defaultPaginationParams,
  defaultSearchParams,
  type PaginationParams,
  type SearchParams,
  type Sorting,
} from '@app/web/server/search/searchQueryParams'
import { prismaClient } from '@app/web/prismaClient'
import type { SessionUser } from '@app/web/auth/sessionUser'
import { resourceListSelect } from '@app/web/server/resources/getResourcesList'
import { orderItemsByIndexMap } from '@app/web/server/search/orderItemsByIndexMap'
import { enumArrayToSnakeCaseStringArray } from '@app/web/server/search/enumArrayToSnakeCaseStringArray'
import { searchToTsQueryInput } from '@app/web/server/search/searchToTsQueryInput'

/**
 * We are using advanced postgresql features not supported by Prisma for search.
 * We have to use raw SQL queries.
 * Raw SQL queries are only in search function files.
 * ⚠️ Keep in sync with prisma where filters for user rights / visibility
 * ⚠️ We cannot reuse query fragments from prismaClient with raw sql without opting out of security features. Keep conditions in sync in the 2 functions.
 */

export const countResources = async (
  searchParams: Pick<
    SearchParams,
    'query' | 'themes' | 'supportTypes' | 'targetAudiences'
  >,
  user: Pick<SessionUser, 'id'> | null,
) => {
  const searchTerm = searchToTsQueryInput(searchParams.query)
  const userId = user?.id ?? null

  const result = await prismaClient.$queryRaw<{ count: number }[]>`
      SELECT COUNT(DISTINCT resources.id)::integer as count
      FROM resources
               /* Join user contributor only to have only one row per resource */
               /* Null will never match as contributor_id is not nullable */
               LEFT JOIN resource_contributors
                         ON resources.id = resource_contributors.resource_id AND
                            resource_contributors.contributor_id = ${userId}::uuid
               LEFT JOIN bases ON resources.base_id = bases.id
          /* Join base member only to have only one row per resource */
          /* Null will never match as member_id is not nullable */
               LEFT JOIN base_members
                         ON bases.id = base_members.base_id AND base_members.member_id = ${userId}::uuid AND
                            base_members.accepted IS NOT NULL
      WHERE
          /* Resource status check */
          resources.deleted IS NULL
          /* Search term check */
        AND (
          ${searchTerm ?? ''} = ''
              OR to_tsvector('french', unaccent(
                  resources.title || ' '
                      || replace(array_to_string(resources.themes, ' '), '_', ' ') || ' '
                      || replace(array_to_string(resources.target_audiences, ' '), '_', ' ') || ' '
                      || replace(array_to_string(resources.support_types, ' '), '_', ' ') || ' '
                      || resources.description || ' '
                                       )) @@
                 to_tsquery('french', unaccent(${searchTerm}))
          )
        AND (
          /* Authorization*/
          /* Resource is public  */
          resources.is_public = true
              /* Resource is private and user is creator */
              /* Null will never match as created_by_id is not nullable */
              OR resources.created_by_id = ${userId}::uuid
              /* User is contributor */
              OR resource_contributors.id IS NOT NULL
              /* User is member of base */
              OR base_members.id IS NOT NULL
          )
        AND (
          /* Unexisting base or base non deleted */
          bases.deleted IS NULL
          )
        AND (
          ${searchParams.themes.length === 0} OR
          resources.themes && ${enumArrayToSnakeCaseStringArray(
            searchParams.themes,
          )}::theme[]
          )
        AND (
          ${searchParams.supportTypes.length === 0} OR
          resources.support_types && ${enumArrayToSnakeCaseStringArray(
            searchParams.supportTypes,
          )}::support_type[]
          )
        AND (
          ${searchParams.targetAudiences.length === 0} OR
          resources.target_audiences && ${enumArrayToSnakeCaseStringArray(
            searchParams.targetAudiences,
          )}::target_audience[]
          )
  `

  return result[0]?.count ?? 0
}

export const rankResources = async (
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
      WITH data AS (SELECT resources.id,
                           ts_rank_cd(
                                   to_tsvector('french', unaccent(
                                           resources.title || ' '
                                               || replace(array_to_string(resources.themes, ' '), '_', ' ') || ' '
                                               || replace(array_to_string(resources.target_audiences, ' '), '_', ' ') ||
                                           ' '
                                               || replace(array_to_string(resources.support_types, ' '), '_', ' ') ||
                                           ' '
                                               || resources.description || ' '
                                                         )),
                                   to_tsquery('french', unaccent(${searchTerm}))
                           )                              AS rank,
                           resources.created              AS created,
                           resources.updated              AS updated,
                           resources.published            AS published,
                           resources.last_published       AS last_published,
                           COUNT(DISTINCT resource_views.id)       AS views_count,
                           COUNT(DISTINCT collection_resources.id) AS collections_count
                    FROM resources
                             /* Join user contributor only to have only one row per resource */
                             /* Null will never match as contributor_id is not nullable */
                             LEFT JOIN resource_contributors
                                       ON resources.id = resource_contributors.resource_id AND
                                          resource_contributors.contributor_id = ${userId}::uuid
                             LEFT JOIN bases ON resources.base_id = bases.id
                        /* Join base member only to have only one row per resource */
                        /* Null will never match as member_id is not nullable */
                             LEFT JOIN base_members
                                       ON bases.id = base_members.base_id AND
                                          base_members.member_id = ${userId}::uuid AND
                                          base_members.accepted IS NOT NULL
                             LEFT JOIN resource_views ON resource_views.resource_id = resources.id
                             LEFT JOIN collection_resources ON collection_resources.resource_id = resources.id
                    WHERE
                        /* Resource status check */
                        resources.deleted IS NULL
                        /* Search term check */
                      AND (
                        ${searchTerm ?? ''} = ''
                            OR to_tsvector('french', unaccent(
                                resources.title || ' '
                                    || replace(array_to_string(resources.themes, ' '), '_', ' ') || ' '
                                    || replace(array_to_string(resources.target_audiences, ' '), '_', ' ') || ' '
                                    || replace(array_to_string(resources.support_types, ' '), '_', ' ') || ' '
                                    || resources.description || ' '
                                                     )) @@
                               to_tsquery('french', unaccent(${searchTerm}))
                        )
                      AND (
                        /* Authorization*/
                        /* Resource is public  */
                        resources.is_public = true
                            /* Resource is private and user is creator */
                            /* Null will never match as created_by_id is not nullable */
                            OR resources.created_by_id = ${userId}::uuid
                            /* User is contributor */
                            OR resource_contributors.id IS NOT NULL
                            /* User is member of base */
                            OR base_members.id IS NOT NULL
                        )
                      AND (
                        /* Unexisting base or base non deleted */
                        bases.deleted IS NULL
                        )
                      AND (
                        ${searchParams.themes.length === 0} OR
                        resources.themes && ${enumArrayToSnakeCaseStringArray(
                          searchParams.themes,
                        )}::theme[]
                        )
                      AND (
                        ${searchParams.supportTypes.length === 0} OR
                        resources.support_types && ${enumArrayToSnakeCaseStringArray(
                          searchParams.supportTypes,
                        )}::support_type[]
                        )
                      AND (
                        ${searchParams.targetAudiences.length === 0} OR
                        resources.target_audiences && ${enumArrayToSnakeCaseStringArray(
                          searchParams.targetAudiences,
                        )}::target_audience[]
                        )
                    GROUP BY resources.id)
      SELECT *
      FROM data
      ORDER BY CASE
                   /* This is the only ASC order, using publication date and fallback to created for drafts */
                   WHEN ${paginationParams.sort === 'ancien'} THEN COALESCE(published, created)
                   END ASC,
               CASE
                   /* Order by DESC the right data depending on the sort */
                   WHEN ${paginationParams.sort === 'pertinence'} THEN rank
                   WHEN ${paginationParams.sort === 'vues'} THEN views_count
                   WHEN ${paginationParams.sort === 'enregistrements'} THEN collections_count
                   END DESC,
               CASE
                   /* All these sort options use the most recent resources in case of equality */
                   WHEN ${(['recent', 'pertinence', 'vues', 'enregistrements'] satisfies Sorting[] as Sorting[]).includes(paginationParams.sort)}
                       THEN COALESCE(last_published, updated)
                   END DESC
      LIMIT ${paginationParams.perPage} OFFSET ${
        (paginationParams.page - 1) * paginationParams.perPage
      };
  `
  // Where IN does not garantee same order as the ids array so we have to sort the results in memory
  const resultIndexById = new Map(
    searchResults.map(({ id }, index) => [id, index]),
  )

  return { searchResults, resultIndexById }
}

export const searchResources = async (
  searchParams: SearchParams,
  paginationParams: PaginationParams,
  user: Pick<SessionUser, 'id'> | null,
) => {
  const { searchResults, resultIndexById } = await rankResources(
    searchParams,
    paginationParams,
    user,
  )

  const resources = await prismaClient.resource.findMany({
    where: {
      id: {
        in: searchResults.map(({ id }) => id),
      },
    },
    select: resourceListSelect(user),
  })

  return orderItemsByIndexMap(resources, resultIndexById)
}

export type SearchResourcesResult = Awaited<ReturnType<typeof searchResources>>

export const quickSearchResources = async (
  query: string,
  user: Pick<SessionUser, 'id'> | null,
) => {
  const { searchResults, resultIndexById } = await rankResources(
    { ...defaultSearchParams, query },
    { ...defaultPaginationParams, perPage: 3 },
    user,
  )

  const unsortedResources = await prismaClient.resource.findMany({
    where: {
      id: {
        in: searchResults.map(({ id }) => id),
      },
    },
    select: {
      id: true,
      title: true,
      slug: true,
    },
  })

  return orderItemsByIndexMap(unsortedResources, resultIndexById)
}
