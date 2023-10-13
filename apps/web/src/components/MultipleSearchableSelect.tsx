import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
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
  setSelecteds,
  setInput,
  filter,
  className,
  label,
  hint,
  asterisk,
  'data-testid': dataTestId,
  disabled,
}: {
  placeholder?: string
  noResultMessage?: string
  setSelecteds: (values: SelectOptionValid[]) => void
  setInput?: Dispatch<SetStateAction<string>>
  filter?: (option: SelectOption) => boolean
  className?: string
  label?: ReactNode
  hint?: ReactNode
  asterisk?: boolean
  limit?: number
  options: SelectOption[]
  'data-testid'?: string
  disabled?: boolean
}) => {
  const [internalSelecteds, setInternalSelecteds] = useState<
    SelectOptionValid[]
  >([])
  const [inputValue, setInputValue] = useState('')
  const [showOptions, setShowOptions] = useState(false)

  const optionsContainerRef = useRef<HTMLDivElement>(null)

  const allOptions = useMemo(
    () =>
      options.filter((option) =>
        internalSelecteds.every((selected) => selected.value !== option.value),
      ),
    [options, internalSelecteds],
  )

  const filteredOptions = useMemo(
    () =>
      allOptions.filter((option) =>
        filter
          ? filter(option)
          : option.name
              .toLocaleLowerCase()
              .includes(inputValue.toLocaleLowerCase()),
      ),
    [filter, inputValue, allOptions],
  )

  useEffect(() => {
    setSelecteds([...internalSelecteds])
  }, [internalSelecteds])

  useEffect(() => {
    if (setInput) {
      setInput(inputValue)
    }
  }, [setInput, inputValue])

  const select = useCallback(
    (option: SelectOption) => {
      setInputValue('')
      setInternalSelecteds([...internalSelecteds, option])
    },
    [setInputValue, setInternalSelecteds, internalSelecteds],
  )

  const unselect = useCallback(
    (option: SelectOption) => {
      setInputValue('')
      setInternalSelecteds(
        internalSelecteds.filter((selected) => selected.value !== option.value),
      )
    },
    [setInputValue, setInternalSelecteds, internalSelecteds],
  )

  const onInternalFocus = useCallback(() => {
    setShowOptions(true)
  }, [])

  const selectFirstResult = useCallback(() => {
    if (filteredOptions.length === 1 && !filteredOptions[0].disabled) {
      select(filteredOptions[0])
    } else if (inputValue) {
      setInputValue('')
      setInternalSelecteds([
        ...internalSelecteds,
        { name: inputValue, value: inputValue, invalid: true },
      ])
    }
  }, [filteredOptions, select, inputValue, internalSelecteds])

  const id = 'multiple-searchable-select'
  return (
    <div className={className}>
      <label className="fr-label fr-mb-2w" htmlFor={id}>
        {label} {asterisk && <RedAsterisk />}
        {hint && <span className="fr-hint-text">{hint}</span>}
      </label>
      <div className={styles.input}>
        <div
          className={classNames(
            'fr-input',
            'input-container',
            styles.inputContainer,
          )}
        >
          {internalSelecteds.map((selected) => (
            <OptionBadge
              key={selected.value}
              option={selected}
              onClick={() => unselect(selected)}
              disabled={disabled}
            />
          ))}
          <input
            type="text"
            disabled={disabled}
            data-testid={dataTestId}
            id={id}
            className={classNames('fr-input', styles.internalInput, {
              'fr-input-group--disabled': disabled,
            })}
            placeholder={internalSelecteds.length > 0 ? '' : placeholder}
            value={inputValue}
            onChange={(event) => setInputValue(event.target.value)}
            onFocus={onInternalFocus}
            onBlur={() => {
              setShowOptions(false)
              setInputValue('')
            }}
            onKeyDown={(event) => {
              if (inputValue && event.key === 'Enter') {
                event.preventDefault()
                selectFirstResult()
              }
            }}
          />
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
            limit={limit || DEFAULT_LIMIT}
            hideNoResultMessage={allOptions.length === 0}
            noResultMessage={noResultMessage}
          />
        </div>
      </div>
    </div>
  )
}

export default MultipleSearchableSelect
