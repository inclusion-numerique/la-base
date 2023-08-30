import classNames from 'classnames'
import React, { ReactNode } from 'react'
import { Control, Controller, FieldValues } from 'react-hook-form'
import { FieldPath, Path, PathValue } from 'react-hook-form/dist/types/path'
import { UiComponentProps } from '@app/ui/utils/uiComponentProps'
import RedAsterisk from '@app/ui/components/Form/RedAsterisk'
import { RichRadioOption } from './utils/options'

export type RichRadioFormFieldProps<T extends FieldValues> = {
  control: Control<T>
  path: FieldPath<T>
  options: RichRadioOption[]
  disabled?: boolean
  label?: ReactNode
  hint?: string
  inline?: boolean
  valid?: string
  asterisk?: boolean
}

const RichRadioFormField = <T extends FieldValues>({
  label,
  path,
  options,
  control,
  hint,
  disabled,
  inline,
  valid,
  className,
  asterisk,
  'data-testid': dataTestId,
}: UiComponentProps & RichRadioFormFieldProps<T>) => {
  const id = `input-form-field__${path}`

  return (
    <Controller
      control={control}
      name={path}
      render={({
        field: { onChange, onBlur, name, ref },
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
                  <div className={classNames('fr-radio-group fr-radio-rich')}>
                    <input
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
                    {!!option.image && (
                      <div className="fr-radio-rich__img">
                        {typeof option.image === 'string' ? (
                          <img src={option.image} alt={option.imageAlt ?? ''} />
                        ) : (
                          option.image
                        )}
                      </div>
                    )}
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

export default RichRadioFormField
