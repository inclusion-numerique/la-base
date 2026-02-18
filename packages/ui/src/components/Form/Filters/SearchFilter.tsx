import type { SelectOption } from '@app/ui/components/Form/utils/options'
import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import { type FocusEvent, type RefObject, useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import { FilterCategory } from './FilterCategory'
import type { Category, FilterKey } from './filter'
import styles from './SearchFilter.module.css'

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
  const optionsRef = useRef<HTMLDivElement>(null)
  useOnClickOutside(optionsRef as RefObject<HTMLDivElement>, () =>
    setOpen(false),
  )

  const handleBlur = (e: FocusEvent<HTMLDivElement>) => {
    if (!optionsRef.current?.contains(e.relatedTarget as Node)) {
      setOpen(false)
    }
  }

  return (
    <div
      className={styles.filterContainer}
      ref={optionsRef}
      onBlur={handleBlur}
    >
      <Button
        className={classNames(styles.button, open && styles.buttonOpen)}
        priority="tertiary"
        iconId={`fr-icon-arrow-${open ? 'up' : 'down'}-s-line`}
        iconPosition="right"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {category.label}
        {selected.size > 0 && (
          <span className={styles.buttonCount}>
            {selected.size}
            <span className="fr-sr-only"> filtres sélectionnés</span>
          </span>
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
