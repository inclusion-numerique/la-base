import React, { ReactNode, useCallback, useMemo, useRef, useState } from 'react'
import classNames from 'classnames'
import Options from '@app/ui/components/SearchableSelect/Options'
import { SelectOption } from '@app/ui/components/Form/utils/options'
import {
  OptionBadge,
  SelectOptionValid,
} from '@app/ui/components/Form/OptionBadge'
import RedAsterisk from '@app/ui/components/Form/RedAsterisk'
import styles from './MultipleSearchableSelect.module.css'

const DEFAULT_LIMIT = 5

const MultipleSearchableSelect = ({
  placeholder,
  noResultMessage,
  options,
  limit,
  onSelect: onSelectProperty,
  onInputChange: onInputChangeProperty,
  filter,
  className,
  label,
  hint,
  asterisk,
  'data-testid': dataTestId,
  disabled,
  selectedMemberType,
}: {
  placeholder?: string
  noResultMessage?: string
  onSelect: (values: SelectOptionValid[]) => void
  onInputChange?: (input: string) => void
  filter?: (option: SelectOption) => boolean
  className?: string
  label?: ReactNode
  hint?: ReactNode
  asterisk?: boolean
  limit?: number
  options: SelectOption[]
  'data-testid'?: string
  disabled?: boolean
  selectedMemberType: 'admin' | 'member'
}) => {
  const [internalSelection, setInternalSelection] = useState<
    SelectOptionValid[]
  >([])
  const [inputValue, setInputValue] = useState('')
  const [showOptions, setShowOptions] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState(-1)

  const optionsContainerRef = useRef<HTMLDivElement>(null)
  const allOptions = useMemo(
    () =>
      options.filter((option) =>
        internalSelection.every((selected) => selected.value !== option.value),
      ),
    [options, internalSelection],
  )

  const filteredOptions = useMemo(
    () =>
      allOptions.filter((option) =>
        filter ? filter(option) : option.label.toLocaleLowerCase(),
      ),
    [filter, inputValue, allOptions],
  )

  const onInputChange = useCallback(
    (input: string) => {
      setInputValue(input)
      onInputChangeProperty?.(input)
    },
    [setInputValue, onInputChangeProperty],
  )

  const select = useCallback(
    (option: SelectOption) => {
      const newSelection = [...internalSelection, option]
      onInputChange('')
      setInternalSelection(newSelection)
      onSelectProperty(newSelection)
    },
    [internalSelection, onInputChange, onSelectProperty],
  )

  const unselect = useCallback(
    (option: SelectOption) => {
      const newSelection = internalSelection.filter(
        (selected) => selected.value !== option.value,
      )
      onInputChange('')
      setInternalSelection(newSelection)
      onSelectProperty(newSelection)
    },
    [internalSelection, onInputChange, onSelectProperty],
  )

  const onInternalFocus = useCallback(() => {
    setShowOptions(true)
  }, [])

  const selectFirstResult = useCallback(
    (index: number) => {
      if (filteredOptions.length > 0 && !filteredOptions[index].disabled) {
        select(filteredOptions[index])
      } else if (inputValue) {
        onInputChange('')
        const newSelection = [
          ...internalSelection,
          { label: inputValue, value: inputValue, type: selectedMemberType },
        ]
        setInternalSelection(newSelection)
        onSelectProperty(newSelection)
      }
    },
    [
      filteredOptions,
      inputValue,
      select,
      onInputChange,
      internalSelection,
      onSelectProperty,
      selectedIndex,
    ],
  )

  const id = 'multiple-searchable-select'
  return (
    <div className={className}>
      <label className="fr-label fr-mb-2w" htmlFor={id}>
        {label} {asterisk && <RedAsterisk />}
        {hint && <span className="fr-hint-text">{hint}</span>}
      </label>
      <div className={styles.input}>
        <div className="fr-flex fr-align-items-center fr-justify-content-space-between">
          <div className={classNames('fr-input', styles.inputContainer)}>
            <input
              type="text"
              role="combobox"
              aria-autocomplete="list"
              disabled={disabled}
              data-testid={dataTestId}
              id={id}
              className={classNames(styles.internalInput, {
                'fr-input-group--disabled': disabled,
              })}
              placeholder={internalSelection.length > 0 ? '' : placeholder}
              value={inputValue}
              onChange={(event) => {
                onInputChange(event.target.value)
              }}
              onFocus={onInternalFocus}
              onBlur={() => {
                setShowOptions(false)
              }}
              onKeyDown={(event) => {
                if (event.key === 'ArrowDown') {
                  event.preventDefault()
                  setSelectedIndex((selectedIndex + 1) % filteredOptions.length)
                } else if (event.key === 'ArrowUp') {
                  event.preventDefault()
                  setSelectedIndex(
                    selectedIndex === 0
                      ? filteredOptions.length - 1
                      : (selectedIndex - 1) % filteredOptions.length,
                  )
                }
                if (inputValue && event.key === 'Enter') {
                  event.preventDefault()
                  selectFirstResult(selectedIndex)
                }
              }}
            />
          </div>
        </div>
        <div
          ref={optionsContainerRef}
          className={classNames(styles.options, {
            [styles.visible]: showOptions,
          })}
        >
          <Options
            data-testid={dataTestId}
            options={filteredOptions}
            select={select}
            selectedIndex={selectedIndex}
            limit={limit || DEFAULT_LIMIT}
            hideNoResultMessage={allOptions.length === 0}
            noResultMessage={noResultMessage}
            onHide={() => setSelectedIndex(-1)}
          />
        </div>
      </div>
      <div
        className={classNames(
          styles.selected,
          'fr-mt-3w',
          !showOptions && styles.selectedRelative,
        )}
      >
        {internalSelection.map((selected) => (
          <OptionBadge
            key={selected.value}
            option={selected}
            onClick={() => unselect(selected)}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  )
}

export default MultipleSearchableSelect
