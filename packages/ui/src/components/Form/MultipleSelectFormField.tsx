'use client'

import RedAsterisk from '@app/ui/components/Form/RedAsterisk'
import SelectOptionsList from '@app/ui/components/Form/SelectOptionsList'
import classNames from 'classnames'
import {
  RefObject,
  useRef,
  useState,
  type ChangeEventHandler,
  type MouseEventHandler,
  type ReactNode,
} from 'react'
import { Control, Controller, FieldValues } from 'react-hook-form'
import type { FieldPath } from 'react-hook-form/dist/types/path'
import type { SelectOption } from './utils/options'
import Button from '@codegouvfr/react-dsfr/Button'
import styles from './MultipleSelectFormField.module.css'
import { useOnClickOutside } from 'usehooks-ts'

const OptionBadge = ({
  option,
  onClick,
  disabled,
  size,
  'data-testid': dataTestId,
}: {
  option: SelectOption
  onClick: MouseEventHandler
  disabled?: boolean
  size?: 'sm' | 'md'
  'data-testid'?: string
}) => (
  <button
    type="button"
    className={`fr-tag fr-mr-1w fr-mb-2v ${size === 'sm' ? 'fr-tag--sm' : ''}`}
    disabled={disabled || option.disabled}
    onClick={disabled ? undefined : onClick}
    aria-label={`Retirer ${option.label}`}
    data-testid={dataTestId}
  >
    {option.label}
    <span className="fr-icon-close-line fr-ml-1w fr-icon--sm" />
  </button>
)

export type MultipleSelectFormFieldProps<T extends FieldValues> = {
  control: Control<T>
  label?: ReactNode
  path: FieldPath<T>
  disabled?: boolean
  asterisk?: boolean
  defaultOptionLabel?: string
  hint?: ReactNode
  badgeSize?: 'sm' | 'md'
  options: SelectOption[]
  limit?: number
  className?: string
  'data-testid'?: string
}

const MultipleSelectFormField = <T extends FieldValues>({
  control,
  label,
  path,
  hint,
  disabled,
  asterisk,
  defaultOptionLabel = 'Sélectionner une option',
  badgeSize,
  options,
  limit,
  className,
  'data-testid': dataTestId,
}: MultipleSelectFormFieldProps<T>) => {
  const [open, setOpen] = useState(false)
  const optionsRef = useRef<HTMLDivElement>(null)
  useOnClickOutside(optionsRef as RefObject<HTMLDivElement>, () =>
    setOpen(false),
  )

  const id = `select-tags-form-field__${path}`

  return (
    <Controller
      control={control}
      name={path}
      render={({ field: { onChange, value, ref }, fieldState: { error } }) => {
        // We will remove already selected options from the select options
        const valuesSet = new Set<string>(value ?? [])

        const onSelectChange = (option: SelectOption) => {
          // Don't add if already selected
          if (valuesSet.has(option.value)) {
            setOpen(false)
            return
          }
          onChange(value ? [...value, option.value] : [option.value])
          setOpen(false)
        }

        const selectedOptions = options.filter((option) =>
          valuesSet.has(option.value),
        )

        // Remove value on badge click
        const onTagClick = (option: SelectOption) => {
          onChange(
            (value as string[]).filter(
              (selectedValue: string) => selectedValue !== option.value,
            ),
          )
        }

        const optionsWithDisabledSelectedValues = options.map((option) => ({
          ...option,
          disabled: valuesSet.has(option.value),
        }))

        return (
          <div
            className={classNames(
              'fr-select-group',
              {
                'fr-select-group--disabled': disabled,
                'fr-select-group--error': error,
              },
              className,
            )}
          >
            <label className="fr-label" htmlFor={id}>
              {label} {asterisk && <RedAsterisk />}
              {hint ? <span className="fr-hint-text">{hint}</span> : null}
            </label>
            <Button
              data-testid={dataTestId}
              aria-describedby="text-select-error-desc-error"
              id={id}
              nativeButtonProps={{
                type: 'button',
              }}
              disabled={disabled || !!(limit && value && value.length >= limit)}
              ref={ref}
              className={classNames(
                'fr-select',
                'fr-select--error',
                styles.selectButton,
                open && styles.selectButtonOpen,
              )}
              onClick={() => setOpen(!open)}
            >
              {defaultOptionLabel}
            </Button>
            {open && (
              <div className={styles.options} ref={optionsRef}>
                <SelectOptionsList
                  options={optionsWithDisabledSelectedValues}
                  onClick={onSelectChange}
                  selectedOptions={selectedOptions}
                />
              </div>
            )}
            <div className="fr-mt-4v">
              {selectedOptions.map((option) => (
                <OptionBadge
                  key={option.value}
                  option={option}
                  disabled={disabled}
                  size={badgeSize}
                  onClick={() => onTagClick(option)}
                  data-testid={`${dataTestId}-${option.value}`}
                />
              ))}
            </div>
            {error ? (
              <p id={`${id}__error`} className="fr-error-text">
                {error.message}
              </p>
            ) : null}
          </div>
        )
      }}
    />
  )
}

export default MultipleSelectFormField
