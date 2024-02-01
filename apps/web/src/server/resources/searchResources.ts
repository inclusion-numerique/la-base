import type { Prisma } from '@prisma/client'
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
      SELECT count(*)::integer as count
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
      SELECT resources.id,
             ts_rank_cd(
                     to_tsvector('french', unaccent(
                             resources.title || ' '
                                 || replace(array_to_string(resources.themes, ' '), '_', ' ') || ' '
                                 || replace(array_to_string(resources.target_audiences, ' '), '_', ' ') || ' '
                                 || replace(array_to_string(resources.support_types, ' '), '_', ' ') || ' '
                                 || resources.description || ' '
                                           )),
                     to_tsquery('french', unaccent(${searchTerm}))
             ) AS rank
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
          /* TODO condition if query is empty ? */
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
      ORDER BY rank DESC, resources.last_published DESC, resources.updated DESC
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

export const resourceOrderBySorting = (
  sorting: Sorting,
):
  | undefined
  | Prisma.ResourceOrderByWithRelationAndSearchRelevanceInput
  | Prisma.ResourceOrderByWithRelationAndSearchRelevanceInput[] => {
  if (sorting === 'recent') {
    return [{ lastPublished: 'desc' }, { updated: 'desc' }]
  }
  if (sorting === 'ancien') {
    return [
      { lastPublished: { sort: 'asc', nulls: 'last' } },
      { created: 'asc' },
    ]
  }
  if (sorting === 'vues') {
    return [
      { views: { _count: 'desc' } },
      { lastPublished: 'desc' },
      { updated: 'desc' },
    ]
  }
  if (sorting === 'enregistrements') {
    return [
      { collections: { _count: 'desc' } },
      { lastPublished: 'desc' },
      { updated: 'desc' },
    ]
  }

  // No order by for 'pertinent' because rank from search query will be used
  return undefined
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
    orderBy: resourceOrderBySorting(paginationParams.sort),
  })

  return paginationParams.sort === 'pertinence'
    ? orderItemsByIndexMap(resources, resultIndexById)
    : resources
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
