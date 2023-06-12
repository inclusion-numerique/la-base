import classNames from 'classnames'
import React from 'react'
import { Control, Controller, FieldValues } from 'react-hook-form'
import { FieldPath } from 'react-hook-form/dist/types/path'
import { UiComponentProps } from '@app/ui/utils/uiComponentProps'

export type CheckboxFormFieldProps<T extends FieldValues> = {
  control: Control<T>
  path: FieldPath<T>
  disabled?: boolean
  label?: string
  hint?: string
  valid?: string
  small?: boolean
}

const CheckboxFormField = <T extends FieldValues>({
  label,
  path,
  control,
  hint,
  disabled,
  valid,
  small,
  className,
  'data-testid': dataTestId,
}: UiComponentProps & CheckboxFormFieldProps<T>) => {
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
          <div className="fr-form-group">
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
              <div className="fr-fieldset__element fr-mb-0">
                <div
                  className={classNames('fr-checkbox-group', {
                    'fr-checkbox-group--sm': small,
                  })}
                >
                  <input
                    type="checkbox"
                    data-testid={dataTestId}
                    id={id}
                    defaultChecked={value}
                    disabled={disabled}
                    onBlur={onBlur}
                    onChange={(event) => {
                      onChange(event.target.checked)
                    }}
                    name={name}
                    ref={ref}
                  />
                  <label className="fr-label" htmlFor={id}>
                    {label}
                    {hint && <span className="fr-hint-text">{hint}</span>}
                  </label>
                </div>
              </div>
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

export default CheckboxFormField
