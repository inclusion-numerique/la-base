import RedAsterisk from '@app/ui/components/Form/RedAsterisk'
import { UiComponentProps } from '@app/ui/utils/uiComponentProps'
import classNames from 'classnames'
import React, { ReactNode } from 'react'
import { Control, Controller, FieldValues } from 'react-hook-form'
import { FieldPath } from 'react-hook-form/dist/types/path'
import { SelectOption } from './utils/options'

export type SelectFormFieldProps<T extends FieldValues> = {
  label: ReactNode
  path: FieldPath<T>
  control: Control<T>
  options: SelectOption[]
  disabled?: boolean
  hint?: string
  valid?: string
  asterisk?: boolean
  placeholder?: string
  classes?: {
    label?: string
    select?: string
  }
}

const SelectFormField = <T extends FieldValues>({
  label,
  path,
  control,
  hint,
  options,
  disabled,
  valid,
  asterisk,
  className,
  placeholder,
  'data-testid': dataTestId,
  classes,
}: UiComponentProps & SelectFormFieldProps<T>) => {
  const id = `select-form-field__${path}`

  return (
    <Controller
      control={control}
      name={path}
      render={({
        field: { onChange, onBlur, name, ref, value },
        fieldState: { invalid, error, isDirty },
      }) => {
        let ariaDescribedBy: string | undefined
        if (error) {
          ariaDescribedBy = `${id}__error`
        } else if (valid && isDirty && !invalid) {
          ariaDescribedBy = `${id}__valid`
        }

        return (
          <div
            className={classNames(
              'fr-select-group',
              {
                'fr-select-group--error': error,
                'fr-select-group--valid': valid && isDirty && !invalid,
                'fr-select-group--disabled': disabled,
              },
              className,
            )}
          >
            <label
              className={classNames('fr-label', classes?.label)}
              htmlFor={id}
            >
              {label} {asterisk && <RedAsterisk />}
              {hint ? <span className="fr-hint-text">{hint}</span> : null}
            </label>
            <select
              className={classNames(
                'fr-select',
                {
                  'fr-select--error': error,
                  'fr-select--valid': isDirty && !invalid,
                },
                classes?.select,
              )}
              aria-describedby={ariaDescribedBy}
              id={id}
              disabled={disabled}
              name={name}
              onChange={onChange}
              onBlur={onBlur}
              ref={ref}
              value={value || ''}
              data-testid={dataTestId}
            >
              {placeholder && (
                <option value="" disabled>
                  {placeholder}
                </option>
              )}
              {options.map((option) => (
                <option
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  hidden={option.hidden}
                >
                  {option.label}
                </option>
              ))}
            </select>
            {error && (
              <p id={`${id}__error`} className="fr-error-text">
                {error.message}
              </p>
            )}
            {valid && isDirty && !invalid && (
              <p id={`${id}__valid`} className="fr-valid-text">
                {valid}
              </p>
            )}
          </div>
        )
      }}
    />
  )
}

export default SelectFormField
