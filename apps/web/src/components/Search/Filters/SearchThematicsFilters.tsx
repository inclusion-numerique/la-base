import classNames from 'classnames'
import styles from './SearchFilter.module.css'
import type { FilterKey } from './filter'
import { SelectOption } from '@app/ui/components/Form/utils/options'
import Button from '@codegouvfr/react-dsfr/Button'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { Category, categoryThemesOptions } from '@app/web/themes/themes'
import SearchThematicsCategory from '@app/web/components/Search/Filters/SearchThematicsCategory'
import thematicsFiltersStyles from './SearchThematicsFilters.module.css'

const modal = createModal({
  id: 'search-thematics-filters-modal',
  isOpenedByDefault: false,
})

const SearchThematicsFilters = ({
  onSelect,
  onUnselect,
  selected,
}: {
  onSelect: (option: SelectOption, category: FilterKey) => void
  onUnselect: (option: SelectOption, category: FilterKey) => void
  selected: Set<string>
}) => {
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
          {selected.size > 0 && (
            <span className={styles.buttonCount}>{selected.size}</span>
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
              selected={selected}
              category={key as Category}
              options={value}
            />
          ))}
        </div>
        <div className="fr-mt-10v fr-border--top">
          <div className="fr-flex fr-justify-content-space-between fr-pt-8v">
            <Button priority="secondary" onClick={() => modal.close()}>
              Effacer tout
            </Button>
            <Button priority="primary" onClick={() => modal.close()}>
              Appliquer le filtre
            </Button>
          </div>
        </div>
      </modal.Component>
    </>
  )
}

export default SearchThematicsFilters
