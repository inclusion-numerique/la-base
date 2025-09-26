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
import { redirect } from 'next/navigation'
import { cache } from 'react'

const defaultNewsFeedPaginationParams: Readonly<PaginationParams> = {
  page: 1,
  perPage: 20,
  sort: 'recent',
}

export type NewsFeedFilters = {
  themes?: Theme[]
  professionalSectors?: ProfessionalSector[]
  publisherId?: string
}

export const countNewsFeedResources = async (
  userId: string,
  filters: NewsFeedFilters = {},
) => {
  const { themes = [], professionalSectors = [], publisherId } = filters

  const result = await prismaClient.$queryRaw<{ count: number }[]>(
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
      SELECT COUNT(DISTINCT r.id)::integer as count
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
          OR
          (
            EXISTS (SELECT 1 FROM userPreferences WHERE r.themes && themes)
          )
          OR
          (
            EXISTS (SELECT 1 FROM userPreferences WHERE r.professional_sectors && professional_sectors)
          )
        )
        AND (
          ${
            themes.length === 0
          } OR r.themes && ${enumArrayToSnakeCaseStringArray(themes)}::theme[]
        )
        AND (
          ${
            professionalSectors.length === 0
          } OR r.professional_sectors && ${enumArrayToSnakeCaseStringArray(
            professionalSectors,
          )}::professional_sector[]
        )
        AND (
          ${publisherId ?? null}::uuid IS NULL OR r.created_by_id = ${
            publisherId ?? null
          }::uuid
        )
    `,
  )

  return result[0]?.count ?? 0
}

export const getNewsFeedResources = async (
  userId: string,
  filters: NewsFeedFilters = {},
  paginationParams: PaginationParams = defaultNewsFeedPaginationParams,
) => {
  const { themes = [], professionalSectors = [], publisherId } = filters

  const resourceIds = await prismaClient.$queryRaw<
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
          ${
            themes.length === 0
          } OR r.themes && ${enumArrayToSnakeCaseStringArray(themes)}::theme[]
        )
        AND (
          ${
            professionalSectors.length === 0
          } OR r.professional_sectors && ${enumArrayToSnakeCaseStringArray(
            professionalSectors,
          )}::professional_sector[]
        )
        AND (
          ${publisherId ?? null}::uuid IS NULL OR r.created_by_id = ${
            publisherId ?? null
          }::uuid
        )
      ORDER BY r.published DESC
      LIMIT ${paginationParams.perPage}
      OFFSET ${(paginationParams.page - 1) * paginationParams.perPage}
    `,
  )

  const ids = resourceIds.map(({ id }) => id)
  const resourceMap = new Map(
    resourceIds.map(({ id, source }) => [id, { source }]),
  )

  if (ids.length === 0) {
    return []
  }

  const resources = await prismaClient.resource.findMany({
    where: { id: { in: ids } },
    select: { ...resourceListSelect({ id: userId }), themes: true },
  })

  // keep the same indexing
  const orderMap = new Map(ids.map((id, index) => [id, index]))
  const sortedResources = resources.sort(
    (a, b) => (orderMap.get(a.id) ?? 0) - (orderMap.get(b.id) ?? 0),
  )

  return sortedResources.map((resource) => {
    const extraData = resourceMap.get(resource.id) || {
      source: 'base',
    }
    return {
      ...toResourceWithFeedbackAverage(resource),
      source: extraData.source,
    }
  })
}

export const getNewsFeedPageContext = cache(
  async (
    filters: NewsFeedFilters = {},
    paginationParams: PaginationParams = defaultNewsFeedPaginationParams,
  ) => {
    const user = await getSessionUser()
    const userNewsFeed = await getNewsFeed(user)
    if (!user) {
      return redirect('/connexion?suivant=/fil-d-actualite')
    }
    if (!userNewsFeed) {
      return redirect('/fil-d-actualite/onboarding')
    }

    const [resources, totalCount] = await Promise.all([
      getNewsFeedResources(user.id, filters, paginationParams),
      countNewsFeedResources(user.id, filters),
    ])

    return {
      user,
      userNewsFeed,
      resources,
      totalCount,
    }
  },
)

export type NewsFeedResource = Awaited<
  ReturnType<typeof getNewsFeedResources>
>[0]
