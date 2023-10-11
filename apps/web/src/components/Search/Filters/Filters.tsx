'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { OptionBadge } from '@app/ui/components/Form/OptionBadge'
import { SelectOption } from '@app/ui/components/Form/utils/options'
import { SearchParams } from '@app/web/server/search/searchQueryParams'
import styles from './Filters.module.css'
import Filter, { Category } from './Filter'

const Filters = ({
  searchParams,
  className,
  label,
  categories,
  initialValues,
}: {
  searchParams: SearchParams
  className?: string
  label: string
  categories: Category[]
  initialValues?: { category: string; option: SelectOption }[]
}) => {
  const router = useRouter()
  const [selecteds, setSelecteds] = useState<
    { category: string; option: SelectOption }[]
  >(initialValues || [])

  const onSelect = (option: SelectOption, category: string) => {
    setSelecteds([
      ...selecteds,
      {
        category,
        option,
      },
    ])
  }

  const unselect = ({
    category,
    option,
  }: {
    category: string
    option: SelectOption
  }) => {
    setSelecteds(
      selecteds.filter(
        (selected) =>
          selected.category !== category ||
          selected.option.value !== option.value,
      ),
    )
  }

  return (
    <div className={className}>
      <p className="wip fr-mb-1w">{label}</p>
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
