import type { SelectOption } from '@app/ui/components/Form/utils/options'
import classNames from 'classnames'
import React from 'react'
import styles from './SearchFilter.module.css'

const SearchFilterOption = ({
  option,
  onSelect,
  selected,
}: {
  option: SelectOption
  selected?: boolean
  onSelect: (option: SelectOption) => void
}) => (
  <>
    <button
      key={option.value}
      type="button"
      className={styles.option}
      onClick={() => {
        onSelect(option)
      }}
    >
      <div className="fr-flex fr-direction-column fr-align-items-start">
        {option.label}
        {!!option.hint && (
          <span className="fr-text--xs fr-mb-0">{option.hint}</span>
        )}
      </div>
      <span
        className={classNames(
          'fr-icon--sm fr-icon-check-line fr-text-title--blue-france',
          !selected && 'fr-hidden',
        )}
      />
    </button>
    <hr className={styles.separator} />
  </>
)

export default SearchFilterOption
