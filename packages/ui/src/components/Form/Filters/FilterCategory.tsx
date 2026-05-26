import SearchFilterOption from '@app/ui/components/Form/Filters/SearchFilterOption'
import type { SelectOption } from '@app/ui/components/Form/utils/options'
import { useState } from 'react'
import type { Category, FilterKey } from './filter'
import styles from './SearchFilter.module.css'

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

  return category.multiple ? (
    <fieldset className={styles.fieldset}>
      <legend className="fr-sr-only">{category.label}</legend>
      <ul className="fr-raw-list">
        {Object.keys(category.options).map((key, categoryIndex) => {
          const options = category.options[key]
          const currentCategory = openedCategory === key
          return (
            <li key={key}>
              <button
                className={styles.optionCategory}
                type="button"
                onClick={() => {
                  setOpenedCategory(currentCategory ? '' : key)
                }}
                aria-expanded={currentCategory}
              >
                <h3 className="fr-text--sm fr-text--medium fr-text-title--blue-france fr-mb-0">
                  {key}
                </h3>
                <span
                  className={`fr-icon--sm fr-icon-arrow-${
                    currentCategory ? 'up' : 'down'
                  }-s-line`}
                />
              </button>
              <hr className={styles.separator} />
              {currentCategory && (
                <fieldset className={styles.fieldset}>
                  <legend className="fr-sr-only">
                    {`${category.label} - ${key}`}
                  </legend>
                  <ul className="fr-raw-list">
                    {options.map((option, index) => (
                      <li className={styles.optionListItem} key={option.value}>
                        <SearchFilterOption
                          id={`${category.id}-${categoryIndex}-${index}`}
                          option={option}
                          selected={selected.has(option.value)}
                          onSelect={(o) => onClick(o)}
                        />
                      </li>
                    ))}
                  </ul>
                </fieldset>
              )}
            </li>
          )
        })}
      </ul>
    </fieldset>
  ) : (
    <fieldset className={styles.fieldset}>
      <legend className="fr-sr-only">{category.label}</legend>
      <ul className="fr-raw-list">
        {category.options.map((option, index) => (
          <li className={styles.optionListItem} key={option.value}>
            <SearchFilterOption
              id={`${category.id}-${index}`}
              option={option}
              selected={selected.has(option.value)}
              onSelect={(o) => onClick(o)}
            />
          </li>
        ))}
      </ul>
    </fieldset>
  )
}
