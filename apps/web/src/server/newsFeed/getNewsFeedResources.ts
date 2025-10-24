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
      WITH followedBases AS (
        SELECT base_id FROM base_follows WHERE follower_id = ${userId}::uuid
      ),
      followedProfiles AS (
        SELECT profile_id FROM profile_follows WHERE follower_id = ${userId}::uuid
      ),
      userPreferences AS (
        SELECT themes, professional_sectors
        FROM news_feed
        WHERE user_id = ${userId}::uuid
      ),
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
      WITH followedBases AS (
        SELECT base_id FROM base_follows WHERE follower_id = ${userId}::uuid
      ),
      followedProfiles AS (
        SELECT profile_id FROM profile_follows WHERE follower_id = ${userId}::uuid
      ),
      candidates AS (
        SELECT
          r.id, 
          r.published,
          CASE 
            WHEN cr.id IS NOT NULL
                 AND (c.base_id IN (SELECT base_id FROM followedBases)
                   OR c.created_by_id IN (SELECT profile_id FROM followedProfiles))
            THEN GREATEST(r.published, r.last_published, cr.added)
            ELSE GREATEST(r.published, r.last_published)
          END AS most_recent_date,
          CASE
            WHEN rv.id IS NOT NULL THEN true
            WHEN ${
              lastOpenedAt
                ? Prisma.sql`CASE 
                    WHEN cr.id IS NOT NULL THEN GREATEST(r.published, r.last_published, cr.added) <= ${lastOpenedAt}::timestamp
                    ELSE GREATEST(r.published, r.last_published) <= ${lastOpenedAt}::timestamp
                  END`
                : Prisma.sql`false`
            } THEN true
            ELSE false
          END AS seen,
          CASE
            WHEN cr.id IS NOT NULL AND c.base_id IN (SELECT base_id FROM followedBases) THEN 'savedCollectionFromBase'::text
            WHEN cr.id IS NOT NULL AND c.created_by_id IN (SELECT profile_id FROM followedProfiles) THEN 'savedCollectionFromProfile'::text
            WHEN r.base_id IN (SELECT base_id FROM followedBases) THEN 'base'::text
            WHEN r.created_by_id IN (SELECT profile_id FROM followedProfiles) THEN 'profile'::text
            ELSE 'base'::text
          END AS source,
          CASE
            WHEN cr.id IS NOT NULL
                 AND (c.base_id IN (SELECT base_id FROM followedBases)
                   OR c.created_by_id IN (SELECT profile_id FROM followedProfiles))
            THEN c.id
            ELSE NULL
          END AS collection_id,
          CASE
            WHEN cr.id IS NOT NULL
                 AND (c.base_id IN (SELECT base_id FROM followedBases)
                   OR c.created_by_id IN (SELECT profile_id FROM followedProfiles))
            THEN cr.added
            ELSE NULL
          END AS added_to_collection_at
        FROM resources r
        LEFT JOIN bases b ON r.base_id = b.id
        LEFT JOIN collection_resources cr ON cr.resource_id = r.id
        LEFT JOIN collections c
          ON c.id = cr.collection_id AND c.deleted IS NULL AND c.is_public = true
        LEFT JOIN resource_views rv ON rv.resource_id = r.id AND rv.user_id = ${userId}::uuid
        WHERE r.deleted IS NULL
          AND r.published IS NOT NULL
          AND r.is_public = true
          AND (b.id IS NULL OR b.deleted IS NULL)
          AND (
            -- follows directs
            r.base_id IN (SELECT base_id FROM followedBases)
            OR r.created_by_id IN (SELECT profile_id FROM followedProfiles)
            OR -- saves de collections par entités suivies
            (
              cr.id IS NOT NULL AND (
                c.base_id IN (SELECT base_id FROM followedBases)
                OR c.created_by_id IN (SELECT profile_id FROM followedProfiles)
              )
            )
          )
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
      WITH followedBases AS (
        SELECT base_id FROM base_follows WHERE follower_id = ${userId}::uuid
      ),
      followedProfiles AS (
        SELECT profile_id FROM profile_follows WHERE follower_id = ${userId}::uuid
      ),
      candidates AS (
        SELECT
          r.id,
          CASE 
            WHEN cr.id IS NOT NULL
                 AND (c.base_id IN (SELECT base_id FROM followedBases)
                   OR c.created_by_id IN (SELECT profile_id FROM followedProfiles))
            THEN GREATEST(r.published, r.last_published, cr.added)
            ELSE GREATEST(r.published, r.last_published)
          END AS most_recent_date
        FROM resources r
        LEFT JOIN bases b ON r.base_id = b.id
        LEFT JOIN collection_resources cr ON cr.resource_id = r.id
        LEFT JOIN collections c
          ON c.id = cr.collection_id AND c.deleted IS NULL AND c.is_public = true
        LEFT JOIN resource_views rv ON rv.resource_id = r.id AND rv.user_id = ${userId}::uuid
        WHERE r.deleted IS NULL
          AND rv.id IS NULL
          AND r.published IS NOT NULL
          AND r.is_public = true
          AND (b.id IS NULL OR b.deleted IS NULL)
          AND (
            r.base_id IN (SELECT base_id FROM followedBases)
            OR r.created_by_id IN (SELECT profile_id FROM followedProfiles)
            OR (
              cr.id IS NOT NULL AND (
                c.base_id IN (SELECT base_id FROM followedBases)
                OR c.created_by_id IN (SELECT profile_id FROM followedProfiles)
              )
            )
          )
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
  WITH followedBases AS (
    SELECT base_id FROM base_follows WHERE follower_id = ${userId}::uuid
  ),
  followedProfiles AS (
    SELECT profile_id FROM profile_follows WHERE follower_id = ${userId}::uuid
  ),
  userPreferences AS (
    SELECT themes, professional_sectors
    FROM news_feed
    WHERE user_id = ${userId}::uuid
  ),
  candidates AS (
    SELECT
      r.id, 
      r.published,
      CASE 
        WHEN cr.id IS NOT NULL
             AND (c.base_id IN (SELECT base_id FROM followedBases)
               OR c.created_by_id IN (SELECT profile_id FROM followedProfiles))
        THEN GREATEST(r.published, r.last_published, cr.added)
        ELSE GREATEST(r.published, r.last_published)
      END AS most_recent_date,
      CASE
        WHEN rv.id IS NOT NULL THEN true
        WHEN ${
          lastOpenedAt
            ? Prisma.sql`CASE 
                WHEN cr.id IS NOT NULL THEN GREATEST(r.published, r.last_published, cr.added) <= ${lastOpenedAt}::timestamp
                ELSE GREATEST(r.published, r.last_published) <= ${lastOpenedAt}::timestamp
              END`
            : Prisma.sql`false`
        } THEN true
        ELSE false
      END AS seen,
      CASE
        WHEN cr.id IS NOT NULL AND c.base_id IN (SELECT base_id FROM followedBases) THEN 'savedCollectionFromBase'::text
        WHEN cr.id IS NOT NULL AND c.created_by_id IN (SELECT profile_id FROM followedProfiles) THEN 'savedCollectionFromProfile'::text
        WHEN r.base_id IN (SELECT base_id FROM followedBases) THEN 'base'::text
        WHEN r.created_by_id IN (SELECT profile_id FROM followedProfiles) THEN 'profile'::text
        WHEN EXISTS (SELECT 1 FROM userPreferences WHERE r.themes && themes) THEN 'theme'::text
        WHEN EXISTS (SELECT 1 FROM userPreferences WHERE r.professional_sectors && professional_sectors) THEN 'professional_sector'::text
        ELSE 'base'::text
      END AS source,
      CASE
        WHEN cr.id IS NOT NULL
             AND (c.base_id IN (SELECT base_id FROM followedBases)
               OR c.created_by_id IN (SELECT profile_id FROM followedProfiles))
        THEN c.id
        ELSE NULL
      END AS collection_id,
      CASE
        WHEN cr.id IS NOT NULL
             AND (c.base_id IN (SELECT base_id FROM followedBases)
               OR c.created_by_id IN (SELECT profile_id FROM followedProfiles))
        THEN cr.added
        ELSE NULL
      END AS added_to_collection_at
    FROM resources r
    LEFT JOIN bases b ON r.base_id = b.id
    LEFT JOIN collection_resources cr ON cr.resource_id = r.id
    LEFT JOIN collections c
      ON c.id = cr.collection_id AND c.deleted IS NULL AND c.is_public = true
    LEFT JOIN resource_views rv ON rv.resource_id = r.id AND rv.user_id = ${userId}::uuid
    WHERE r.deleted IS NULL
      AND r.published IS NOT NULL
      AND r.is_public = true
      AND (b.id IS NULL OR b.deleted IS NULL)
      AND (
        -- follows directs
        r.base_id IN (SELECT base_id FROM followedBases)
        OR r.created_by_id IN (SELECT profile_id FROM followedProfiles)
        OR -- préférences thème
        EXISTS (SELECT 1 FROM userPreferences WHERE r.themes && themes)
        OR -- préférences secteur pro
        EXISTS (SELECT 1 FROM userPreferences WHERE r.professional_sectors && professional_sectors)
        OR -- saves de collections par entités suivies
        (
          cr.id IS NOT NULL AND (
            c.base_id IN (SELECT base_id FROM followedBases)
            OR c.created_by_id IN (SELECT profile_id FROM followedProfiles)
          )
        )
      )
      -- filtres
      AND (
        ${themes.length === 0} OR ${
          themes.includes('tout')
            ? Prisma.sql`EXISTS (SELECT 1 FROM userPreferences WHERE r.themes && themes)`
            : Prisma.sql`r.themes && ${enumArrayToSnakeCaseStringArray(
                themes,
              )}::theme[]`
        }
      )
      AND (
        ${professionalSectors.length === 0} OR ${
          professionalSectors.includes('tout')
            ? Prisma.sql`EXISTS (SELECT 1 FROM userPreferences WHERE r.professional_sectors && professional_sectors)`
            : Prisma.sql`r.professional_sectors && ${enumArrayToSnakeCaseStringArray(
                professionalSectors,
              )}::professional_sector[]`
        }
      )
      AND (
        ${profileSlug ?? null}::text IS NULL OR (
          EXISTS (
            SELECT 1 FROM users u WHERE u.id = r.created_by_id AND u.slug = ${
              profileSlug ?? null
            }::text
          )
          OR
          EXISTS (
            SELECT 1 FROM users u WHERE u.id = c.created_by_id AND u.slug = ${
              profileSlug ?? null
            }::text AND cr.id IS NOT NULL
          )
        )
      )
      AND (
        ${baseSlug ?? null}::text IS NULL OR (
          EXISTS (
            SELECT 1 FROM bases b WHERE b.id = r.base_id AND b.slug = ${
              baseSlug ?? null
            }::text
          )
          OR
          EXISTS (
            SELECT 1 FROM bases b WHERE b.id = c.base_id AND b.slug = ${
              baseSlug ?? null
            }::text AND cr.id IS NOT NULL
          )
        )
      )
  )
  -- ici: on choisit, de façon déterministe, 1 ligne par r.id
  , picked AS (
    SELECT DISTINCT ON (id) *
    FROM candidates
    ORDER BY id,                -- requis par DISTINCT ON
      most_recent_date DESC,
      added_to_collection_at DESC NULLS LAST  -- tie-break utile si même date
  )

  SELECT *
  FROM picked
  ORDER BY most_recent_date DESC                     -- tri global pour l'affichage/pagination
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
    newsFeedResources.map(({ id, seen, source }) => [
      id,
      {
        source,
        seen,
      },
    ]),
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
      }

      return {
        ...toResourceWithFeedbackAverage(resource),
        source: extraData.source,
        seen: extraData.seen,
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
      WITH followedBases AS (
        SELECT base_id FROM base_follows WHERE follower_id = ${userId}::uuid
      ),
      followedProfiles AS (
        SELECT profile_id FROM profile_follows WHERE follower_id = ${userId}::uuid
      ),
      userPreferences AS (
        SELECT themes, professional_sectors
        FROM news_feed
        WHERE user_id = ${userId}::uuid
      ),
      candidates AS (
        SELECT
          r.id, 
          r.published,
          CASE 
            WHEN cr.id IS NOT NULL
                 AND (c.base_id IN (SELECT base_id FROM followedBases)
                   OR c.created_by_id IN (SELECT profile_id FROM followedProfiles))
            THEN GREATEST(r.published, r.last_published, cr.added)
            ELSE GREATEST(r.published, r.last_published)
          END AS most_recent_date
        FROM resources r
        LEFT JOIN bases b ON r.base_id = b.id
        LEFT JOIN collection_resources cr ON cr.resource_id = r.id
        LEFT JOIN collections c
          ON c.id = cr.collection_id AND c.deleted IS NULL AND c.is_public = true
        LEFT JOIN resource_views rv ON rv.resource_id = r.id AND rv.user_id = ${userId}::uuid
        WHERE r.deleted IS NULL
          AND rv.id IS NULL
          AND r.published IS NOT NULL
          AND r.is_public = true
          AND (b.id IS NULL OR b.deleted IS NULL)
          AND (
            -- follows directs
            r.base_id IN (SELECT base_id FROM followedBases)
            OR r.created_by_id IN (SELECT profile_id FROM followedProfiles)
            OR -- préférences thème
            EXISTS (SELECT 1 FROM userPreferences WHERE r.themes && themes)
            OR -- préférences secteur pro
            EXISTS (SELECT 1 FROM userPreferences WHERE r.professional_sectors && professional_sectors)
            OR -- saves de collections par entités suivies
            (
              cr.id IS NOT NULL AND (
                c.base_id IN (SELECT base_id FROM followedBases)
                OR c.created_by_id IN (SELECT profile_id FROM followedProfiles)
              )
            )
          )
          -- Apply filters
          AND (
            ${themes.length === 0} OR ${
              themes.includes('tout')
                ? Prisma.sql`EXISTS (SELECT 1 FROM userPreferences WHERE r.themes && themes)`
                : Prisma.sql`r.themes && ${enumArrayToSnakeCaseStringArray(
                    themes,
                  )}::theme[]`
            }
          )
          AND (
            ${professionalSectors.length === 0} OR ${
              professionalSectors.includes('tout')
                ? Prisma.sql`EXISTS (SELECT 1 FROM userPreferences WHERE r.professional_sectors && professional_sectors)`
                : Prisma.sql`r.professional_sectors && ${enumArrayToSnakeCaseStringArray(
                    professionalSectors,
                  )}::professional_sector[]`
            }
          )
          AND (
            ${
              // Special case: when both base and profile are 'tout', no additional filtering needed
              // Base eligibility already handles showing all followed entities
              baseSlug === 'tout' && profileSlug === 'tout'
                ? Prisma.sql`TRUE`
                : Prisma.sql`
                  (
                    ${profileSlug ?? null}::text IS NULL OR ${
                      profileSlug === 'tout'
                        ? Prisma.sql`(
                            r.created_by_id IN (SELECT profile_id FROM followedProfiles)
                            OR
                            (cr.id IS NOT NULL AND c.created_by_id IN (SELECT profile_id FROM followedProfiles))
                          )`
                        : Prisma.sql`(
                            EXISTS (
                              SELECT 1 FROM users u WHERE u.id = r.created_by_id AND u.slug = ${profileSlug}::text
                            )
                            OR
                            EXISTS (
                              SELECT 1 FROM users u WHERE u.id = c.created_by_id AND u.slug = ${profileSlug}::text AND cr.id IS NOT NULL
                            )
                          )`
                    }
                  )
                  AND (
                    ${baseSlug ?? null}::text IS NULL OR ${
                      baseSlug === 'tout'
                        ? Prisma.sql`(
                            r.base_id IN (SELECT base_id FROM followedBases)
                            OR
                            (cr.id IS NOT NULL AND c.base_id IN (SELECT base_id FROM followedBases))
                          )`
                        : Prisma.sql`(
                            EXISTS (
                              SELECT 1 FROM bases b WHERE b.id = r.base_id AND b.slug = ${baseSlug}::text
                            )
                            OR
                            EXISTS (
                              SELECT 1 FROM bases b WHERE b.id = c.base_id AND b.slug = ${baseSlug}::text AND cr.id IS NOT NULL
                            )
                          )`
                    }
                  )`
            }
          )
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
    total: result[0]?.total ?? 0,
    count: result[0]?.count ?? 0,
  }
}
