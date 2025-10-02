'use client'

import { NewsFeedResource } from '@app/web/features/fil-d-actualite/db/getNewsFeedPageContext'
import { trpc } from '@app/web/trpc'
import { useCallback, useEffect, useState } from 'react'

export type NewsFeedFilters = {
  themes: string[]
  professionalSectors: string[]
  profileSlug?: string
  baseSlug?: string
}

export const useNewsFeedPagination = (
  initialResources: NewsFeedResource[],
  filters: NewsFeedFilters,
) => {
  const [allResources, setAllResources] =
    useState<NewsFeedResource[]>(initialResources)
  const [currentPage, setCurrentPage] = useState(1)

  const { error, data, isFetching, refetch } =
    trpc.newsFeed.getResources.useQuery(
      {
        page: currentPage + 1,
        themes: filters.themes,
        professionalSectors: filters.professionalSectors,
        profileSlug: filters.profileSlug,
        baseSlug: filters.baseSlug,
      },
      {
        enabled: false,
      },
    )

  useEffect(() => {
    if (data && data.resources.length > 0) {
      setAllResources((prev) => [...prev, ...data.resources])
      setCurrentPage((prev) => prev + 1)

      // if (searchParams) {
      //   const newSearchParams = new URLSearchParams(searchParams.toString())
      //   newSearchParams.set('page', (currentPage + 1).toString())
      //   router.push(`?${newSearchParams.toString()}`, { scroll: false })
      // }
    }
  }, [data])

  const loadMore = useCallback(() => {
    refetch()
  }, [refetch])

  return {
    resources: allResources,
    loadMore,
    isFetching,
    error,
  }
}
