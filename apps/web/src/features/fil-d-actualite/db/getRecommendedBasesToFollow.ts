import { SessionUser } from '@app/web/auth/sessionUser'
import { prismaClient } from '@app/web/prismaClient'
import { getBaseResourcesViewsCount } from '@app/web/server/bases/baseResources'
import {
  baseSelect,
  computeBasesListResourcesWhereForUser,
} from '@app/web/server/bases/getBasesList'
import { enumArrayToSnakeCaseStringArray } from '@app/web/server/search/enumArrayToSnakeCaseStringArray'
import { Prisma } from '@prisma/client'

const RECOMMENDED_BASES_LIMIT = 6

export const getRecommendedBasesToFollow = async (user: SessionUser | null) => {
  if (!user) {
    return []
  }
  const newsFeedPreferences = await prismaClient.newsFeed.findUnique({
    where: { userId: user.id },
    select: {
      userId: true,
      professionalSectors: true,
      themes: true,
    },
  })

  const hasPreferences =
    newsFeedPreferences &&
    (newsFeedPreferences.themes.length > 0 ||
      newsFeedPreferences.professionalSectors.length > 0)

  let recommendedBaseIds: Array<{ id: string }>

  if (hasPreferences) {
    const preferencesBasedIds = await prismaClient.$queryRaw<
      Array<{
        id: string
        resource_count: bigint
      }>
    >(
      Prisma.sql`
        SELECT DISTINCT
          b.id,
          COUNT(r.id) as resource_count
        FROM bases b
        INNER JOIN resources r ON b.id = r.base_id
        WHERE b.is_public = true
          AND r.is_public = true
          AND (
            r.themes && ${enumArrayToSnakeCaseStringArray(
              newsFeedPreferences.themes,
            )}::theme[]
            OR r.professional_sectors && ${enumArrayToSnakeCaseStringArray(
              newsFeedPreferences.professionalSectors,
            )}::professional_sector[]
          )
          AND NOT EXISTS (
            SELECT 1 FROM base_follows bf
            WHERE bf.base_id = b.id AND bf.follower_id = ${user.id}::uuid
          )
        GROUP BY b.id
        ORDER BY resource_count DESC
        LIMIT ${RECOMMENDED_BASES_LIMIT}
      `,
    )
    recommendedBaseIds = preferencesBasedIds.map(({ id }) => ({ id }))
  } else {
    // Fallback: get bases with most resource views
    recommendedBaseIds = await prismaClient.$queryRaw<
      Array<{
        id: string
      }>
    >(
      Prisma.sql`
        SELECT b.id
        FROM bases b
        LEFT JOIN resources r ON b.id = r.base_id 
          AND r.is_public = true 
          AND r.published IS NOT NULL 
          AND r.deleted IS NULL
        WHERE b.is_public = true
          AND b.deleted IS NULL
          AND NOT EXISTS (
            SELECT 1 FROM base_follows bf
            WHERE bf.base_id = b.id AND bf.follower_id = ${user.id}::uuid
          )
        GROUP BY b.id
        ORDER BY COALESCE(SUM(r.views_count), 0) DESC, b.created DESC
        LIMIT ${RECOMMENDED_BASES_LIMIT}
      `,
    )
  }

  const baseIds = recommendedBaseIds.map(({ id }) => id)

  if (baseIds.length === 0) {
    return []
  }

  const bases = await prismaClient.base.findMany({
    where: {
      id: {
        in: baseIds,
      },
    },
    select: baseSelect(user),
  })

  // Adding resource views count
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

  // Maintain the order from the raw SQL query
  const resultIndexById = new Map(
    recommendedBaseIds.map(({ id }, index) => [id, index]),
  )

  return basesWithResourcesViews.sort(
    (a, b) =>
      (resultIndexById.get(a.id) ?? 0) - (resultIndexById.get(b.id) ?? 0),
  )
}

export type NewsFeedRecommendedBases = Awaited<
  ReturnType<typeof getRecommendedBasesToFollow>
>
