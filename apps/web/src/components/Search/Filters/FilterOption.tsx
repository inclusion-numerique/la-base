import React from 'react'
import { SelectOption } from '@app/ui/components/Form/utils/options'
import styles from './Filter.module.css'

const FilterOption = ({
  option,
  onSelect,
}: {
  option: SelectOption
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
      <div>{option.name}</div>
    </button>
    <hr className={styles.separator} />
  </>
)

export default FilterOption
