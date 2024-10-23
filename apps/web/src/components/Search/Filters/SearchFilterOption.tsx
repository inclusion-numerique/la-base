import React from 'react'
import { SelectOption } from '@app/ui/components/Form/utils/options'
import classNames from 'classnames'
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
      <div>{option.label}</div>
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
