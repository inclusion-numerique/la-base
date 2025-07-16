'use client'

import SearchFilter from '@app/ui/components/Form/Filters/SearchFilter'
import styles from '@app/ui/components/Form/Filters/SearchFilters.module.css'
import {
  type Category,
  type FilterKey,
  isCategoryComplete,
} from '@app/ui/components/Form/Filters/filter'
import OptionBadge from '@app/ui/components/Form/OptionBadge'
import type { SelectOption } from '@app/ui/components/Form/utils/options'
import DeleteSearchFiltersButton from '@app/web/components/Search/Filters/DeleteSearchFiltersButton'
import SearchThematicsFilters from '@app/web/components/Search/Filters/SearchThematicsFilters'
import ThematicOptionBadge from '@app/web/components/Search/Filters/ThematicOptionBadge'
import {
  type SearchParams,
  type SearchTab,
  searchUrl,
} from '@app/web/server/search/searchQueryParams'
import {
  CATEGORY_VARIANTS,
  CATEGORY_VARIANTS_TAG,
  type Category as ThemeCategory,
  categories as themeCategories,
} from '@app/web/themes/themes'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { FiltersModal } from './FiltersModal'

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
    {
      category: FilterKey
      option: SelectOption
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

  const onSelectThematics = (options: SelectOption[], category: FilterKey) => {
    const updatedSearchParams = {
      ...searchParams,
      [category]: options.map((option) => option.value),
      ...Object.fromEntries(
        Object.entries(searchParams)
          .filter(([key]) => key !== 'themes')
          .map(([key]) => [
            key,
            selected
              .filter((s) => s.category === key)
              .map((s) => s.option.value),
          ]),
      ),
    }

    router.push(searchUrl(tab, updatedSearchParams))
  }

  const onUnselectThematics = (category: FilterKey) => {
    setSelected(selected.filter((s) => s.option.extra?.category !== category))

    const updatedSearchParams = {
      ...searchParams,
      themes: selected
        .filter(
          (s) =>
            s.category === 'themes' && s.option.extra?.category !== category,
        )
        .map((s) => s.option.value),
      ...Object.fromEntries(
        Object.entries(searchParams)
          .filter(([key]) => key !== 'themes')
          .map(([key]) => [
            key,
            selected
              .filter((s) => s.category === key)
              .map((s) => s.option.value),
          ]),
      ),
    }

    router.push(searchUrl(tab, updatedSearchParams as SearchParams))
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
            new Set(selected.map((selectedItem) => selectedItem.option.value))
          }
          onUnselect={onUnselect}
          onSelect={onSelect}
        />
      </div>
      <div className="fr-unhidden-md fr-hidden">
        <p className="fr-mb-1w">{label}</p>
        <div className={styles.buttons}>
          <SearchThematicsFilters
            selected={selected}
            onSelectThematics={onSelectThematics}
          />
          {/* We need to filter for the desktop view (since it's handled in the SearchThematicsFilters component above), but keep the 'themes' category in the props for mobile purpose */}
          {categories
            .filter((category) => category.id !== 'themes')
            .map((category) => (
              <div key={category.id}>
                <SearchFilter
                  selected={
                    new Set(
                      selected
                        .filter(
                          (selectedItem) =>
                            selectedItem.category === category.id,
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
      {(otherSelected.length > 0 || selectedThematics.length > 0) && (
        <div
          className={classNames(
            styles.selectedContainer,
            'fr-flex fr-direction-column fr-align-items-center fr-justify-content-space-between fr-direction-md-row fr-flex-gap-6v',
          )}
        >
          <div className={styles.selected}>
            {themeCategories.map((category) => {
              const className =
                CATEGORY_VARIANTS_TAG[category as ThemeCategory].unselected
              const categoryIconClassName = classNames(
                CATEGORY_VARIANTS[category as ThemeCategory].icon,
                CATEGORY_VARIANTS[category as ThemeCategory].color,
              )
              if (isCategoryComplete(category, selectedThematics)) {
                return (
                  <ThematicOptionBadge
                    categoryIconClassName={categoryIconClassName}
                    iconId="fr-icon-close-line"
                    iconClassName="fr-text-title--blue-france"
                    textClassName="fr-text-label--grey"
                    className={className}
                    ariaLabelPrefix={`Retirer toutes les catégories de la thématique ${category}`}
                    option={{ label: category, disabled: false }}
                    onClick={() => onUnselectThematics(category as FilterKey)}
                  />
                )
              } else {
                return selectedThematics
                  .filter((item) => {
                    const option = item.option
                    return option.extra!.category === category
                  })
                  .map((selectedItem) => (
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
                  ))
              }
            })}
            {otherSelected.map((selectedItem) => (
              <OptionBadge
                key={`${selectedItem.option.value}-${selectedItem.category}`}
                option={selectedItem.option}
                onClick={() =>
                  onUnselect(selectedItem.option, selectedItem.category)
                }
              />
            ))}
          </div>
          <div>
            <DeleteSearchFiltersButton />
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchFilters
