import type { SelectOption } from '@app/ui/components/Form/utils/options'
import type { SearchFilterSelectOption } from '@app/web/components/Search/Filters/SearchFilters'
import React, { useState } from 'react'
import styles from './SearchFilter.module.css'
import SearchFilterOption from './SearchFilterOption'
import type { Category, FilterKey } from './filter'

export const FilterCategory = ({
  category,
  onSelect,
  onUnselect,
  selected,
}: {
  category: Category
  onSelect: (option: SelectOption, category: FilterKey) => void
  onUnselect: (option: SelectOption, category: FilterKey) => void
  selected: Set<string>
}) => {
  const [openedCategory, setOpenedCategory] = useState('')

  const onClick = (option: SelectOption) => {
    if (selected.has(option.value)) {
      onUnselect(option, category.id)
      return
    }
    onSelect(option, category.id)
  }

  return category.multiple
    ? Object.keys(category.options).map((key) => {
        const options = category.options[key]
        const currentCategory = openedCategory === key
        return (
          <>
            <button
              key={key}
              className={styles.optionCategory}
              type="button"
              onClick={() => setOpenedCategory(currentCategory ? '' : key)}
            >
              <div>{key}</div>
              <span
                className={`fr-icon--sm fr-icon-arrow-${
                  currentCategory ? 'up' : 'down'
                }-s-line`}
              />
            </button>
            <hr key={`${key}_separator`} className={styles.separator} />
            {currentCategory &&
              options.map((option) => (
                <SearchFilterOption
                  key={option.value}
                  option={option}
                  selected={selected.has(option.value)}
                  onSelect={(o) => onClick(o)}
                />
              ))}
          </>
        )
      })
    : category.options.map((option) => (
        <SearchFilterOption
          key={option.value}
          option={option}
          selected={selected.has(option.value)}
          onSelect={(o) => onClick(o)}
        />
      ))
}
