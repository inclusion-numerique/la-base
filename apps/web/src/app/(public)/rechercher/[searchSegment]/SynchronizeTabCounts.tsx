'use client'

import { useSynchronizeTabCounts } from '@app/web/app/(public)/rechercher/useSearchCounts'
import type { SearchResultCounts } from '@app/web/server/search/executeSearch'
import { useEffect } from 'react'

const SynchronizeTabCounts = ({
  tabCounts,
}: {
  tabCounts: SearchResultCounts
}) => {
  const synchronizeTabCounts = useSynchronizeTabCounts()

  useEffect(() => {
    synchronizeTabCounts(tabCounts)
  }, [tabCounts, synchronizeTabCounts])

  return null
}

export default SynchronizeTabCounts
