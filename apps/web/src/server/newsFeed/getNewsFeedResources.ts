import { prismaClient } from '@app/web/prismaClient'
import {
  resourceListSelect,
  toResourceWithFeedbackAverage,
} from '@app/web/server/resources/getResourcesList'
import { enumArrayToSnakeCaseStringArray } from '@app/web/server/search/enumArrayToSnakeCaseStringArray'
import { PaginationParams } from '@app/web/server/search/searchQueryParams'
import { Prisma, ProfessionalSector, Theme } from '@prisma/client'
import { pascalCase } from 'change-case'

export const defaultNewsFeedPaginationParams: Readonly<PaginationParams> = {
  page: 1,
  perPage: 20,
  sort: 'recent',
}

export type NewsFeedFilters = {
  themes: Theme[] | string[]
  professionalSectors: ProfessionalSector[] | string[]
  profileSlug?: string
  baseSlug?: string
}

const getUserContextCTEs = (userId: string) => Prisma.sql`
  followedBases AS (
    SELECT base_id FROM base_follows WHERE follower_id = ${userId}::uuid
  ),
  followedProfiles AS (
    SELECT profile_id FROM profile_follows WHERE follower_id = ${userId}::uuid
  ),
  userPreferences AS (
    SELECT themes, professional_sectors
    FROM news_feed
    WHERE user_id = ${userId}::uuid
  )`

const getFollowedPublishedResourcesCTE = () => Prisma.sql`
  publishedResources AS (
    SELECT
      r.id,
      r.published AS most_recent_date
    FROM resources r
    LEFT JOIN bases b ON r.base_id = b.id
    WHERE r.deleted IS NULL
      AND r.published IS NOT NULL
      AND r.is_public = true
      AND (b.id IS NULL OR b.deleted IS NULL)
      AND (
        r.base_id IN (SELECT base_id FROM followedBases)
        OR r.created_by_id IN (SELECT profile_id FROM followedProfiles)
      )
  )`

const getFollowedUpdatedResourcesCTE = () => Prisma.sql`
  updatedResources AS (
    SELECT
      r.id,
      r.last_published AS most_recent_date
    FROM resources r
    LEFT JOIN bases b ON r.base_id = b.id
    WHERE r.deleted IS NULL
      AND r.published IS NOT NULL
      AND r.last_published IS NOT NULL
      AND r.last_published > r.published
      AND r.is_public = true
      AND (b.id IS NULL OR b.deleted IS NULL)
      AND (
        r.base_id IN (SELECT base_id FROM followedBases)
        OR r.created_by_id IN (SELECT profile_id FROM followedProfiles)
      )
  )`

const getFollowedSavedInCollectionResourcesCTE = () => Prisma.sql`
  savedInCollectionResources AS (
    SELECT
      r.id,
      cr.added AS most_recent_date
    FROM resources r
    LEFT JOIN bases b ON r.base_id = b.id
    INNER JOIN collection_resources cr ON cr.resource_id = r.id
    INNER JOIN collections c ON c.id = cr.collection_id AND c.deleted IS NULL AND c.is_public = true
    WHERE r.deleted IS NULL
      AND r.published IS NOT NULL
      AND r.is_public = true
      AND (b.id IS NULL OR b.deleted IS NULL)
      AND (
        c.base_id IN (SELECT base_id FROM followedBases)
        OR c.created_by_id IN (SELECT profile_id FROM followedProfiles)
      )
  )`

const getPublishedResourcesCTE = () => Prisma.sql`
  publishedResources AS (
    SELECT
      r.id,
      r.published AS most_recent_date
    FROM resources r
    LEFT JOIN bases b ON r.base_id = b.id
    WHERE r.deleted IS NULL
      AND r.published IS NOT NULL
      AND r.is_public = true
      AND (b.id IS NULL OR b.deleted IS NULL)
      AND (
        r.base_id IN (SELECT base_id FROM followedBases)
        OR r.created_by_id IN (SELECT profile_id FROM followedProfiles)
        OR EXISTS (SELECT 1 FROM userPreferences WHERE r.themes && themes)
        OR EXISTS (SELECT 1 FROM userPreferences WHERE r.professional_sectors && professional_sectors)
      )
  )`

const getUpdatedResourcesCTE = () => Prisma.sql`
  updatedResources AS (
    SELECT
      r.id,
      r.last_published AS most_recent_date
    FROM resources r
    LEFT JOIN bases b ON r.base_id = b.id
    WHERE r.deleted IS NULL
      AND r.published IS NOT NULL
      AND r.last_published IS NOT NULL
      AND r.last_published > r.published
      AND r.is_public = true
      AND (b.id IS NULL OR b.deleted IS NULL)
      AND (
        r.base_id IN (SELECT base_id FROM followedBases)
        OR r.created_by_id IN (SELECT profile_id FROM followedProfiles)
        OR EXISTS (SELECT 1 FROM userPreferences WHERE r.themes && themes)
        OR EXISTS (SELECT 1 FROM userPreferences WHERE r.professional_sectors && professional_sectors)
      )
  )`

// Reusable filtering helper functions
const buildThemeFilter = (themes: Theme[] | string[]) => {
  if (themes.length === 0) {
    return Prisma.sql`TRUE`
  }

  if (themes.includes('tout' as any)) {
    return Prisma.sql`EXISTS (
      SELECT 1 FROM resources r 
      INNER JOIN userPreferences up ON r.themes && up.themes
      WHERE r.id = ae.id
    )`
  }

  return Prisma.sql`EXISTS (
    SELECT 1 FROM resources r 
    WHERE r.id = ae.id AND r.themes && ${enumArrayToSnakeCaseStringArray(
      themes,
    )}::theme[]
  )`
}

const buildProfessionalSectorFilter = (
  professionalSectors: ProfessionalSector[] | string[],
) => {
  if (professionalSectors.length === 0) {
    return Prisma.sql`TRUE`
  }

  if (professionalSectors.includes('tout' as any)) {
    return Prisma.sql`EXISTS (
      SELECT 1 FROM resources r 
      INNER JOIN userPreferences up ON r.professional_sectors && up.professional_sectors
      WHERE r.id = ae.id
    )`
  }

  return Prisma.sql`EXISTS (
    SELECT 1 FROM resources r 
    WHERE r.id = ae.id AND r.professional_sectors && ${enumArrayToSnakeCaseStringArray(
      professionalSectors,
    )}::professional_sector[]
  )`
}

const buildProfileSlugFilter = (profileSlug?: string) => {
  if (!profileSlug) {
    return Prisma.sql`TRUE`
  }

  if (profileSlug === 'tout') {
    return Prisma.sql`(
      EXISTS (SELECT 1 FROM resources r WHERE r.id = ae.id AND r.created_by_id IN (SELECT profile_id FROM followedProfiles))
    )`
  }

  return Prisma.sql`(
    EXISTS (
      SELECT 1 FROM resources r
      INNER JOIN users u ON u.id = r.created_by_id 
      WHERE r.id = ae.id AND u.slug = ${profileSlug}::text
    )
    OR
    (ae.collection_id IS NOT NULL AND EXISTS (
      SELECT 1 FROM collections c
      INNER JOIN users u ON u.id = c.created_by_id
      WHERE c.id = ae.collection_id AND u.slug = ${profileSlug}::text
    ))
  )`
}

const buildBaseSlugFilter = (baseSlug?: string) => {
  if (!baseSlug) {
    return Prisma.sql`TRUE`
  }

  if (baseSlug === 'tout') {
    return Prisma.sql`(
      EXISTS (SELECT 1 FROM resources r WHERE r.id = ae.id AND r.base_id IN (SELECT base_id FROM followedBases))
    )`
  }

  return Prisma.sql`(
    EXISTS (
      SELECT 1 FROM resources r
      INNER JOIN bases b ON b.id = r.base_id
      WHERE r.id = ae.id AND b.slug = ${baseSlug}::text
    )
    OR
    (ae.collection_id IS NOT NULL AND EXISTS (
      SELECT 1 FROM collections c
      INNER JOIN bases b ON b.id = c.base_id
      WHERE c.id = ae.collection_id AND b.slug = ${baseSlug}::text
    ))
  )`
}

const buildSpecialProfileOrBaseFilter = (
  baseSlug?: string,
  profileSlug?: string,
) => {
  // Special case: when both base and profile are 'tout', no additional filtering needed
  if (baseSlug === 'tout' && profileSlug === 'tout') {
    return Prisma.sql`TRUE`
  }

  return Prisma.sql`(
    ${buildProfileSlugFilter(profileSlug)}
    AND
    ${buildBaseSlugFilter(baseSlug)}
  )`
}

export const countNewsFeedResources = async (userId: string) => {
  const result = await prismaClient.$queryRaw<
    {
      item_type:
        | 'theme'
        | 'professional_sector'
        | 'followed_base'
        | 'followed_profile'
      item_value: string
      count: number
    }[]
  >(
    Prisma.sql`
      WITH ${getUserContextCTEs(userId)},
      userThemes AS (
        SELECT UNNEST(themes) as theme FROM userPreferences
      ),
      userProfessionalSectors AS (
        SELECT UNNEST(professional_sectors) as professional_sector FROM userPreferences
      ),
      resourceCounts AS (
        -- Themes
        SELECT 
          'theme'::text as item_type,
          ut.theme::text as item_value,
          COUNT(DISTINCT r.id)::integer as count
        FROM userThemes ut
        CROSS JOIN resources r
        LEFT JOIN bases b ON r.base_id = b.id
        LEFT JOIN collection_resources cr ON cr.resource_id = r.id
        LEFT JOIN collections c ON c.id = cr.collection_id AND c.deleted IS NULL AND c.is_public = true
        WHERE r.deleted IS NULL
          AND r.published IS NOT NULL
          AND r.is_public = true
          AND (b.id IS NULL OR b.deleted IS NULL)
          AND r.themes @> ARRAY[ut.theme]
          AND (
            r.base_id IN (SELECT base_id FROM followedBases)
            OR
            r.created_by_id IN (SELECT profile_id FROM followedProfiles)
            OR
            (
              EXISTS (SELECT 1 FROM userPreferences WHERE r.themes && themes)
            )
            OR
            (
              EXISTS (SELECT 1 FROM userPreferences WHERE r.professional_sectors && professional_sectors)
            )
            OR
            (
              cr.id IS NOT NULL AND (
                c.base_id IN (SELECT base_id FROM followedBases)
                OR c.created_by_id IN (SELECT profile_id FROM followedProfiles)
              )
            )
          )
        GROUP BY ut.theme
        
        UNION ALL
        
        -- Professional sectors
        SELECT 
          'professional_sector'::text as item_type,
          ups.professional_sector::text as item_value,
          COUNT(DISTINCT r.id)::integer as count
        FROM userProfessionalSectors ups
        CROSS JOIN resources r
        LEFT JOIN bases b ON r.base_id = b.id
        LEFT JOIN collection_resources cr ON cr.resource_id = r.id
        LEFT JOIN collections c ON c.id = cr.collection_id AND c.deleted IS NULL AND c.is_public = true
        WHERE r.deleted IS NULL
          AND r.published IS NOT NULL
          AND r.is_public = true
          AND (b.id IS NULL OR b.deleted IS NULL)
          AND r.professional_sectors @> ARRAY[ups.professional_sector]
          AND (
            r.base_id IN (SELECT base_id FROM followedBases)
            OR
            r.created_by_id IN (SELECT profile_id FROM followedProfiles)
            OR
            (
              EXISTS (SELECT 1 FROM userPreferences WHERE r.themes && themes)
            )
            OR
            (
              EXISTS (SELECT 1 FROM userPreferences WHERE r.professional_sectors && professional_sectors)
            )
            OR
            (
              cr.id IS NOT NULL AND (
                c.base_id IN (SELECT base_id FROM followedBases)
                OR c.created_by_id IN (SELECT profile_id FROM followedProfiles)
              )
            )
          )
        GROUP BY ups.professional_sector
        
        UNION ALL
        
        -- Followed bases
        SELECT 
          'followed_base'::text as item_type,
          b.slug::text as item_value,
          COUNT(DISTINCT r.id)::integer as count
        FROM bases b
        INNER JOIN followedBases fb ON b.id = fb.base_id
        LEFT JOIN resources r ON (
          r.base_id = b.id OR EXISTS (
            SELECT 1 FROM collection_resources cr
            INNER JOIN collections c ON c.id = cr.collection_id
            WHERE cr.resource_id = r.id AND c.base_id = b.id AND c.deleted IS NULL AND c.is_public = true
          )
        )
        LEFT JOIN collection_resources cr ON cr.resource_id = r.id
        LEFT JOIN collections c ON c.id = cr.collection_id AND c.deleted IS NULL AND c.is_public = true
        WHERE b.deleted IS NULL
          AND r.deleted IS NULL
          AND r.published IS NOT NULL
          AND r.is_public = true
          AND (
            r.base_id IN (SELECT base_id FROM followedBases)
            OR
            r.created_by_id IN (SELECT profile_id FROM followedProfiles)
            OR
            (
              EXISTS (SELECT 1 FROM userPreferences WHERE r.themes && themes)
            )
            OR
            (
              EXISTS (SELECT 1 FROM userPreferences WHERE r.professional_sectors && professional_sectors)
            )
            OR
            (
              cr.id IS NOT NULL AND (
                c.base_id IN (SELECT base_id FROM followedBases)
                OR c.created_by_id IN (SELECT profile_id FROM followedProfiles)
              )
            )
          )
        GROUP BY b.id, b.slug
        
        UNION ALL
        
        -- Followed profiles
        SELECT 
          'followed_profile'::text as item_type,
          p.slug::text as item_value,
          COUNT(DISTINCT r.id)::integer as count
        FROM users p
        INNER JOIN followedProfiles fp ON p.id = fp.profile_id
        LEFT JOIN resources r ON (
          r.created_by_id = p.id OR EXISTS (
            SELECT 1 FROM collection_resources cr
            INNER JOIN collections c ON c.id = cr.collection_id
            WHERE cr.resource_id = r.id AND c.created_by_id = p.id AND c.deleted IS NULL AND c.is_public = true
          )
        )
        LEFT JOIN collection_resources cr ON cr.resource_id = r.id
        LEFT JOIN collections c ON c.id = cr.collection_id AND c.deleted IS NULL AND c.is_public = true
        WHERE p.deleted IS NULL
          AND r.deleted IS NULL
          AND r.published IS NOT NULL
          AND r.is_public = true
          AND (
            r.base_id IN (SELECT base_id FROM followedBases)
            OR
            r.created_by_id IN (SELECT profile_id FROM followedProfiles)
            OR
            (
              EXISTS (SELECT 1 FROM userPreferences WHERE r.themes && themes)
            )
            OR
            (
              EXISTS (SELECT 1 FROM userPreferences WHERE r.professional_sectors && professional_sectors)
            )
            OR
            (
              cr.id IS NOT NULL AND (
                c.base_id IN (SELECT base_id FROM followedBases)
                OR c.created_by_id IN (SELECT profile_id FROM followedProfiles)
              )
            )
          )
        GROUP BY p.id, p.slug
      )
      SELECT item_type, item_value, count FROM resourceCounts
    `,
  )

  const counts = {
    professionalsSectors: {} as Record<ProfessionalSector, { count: number }>,
    themes: {} as Record<Theme, { count: number }>,
    followedBases: {} as Record<string, { count: number }>,
    followedProfiles: {} as Record<string, { count: number }>,
  }

  const processors = {
    theme: (row: { item_value: string; count: number }) => {
      counts.themes[pascalCase(row.item_value) as Theme] = { count: row.count }
    },
    professional_sector: (row: { item_value: string; count: number }) => {
      counts.professionalsSectors[
        pascalCase(row.item_value) as ProfessionalSector
      ] = { count: row.count }
    },
    followed_base: (row: { item_value: string; count: number }) => {
      counts.followedBases[row.item_value] = { count: row.count }
    },
    followed_profile: (row: { item_value: string; count: number }) => {
      counts.followedProfiles[row.item_value] = { count: row.count }
    },
  }

  for (const row of result) {
    processors[row.item_type]?.(row)
  }

  return counts
}

export const getFollowedResourceIds = async (
  userId: string,
  paginationParams: PaginationParams = defaultNewsFeedPaginationParams,
  lastOpenedAt?: Date,
) => {
  return await prismaClient.$queryRaw<
    {
      id: string
      published: Date
      event_type: 'published' | 'updated' | 'saved_in_collection'
      source:
        | 'base'
        | 'profile'
        | 'theme'
        | 'professional_sector'
        | 'savedCollectionFromBase'
        | 'savedCollectionFromProfile'
      seen: boolean
      collection_id?: string
      added_to_collection_at?: Date
    }[]
  >(
    Prisma.sql`
      WITH ${getUserContextCTEs(userId)},
      ${getFollowedPublishedResourcesCTE()},
      ${getFollowedUpdatedResourcesCTE()},
      ${getFollowedSavedInCollectionResourcesCTE()},
      publishedResourcesWithFields AS (
        SELECT
          pr.id,
          pr.most_recent_date as published,
          pr.most_recent_date,
          'published'::text AS event_type,
          CASE
            WHEN r.base_id IN (SELECT base_id FROM followedBases) THEN 'base'::text
            WHEN r.created_by_id IN (SELECT profile_id FROM followedProfiles) THEN 'profile'::text
            ELSE 'base'::text
          END AS source,
          NULL::uuid AS collection_id,
          NULL::timestamp AS added_to_collection_at
        FROM publishedResources pr
        JOIN resources r ON r.id = pr.id
      ),
      updatedResourcesWithFields AS (
        SELECT
          ur.id,
          r.published,
          ur.most_recent_date,
          'updated'::text AS event_type,
          CASE
            WHEN r.base_id IN (SELECT base_id FROM followedBases) THEN 'base'::text
            WHEN r.created_by_id IN (SELECT profile_id FROM followedProfiles) THEN 'profile'::text
            ELSE 'base'::text
          END AS source,
          NULL::uuid AS collection_id,
          NULL::timestamp AS added_to_collection_at
        FROM updatedResources ur
        JOIN resources r ON r.id = ur.id
      ),
      savedInCollectionResourcesWithFields AS (
        SELECT
          sr.id,
          r.published,
          sr.most_recent_date,
          'saved_in_collection'::text AS event_type,
          CASE
            WHEN c.base_id IN (SELECT base_id FROM followedBases) THEN 'savedCollectionFromBase'::text
            ELSE 'savedCollectionFromProfile'::text
          END AS source,
          c.id AS collection_id,
          sr.most_recent_date AS added_to_collection_at
        FROM savedInCollectionResources sr
        JOIN resources r ON r.id = sr.id
        JOIN collection_resources cr ON cr.resource_id = sr.id
        JOIN collections c ON c.id = cr.collection_id
      ),
      allEvents AS (
        SELECT * FROM publishedResourcesWithFields
        UNION ALL
        SELECT * FROM updatedResourcesWithFields
        UNION ALL
        SELECT * FROM savedInCollectionResourcesWithFields
      ),
      candidates AS (
        SELECT
          ae.*,
          CASE
            WHEN rv.id IS NOT NULL THEN true
            WHEN ${
              lastOpenedAt
                ? Prisma.sql`ae.most_recent_date <= ${lastOpenedAt}::timestamp`
                : Prisma.sql`false`
            } THEN true
            ELSE false
          END AS seen
        FROM allEvents ae
        LEFT JOIN resource_views rv ON rv.resource_id = ae.id AND rv.user_id = ${userId}::uuid
      ),
      picked AS (
        SELECT DISTINCT ON (id) *
        FROM candidates
        ORDER BY id, most_recent_date DESC
      )
      SELECT *
      FROM picked
      ORDER BY most_recent_date DESC
      LIMIT ${paginationParams.perPage}
      OFFSET ${(paginationParams.page - 1) * paginationParams.perPage}
    `,
  )
}

export const getFollowedUnseenResourcesCount = async (
  userId: string,
  lastOpenedAt: Date,
) => {
  const result = await prismaClient.$queryRaw<
    {
      total: number
      count: number
    }[]
  >(
    Prisma.sql`
      WITH ${getUserContextCTEs(userId)},
      ${getFollowedPublishedResourcesCTE()},
      ${getFollowedUpdatedResourcesCTE()},
      ${getFollowedSavedInCollectionResourcesCTE()},
      allEvents AS (
        SELECT * FROM publishedResources
        UNION ALL
        SELECT * FROM updatedResources
        UNION ALL
        SELECT * FROM savedInCollectionResources
      ),
      candidates AS (
        SELECT ae.*
        FROM allEvents ae
        LEFT JOIN resource_views rv ON rv.resource_id = ae.id AND rv.user_id = ${userId}::uuid
        WHERE rv.id IS NULL
      ),
      picked AS (
        SELECT DISTINCT ON (id) *
        FROM candidates
        WHERE most_recent_date > ${lastOpenedAt}::timestamp
        ORDER BY id, most_recent_date DESC
      )
      SELECT 
        COUNT(*)::integer as total,
        COUNT(*)::integer as count
      FROM picked
    `,
  )

  return {
    total: result[0]?.total ?? 0,
    count: result[0]?.count ?? 0,
  }
}

export const getResourceIds = async (
  userId: string,
  filters: NewsFeedFilters = { themes: [], professionalSectors: [] },
  paginationParams: PaginationParams = defaultNewsFeedPaginationParams,
  lastOpenedAt?: Date,
) => {
  const {
    themes = [],
    professionalSectors = [],
    profileSlug,
    baseSlug,
  } = filters

  return await prismaClient.$queryRaw<
    {
      id: string
      published: Date
      event_type: 'published' | 'updated' | 'saved_in_collection'
      source:
        | 'base'
        | 'profile'
        | 'theme'
        | 'professional_sector'
        | 'savedCollectionFromBase'
        | 'savedCollectionFromProfile'
      seen: boolean
      collection_id?: string
      added_to_collection_at?: Date
    }[]
  >(
    Prisma.sql`
  WITH ${getUserContextCTEs(userId)},
  ${getPublishedResourcesCTE()},
  ${getUpdatedResourcesCTE()},
  ${getFollowedSavedInCollectionResourcesCTE()},
  publishedResourcesWithFields AS (
    SELECT
      pr.id,
      pr.most_recent_date as published,
      pr.most_recent_date,
      'published'::text AS event_type,
      CASE
        WHEN r.base_id IN (SELECT base_id FROM followedBases) THEN 'base'::text
        WHEN r.created_by_id IN (SELECT profile_id FROM followedProfiles) THEN 'profile'::text
        WHEN EXISTS (SELECT 1 FROM userPreferences WHERE r.themes && themes) THEN 'theme'::text
        WHEN EXISTS (SELECT 1 FROM userPreferences WHERE r.professional_sectors && professional_sectors) THEN 'professional_sector'::text
        ELSE 'base'::text
      END AS source,
      NULL::uuid AS collection_id,
      NULL::timestamp AS added_to_collection_at
    FROM publishedResources pr
    JOIN resources r ON r.id = pr.id
  ),
  updatedResourcesWithFields AS (
    SELECT
      ur.id,
      r.published,
      ur.most_recent_date,
      'updated'::text AS event_type,
      CASE
        WHEN r.base_id IN (SELECT base_id FROM followedBases) THEN 'base'::text
        WHEN r.created_by_id IN (SELECT profile_id FROM followedProfiles) THEN 'profile'::text
        WHEN EXISTS (SELECT 1 FROM userPreferences WHERE r.themes && themes) THEN 'theme'::text
        WHEN EXISTS (SELECT 1 FROM userPreferences WHERE r.professional_sectors && professional_sectors) THEN 'professional_sector'::text
        ELSE 'base'::text
      END AS source,
      NULL::uuid AS collection_id,
      NULL::timestamp AS added_to_collection_at
    FROM updatedResources ur
    JOIN resources r ON r.id = ur.id
  ),
  savedInCollectionResourcesWithFields AS (
    SELECT
      sr.id,
      r.published,
      sr.most_recent_date,
      'saved_in_collection'::text AS event_type,
      CASE
        WHEN c.base_id IN (SELECT base_id FROM followedBases) THEN 'savedCollectionFromBase'::text
        ELSE 'savedCollectionFromProfile'::text
      END AS source,
      c.id AS collection_id,
      sr.most_recent_date AS added_to_collection_at
    FROM savedInCollectionResources sr
    JOIN resources r ON r.id = sr.id
    JOIN collection_resources cr ON cr.resource_id = sr.id
    JOIN collections c ON c.id = cr.collection_id
  ),
  allEvents AS (
    SELECT * FROM publishedResourcesWithFields
    UNION ALL
    SELECT * FROM updatedResourcesWithFields
    UNION ALL
    SELECT * FROM savedInCollectionResourcesWithFields
  ),
  candidates AS (
    SELECT
      ae.*,
      CASE
        WHEN rv.id IS NOT NULL THEN true
        WHEN ${
          lastOpenedAt
            ? Prisma.sql`ae.most_recent_date <= ${lastOpenedAt}::timestamp`
            : Prisma.sql`false`
        } THEN true
        ELSE false
      END AS seen
    FROM allEvents ae
    LEFT JOIN resource_views rv ON rv.resource_id = ae.id AND rv.user_id = ${userId}::uuid
    WHERE ${buildThemeFilter(themes)}
      AND ${buildProfessionalSectorFilter(professionalSectors)}
      AND ${buildProfileSlugFilter(profileSlug)}
      AND ${buildBaseSlugFilter(baseSlug)}
  ),
  picked AS (
    SELECT DISTINCT ON (id) *
    FROM candidates
    ORDER BY id, most_recent_date DESC
  )

  SELECT *
  FROM picked
  ORDER BY most_recent_date DESC
  LIMIT ${paginationParams.perPage}
  OFFSET ${(paginationParams.page - 1) * paginationParams.perPage}
`,
  )
}

export const getNewsFeedResourcesServer = async (
  userId: string,
  filters: NewsFeedFilters = { themes: [], professionalSectors: [] },
  paginationParams: PaginationParams = defaultNewsFeedPaginationParams,
  lastOpenedAt?: Date,
) => {
  const newsFeedResources = await getResourceIds(
    userId,
    filters,
    paginationParams,
    lastOpenedAt,
  )

  const resourceIds = newsFeedResources.map(({ id }) => id)
  const resourceMap = new Map(
    newsFeedResources.map(
      ({
        id,
        seen,
        source,
        event_type,
        collection_id,
        added_to_collection_at,
      }) => [
        id,
        {
          source,
          seen,
          eventType: event_type,
          collectionId: collection_id,
          addedToCollectionAt: added_to_collection_at,
        },
      ],
    ),
  )

  const resources = await prismaClient.resource.findMany({
    where: { id: { in: resourceIds } },
    select: {
      ...resourceListSelect({ id: userId }),
      themes: true,
      professionalSectors: true,
    },
  })

  // keep the same indexing
  const orderMap = new Map(resourceIds.map((id, index) => [id, index]))
  const sortedResources = resources.sort(
    (a, b) => (orderMap.get(a.id) ?? 0) - (orderMap.get(b.id) ?? 0),
  )

  return {
    resources: sortedResources.map((resource) => {
      const extraData = resourceMap.get(resource.id) || {
        source: 'base' as const,
        seen: false,
        eventType: 'published' as const,
        collectionId: undefined,
        addedToCollectionAt: undefined,
      }

      return {
        ...toResourceWithFeedbackAverage(resource),
        source: extraData.source,
        seen: extraData.seen,
        eventType: extraData.eventType,
        collectionId: extraData.collectionId,
        addedToCollectionAt: extraData.addedToCollectionAt,
      }
    }),
  }
}

export type NewsFeedResourceServer = Awaited<
  ReturnType<typeof getNewsFeedResourcesServer>
>['resources'][0]

export const getUnseenResourcesCount = async (
  userId: string,
  lastOpenedAt: Date,
  filters: NewsFeedFilters = { themes: [], professionalSectors: [] },
) => {
  const {
    themes = [],
    professionalSectors = [],
    profileSlug,
    baseSlug,
  } = filters

  const result = await prismaClient.$queryRaw<
    {
      total: number
      count: number
    }[]
  >(
    Prisma.sql`
      WITH ${getUserContextCTEs(userId)},
      ${getPublishedResourcesCTE()},
      ${getUpdatedResourcesCTE()},
      ${getFollowedSavedInCollectionResourcesCTE()},
      publishedResourcesWithFields AS (
        SELECT
          pr.id,
          pr.most_recent_date,
          'published'::text AS event_type,
          NULL::uuid AS collection_id
        FROM publishedResources pr
      ),
      updatedResourcesWithFields AS (
        SELECT
          ur.id,
          ur.most_recent_date,
          'updated'::text AS event_type,
          NULL::uuid AS collection_id
        FROM updatedResources ur
      ),
      savedInCollectionResourcesWithFields AS (
        SELECT
          sr.id,
          sr.most_recent_date,
          'saved_in_collection'::text AS event_type,
          c.id AS collection_id
        FROM savedInCollectionResources sr
        JOIN collection_resources cr ON cr.resource_id = sr.id
        JOIN collections c ON c.id = cr.collection_id
      ),
      allEvents AS (
        SELECT * FROM publishedResourcesWithFields
        UNION ALL
        SELECT * FROM updatedResourcesWithFields
        UNION ALL
        SELECT * FROM savedInCollectionResourcesWithFields
      ),
      candidates AS (
        SELECT ae.*
        FROM allEvents ae
        LEFT JOIN resource_views rv ON rv.resource_id = ae.id AND rv.user_id = ${userId}::uuid
        WHERE rv.id IS NULL
          AND ${buildThemeFilter(themes)}
          AND ${buildProfessionalSectorFilter(professionalSectors)}
          AND ${buildSpecialProfileOrBaseFilter(baseSlug, profileSlug)}
      ),
      picked AS (
        SELECT DISTINCT ON (id) *
        FROM candidates
        WHERE most_recent_date > ${lastOpenedAt}::timestamp
        ORDER BY id, most_recent_date DESC
      )
      SELECT 
        COUNT(*) as total,
        COUNT(*) as count
      FROM picked
    `,
  )

  return {
    total: Number(result[0]?.total) ?? 0,
    count: Number(result[0]?.count) ?? 0,
  }
}
