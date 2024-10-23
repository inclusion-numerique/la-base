import classNames from 'classnames'
import React, { ReactNode } from 'react'
import { Control, Controller, FieldValues } from 'react-hook-form'
import { FieldPath } from 'react-hook-form/dist/types/path'
import { UiComponentProps } from '@app/ui/utils/uiComponentProps'
import RedAsterisk from '@app/ui/components/Form/RedAsterisk'

export type ToggleFormFieldProps<T extends FieldValues> = {
  control: Control<T>
  path: FieldPath<T>
  disabled?: boolean
  label?: ReactNode
  hint?: ReactNode
  valid?: string
  asterisk?: boolean
  checkedLabel?: string | null
  uncheckedLabel?: string | null
  labelPosition?: 'right' | 'left'
  classes?: {
    fieldsetElement?: string
  }
}

const ToggleFormField = <T extends FieldValues>({
  label,
  path,
  control,
  hint,
  disabled,
  valid,
  asterisk,
  className,
  checkedLabel = 'Activé',
  uncheckedLabel = 'Désactivé',
  labelPosition,
  'data-testid': dataTestId,
  classes,
}: UiComponentProps & ToggleFormFieldProps<T>) => {
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
              <div
                className={classNames(
                  'fr-fieldset__element',
                  classes?.fieldsetElement,
                )}
              >
                <div
                  className={classNames(
                    'fr-toggle',
                    labelPosition === 'left' && 'fr-toggle--label-left',
                  )}
                >
                  <input
                    key={`${id}__input__${
                      (value as string | boolean | undefined)?.toString() ??
                      'undefined'
                    }`}
                    type="checkbox"
                    id={id}
                    className="fr-toggle__input"
                    defaultChecked={value}
                    disabled={disabled}
                    onBlur={onBlur}
                    onChange={(event) => {
                      onChange(event.target.checked)
                    }}
                    name={name}
                    ref={ref}
                    aria-describedby={`${id}-hint-text`}
                  />
                  <label
                    className="fr-toggle__label"
                    htmlFor={id}
                    data-fr-checked-label={checkedLabel}
                    data-fr-unchecked-label={uncheckedLabel}
                  >
                    {label} {asterisk && <RedAsterisk />}
                  </label>
                  {hint && (
                    <p className="fr-hint-text" id={`${id}-hint-text`}>
                      {hint}
                    </p>
                  )}
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

export default ToggleFormField
