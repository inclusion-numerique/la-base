'use client'

import { NewsFeedResource } from '@app/web/features/fil-d-actualite/db/getNewsFeedPageContext'
import { NEWS_FEED_DEFAULT_PER_PAGE } from '@app/web/server/newsFeed/getNewsFeedResources'
import { trpc } from '@app/web/trpc'
import { useCallback, useEffect, useState } from 'react'

export type NewsFeedFilters = {
  themes: string[]
  professionalSectors: string[]
  profileSlug?: string
  baseSlug?: string
  lastOpenedAt: Date | null
}

export const useNewsFeedPagination = (
  initialResources: NewsFeedResource[],
  filters: NewsFeedFilters,
) => {
  const [allResources, setAllResources] =
    useState<NewsFeedResource[]>(initialResources)
  const [currentPage, setCurrentPage] = useState(1)
  const [hasMore, setHasMore] = useState(
    initialResources.length >= NEWS_FEED_DEFAULT_PER_PAGE,
  )

  const { error, data, isFetching, refetch } =
    trpc.newsFeed.getResources.useQuery(
      {
        page: currentPage + 1,
        themes: filters.themes,
        professionalSectors: filters.professionalSectors,
        profileSlug: filters.profileSlug,
        baseSlug: filters.baseSlug,
        lastOpenedAt: filters.lastOpenedAt,
      },
      {
        enabled: false,
      },
    )

  useEffect(() => {
    if (!data) {
      return
    }

    if (data.resources.length > 0) {
      setAllResources((prev) => [...prev, ...data.resources])
      setCurrentPage((prev) => prev + 1)
    }
    setHasMore(data.resources.length >= NEWS_FEED_DEFAULT_PER_PAGE)
  }, [data])

  const loadMore = useCallback(() => {
    if (isFetching || !hasMore) {
      return
    }
    refetch()
  }, [hasMore, isFetching, refetch])

  return {
    resources: allResources,
    loadMore,
    isFetching,
    error,
    hasMore,
  }
}
