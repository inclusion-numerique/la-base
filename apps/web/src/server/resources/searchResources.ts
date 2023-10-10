import {
  defaultSearchParams,
  SearchParams,
} from '@app/web/server/search/searchQueryParams'
import { prismaClient } from '@app/web/prismaClient'
import { SessionUser } from '@app/web/auth/sessionUser'
import { resourceListSelect } from '@app/web/server/resources/getResourcesList'
import { orderItemsByIndexMap } from '@app/web/server/search/orderItemsByIndexMap'
import { cleanSearchTerm } from '@app/web/server/search/cleanSearchTerm'

/**
 * We are using advanced postgresql features not supported by Prisma for search.
 * We have to use raw SQL queries.
 * Raw SQL queries are only in search function files.
 * ⚠️ Keep in sync with prisma where filters for user rights / visibility
 * ⚠️ We cannot reuse query fragments from prismaClient with raw sql without opting out of security features. Keep conditions in sync in the 2 functions.
 * ⚠️ If you make changes in the to_tsvector search, you have to update the index in the db using a manual migration
 *    ( see 20231010132236_search/migration.sql)
 */

export const countResources = async (
  searchParams: Pick<
    SearchParams,
    'query' | 'themes' | 'supportTypes' | 'targetAudiences'
  >,
  user: Pick<SessionUser, 'id'> | null,
) => {
  const searchTerm = cleanSearchTerm(searchParams.query)
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
              coalesce(${searchTerm}, '___empty___') = '___empty___' 
              OR to_tsvector('french', unaccent(resources.title || ' ' || resources.description)) @@
                 plainto_tsquery('french', unaccent(${searchTerm}))
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
`

  return result[0]?.count ?? 0
}

export const rankResources = async (
  searchParams: SearchParams,
  user: Pick<SessionUser, 'id'> | null,
) => {
  // To keep good dev ux, we first fetch the ids of the resources matching the search
  // Then we fetch the full resources with all the data from prisma to have good types

  const searchTerm = cleanSearchTerm(searchParams.query)
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
             to_tsvector('french', unaccent(resources.title || ' ' || resources.description))::text AS document_tsv,
             plainto_tsquery('french', unaccent(${searchTerm}))::text                               AS query,
             ts_rank(to_tsvector('french', unaccent(resources.title || ' ' || resources.description)),
                     plainto_tsquery('french', unaccent(${searchTerm})))                            AS rank,
             ts_rank_cd(to_tsvector('french', unaccent(resources.title || ' ' || resources.description)),
                        plainto_tsquery('french', unaccent(${searchTerm})))                         AS rank_cd
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
              coalesce(${searchTerm}, '___empty___') = '___empty___' 
              OR to_tsvector('french', unaccent(resources.title || ' ' || resources.description)) @@
                 plainto_tsquery('french', unaccent(${searchTerm}))
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
      /* TODO tags */
      /* Order by updated desc to have most recent first on empty query */
      ORDER BY rank DESC, resources.updated DESC
      LIMIT ${searchParams.perPage} OFFSET ${
        (searchParams.page - 1) * searchParams.perPage
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
  user: Pick<SessionUser, 'id'> | null,
) => {
  const { searchResults, resultIndexById } = await rankResources(
    searchParams,
    user,
  )

  const unsortedResources = await prismaClient.resource.findMany({
    where: {
      id: {
        in: searchResults.map(({ id }) => id),
      },
    },
    select: resourceListSelect,
  })

  return orderItemsByIndexMap(unsortedResources, resultIndexById)
}

export type SearchResourcesResult = Awaited<ReturnType<typeof searchResources>>

export const quickSearchResources = async (
  query: string,
  user: Pick<SessionUser, 'id'> | null,
) => {
  const { searchResults, resultIndexById } = await rankResources(
    { ...defaultSearchParams, query, perPage: 3 },
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
