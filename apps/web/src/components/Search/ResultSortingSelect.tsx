'use client'

import { useRouter } from 'next/navigation'
import React, { ChangeEventHandler, useMemo, useState } from 'react'
import {
  basesSortingOptions,
  PaginationParams,
  profilesSortingOptions,
  resourcesSortingOptions,
  SearchParams,
  SearchTab,
  searchUrl,
  Sorting,
} from '@app/web/server/search/searchQueryParams'
import styles from '@app/web/components/Search/ResultSortingSelect.module.css'

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
}: {
  searchParams: SearchParams
  paginationParams: PaginationParams
  tab: SearchTab
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
    router.push(
      // Replace the sorting parameter and reset to page 1
      searchUrl(tab, searchParams, {
        ...paginationParams,
        sort: value,
        page: 1,
      }),
    )
  }

  return (
    <div className={styles.select}>
      Trier par&nbsp;:
      <select onChange={onSelect}>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            selected={option.value === selected}
          >
            {option.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default ResultSortingSelect
