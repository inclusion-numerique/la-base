'use client'

import OptionBadge from '@app/ui/components/Form/OptionBadge'
import type { SelectOption } from '@app/ui/components/Form/utils/options'
import {
  type SearchParams,
  type SearchTab,
  searchUrl,
} from '@app/web/server/search/searchQueryParams'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { FiltersModal } from './FiltersModal'
import SearchFilter from './SearchFilter'
import styles from './SearchFilters.module.css'
import type { Category, FilterKey } from './filter'
import SearchThematicsFilters from '@app/web/components/Search/Filters/SearchThematicsFilters'
import ThematicOptionBadge from '@app/web/components/Search/Filters/ThematicOptionBadge'
import {
  CATEGORY_VARIANTS,
  CATEGORY_VARIANTS_TAG,
} from '@app/web/themes/themes'
import type { Category as CategoryTheme } from '@app/web/themes/themes'
import classNames from 'classnames'

export type SearchFilterSelectOption = SelectOption<
  string,
  { category: CategoryTheme }
>

export type FiltersInitialValue = {
  category: FilterKey
  option: SearchFilterSelectOption
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
    {
      category: FilterKey
      option: SelectOption | SearchFilterSelectOption
    }[]
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

  const selectedThematics = selected.filter(
    (selectedItem) => selectedItem.category === 'themes',
  )
  const otherSelected = selected.filter(
    (selectedItem) => selectedItem.category !== 'themes',
  )

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
          <SearchThematicsFilters
            onUnselect={onUnselect}
            onSelect={onSelect}
            selected={
              new Set(
                selected
                  .filter((selectedItem) => selectedItem.category === 'themes')
                  .map((selectedItem) => selectedItem.option.value),
              )
            }
          />
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
      {otherSelected.length > 0 ||
        (selectedThematics.length > 0 && (
          <div className={styles.selected}>
            {otherSelected.map((selectedItem) => (
              <OptionBadge
                key={`${selectedItem.option.value}-${selectedItem.category}`}
                option={selectedItem.option}
                onClick={() =>
                  onUnselect(selectedItem.option, selectedItem.category)
                }
              />
            ))}
            {selectedThematics.map((selectedItem) => {
              const option = selectedItem.option as SearchFilterSelectOption
              const category = option.extra!.category
              const className = CATEGORY_VARIANTS_TAG[category].unselected
              const categoryIconClassName = classNames(
                CATEGORY_VARIANTS[category].icon,
                CATEGORY_VARIANTS[category].color,
              )
              return (
                <ThematicOptionBadge
                  categoryIconClassName={categoryIconClassName}
                  iconId="fr-icon-close-line"
                  iconClassName="fr-text-title--blue-france"
                  textClassName="fr-text-label--grey"
                  className={className}
                  ariaLabelPrefix="Retirer"
                  key={`${selectedItem.option.value}-${selectedItem.category}`}
                  option={selectedItem.option}
                  onClick={() =>
                    onUnselect(selectedItem.option, selectedItem.category)
                  }
                />
              )
            })}
          </div>
        ))}
    </div>
  )
}

export default SearchFilters
