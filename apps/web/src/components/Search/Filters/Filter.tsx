import React, { useRef, useState } from 'react'
import { useOnClickOutside } from 'usehooks-ts'
import Button from '@codegouvfr/react-dsfr/Button'
import { SelectOption } from '@app/ui/components/Form/utils/options'
import FilterOption from './FilterOption'
import styles from './Filter.module.css'

export type Category =
  | { multiple: false; id: string; label: string; options: SelectOption[] }
  | {
      multiple: true
      id: string
      label: string
      options: { [key in string]: SelectOption[] }
    }

const Filter = ({
  category,
  onSelect,
}: {
  category: Category
  onSelect: (option: SelectOption, category: string) => void
}) => {
  const [open, setOpen] = useState(false)
  const [openedCategory, setOpenedCategory] = useState('')
  const optionsRef = useRef(null)
  useOnClickOutside(optionsRef, () => setOpen(false))

  return (
    <div ref={optionsRef}>
      <Button
        priority="tertiary"
        iconId={`fr-icon-arrow-${open ? 'up' : 'down'}-s-line`}
        iconPosition="right"
        onClick={() => setOpen(!open)}
      >
        {category.label}
      </Button>
      {open && (
        <div className={styles.options}>
          {category.multiple
            ? Object.keys(category.options).map((key) => {
                const options = category.options[key]
                const currentCategory = openedCategory === key
                return (
                  <>
                    <button
                      key={key}
                      className={styles.optionCategory}
                      type="button"
                      onClick={() =>
                        setOpenedCategory(currentCategory ? '' : key)
                      }
                    >
                      <div>
                        <span
                          className={`fr-icon-arrow-${
                            currentCategory ? 'down' : 'right'
                          }-s-line`}
                        />
                        {key}
                      </div>
                      <div>00</div>
                    </button>
                    <hr className={styles.separator} />
                    {currentCategory &&
                      options.map((option) => (
                        <FilterOption
                          key={option.value}
                          option={option}
                          onSelect={(o) => {
                            onSelect(o, category.id)
                            setOpen(false)
                          }}
                        />
                      ))}
                  </>
                )
              })
            : category.options.map((option) => (
                <FilterOption
                  key={option.value}
                  option={option}
                  onSelect={(o) => {
                    onSelect(o, category.id)
                    setOpen(false)
                  }}
                />
              ))}
        </div>
      )}
    </div>
  )
}

export default Filter
