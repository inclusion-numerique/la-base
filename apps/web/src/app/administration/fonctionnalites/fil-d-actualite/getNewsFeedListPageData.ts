import type { NewsFeedDataTableSearchParams } from '@app/web/app/administration/fonctionnalites/fil-d-actualite/NewsFeedDataTable'
import { searchNewsFeed } from '@app/web/app/administration/fonctionnalites/fil-d-actualite/searchNewsFeed'
import { prismaClient } from '@app/web/prismaClient'
import type { ProfessionalSector, Theme } from '@prisma/client'

export const getNewsFeedListPageData = async ({
  searchParams,
}: {
  searchParams: NewsFeedDataTableSearchParams
}) => {
  const [
    searchResult,
    totalCount,
    totalUsers,
    newsletterCount,
    onboardingCount,
    neverOpenedCount,
    allPreferences,
  ] = await Promise.all([
    searchNewsFeed({ searchParams }),
    prismaClient.newsFeed.count(),
    prismaClient.user.count({ where: { deleted: null } }),
    prismaClient.newsFeed.count({ where: { monthlyNewsletter: true } }),
    prismaClient.newsFeed.count({ where: { hasCompleteOnboarding: true } }),
    prismaClient.newsFeed.count({ where: { lastOpenedAt: null } }),
    prismaClient.newsFeed.findMany({
      select: { themes: true, professionalSectors: true },
    }),
  ])

  const themeCounts = new Map<Theme, number>()
  const sectorCounts = new Map<ProfessionalSector, number>()

  for (const { themes, professionalSectors } of allPreferences) {
    for (const theme of themes) {
      themeCounts.set(theme, (themeCounts.get(theme) ?? 0) + 1)
    }
    for (const sector of professionalSectors) {
      sectorCounts.set(sector, (sectorCounts.get(sector) ?? 0) + 1)
    }
  }

  const topThemes = [...themeCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)

  const sectorDistribution = [...sectorCounts.entries()].sort(
    (a, b) => b[1] - a[1],
  )

  return {
    searchResult,
    searchParams,
    totalCount,
    totalUsers,
    newsletterCount,
    onboardingCount,
    neverOpenedCount,
    topThemes,
    sectorDistribution,
  }
}

export type NewsFeedListPageData = Awaited<
  ReturnType<typeof getNewsFeedListPageData>
>
