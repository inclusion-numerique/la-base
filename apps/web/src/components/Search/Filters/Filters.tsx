'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { OptionBadge } from '@app/ui/components/Form/OptionBadge'
import { SelectOption } from '@app/ui/components/Form/utils/options'
import {
  SearchParams,
  SearchTab,
  searchUrl,
} from '@app/web/server/search/searchQueryParams'
import styles from './Filters.module.css'
import Filter, { Category, FilterKey } from './Filter'

export type FiltersInitialValue = {
  category: FilterKey
  option: SelectOption
}

const Filters = ({
  searchParams,
  className,
  label,
  categories,
  initialValues,
  tab,
}: {
  searchParams: SearchParams
  className?: string
  tab: SearchTab
  label: string
  categories: Category[]
  initialValues?: FiltersInitialValue[]
}) => {
  const router = useRouter()
  const [selecteds, setSelecteds] = useState<
    { category: FilterKey; option: SelectOption }[]
  >(initialValues || [])

  const onSelect = (option: SelectOption, category: FilterKey) => {
    setSelecteds([
      ...selecteds,
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

  const unselect = ({
    category,
    option,
  }: {
    category: FilterKey
    option: SelectOption
  }) => {
    setSelecteds(
      selecteds.filter(
        (selected) =>
          selected.category !== category ||
          selected.option.value !== option.value,
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
    <div className={className}>
      <p className="fr-mb-1w">{label}</p>
      <div className={styles.buttons}>
        {categories.map((category) => (
          <div key={category.id}>
            <Filter onSelect={onSelect} category={category} />
          </div>
        ))}
      </div>
      {selecteds.length > 0 && (
        <div className={styles.selected}>
          {selecteds.map((selected) => (
            <OptionBadge
              size="sm"
              key={`${selected.option.value}-${selected.category}`}
              option={selected.option}
              onClick={() => unselect(selected)}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Filters
