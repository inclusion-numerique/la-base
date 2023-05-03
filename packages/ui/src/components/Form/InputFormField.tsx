import { UiComponentProps } from '@app/ui/utils/uiComponentProps'
import classNames from 'classnames'
import React, { HTMLInputTypeAttribute, HTMLProps } from 'react'
import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
} from 'react-hook-form'
import { FieldPath } from 'react-hook-form/dist/types/path'

type CommonProps<T extends FieldValues> = {
  control: Control<T>
  path: FieldPath<T>
  disabled?: boolean
  label?: string
  hint?: string
  placeholder?: string
  valid?: string
  icon?: string
  infoText?: string | ((value: PathValue<T, Path<T>>) => string)
}

type InputProps = {
  type?: Exclude<HTMLInputTypeAttribute, 'checkbox' | 'textarea'>
}

type TextareaProps = {
  type: 'textarea'
} & Omit<
  HTMLProps<HTMLTextAreaElement>,
  'onChange' | 'onBlur' | 'value' | 'ref' | 'id' | 'aria-describedby'
>

export type InputFormFieldProps<T extends FieldValues> = CommonProps<T> &
  (InputProps | TextareaProps)

const InputFormField = <T extends FieldValues>({
  label,
  path,
  control,
  placeholder,
  type = 'text',
  hint,
  disabled,
  className,
  'data-testid': dataTestId,
  valid,
  icon,
  infoText,
  ...rest
}: UiComponentProps & InputFormFieldProps<T>) => {
  const id = `input-form-field__${path}`

  return (
    <Controller
      control={control}
      name={path}
      render={({
        field: { onChange, onBlur, value, ref },
        fieldState: { invalid, isTouched, error },
      }) => {
        let ariaDescribedBy: string | undefined
        if (error) {
          ariaDescribedBy = `${id}__error`
        } else if (valid && isTouched && !invalid) {
          ariaDescribedBy = `${id}__valid`
        }

        return (
          <div
            className={classNames(
              'fr-input-group',
              {
                'fr-input-group--error': error,
                'fr-input-group--disabled': disabled,
                'fr-input-group--valid': isTouched && !invalid,
              },
              className,
            )}
          >
            <label className="fr-label fr-mb-1v" htmlFor={id}>
              {label}
              {hint && <span className="fr-hint-text">{hint}</span>}
            </label>
            <div className={icon ? `fr-input-wrap ${icon}` : ''}>
              {type === 'textarea' ? (
                <textarea
                  data-testid={dataTestId}
                  className="fr-input"
                  aria-describedby={ariaDescribedBy}
                  disabled={disabled}
                  id={id}
                  placeholder={placeholder}
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value ?? ''}
                  ref={ref}
                  {...rest}
                />
              ) : (
                <input
                  data-testid={dataTestId}
                  className="fr-input"
                  aria-describedby={ariaDescribedBy}
                  disabled={disabled}
                  type={type}
                  id={id}
                  placeholder={placeholder}
                  onBlur={onBlur}
                  onChange={onChange}
                  value={value ?? ''}
                  ref={ref}
                />
              )}
            </div>
            {infoText && (
              <p id={`${id}__info`} className="fr-hint-text fr-mt-1v fr-mb-0">
                {typeof infoText === 'string' ? infoText : infoText(value)}
              </p>
            )}
            {error && (
              <p id={`${id}__error`} className="fr-error-text fr-mt-1v">
                {error.message}
              </p>
            )}
            {valid && isTouched && !invalid && (
              <p id={`${id}__valid`} className="fr-valid-text fr-mt-1v">
                {valid}
              </p>
            )}
          </div>
        )
      }}
    />
  )
}

export default InputFormField
