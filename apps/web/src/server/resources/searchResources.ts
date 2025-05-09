import type { SessionUser } from '@app/web/auth/sessionUser'
import { prismaClient } from '@app/web/prismaClient'
import {
  resourceListSelect,
  toResourceWithFeedbackAverage,
} from '@app/web/server/resources/getResourcesList'
import { resourceFeedbackThresholds } from '@app/web/server/resources/resourceFeedbackThresholds'
import { enumArrayToSnakeCaseStringArray } from '@app/web/server/search/enumArrayToSnakeCaseStringArray'
import { orderItemsByIndexMap } from '@app/web/server/search/orderItemsByIndexMap'
import {
  type PaginationParams,
  type SearchParams,
  type Sorting,
  defaultPaginationParams,
  defaultSearchParams,
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
    title: 6,
    publishedBy: 5,
    description: 3,
  },
  threshold: 3,
}

export const countResources = async (
  searchParams: Pick<
    SearchParams,
    'query' | 'themes' | 'supportTypes' | 'targetAudiences'
  >,
  user: Pick<SessionUser, 'id'> | null,
) => {
  const searchTerm = cleanSearchTerm(searchParams.query) ?? ''
  const userId = user?.id ?? null

  const result = await prismaClient.$queryRaw<{ count: number }[]>`
      WITH search AS (SELECT unaccent(${searchTerm}) AS term),
           filtered_resources AS (SELECT resources.id                                                       as id,
                                         lower(unaccent(resources.title))                                   as search_title,
                                         lower(unaccent(resources.description))                             as search_description,
                                         lower(unaccent(coalesce(min(bases.title), min(creator.name), ''))) as search_published_by,
                                         resources.created                                                  AS created,
                                         resources.updated                                                  AS updated,
                                         resources.published                                                AS published,
                                         resources.last_published                                           AS last_published,
                                         COALESCE(resources.published, resources.created)                   AS date
                                  FROM resources
                                           /* Join user contributor only to have only one row per resource */
                                           /* Null will never match as contributor_id is not nullable */
                                           LEFT JOIN resource_contributors
                                                     ON resources.id = resource_contributors.resource_id AND
                                                        resource_contributors.contributor_id = ${userId}::uuid
                                           LEFT JOIN bases ON resources.base_id = bases.id
                                           LEFT JOIN users as creator ON resources.created_by_id = creator.id
                                      /* Join base member only to have only one row per resource */
                                      /* Null will never match as member_id is not nullable */
                                           LEFT JOIN base_members
                                                     ON bases.id = base_members.base_id AND
                                                        base_members.member_id = ${userId}::uuid AND
                                                        base_members.accepted IS NOT NULL
                                  WHERE
                                      /* Resource status check */
                                      resources.deleted IS NULL
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
                                      /* Resource must be published */
                                      resources.published IS NOT NULL
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
                                  GROUP BY resources.id),
           scored_resource AS (SELECT filtered_resources.*,
                                      (
                                          word_similarity((SELECT term FROM search), filtered_resources.search_title) *
                                          ${ranking.weights.title} +
                                          word_similarity((SELECT term FROM search),
                                                          filtered_resources.search_description) *
                                          ${ranking.weights.description} +
                                          word_similarity((SELECT term FROM search),
                                                          filtered_resources.search_published_by) *
                                          ${ranking.weights.publishedBy}
                                          ) as score
                               FROM filtered_resources),
           matching_resources AS (SELECT *
                                  FROM scored_resource
                                  WHERE (SELECT term FROM search) = ''
                                     OR score > ${ranking.threshold})
      SELECT COUNT(*)::integer as count
      FROM matching_resources
  `

  return result[0]?.count ?? 0
}

export const rankResources = async (
  searchParams: SearchParams,
  paginationParams: PaginationParams,
  user: Pick<SessionUser, 'id'> | null,
) => {
  // To keep good dev ux, we first fetch the ids of the resources matching the search
  // Then we fetch the full resources with all the data from prisma to have a strongly typed results

  const searchTerm = cleanSearchTerm(searchParams.query) ?? ''

  const userId = user?.id ?? null
  const searchResults = await prismaClient.$queryRaw<
    {
      id: string
      score: number
    }[]
  >`
      WITH search AS (SELECT unaccent(${searchTerm}) AS term),
           filtered_resources AS (SELECT resources.id                                                       as id,
                                         lower(unaccent(resources.title))                                   as search_title,
                                         lower(unaccent(resources.description))                             as search_description,
                                         lower(unaccent(coalesce(min(bases.title), min(creator.name), ''))) as search_published_by,
                                         resources.created                                                  AS created,
                                         resources.updated                                                  AS updated,
                                         resources.published                                                AS published,
                                         resources.last_published                                           AS last_published,
                                         resources.views_count                                              AS views_count,
                                         COUNT(DISTINCT resource_feedback.sent_by_id)                       AS feedbacks_count,
                                         AVG(resource_feedback.rating)                                      AS feedbacks_rating,
                                         COUNT(DISTINCT collection_resources.id)                            AS collections_count,
                                         COALESCE(resources.published, resources.created)                   AS date
                                  FROM resources
                                           /* Join user contributor only to have only one row per resource */
                                           /* Null will never match as contributor_id is not nullable */
                                           LEFT JOIN resource_contributors
                                                     ON resources.id = resource_contributors.resource_id AND
                                                        resource_contributors.contributor_id = ${userId}::uuid
                                           LEFT JOIN bases ON resources.base_id = bases.id
                                           LEFT JOIN users as creator ON resources.created_by_id = creator.id
                                      /* Join base member only to have only one row per resource */
                                      /* Null will never match as member_id is not nullable */
                                           LEFT JOIN base_members
                                                     ON bases.id = base_members.base_id AND
                                                        base_members.member_id = ${userId}::uuid AND
                                                        base_members.accepted IS NOT NULL
                                           LEFT JOIN resource_feedback
                                                     ON resource_feedback.resource_id = resources.id AND
                                                        resource_feedback.deleted IS NULL
                                           LEFT JOIN collection_resources ON collection_resources.resource_id = resources.id
                                  WHERE
                                      /* Resource status check */
                                      resources.deleted IS NULL
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
                                      /* Resource must be published */
                                      resources.published IS NOT NULL
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
                                  GROUP BY resources.id),
           scored_resource AS (SELECT filtered_resources.*,
                                      (
                                          word_similarity((SELECT term FROM search), filtered_resources.search_title) *
                                          ${ranking.weights.title} +
                                          word_similarity((SELECT term FROM search),
                                                          filtered_resources.search_description) *
                                          ${ranking.weights.description} +
                                          word_similarity((SELECT term FROM search),
                                                          filtered_resources.search_published_by) *
                                          ${ranking.weights.publishedBy}
                                          )   as score,
                                      CASE
                                          WHEN filtered_resources.feedbacks_rating IS NULL THEN 3
                                          WHEN filtered_resources.feedbacks_rating >= ${resourceFeedbackThresholds.beaucoup}
                                              THEN 5
                                          WHEN filtered_resources.feedbacks_rating >= ${resourceFeedbackThresholds.oui}
                                              THEN 4
                                          WHEN filtered_resources.feedbacks_rating >= ${resourceFeedbackThresholds.moyen}
                                              THEN 2
                                          ELSE 1
                                          END AS recommendation_score
                               FROM filtered_resources),
           matching_resources AS (SELECT *
                                  FROM scored_resource
                                  WHERE (SELECT term FROM search) = ''
                                     OR score > ${ranking.threshold})
      SELECT id, score
      FROM matching_resources
      ORDER BY CASE
                   /* This is the only ASC order, using publication date and fallback to created for drafts */
                   WHEN ${paginationParams.sort === 'ancien'}
                       THEN date
                   END ASC,
               CASE
                   /* Order by DESC the right data depending on the sort */
                   WHEN ${paginationParams.sort === 'pertinence'}
                       THEN score
                   WHEN ${paginationParams.sort === 'vues'}
                       THEN views_count
                   WHEN ${paginationParams.sort === 'recommandations'}
                       THEN recommendation_score
                   WHEN ${paginationParams.sort === 'enregistrements'}
                       THEN collections_count
                   END DESC,
               CASE
                   /* in case of same recommendation score, we sort by feedbacks count */
                   WHEN ${paginationParams.sort} = 'recommandations' THEN feedbacks_count
                   END DESC,
               CASE
                   /* All these sort options use the most recent resources in case of equality */
                   WHEN ${(['recent', 'pertinence', 'vues', 'enregistrements', 'recommandations'] satisfies Sorting[] as Sorting[]).includes(paginationParams.sort)}
                       THEN date
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
    searchResults.map(({ id, score }, index) => [
      id,
      {
        score,
        index,
      },
    ]),
  )

  return { searchResults, resultIndexById, debugIndexById }
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

  return orderItemsByIndexMap(
    resources.map(toResourceWithFeedbackAverage),
    resultIndexById,
  )
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
