import { getSessionUser } from '@app/web/auth/getSessionUser'
import { getNewsFeed } from '@app/web/features/fil-d-actualite/db/getNewsFeed'
import { prismaClient } from '@app/web/prismaClient'
import {
  resourceListSelect,
  toResourceWithFeedbackAverage,
} from '@app/web/server/resources/getResourcesList'
import { enumArrayToSnakeCaseStringArray } from '@app/web/server/search/enumArrayToSnakeCaseStringArray'
import { type PaginationParams } from '@app/web/server/search/searchQueryParams'
import { Prisma, ProfessionalSector, Theme } from '@prisma/client'
import { pascalCase } from 'change-case'
import { redirect } from 'next/navigation'
import { cache } from 'react'

const defaultNewsFeedPaginationParams: Readonly<PaginationParams> = {
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
        INNER JOIN resources r ON r.base_id = b.id
        WHERE b.deleted IS NULL
          AND r.deleted IS NULL
          AND r.published IS NOT NULL
          AND r.is_public = true
        GROUP BY b.id, b.slug
        
        UNION ALL
        
        -- Followed profiles
        SELECT 
          'followed_profile'::text as item_type,
          p.slug::text as item_value,
          COUNT(DISTINCT r.id)::integer as count
        FROM users p
        INNER JOIN followedProfiles fp ON p.id = fp.profile_id
        INNER JOIN resources r ON r.created_by_id = p.id
        WHERE p.deleted IS NULL
          AND r.deleted IS NULL
          AND r.published IS NOT NULL
          AND r.is_public = true
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
) => {
  return await prismaClient.$queryRaw<
    {
      id: string
      published: Date
      source: 'base' | 'profile' | 'theme' | 'professional_sector'
    }[]
  >(
    Prisma.sql`
      WITH followedBases AS (
        SELECT base_id FROM base_follows WHERE follower_id = ${userId}::uuid
      ),
      followedProfiles AS (
        SELECT profile_id FROM profile_follows WHERE follower_id = ${userId}::uuid
      )
      SELECT 
        r.id,
        r.published,
        CASE
          WHEN r.base_id IN (SELECT base_id FROM followedBases) THEN 'base'::text
          WHEN r.created_by_id IN (SELECT profile_id FROM followedProfiles) THEN 'profile'::text
          ELSE 'base'::text
        END as source
      FROM resources r
      LEFT JOIN bases b ON r.base_id = b.id
      WHERE r.deleted IS NULL
        AND r.published IS NOT NULL
        AND r.is_public = true
        AND (b.id IS NULL OR b.deleted IS NULL)
        AND (
          r.base_id IN (SELECT base_id FROM followedBases)
          OR
          r.created_by_id IN (SELECT profile_id FROM followedProfiles)
        )
      ORDER BY r.published DESC
      LIMIT ${paginationParams.perPage}
      OFFSET ${(paginationParams.page - 1) * paginationParams.perPage}
    `,
  )
}

export const getResourceIds = async (
  userId: string,
  filters: NewsFeedFilters = { themes: [], professionalSectors: [] },
  paginationParams: PaginationParams = defaultNewsFeedPaginationParams,
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
      source: 'base' | 'profile' | 'theme' | 'professional_sector'
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
      )
      SELECT DISTINCT 
        r.id, 
        r.published,
        CASE
          WHEN r.base_id IN (SELECT base_id FROM followedBases) THEN 'base'::text
          WHEN r.created_by_id IN (SELECT profile_id FROM followedProfiles) THEN 'profile'::text
          WHEN EXISTS (SELECT 1 FROM userPreferences WHERE r.themes && themes) THEN 'theme'::text
          WHEN EXISTS (SELECT 1 FROM userPreferences WHERE r.professional_sectors && professional_sectors) THEN 'professional_sector'::text
          ELSE 'base'::text
        END as source
      FROM resources r
      LEFT JOIN bases b ON r.base_id = b.id
      WHERE r.deleted IS NULL
        AND r.published IS NOT NULL
        AND r.is_public = true
        AND (b.id IS NULL OR b.deleted IS NULL)
        AND (
          r.base_id IN (SELECT base_id FROM followedBases)
          OR
          -- Resources created by followed profiles
          r.created_by_id IN (SELECT profile_id FROM followedProfiles)
          OR
          -- Resources matching user's theme preferences
          (
            EXISTS (SELECT 1 FROM userPreferences WHERE r.themes && themes)
          )
          OR
          -- Resources matching user's professional sector preferences
          (
            EXISTS (SELECT 1 FROM userPreferences WHERE r.professional_sectors && professional_sectors)
          )
        )
        -- Apply filters if provided
        AND (
          ${themes.length === 0} OR ${
            themes.includes('tous')
              ? Prisma.sql`EXISTS (SELECT 1 FROM userPreferences WHERE r.themes && themes)`
              : Prisma.sql`r.themes && ${enumArrayToSnakeCaseStringArray(
                  themes,
                )}::theme[]`
          }
        )
        AND (
          ${professionalSectors.length === 0} OR ${
            professionalSectors.includes('tous')
              ? Prisma.sql`EXISTS (SELECT 1 FROM userPreferences WHERE r.professional_sectors && professional_sectors)`
              : Prisma.sql`r.professional_sectors && ${enumArrayToSnakeCaseStringArray(
                  professionalSectors,
                )}::professional_sector[]`
          }
        )
        AND (
          ${profileSlug ?? null}::text IS NULL OR EXISTS (
            SELECT 1 FROM users u WHERE u.id = r.created_by_id AND u.slug = ${
              profileSlug ?? null
            }::text
          )
        )
        AND (
          ${baseSlug ?? null}::text IS NULL OR EXISTS (
            SELECT 1 FROM bases b WHERE b.id = r.base_id AND b.slug = ${
              baseSlug ?? null
            }::text
          )
        )
      ORDER BY r.published DESC
      LIMIT ${paginationParams.perPage}
      OFFSET ${(paginationParams.page - 1) * paginationParams.perPage}
    `,
  )
}

export const getNewsFeedResources = async (
  userId: string,
  filters: NewsFeedFilters = { themes: [], professionalSectors: [] },
  paginationParams: PaginationParams = defaultNewsFeedPaginationParams,
) => {
  const { profileSlug, baseSlug } = filters

  const resourceIds =
    baseSlug === 'tous' && profileSlug === 'tous'
      ? await getFollowedResourceIds(userId, paginationParams)
      : await getResourceIds(userId, filters, paginationParams)

  // Followed bases that have at least 1 resource
  const followedBasesWithResources = await prismaClient.$queryRaw<
    { id: string }[]
  >(
    Prisma.sql`
      WITH followedBases AS (
        SELECT base_id FROM base_follows WHERE follower_id = ${userId}::uuid
      )
      SELECT DISTINCT b.id
      FROM bases b
      INNER JOIN followedBases fb ON b.id = fb.base_id
      INNER JOIN resources r ON r.base_id = b.id
      WHERE b.deleted IS NULL
        AND r.deleted IS NULL
        AND r.published IS NOT NULL
        AND r.is_public = true
    `,
  )

  // Followed profiles that have at least 1 resource
  const followedProfilesWithResources = await prismaClient.$queryRaw<
    { id: string }[]
  >(
    Prisma.sql`
      WITH followedProfiles AS (
        SELECT profile_id FROM profile_follows WHERE follower_id = ${userId}::uuid
      )
      SELECT DISTINCT p.id
      FROM users p
      INNER JOIN followedProfiles fp ON p.id = fp.profile_id
      INNER JOIN resources r ON r.created_by_id = p.id
      WHERE p.deleted IS NULL
        AND r.deleted IS NULL
        AND r.published IS NOT NULL
        AND r.is_public = true
    `,
  )

  const ids = resourceIds.map(({ id }) => id)
  const resourceMap = new Map(
    resourceIds.map(({ id, source }) => [id, { source }]),
  )

  const [followedBases, followedProfiles] = await Promise.all([
    prismaClient.base.findMany({
      where: {
        id: { in: followedBasesWithResources.map(({ id }) => id) },
        deleted: null,
      },
      select: {
        id: true,
        title: true,
        slug: true,
        image: true,
      },
    }),
    prismaClient.user.findMany({
      where: {
        id: { in: followedProfilesWithResources.map(({ id }) => id) },
        deleted: null,
      },
      select: {
        id: true,
        name: true,
        slug: true,
        firstName: true,
        lastName: true,
        image: true,
      },
    }),
  ])

  if (ids.length === 0) {
    return {
      resources: [],
      followedBases,
      followedProfiles,
    }
  }

  const resources = await prismaClient.resource.findMany({
    where: { id: { in: ids } },
    select: {
      ...resourceListSelect({ id: userId }),
      themes: true,
      professionalSectors: true,
    },
  })

  // keep the same indexing
  const orderMap = new Map(ids.map((id, index) => [id, index]))
  const sortedResources = resources.sort(
    (a, b) => (orderMap.get(a.id) ?? 0) - (orderMap.get(b.id) ?? 0),
  )

  return {
    resources: sortedResources.map((resource) => {
      const extraData = resourceMap.get(resource.id) || {
        source: 'base',
      }
      return {
        ...toResourceWithFeedbackAverage(resource),
        source: extraData.source,
      }
    }),
    followedBases,
    followedProfiles,
  }
}

export const getNewsFeedPageContext = cache(
  async (
    filters: NewsFeedFilters = { themes: [], professionalSectors: [] },
    paginationParams: PaginationParams = defaultNewsFeedPaginationParams,
  ) => {
    const user = await getSessionUser()
    const userNewsFeed = await getNewsFeed(user)
    if (!user) {
      return redirect('/connexion?suivant=/fil-d-actualite')
    }
    // Redirect to onboarding only if no newsFeed record exists
    // If user has skipped onboarding (hasCompleteOnboarding: false), they can still access the feed
    if (!userNewsFeed) {
      return redirect('/fil-d-actualite/onboarding')
    }

    const [{ resources, followedBases, followedProfiles }, resourceCounts] =
      await Promise.all([
        getNewsFeedResources(user.id, filters, paginationParams),
        countNewsFeedResources(user.id),
      ])

    return {
      user,
      userNewsFeed,
      resources,
      followedBases,
      followedProfiles,
      resourceCounts,
    }
  },
)

export type NewsFeedResource = Awaited<
  ReturnType<typeof getNewsFeedResources>
>['resources'][0]

export type NewsFeedPageContext = Awaited<
  ReturnType<typeof getNewsFeedPageContext>
>

export type NewsFeedBases = Awaited<
  ReturnType<typeof getNewsFeedPageContext>
>['followedBases']

export type NewsFeedProfiles = Awaited<
  ReturnType<typeof getNewsFeedPageContext>
>['followedProfiles']
