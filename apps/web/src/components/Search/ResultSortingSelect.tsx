'use client'

import styles from '@app/web/components/Search/ResultSortingSelect.module.css'
import {
  basesSortingOptions,
  type PaginationParams,
  profilesSortingOptions,
  resourcesSortingOptions,
  type SearchParams,
  type SearchTab,
  type Sorting,
} from '@app/web/server/search/searchQueryParams'
import { useRouter } from 'next/navigation'
import { type ChangeEventHandler, useMemo, useState } from 'react'

const getOptionsForModel = (tab: SearchTab, hasSearchQuery: boolean) => {
  const options =
    tab === 'ressources'
      ? resourcesSortingOptions
      : tab === 'bases'
        ? basesSortingOptions
        : profilesSortingOptions

  if (hasSearchQuery) {
    return options
  }

  return options.filter((option) => option.value !== 'pertinence')
}

const ResultSortingSelect = ({
  searchParams,
  paginationParams,
  tab,
  createSortingLink,
}: {
  searchParams: SearchParams
  paginationParams: PaginationParams
  tab: SearchTab
  createSortingLink: (sort: Sorting) => string
}) => {
  const router = useRouter()

  const [selected, setSelected] = useState<Sorting>(
    // Default to recent if pertinent and no search query
    !searchParams.query && paginationParams.sort === 'pertinence'
      ? 'recent'
      : paginationParams.sort,
  )
  const options = useMemo(
    () => getOptionsForModel(tab, !!searchParams.query),
    [tab, searchParams.query],
  )

  const onSelect: ChangeEventHandler<HTMLSelectElement> = (event) => {
    const value = event.target.value as Sorting
    setSelected(value)
    router.push(createSortingLink(value))
  }

  return (
    <div className={styles.select}>
      Trier par&nbsp;:
      <select
        onChange={onSelect}
        value={selected}
        aria-label="Trier les résultats"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default ResultSortingSelect
