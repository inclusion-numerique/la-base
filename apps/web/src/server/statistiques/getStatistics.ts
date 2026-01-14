import { prismaClient } from '@app/web/prismaClient'
import { debugPromiseTiming } from '@app/web/utils/debugPromiseTiming'
import { type CreationStatisticsResult } from './creationStatistics'
import { computeCumulative } from './statistics'
import {
  beneficiariesUsages,
  professionalSectorsUsages,
  resourceTypesUsages,
  themesUsages,
  type UsageStatisticsResult,
} from './usageStatistics'

type RechercheTimeframe = 'semaine' | 'mois' | 'total'
type CreationTimeframe = 'semaine' | 'mois' | 'total'
type UsageTimeframe = 'mois' | 'six-mois' | 'total'

export type StatisticsParams = {
  recherche?: RechercheTimeframe
  creation?: CreationTimeframe
  usage?: UsageTimeframe
}

type KpiStatisticsResult = [
  { category: 'public_resource'; count: number },
  { category: 'private_resource'; count: number },
  { category: 'resource_views'; count: number },
  { category: 'resource_views_last_month'; count: number },
  { category: 'resource_views_two_months_ago'; count: number },
  { category: 'feedback'; count: number },
  { category: 'feedback_average'; count: number },
]

type SingleSearchStatisticsResult = {
  period: string
  start_date: string
  end_date: string
  value: number
}[]

const MILLISECONDS_IN_MONTH = 1000 * 60 * 60 * 24 * 30

const elapsedMonthsSince = (date: Date) =>
  Math.floor((Date.now() - date.getTime()) / MILLISECONDS_IN_MONTH)

const TWELVE_LAST_MONTHS = 12

export const getKpisStatistics = async () => {
  const [kpiStatisticsResult, recentUsersCountResult, userCount] =
    await Promise.all([
      debugPromiseTiming(
        prismaClient.$queryRaw<KpiStatisticsResult>`
        SELECT 'public_ressource' AS category, COUNT(*)::integer AS count
        FROM resources
        WHERE is_public = true
          AND deleted IS NULL
          AND published IS NOT NULL
        UNION
        SELECT 'private_ressource' AS category, COUNT(*)::integer AS count
        FROM resources
        WHERE is_public = false
          AND deleted IS NULL
          AND published IS NOT NULL
        UNION
        SELECT 'ressource_views' AS category, COUNT(*)::integer
        FROM resource_views AS count
        UNION
        SELECT 'ressource_views_last_month' AS category, COUNT(*)::integer
        FROM (SELECT *
              FROM resource_views
              WHERE timestamp >= CURRENT_DATE - INTERVAL '30 days') AS count
        UNION
        SELECT 'feedback' AS category, COUNT(*)::integer AS count
        FROM feedback
        UNION
        SELECT 'feedback_average' AS category, AVG(rating)::numeric(10, 2)::float AS count
        FROM feedback
        ORDER BY category
      `,
        { name: 'KPI Statistics' },
      ),
      debugPromiseTiming(
        prismaClient.$queryRaw<{ count: number }[]>`
        SELECT COUNT(DISTINCT u.id)::integer AS count
        FROM users u
                 LEFT JOIN (
            SELECT by_id, MAX(timestamp) AS last_resource_event
            FROM resource_events
            GROUP BY by_id
        ) re ON re.by_id = u.id
                 LEFT JOIN (
            SELECT created_by_id, MAX(created) AS last_base_created
            FROM bases
            GROUP BY created_by_id
        ) bc ON bc.created_by_id = u.id
                 LEFT JOIN (
            SELECT member_id, MAX(accepted) AS last_membership_accepted
            FROM base_members
            GROUP BY member_id
        ) bm ON bm.member_id = u.id
                 LEFT JOIN (
            SELECT follower_id, MAX(followed) AS last_followed
            FROM profile_follows
            GROUP BY follower_id
        ) pf ON pf.follower_id = u.id
                 LEFT JOIN (
            SELECT user_id, MAX(timestamp) AS last_resource_viewed
            FROM resource_views
            GROUP BY user_id
        ) rv ON rv.user_id = u.id
        WHERE GREATEST(
                      COALESCE(re.last_resource_event, '1970-01-01'),
                      COALESCE(bc.last_base_created, '1970-01-01'),
                      COALESCE(bm.last_membership_accepted, '1970-01-01'),
                      COALESCE(pf.last_followed, '1970-01-01'),
                      COALESCE(rv.last_resource_viewed, '1970-01-01'),
                      u.created
              ) >= CURRENT_DATE - INTERVAL '30 days'
      `,
        { name: 'Recent Users Count' },
      ),
      debugPromiseTiming(prismaClient.user.count(), { name: 'User Count' }),
    ])
  const [
    feedback,
    feedbackAverage,
    privateResource,
    publicResource,
    ressourceViews,
    ressourceViewsLastMonth,
  ] = kpiStatisticsResult

  const recentUsersCount = recentUsersCountResult[0]?.count ?? 0

  return {
    publications: {
      count: publicResource.count + privateResource.count,
      public: publicResource.count,
      private: privateResource.count,
    },
    views: {
      count: ressourceViews.count,
      lastMonth: ressourceViewsLastMonth.count,
    },
    rates: {
      count: feedback.count,
      average: feedbackAverage.count,
    },
    recentUsers: recentUsersCount,
    users: userCount,
  }
}

export const getUsageStatistics = async (_params: StatisticsParams) => {
  const usageStatisticsDaysInterval = _params.usage === 'six-mois' ? 6 * 30 : 30
  const startDate = new Date()
  startDate.setDate(new Date().getDate() - usageStatisticsDaysInterval)

  const isTotal = _params.usage === 'total'

  const usageStatisticsResult = await debugPromiseTiming(
    prismaClient.$queryRaw<UsageStatisticsResult>`
          SELECT type,
                 key,
                 COUNT(*)::integer AS value
          FROM (SELECT 'beneficiaries' AS type,
                       unnest(beneficiaries)::text AS key
                FROM resources
                WHERE published IS NOT NULL
                  AND (published >= ${startDate.toISOString()}::date OR ${isTotal})
                  AND deleted IS NULL
                  AND is_public IS true
                UNION ALL
                SELECT 'professional_sectors' AS type,
                       unnest(professional_sectors)::text AS key
                FROM resources
                WHERE published IS NOT NULL
                  AND (published >= ${startDate.toISOString()}::date OR ${isTotal})
                  AND deleted IS NULL
                  AND is_public IS true
                UNION ALL
                SELECT 'themes' AS type,
                       unnest(themes)::text AS key
                FROM resources
                WHERE published IS NOT NULL
                  AND (published >= ${startDate.toISOString()}::date OR ${isTotal})
                  AND deleted IS NULL
                  AND is_public IS true
                UNION ALL
                SELECT 'resource_types' AS type,
                       unnest(resource_types)::text AS key
                FROM resources
                WHERE published IS NOT NULL
                  AND (published >= ${startDate.toISOString()}::date OR ${isTotal})
                  AND deleted IS NULL
                  AND is_public IS true) AS combined_data
          GROUP BY type, key
          ORDER BY value DESC`,
    { name: 'Usage Statistics' },
  )
  return {
    usage: {
      thematiques: themesUsages(usageStatisticsResult),
      beneficiaries: beneficiariesUsages(usageStatisticsResult),
      professionalSectors: professionalSectorsUsages(usageStatisticsResult),
      resourceTypes: resourceTypesUsages(usageStatisticsResult),
    },
  }
}

export const getSearchStatistics = async (_params: StatisticsParams) => {
  const searchStatisticsDaysInterval =
    _params.recherche === 'mois' || _params.recherche === 'total' ? 30 : 7

  const resourceViewsSeriesCount =
    _params.recherche === 'total'
      ? elapsedMonthsSince(new Date('2022-07-01'))
      : TWELVE_LAST_MONTHS
  const searchExecutionsSeriesCount =
    _params.recherche === 'total'
      ? elapsedMonthsSince(new Date('2024-01-01'))
      : TWELVE_LAST_MONTHS
  const collectionResourcesSeriesCount =
    _params.recherche === 'total'
      ? elapsedMonthsSince(new Date('2023-12-01'))
      : TWELVE_LAST_MONTHS

  const seriesEndDate = (isTotal: boolean, interval: number) =>
    isTotal ? 'CURRENT_DATE' : `CURRENT_DATE - INTERVAL '${interval} days'`

  const [
    resourceViewsResult,
    resourceViewsTotalCount,
    searchExecutionsResult,
    searchExecutionsTotalCount,
    collectionResourcesResult,
    collectionResourcesTotalCount,
  ] = await Promise.all([
    debugPromiseTiming(
      prismaClient.$queryRawUnsafe<SingleSearchStatisticsResult>(`
          WITH series AS (SELECT generate_series(CURRENT_DATE - INTERVAL '${
            searchStatisticsDaysInterval * resourceViewsSeriesCount
          } days',
                                                 ${seriesEndDate(
                                                   _params.recherche ===
                                                     'total',
                                                   searchStatisticsDaysInterval,
                                                 )},
                                                 '${searchStatisticsDaysInterval} days'::interval) AS start_date),
               range AS (SELECT start_date, (start_date + INTERVAL '${searchStatisticsDaysInterval} days') AS end_date
                         FROM series)
          SELECT (SELECT COUNT(*)::integer
                  FROM resource_views
                  WHERE timestamp >= r.start_date AND timestamp < r.end_date) AS value,
                 'Du ' || TO_CHAR(r.start_date, 'DD/MM/YY') || ' au ' || TO_CHAR(r.end_date, 'DD/MM/YY') AS period,
                 TO_CHAR(r.start_date, CASE WHEN ${searchStatisticsDaysInterval} = 30 THEN 'Mon' ELSE 'DD/MM' END) AS start_date,
                 TO_CHAR(r.end_date, CASE WHEN ${searchStatisticsDaysInterval} = 30 THEN 'Mon' ELSE 'DD/MM' END) AS end_date
          FROM range r`),
      { name: 'Resource Views Statistics' },
    ),
    debugPromiseTiming(prismaClient.resourceView.count(), {
      name: 'Resource Views Total Count',
    }),
    debugPromiseTiming(
      prismaClient.$queryRawUnsafe<SingleSearchStatisticsResult>(`
          WITH series AS (SELECT generate_series(CURRENT_DATE - INTERVAL '${
            searchStatisticsDaysInterval * searchExecutionsSeriesCount
          } days',
                                                 ${seriesEndDate(
                                                   _params.recherche ===
                                                     'total',
                                                   searchStatisticsDaysInterval,
                                                 )},
                                                 '${searchStatisticsDaysInterval} days'::interval) AS start_date),
               range AS (SELECT start_date, (start_date + INTERVAL '${searchStatisticsDaysInterval} days') AS end_date
                         FROM series)
          SELECT (SELECT COUNT(*)::integer
                  FROM search_executions
                  WHERE (query != '' OR array_length(themes, 1) > 0 OR array_length(resource_types, 1) > 0 OR
                         array_length(beneficiaries, 1) > 0 OR array_length(professional_sectors, 1) > 0 OR array_length(departments, 1) > 0)
                    AND timestamp >= r.start_date AND timestamp < r.end_date) AS value,
                 'Du ' || TO_CHAR(r.start_date, 'DD/MM/YY') || ' au ' || TO_CHAR(r.end_date, 'DD/MM/YY') AS period,
                 TO_CHAR(r.start_date, CASE WHEN ${searchStatisticsDaysInterval} = 30 THEN 'Mon' ELSE 'DD/MM' END) AS start_date,
                 TO_CHAR(r.end_date, CASE WHEN ${searchStatisticsDaysInterval} = 30 THEN 'Mon' ELSE 'DD/MM' END) AS end_date
          FROM range r`),
      { name: 'Search Executions Statistics' },
    ),
    debugPromiseTiming(
      prismaClient.searchExecution.count({
        where: {
          OR: [
            { query: { not: '' } },
            { themes: { isEmpty: false } },
            { resourceTypes: { isEmpty: false } },
            { beneficiaries: { isEmpty: false } },
            { professionalSectors: { isEmpty: false } },
            { departments: { isEmpty: false } },
          ],
        },
      }),
      { name: 'Search Executions Total Count' },
    ),
    debugPromiseTiming(
      prismaClient.$queryRawUnsafe<SingleSearchStatisticsResult>(`
          WITH series AS (SELECT generate_series(CURRENT_DATE - INTERVAL '${
            searchStatisticsDaysInterval * collectionResourcesSeriesCount
          } days',
                                                 ${seriesEndDate(
                                                   _params.recherche ===
                                                     'total',
                                                   searchStatisticsDaysInterval,
                                                 )},
                                                 '${searchStatisticsDaysInterval} days'::interval) AS start_date),
               range AS (SELECT start_date, (start_date + INTERVAL '${searchStatisticsDaysInterval} days') AS end_date
                         FROM series)
          SELECT (SELECT COUNT(*)::integer
                  FROM collection_resources
                  WHERE added >= r.start_date AND added < r.end_date) AS value,
                 'Du ' || TO_CHAR(r.start_date, 'DD/MM/YY') || ' au ' || TO_CHAR(r.end_date, 'DD/MM/YY') AS period,
                 TO_CHAR(r.start_date, CASE WHEN ${searchStatisticsDaysInterval} = 30 THEN 'Mon' ELSE 'DD/MM' END) AS start_date,
                 TO_CHAR(r.end_date, CASE WHEN ${searchStatisticsDaysInterval} = 30 THEN 'Mon' ELSE 'DD/MM' END) AS end_date
          FROM range r`),
      { name: 'Collection Resources Statistics' },
    ),
    debugPromiseTiming(prismaClient.collectionResource.count(), {
      name: 'Collection Resources Total Count',
    }),
  ])

  const resourceViewsTotal = resourceViewsResult.reduce(
    (acc, r) => acc + r.value,
    0,
  )
  const searchExecutionsTotal = searchExecutionsResult.reduce(
    (acc, r) => acc + r.value,
    0,
  )
  const collectionResourcesTotal = collectionResourcesResult.reduce(
    (acc, r) => acc + r.value,
    0,
  )

  const resourceViewsData =
    _params.recherche === 'total'
      ? computeCumulative(resourceViewsResult, ['value'])
      : resourceViewsResult

  const searchExecutionsData =
    _params.recherche === 'total'
      ? computeCumulative(searchExecutionsResult, ['value'])
      : searchExecutionsResult

  const collectionResourcesData =
    _params.recherche === 'total'
      ? computeCumulative(collectionResourcesResult, ['value'])
      : collectionResourcesResult

  return {
    resourceViews: {
      data: resourceViewsData,
      total: resourceViewsTotal,
      totalCount: resourceViewsTotalCount,
    },
    searchExecutions: {
      data: searchExecutionsData,
      total: searchExecutionsTotal,
      totalCount: searchExecutionsTotalCount,
    },
    collectionResources: {
      data: collectionResourcesData,
      total: collectionResourcesTotal,
      totalCount: collectionResourcesTotalCount,
    },
  }
}

export const getCreationsStatistics = async (_params: StatisticsParams) => {
  const creationStatisticsDaysInterval =
    _params.creation || _params.creation === 'total' ? 30 : 7
  const creationStatisticsSeriesCount =
    _params.creation === 'total'
      ? elapsedMonthsSince(new Date('2022-04-01'))
      : TWELVE_LAST_MONTHS

  const [
    creationStatisticsResult,
    totalCount,
    publicResourcesCount,
    privateResourcesCount,
    publicUsersCount,
    privateUsersCount,
    publicBasesCount,
    privateBasesCount,
  ] = await Promise.all([
    debugPromiseTiming(
      prismaClient.$queryRawUnsafe<CreationStatisticsResult>(`
          WITH series AS (SELECT generate_series(CURRENT_DATE - INTERVAL '${
            creationStatisticsDaysInterval * creationStatisticsSeriesCount
          } days',
                                                 CURRENT_DATE${
                                                   _params.creation !== 'total'
                                                     ? ` - INTERVAL '${creationStatisticsDaysInterval} days'`
                                                     : ''
                                                 },
                                                 '${creationStatisticsDaysInterval} days'::interval) AS start_date),
               range AS (SELECT start_date, (start_date + INTERVAL '${creationStatisticsDaysInterval} days') AS end_date
                         FROM series)
          SELECT (SELECT COUNT(*)::integer
                  FROM resources pu_r
                  WHERE pu_r.published >= start_date AND pu_r.published < end_date
                    AND pu_r.is_public IS true)                                                                    AS public_resources,
                 (SELECT COUNT(*)::integer
                  FROM resources pr_r
                  WHERE pr_r.published >= start_date AND pr_r.published < end_date
                    AND pr_r.is_public IS false)                                                                   AS private_resources,
                 (SELECT COUNT(*)::integer
                  FROM users pu_u
                  WHERE pu_u.created >= start_date AND pu_u.created < end_date AND pu_u.is_public IS true)         AS public_users,
                 (SELECT COUNT(*)::integer
                  FROM users pr_u
                  WHERE pr_u.created >= start_date AND pr_u.created < end_date AND pr_u.is_public IS false)        AS private_users,
                 (SELECT COUNT(*)::integer
                  FROM bases pu_b
                  WHERE pu_b.created >= start_date AND pu_b.created < end_date AND pu_b.is_public IS true)         AS public_bases,
                 (SELECT COUNT(*)::integer
                  FROM bases pr_b
                  WHERE pr_b.created >= start_date AND pr_b.created < end_date AND pr_b.is_public IS false)        AS private_bases,
                 'Du ' || TO_CHAR(start_date, 'DD/MM/YY') || ' au ' || TO_CHAR(end_date, 'DD/MM/YY')                     AS period,
                 TO_CHAR(start_date, CASE WHEN ${creationStatisticsDaysInterval} = 30 THEN 'Mon' ELSE 'DD/MM' END) AS start_date,
                 TO_CHAR(end_date, CASE WHEN ${creationStatisticsDaysInterval} = 30 THEN 'Mon' ELSE 'DD/MM' END)   AS end_date
          FROM range`),
      { name: 'Creation Statistics' },
    ),
    debugPromiseTiming(
      prismaClient.resource.count({
        where: { published: { not: null } },
      }),
      { name: 'Total Resources Count' },
    ),
    debugPromiseTiming(
      prismaClient.resource.count({
        where: { published: { not: null }, isPublic: true },
      }),
      { name: 'Public Resources Count' },
    ),
    debugPromiseTiming(
      prismaClient.resource.count({
        where: { published: { not: null }, isPublic: false },
      }),
      { name: 'Private Resources Count' },
    ),
    debugPromiseTiming(
      prismaClient.user.count({
        where: { isPublic: true },
      }),
      { name: 'Public Users Count' },
    ),
    debugPromiseTiming(
      prismaClient.user.count({
        where: { isPublic: false },
      }),
      { name: 'Private Users Count' },
    ),
    debugPromiseTiming(
      prismaClient.base.count({
        where: { isPublic: true },
      }),
      { name: 'Public Bases Count' },
    ),
    debugPromiseTiming(
      prismaClient.base.count({
        where: { isPublic: false },
      }),
      { name: 'Private Bases Count' },
    ),
  ])

  const creationData =
    _params.creation === 'total'
      ? computeCumulative(creationStatisticsResult, [
          'public_resources',
          'private_resources',
          'public_users',
          'private_users',
          'public_bases',
          'private_bases',
        ])
      : creationStatisticsResult

  const allTimeTotals = {
    publicResources: publicResourcesCount,
    privateResources: privateResourcesCount,
    publicUsers: publicUsersCount,
    privateUsers: privateUsersCount,
    publicBases: publicBasesCount,
    privateBases: privateBasesCount,
  }

  const allTimeProportions = {
    publicResources: Math.round(
      (publicResourcesCount * 100) /
        (publicResourcesCount + privateResourcesCount),
    ),
    privateResources: Math.round(
      (privateResourcesCount * 100) /
        (publicResourcesCount + privateResourcesCount),
    ),
    publicUsers: Math.round(
      (publicUsersCount * 100) / (publicUsersCount + privateUsersCount),
    ),
    privateUsers: Math.round(
      (privateUsersCount * 100) / (publicUsersCount + privateUsersCount),
    ),
    publicBases: Math.round(
      (publicBasesCount * 100) / (publicBasesCount + privateBasesCount),
    ),
    privateBases: Math.round(
      (privateBasesCount * 100) / (publicBasesCount + privateBasesCount),
    ),
  }

  return {
    data: creationData,
    proportions: allTimeProportions,
    totals: allTimeTotals,
    totalCount: totalCount,
  }
}
