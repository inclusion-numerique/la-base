import React, { ChangeEventHandler, ReactNode } from 'react'
import classNames from 'classnames'
import { Control, Controller, FieldValues } from 'react-hook-form'
import { FieldPath } from 'react-hook-form/dist/types/path'
import RedAsterisk from '@app/ui/components/Form/RedAsterisk'
import { SelectOption } from './utils/options'
import { OptionBadge } from './OptionBadge'

const OptionsList = ({ options }: { options: SelectOption[] }) => (
  <>
    {options.map(({ name, value }) => (
      <option key={value} value={value}>
        {name}
      </option>
    ))}
    )
  </>
)

export type MultipleSelectFormFieldProps<T extends FieldValues> = {
  control: Control<T>
  label?: ReactNode
  path: FieldPath<T>
  disabled?: boolean
  asterisk?: boolean
  defaultOption?: boolean
  defaultOptionLabel?: string
  hint?: ReactNode
  placeholder?: string
  badgeSize?: 'sm' | 'md'
  options: SelectOption[]
  limit?: number
  'data-testid'?: string
}

const MultipleSelectFormField = <T extends FieldValues>({
  control,
  label,
  path,
  placeholder,
  hint,
  defaultOption,
  disabled,
  asterisk,
  defaultOptionLabel = 'Sélectionnez une option',
  badgeSize,
  options,
  limit,
  'data-testid': dataTestId,
}: MultipleSelectFormFieldProps<T>) => {
  const id = `select-tags-form-field__${path}`

  // TODO Aria labeled by from id
  return (
    <Controller
      control={control}
      name={path}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { error },
      }) => {
        // We will remove already selected options from the select options
        const valuesSet = new Set<string>(value ?? [])

        const onSelectChange: ChangeEventHandler<HTMLSelectElement> = (
          event,
        ) => {
          onChange(
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore: force type as string[]
            value ? [...value, event.target.value] : [event.target.value],
          )
        }

        const selectedOptions = options.filter((option) =>
          valuesSet.has(option.value),
        )

        // Remove value on badge click
        const onTagClick = (option: SelectOption) => {
          onChange(
            // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-call
            value.filter(
              (selectedValue: string) => selectedValue !== option.value,
            ),
          )
        }

        return (
          <div
            className={classNames('fr-select-group', {
              'fr-select-group--disabled': disabled,
              'fr-select-group--error': error,
            })}
          >
            <label className="fr-label" htmlFor={id}>
              {label} {asterisk && <RedAsterisk />}
              {hint ? <span className="fr-hint-text">{hint}</span> : null}
            </label>
            <select
              data-testid={dataTestId}
              className="fr-select fr-select--error"
              aria-describedby="text-select-error-desc-error"
              id={id}
              placeholder={placeholder}
              disabled={disabled || !!(limit && value && value.length >= limit)}
              onBlur={onBlur}
              onChange={onSelectChange}
              value=""
              ref={ref}
              name={name}
            >
              {defaultOption ? (
                <option value="">{defaultOptionLabel}</option>
              ) : null}
              <OptionsList
                options={options.filter(({ value: v }) => !valuesSet.has(v))}
              />
            </select>
            <div className="fr-mt-4v">
              {selectedOptions.map((option) => (
                <OptionBadge
                  key={option.value}
                  option={option}
                  disabled={disabled}
                  size={badgeSize}
                  onClick={() => onTagClick(option)}
                  className="fr-mb-2v"
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
