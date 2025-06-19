import RedAsterisk from '@app/ui/components/Form/RedAsterisk'
import { UiComponentProps } from '@app/ui/utils/uiComponentProps'
import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import React, { ReactNode, useMemo } from 'react'
import { Control, Controller, FieldValues } from 'react-hook-form'
import { FieldPath } from 'react-hook-form/dist/types/path'

export type RatingButtonsFormFieldProps<T extends FieldValues> = {
  control: Control<T>
  path: FieldPath<T>
  min: number
  max: number
  disabled?: boolean
  label?: ReactNode
  hint?: string
  valid?: string
  asterisk?: boolean
}

const generateRatings = (min: number, max: number) => {
  const ratings = []
  for (let index = min; index <= max; index += 1) {
    ratings.push({
      value: index,
      name: index.toString(),
    })
  }
  return ratings
}

const RatingButtonsFormField = <T extends FieldValues>({
  label,
  path,
  control,
  min,
  max,
  hint,
  disabled,
  valid,
  className,
  asterisk,
  'data-testid': dataTestId,
}: UiComponentProps & RatingButtonsFormFieldProps<T>) => {
  const id = `input-form-field__${path}`

  const ratings = useMemo(() => generateRatings(min, max), [min, max])

  return (
    <Controller
      control={control}
      name={path}
      render={({
        field: { onChange, value },
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
              <div className="fr-flex fr-flex-wrap fr-pl-2v fr-flex-gap-2v fr-mb-4v">
                {ratings.map((rating) => (
                  <Button
                    id={`${id}__${rating.value}`}
                    className="fr-border-radius--8"
                    size="small"
                    key={rating.value}
                    type="button"
                    onClick={() => onChange(rating.value)}
                    disabled={disabled}
                    priority={value === rating.value ? 'primary' : 'tertiary'}
                  >
                    {rating.name}
                  </Button>
                ))}
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

export default RatingButtonsFormField
