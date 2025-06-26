import styles from '@app/ui/components/Form/Filters/SearchFilter.module.css'
import {
  FilterKey,
  ThematicSelection,
} from '@app/ui/components/Form/Filters/filter'
import { SelectOption } from '@app/ui/components/Form/utils/options'
import SearchThematicsCategory from '@app/web/components/Search/Filters/SearchThematicsCategory'
import { Category, categoryThemesOptions } from '@app/web/themes/themes'
import Button from '@codegouvfr/react-dsfr/Button'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import classNames from 'classnames'
import { useState } from 'react'
import thematicsFiltersStyles from './SearchThematicsFilters.module.css'

const modal = createModal({
  id: 'search-thematics-filters-modal',
  isOpenedByDefault: false,
})

interface SearchThematicsFiltersProps {
  selected: ThematicSelection[]
  onSelectThematics: (option: SelectOption[], category: FilterKey) => void
}

const SearchThematicsFilters = ({
  selected,
  onSelectThematics,
}: SearchThematicsFiltersProps) => {
  const [internalSelected, setInternalSelected] = useState(selected)

  const clearThematics = () => {
    const newSelected = selected.filter((item) => item.category !== 'themes')
    setInternalSelected(newSelected)
  }

  const handleOnSelect = (option: SelectOption, category: FilterKey) => {
    const isAlreadySelected = internalSelected.some(
      (item) =>
        item.category === category && item.option.value === option.value,
    )

    if (isAlreadySelected) {
      setInternalSelected(
        internalSelected.filter(
          (item) =>
            !(item.category === category && item.option.value === option.value),
        ),
      )
    } else {
      setInternalSelected([...internalSelected, { category, option }])
    }
  }

  const applyThematicsFilters = () => {
    onSelectThematics(
      internalSelected.map((s) => s.option),
      'themes',
    )
  }
  const onSelectAllInCategory = (category: FilterKey, selected: boolean) => {
    const categoryOptions = categoryThemesOptions[category as Category]
    if (selected) {
      setInternalSelected([
        ...internalSelected,
        ...categoryOptions.map((option) => ({ category, option })),
      ])
    } else {
      setInternalSelected(
        internalSelected.filter((s) => s.category !== category),
      )
    }
  }

  const selectedCount = internalSelected.flatMap((s) => s.option).length

  return (
    <>
      <div className={styles.filterContainer}>
        <Button
          className={classNames(styles.button)}
          priority="tertiary"
          onClick={() => modal.open()}
        >
          Thématique
          <span className="ri-price-tag-3-line fr-ml-4v" />
          {selectedCount > 0 && (
            <span className={styles.buttonCount}>{selectedCount}</span>
          )}
        </Button>
      </div>
      <modal.Component
        title="Filtrer par thématiques"
        className={thematicsFiltersStyles.frSearchThematicsModal}
      >
        <div className="fr-flex fr-direction-column fr-flex-gap-12v">
          {Object.entries(categoryThemesOptions).map(([key, value]) => (
            <SearchThematicsCategory
              key={key}
              onSelect={handleOnSelect}
              selected={internalSelected}
              category={key as Category}
              options={value}
              onSelectAllInCategory={onSelectAllInCategory}
            />
          ))}
        </div>
        <div className="fr-mt-10v fr-border--top">
          <div className="fr-flex fr-justify-content-space-between fr-pt-8v">
            <Button priority="secondary" onClick={clearThematics}>
              Effacer tout
            </Button>
            <Button priority="primary" onClick={applyThematicsFilters}>
              Appliquer le filtre
            </Button>
          </div>
        </div>
      </modal.Component>
    </>
  )
}

export default SearchThematicsFilters
