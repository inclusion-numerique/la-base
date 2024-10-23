import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react'
import classNames from 'classnames'
import Input from '@codegouvfr/react-dsfr/Input'
import Options, { Option } from './Options'
import styles from './SearchableSelect.module.css'

const DEFAULT_LIMIT = 5

type Category<T extends string> = {
  name: string
  options: Option<T>[]
  limit?: number
}

const SearchableSelect = <T extends string>({
  label,
  withoutButton,
  placeholder,
  categories,
  noResultMessage,
  options,
  limit,
  setSelected,
}: {
  label?: ReactNode
  withoutButton?: boolean
  placeholder?: string
  noResultMessage?: string
  setSelected: Dispatch<SetStateAction<string>>
} & (
  | { categories: Category<T>[]; options: undefined; limit: undefined }
  | {
      categories: undefined
      limit?: number
      options: Option<T>[]
    }
)) => {
  const allOptions = useMemo(() => {
    if (options) {
      return options
    }
    return categories.flatMap((category) => category.options)
  }, [options, categories])

  const [inputValue, setInputValue] = useState('')
  const [showOptions, setShowOptions] = useState(false)

  const optionsContainerRef = useRef<HTMLDivElement>(null)

  const filteredOptions = useMemo(
    () =>
      allOptions.filter((option) =>
        option.label
          .toLocaleLowerCase()
          .includes(inputValue.toLocaleLowerCase()),
      ),
    [inputValue, allOptions],
  )

  const select = useCallback(
    (option: Option<T>) => {
      setInputValue(option.label)
      setSelected(option.value)
    },
    [setInputValue, setSelected],
  )

  const unselect = useCallback(() => {
    setInputValue('')
    setSelected('')
  }, [setInputValue, setSelected])

  const onInternalFocus = useCallback(() => {
    unselect()
    setShowOptions(true)
  }, [unselect])

  const onInternalBlur = useCallback(() => {
    if (filteredOptions.length === 1 && !filteredOptions[0].disabled) {
      select(filteredOptions[0])
    } else {
      const foundValue = allOptions
        .filter((option) => !option.disabled)
        .find(
          (option) =>
            option.label.toLocaleLowerCase() === inputValue.toLocaleLowerCase(),
        )
      if (!foundValue) {
        unselect()
      }
    }
    setShowOptions(false)
  }, [filteredOptions, inputValue, allOptions, select, unselect])

  return (
    <div className={styles.input}>
      {!withoutButton && (
        // eslint-disable-next-line jsx-a11y/control-has-associated-label
        <button
          type="button"
          title="Effacer la recherche"
          className={styles.icon}
          onClick={unselect}
        >
          <span
            className={classNames({
              'fr-icon-close-circle-fill': inputValue,
              'fr-icon-search-line': !inputValue,
              [styles.searchIcon]: !inputValue,
            })}
          />
        </button>
      )}
      <Input
        label={label}
        className="fr-mb-0"
        nativeInputProps={{
          placeholder,
          value: inputValue,
          onChange: (event) => setInputValue(event.target.value),
          onFocus: onInternalFocus,
          onBlur: onInternalBlur,
        }}
      />
      <div
        ref={optionsContainerRef}
        className={classNames(styles.options, {
          [styles.visible]: showOptions,
        })}
      >
        {categories &&
          categories.map((category, index) => (
            <div key={category.name}>
              <div
                className={classNames(
                  styles.category,
                  'fr-text--lg',
                  'fr-mb-0',
                  { 'fr-mt-3w': index !== 0 },
                )}
              >
                <b>{category.name}</b>
              </div>
              <Options
                options={category.options.filter((option) =>
                  filteredOptions.some((o) => o.value === option.value),
                )}
                select={select}
                limit={category.limit || DEFAULT_LIMIT}
                noResultMessage={noResultMessage}
              />
            </div>
          ))}
        {options && (
          <Options
            options={filteredOptions}
            select={select}
            limit={limit || DEFAULT_LIMIT}
            noResultMessage={noResultMessage}
          />
        )}
      </div>
    </div>
  )
}

export default SearchableSelect
