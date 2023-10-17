'use client'

import classNames from 'classnames'
import React from 'react'
import { Controller, FieldValues, UseFormReturn } from 'react-hook-form'
import { FieldPath } from 'react-hook-form/dist/types/path'
import { UiComponentProps } from '@app/ui/utils/uiComponentProps'
import RichInputForm from './RichInputForm'

export type RichInputFormFieldProps<T extends FieldValues> = {
  form: UseFormReturn<T>
  path: FieldPath<T>
  disabled?: boolean
  label?: string
  hint?: string
  placeholder?: string
  valid?: string
  icon?: string
  info?: string | ((value: string) => string)
}

const RichInputFormField = <T extends FieldValues>({
  label,
  path,
  form,
  placeholder,
  hint,
  disabled,
  className,
  'data-testid': dataTestId,
  valid,
  icon,
  info,
}: UiComponentProps & RichInputFormFieldProps<T>) => {
  const id = `rich-input-form-field__${path}`

  return (
    <Controller
      control={form.control}
      name={path}
      render={({
        field: { value, onChange, onBlur },
        fieldState: { invalid, isTouched, error },
      }) => {
        let ariaDescribedBy: string | undefined
        if (error) {
          ariaDescribedBy = `${id}__error`
        } else if (valid && isTouched && !invalid) {
          ariaDescribedBy = `${id}__valid`
        }

        const input = (
          <RichInputForm
            form={form}
            path={path}
            id={id}
            ariaDescribedBy={ariaDescribedBy}
            disabled={disabled}
            placeholder={placeholder}
            data-testid={dataTestId}
            onBlur={onBlur}
            onChange={onChange}
          />
        )

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
            {icon ? (
              <div className={`fr-input-wrap ${icon}`}>{input}</div>
            ) : (
              input
            )}
            {info && (
              <p id={`${id}__info`} className="fr-hint-text fr-mt-1v fr-mb-0">
                {typeof info === 'string' ? info : info(value)}
              </p>
            )}
            {error && (
              <p
                id={`${id}__error`}
                className={classNames('fr-error-text', { 'fr-mt-1v': !!info })}
              >
                {error.message}
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

export default RichInputFormField
