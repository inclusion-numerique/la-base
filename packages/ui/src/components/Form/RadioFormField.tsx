import classNames from 'classnames'
import React, { ReactNode } from 'react'
import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
} from 'react-hook-form'
import { FieldPath } from 'react-hook-form/dist/types/path'
import { UiComponentProps } from '@app/ui/utils/uiComponentProps'
import RedAsterisk from '@app/ui/components/Form/RedAsterisk'
import { RadioOption } from './utils/options'

export type RadioFormFieldProps<T extends FieldValues> = {
  control: Control<T>
  path: FieldPath<T>
  options: RadioOption[]
  disabled?: boolean
  label?: ReactNode
  hint?: string
  inline?: boolean
  valid?: string
  small?: boolean
  asterisk?: boolean
}

const RadioFormField = <T extends FieldValues>({
  label,
  path,
  options,
  control,
  hint,
  disabled,
  inline,
  valid,
  small,
  className,
  asterisk,
  'data-testid': dataTestId,
}: UiComponentProps & RadioFormFieldProps<T>) => {
  const id = `input-form-field__${path}`

  return (
    <Controller
      control={control}
      name={path}
      render={({
        field: { onChange, onBlur, name, ref, value },
        fieldState: { invalid, error, isDirty },
      }) => {
        let ariaLabelBy: string | undefined
        if (error) {
          ariaLabelBy = `${id}__error`
        } else if (valid && isDirty && !invalid) {
          ariaLabelBy = `${id}__valid`
        }

        return (
          <div className="fr-form-group" data-testid={dataTestId}>
            <fieldset
              className={classNames(
                'fr-fieldset',
                {
                  'fr-fieldset--error': error,
                  'fr-fieldset--disabled': disabled,
                  'fr-fieldset--valid': valid && isDirty && !invalid,
                },
                className,
              )}
              aria-labelledby={`${id}__legend${
                ariaLabelBy ? ` ${ariaLabelBy}` : ''
              }`}
              role="group"
            >
              <legend
                className="fr-fieldset__legend fr-fieldset__legend--regular"
                id={`${id}__legend`}
              >
                {label} {asterisk && <RedAsterisk />}
                {hint ? <span className="fr-hint-text">{hint}</span> : null}
              </legend>
              {options.map((option, index) => (
                <div
                  key={option.value}
                  className={classNames('fr-fieldset__element', {
                    'fr-fieldset__element--inline': inline,
                  })}
                >
                  <div
                    className={classNames('fr-radio-group', {
                      'fr-radio-group--sm': small,
                    })}
                  >
                    <input
                      key={`${id}__input__${
                        (value as string | boolean | undefined)?.toString() ??
                        'undefined'
                      }`}
                      defaultChecked={value === option.value}
                      type="radio"
                      id={`${id}__${index}`}
                      disabled={disabled}
                      onBlur={onBlur}
                      onChange={(event) => {
                        if (event.target.checked) {
                          onChange(option.value as PathValue<T, Path<T>>)
                        }
                      }}
                      value={option.value}
                      name={name}
                      ref={ref}
                    />
                    <label className="fr-label" htmlFor={`${id}__${index}`}>
                      {option.name}
                      {option.hint && (
                        <span className="fr-hint-text">{option.hint}</span>
                      )}
                    </label>
                  </div>
                </div>
              ))}
              {error && (
                <div
                  className="fr-messages-group"
                  id={`${id}__error`}
                  aria-live="assertive"
                >
                  <p className="fr-message fr-message--error">
                    {error.message}
                  </p>
                </div>
              )}
              {valid && isDirty && !invalid && (
                <div
                  className="fr-messages-group"
                  id={`${id}__valid`}
                  aria-live="assertive"
                >
                  <p className="fr-message fr-message--valid">{valid}</p>
                </div>
              )}
            </fieldset>
          </div>
        )
      }}
    />
  )
}

export default RadioFormField
