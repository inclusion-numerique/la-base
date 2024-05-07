import React, { useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import Button from '@codegouvfr/react-dsfr/Button'
import { SelectOption } from '@app/ui/components/Form/utils/options'
import classNames from 'classnames'
import { FilterCategory } from './FilterCategory'
import styles from './SearchFilter.module.css'

export type FilterKey =
  | 'themes'
  | 'supportTypes'
  | 'targetAudiences'
  | 'departements'

export type Category =
  | { multiple: false; id: FilterKey; label: string; options: SelectOption[] }
  | {
      multiple: true
      id: FilterKey
      label: string
      options: { [key in string]: SelectOption[] }
    }

const SearchFilter = ({
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
  const [open, setOpen] = useState(false)
  const optionsRef = useRef(null)
  useOnClickOutside(optionsRef, () => setOpen(false))

  return (
    <div className={styles.filterContainer} ref={optionsRef}>
      <Button
        className={classNames(styles.button, open && styles.buttonOpen)}
        priority="tertiary"
        iconId={`fr-icon-arrow-${open ? 'up' : 'down'}-s-line`}
        iconPosition="right"
        onClick={() => setOpen(!open)}
      >
        {category.label}
        {selected.size > 0 && (
          <span className={styles.buttonCount}>{selected.size}</span>
        )}
      </Button>
      {open && (
        <div className={styles.options}>
          <FilterCategory
            category={category}
            onSelect={onSelect}
            onUnselect={onUnselect}
            selected={selected}
          />
        </div>
      )}
    </div>
  )
}

export default SearchFilter
