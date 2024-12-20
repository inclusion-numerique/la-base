'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { OptionBadge } from '@app/ui/components/Form/OptionBadge'
import type { SelectOption } from '@app/ui/components/Form/utils/options'
import {
  SearchParams,
  SearchTab,
  searchUrl,
} from '@app/web/server/search/searchQueryParams'
import type { Category, FilterKey } from './filter'
import { FiltersModal } from './FiltersModal'
import styles from './SearchFilters.module.css'
import SearchFilter from './SearchFilter'

export type FiltersInitialValue = {
  category: FilterKey
  option: SelectOption
}

const SearchFilters = ({
  searchParams,
  label,
  categories,
  initialValues,
  tab,
}: {
  searchParams: SearchParams
  tab: SearchTab
  label: string
  categories: Category[]
  initialValues?: FiltersInitialValue[]
}) => {
  const router = useRouter()
  const [selected, setSelected] = useState<
    { category: FilterKey; option: SelectOption }[]
  >(initialValues || [])

  const onSelect = (option: SelectOption, category: FilterKey) => {
    setSelected([
      ...selected,
      {
        category,
        option,
      },
    ])
    router.push(
      searchUrl(tab, {
        ...searchParams,
        [category]: [...searchParams[category], option.value],
      }),
    )
  }

  const onUnselect = (option: SelectOption, category: FilterKey) => {
    setSelected(
      selected.filter(
        (selectedItem) =>
          selectedItem.category !== category ||
          selectedItem.option.value !== option.value,
      ),
    )
    router.push(
      searchUrl(tab, {
        ...searchParams,
        [category]: searchParams[category].filter(
          (value) => value !== option.value,
        ),
      }),
    )
  }

  return (
    <div className="fr-mb-3w fr-mb-md-6w">
      <div className="fr-unhidden fr-hidden-md">
        <FiltersModal
          categories={categories}
          selected={
            new Set(
              selected
                // .filter((selectedItem) => selectedItem.category === category.id)
                .map((selectedItem) => selectedItem.option.value),
            )
          }
          onUnselect={onUnselect}
          onSelect={onSelect}
        />
      </div>
      <div className="fr-unhidden-md fr-hidden">
        <p className="fr-mb-1w">{label}</p>
        <div className={styles.buttons}>
          {categories.map((category) => (
            <div key={category.id}>
              <SearchFilter
                selected={
                  new Set(
                    selected
                      .filter(
                        (selectedItem) => selectedItem.category === category.id,
                      )
                      .map((selectedItem) => selectedItem.option.value),
                  )
                }
                onUnselect={onUnselect}
                onSelect={onSelect}
                category={category}
              />
            </div>
          ))}
        </div>
      </div>
      {selected.length > 0 && (
        <div className={styles.selected}>
          {selected.map((selectedItem) => (
            <OptionBadge
              key={`${selectedItem.option.value}-${selectedItem.category}`}
              option={selectedItem.option}
              onClick={() =>
                onUnselect(selectedItem.option, selectedItem.category)
              }
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default SearchFilters
