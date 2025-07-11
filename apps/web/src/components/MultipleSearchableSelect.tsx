import OptionBadge, {
  type SelectOptionValid,
} from '@app/ui/components/Form/OptionBadge'
import RedAsterisk from '@app/ui/components/Form/RedAsterisk'
import type { SelectOption } from '@app/ui/components/Form/utils/options'
import Options from '@app/ui/components/SearchableSelect/Options'
import InviteBaseMemberRow from '@app/web/features/base/members/components/InviteBaseMemberRow'
import { Button } from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import React, {
  forwardRef,
  type ReactNode,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import { z } from 'zod'
import styles from './MultipleSearchableSelect.module.css'

const DEFAULT_LIMIT = 5

export type MultipleSearchableSelectRef = {
  selectFirstResult: () => void
}

const MultipleSearchableSelect = forwardRef<
  MultipleSearchableSelectRef,
  {
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
    withBadges: boolean
    canAddAdmin: boolean
    withAddButton: boolean
  }
>(
  (
    {
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
      withBadges,
      canAddAdmin,
      withAddButton,
    },
    ref,
  ) => {
    const [internalSelection, setInternalSelection] = useState<
      SelectOptionValid<{
        email?: string
        firstName?: string
        lastName?: string
      }>[]
    >([])
    const [inputValue, setInputValue] = useState('')
    const [showOptions, setShowOptions] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(-1)

    const optionsContainerRef = useRef<HTMLDivElement>(null)
    const allOptions = useMemo(
      () =>
        options.filter((option) =>
          internalSelection.every(
            (selected) => selected.value !== option.value,
          ),
        ),
      [options, internalSelection],
    )

    const filteredOptions = useMemo(
      () =>
        allOptions.filter((option) =>
          filter ? filter(option) : option.label.toLocaleLowerCase(),
        ),
      [filter, allOptions],
    )

    const onInputChange = useCallback(
      (input: string) => {
        setInputValue(input)
        onInputChangeProperty?.(input)
      },
      [onInputChangeProperty],
    )

    const select = useCallback(
      (
        option: SelectOption<
          string,
          { email?: string; firstName?: string; lastName?: string }
        >,
      ) => {
        const newSelection = [
          ...internalSelection,
          {
            value: option.value,
            label: option.label,
            type: selectedMemberType,
            extra: {
              firstName: option.extra?.firstName,
              lastName: option.extra?.lastName,
              email: option.extra?.email,
            },
          },
        ]
        onInputChange('')
        setInternalSelection(newSelection)
        onSelectProperty(newSelection)
      },
      [internalSelection, selectedMemberType, onInputChange, onSelectProperty],
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
        if (
          filteredOptions.length > 0 &&
          index >= 0 &&
          !filteredOptions[index]?.disabled
        ) {
          select(filteredOptions[index])
        } else if (inputValue) {
          onInputChange('')
          const isEmail = inputValue.includes('@')
          const isValidEmail =
            isEmail && z.string().email().safeParse(inputValue).success
          const isInvalid = !isEmail || !isValidEmail

          const newSelection = [
            ...internalSelection,
            {
              label: inputValue,
              value: inputValue,
              type: selectedMemberType,
              invalid: isInvalid,
            },
          ]
          setInternalSelection(newSelection)
          onSelectProperty(newSelection)
        }
      },
      [
        filteredOptions,
        inputValue,
        selectedMemberType,
        select,
        onInputChange,
        internalSelection,
        onSelectProperty,
      ],
    )

    useImperativeHandle(
      ref,
      () => ({
        selectFirstResult: () => selectFirstResult(0),
      }),
      [selectFirstResult],
    )

    const handleOnHide = () => setSelectedIndex(-1)
    const handleOnSelectRole = (
      optionValue: string,
      type: 'admin' | 'member',
    ) => {
      const memberToUpdate = internalSelection.find(
        (selection) => selection.value === optionValue,
      )
      if (memberToUpdate) {
        memberToUpdate.type = type
        const newSelection = [
          ...internalSelection.filter(
            (selection) => selection.value !== optionValue,
          ),
          memberToUpdate,
        ]
        setInternalSelection(newSelection)
        onSelectProperty(newSelection)
      }
    }

    const id = 'multiple-searchable-select'
    return (
      <>
        <div className={className}>
          <label className="fr-label fr-mb-2w" htmlFor={id}>
            {label} {asterisk && <RedAsterisk />}
            {hint && <span className="fr-hint-text">{hint}</span>}
          </label>
          <div className={styles.input}>
            <div className="fr-flex fr-align-items-center fr-direction-column fr-direction-md-row fr-justify-content-space-between fr-flex-gap-4v">
              <div className={classNames('fr-input', styles.inputContainer)}>
                <input
                  type="text"
                  role="combobox"
                  aria-autocomplete="list"
                  disabled={disabled}
                  data-testid={dataTestId}
                  id={id}
                  className={classNames('fr-width-full', styles.internalInput, {
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
                      setSelectedIndex(
                        (selectedIndex + 1) % filteredOptions.length,
                      )
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
              {withAddButton && (
                <Button
                  type="button"
                  className={styles.addButton}
                  nativeButtonProps={{
                    onClick: () => {
                      selectFirstResult(selectedIndex)
                    },
                  }}
                >
                  Ajouter
                </Button>
              )}
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
                onHide={handleOnHide}
              />
            </div>
          </div>
          {withBadges && (
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
          )}
          {!withBadges && internalSelection.length > 0 && (
            <>
              <div className="fr-mt-4w">
                <label className="fr-label fr-mb-2w" htmlFor={id}>
                  Liste des membres à inviter
                </label>
                <div className="fr-flex fr-direction-column fr-flex-gap-4v">
                  {internalSelection.map((selected) => (
                    <InviteBaseMemberRow
                      key={selected.value}
                      member={selected}
                      canAddAdmin={canAddAdmin}
                      onDelete={() => unselect(selected)}
                      onSelectRole={(type) =>
                        handleOnSelectRole(selected.value, type)
                      }
                    />
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </>
    )
  },
)

MultipleSearchableSelect.displayName = 'MultipleSearchableSelect'

export default MultipleSearchableSelect
