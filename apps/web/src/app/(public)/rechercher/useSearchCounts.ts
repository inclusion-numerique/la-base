import type { SearchResultCounts } from '@app/web/server/search/executeSearch'
import { useCallback } from 'react'
import { shallow } from 'zustand/shallow'
import { createWithEqualityFn } from 'zustand/traditional'

type Store = {
  resourcesCount: number | null
  profilesCount: number | null
  basesCount: number | null
  setCounts: (counts: SearchResultCounts) => void
}

const useSearchCountsStore = createWithEqualityFn<Store>(
  (set) => ({
    resourcesCount: null,
    profilesCount: null,
    basesCount: null,
    setCounts: (counts: SearchResultCounts) =>
      set(() => ({
        resourcesCount: counts.resourcesCount,
        profilesCount: counts.profilesCount,
        basesCount: counts.basesCount,
      })),
  }),
  shallow,
)

export const useSynchronizeTabCounts = () => {
  const setCounts = useSearchCountsStore((state) => state.setCounts)

  return useCallback(
    (counts: SearchResultCounts) => {
      setCounts(counts)
    },
    [setCounts],
  )
}

export const useSearchCounts = () =>
  useSearchCountsStore((state) => ({
    resourcesCount: state.resourcesCount,
    profilesCount: state.profilesCount,
    basesCount: state.basesCount,
  }))
