'use client'

import RedAsterisk from '@app/ui/components/Form/RedAsterisk'
import classNames from 'classnames'
import { HTMLProps, ReactNode } from 'react'
import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
} from 'react-hook-form'
import { FieldPath } from 'react-hook-form/dist/types/path'

export type FileFormFieldProps<T extends FieldValues> = {
  control: Control<T>
  path: FieldPath<T>
  disabled?: boolean
  label?: ReactNode
  hint?: string
  placeholder?: string
  accept?: string
  className?: string
  valid?: string
  error?: string
  info?: string | ((value: PathValue<T, Path<T>>) => string)
  'data-testid'?: string
  asterisk?: boolean
} & Omit<
  HTMLProps<HTMLInputElement>,
  'onChange' | 'type' | 'onBlur' | 'value' | 'ref' | 'id' | 'aria-describedby'
>

const FileFormField = <T extends FieldValues>({
  label,
  path,
  control,
  placeholder,
  hint,
  disabled,
  accept,
  className,
  valid,
  info,
  asterisk,
  error: errorProperty,
  'data-testid': dataTestId,
}: FileFormFieldProps<T>) => {
  const id = `file-form-field__${path}`

  return (
    <Controller
      control={control}
      name={path}
      render={({
        field: { onChange, onBlur, value, name, ref },
        fieldState: { invalid, isTouched, error },
      }) => {
        const inputValue =
          (value as { filename: string } | undefined)?.filename ?? ''

        return (
          <div
            className={classNames(
              'fr-upload-group',
              {
                'fr-input-group--error': error,
                'fr-input-group--disabled': disabled,
                'fr-input-group--valid': !!valid && isTouched && !invalid,
              },
              className,
            )}
          >
            <label className="fr-label fr-mb-1v" htmlFor={id}>
              {label} {asterisk && <RedAsterisk />}
              {hint && <span className="fr-hint-text">{hint}</span>}
            </label>

            <input
              className="fr-upload"
              type="file"
              aria-describedby={error ? `${id}__error` : undefined}
              disabled={disabled}
              id={id}
              placeholder={placeholder}
              accept={accept}
              data-testid={dataTestId}
              onBlur={onBlur}
              onChange={(event) => {
                // We want to emit a File from this onchange instead of the field value (that is the default implementation)
                const { files } = event.target
                if (!files) {
                  onChange('' as PathValue<T, Path<T>>)
                  return
                }
                const file = files[0] ?? ''
                if (file) {
                  ;(file as File & { filename: string }).filename =
                    event.target.value
                }
                onChange(file as PathValue<T, Path<T>>)
              }}
              value={inputValue}
              ref={ref}
              name={name}
            />

            {info && (
              <p id={`${id}__info`} className="fr-hint-text fr-mt-1v fr-mb-0">
                {typeof info === 'string' ? info : info(value)}
              </p>
            )}
            {(errorProperty || error) && (
              <p
                id={`${id}__error`}
                className={classNames('fr-error-text', { 'fr-mt-1v': !!info })}
              >
                {error?.message || errorProperty || null}
              </p>
            )}
            {valid && isTouched && !invalid && (
              <p
                id={`${id}__valid`}
                className={classNames('fr-valid-text', { 'fr-mt-1v': !!info })}
              >
                {valid}
              </p>
            )}
          </div>
        )
      }}
    />
  )
}

export default FileFormField
