import RedAsterisk from '@app/ui/components/Form/RedAsterisk'
import type { SelectOption } from '@app/ui/components/Form/utils/options'
import type { UiComponentProps } from '@app/ui/utils/uiComponentProps'
import classNames from 'classnames'
import React, {
  type ComponentType,
  type CSSProperties,
  type ReactNode,
} from 'react'
import { type Control, Controller, type FieldValues } from 'react-hook-form'
import type { FieldPath } from 'react-hook-form/dist/types/path'

type LabelComponentPropsType<O extends SelectOption> = {
  option: O
  htmlFor: string
  className?: string
}

export type CheckboxGroupFormFieldProps<
  T extends FieldValues,
  O extends SelectOption,
  LabelComponentProps extends LabelComponentPropsType<O>,
> = {
  control: Control<T>
  path: FieldPath<T>
  options: SelectOption[]
  disabled?: boolean
  label?: ReactNode
  hint?: string
  inline?: boolean
  valid?: string
  small?: boolean
  asterisk?: boolean
  style?: CSSProperties
  offset?: number
  components?: {
    label?: ComponentType<LabelComponentProps>
    labelProps?: Omit<LabelComponentProps, 'option' | 'htmlFor'>
  }
  classes?: {
    label?: string
    input?: string
    fieldset?: string
    fieldsetElement?: string
    checkboxGroup?: string
  }
}

const CheckboxGroupFormField = <
  T extends FieldValues,
  O extends SelectOption,
  LabelComponentProps extends LabelComponentPropsType<O>,
>({
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
  style,
  classes,
  components,
  offset = 0,
  'data-testid': dataTestId,
}: UiComponentProps &
  CheckboxGroupFormFieldProps<T, O, LabelComponentProps>) => {
  const id = `checkbox-group-form-field__${path}`

  const LabelComponent = components?.label || 'label'

  return (
    <Controller
      control={control}
      name={path}
      render={({
        field: { onChange, onBlur, name, ref, value },
        fieldState: { invalid, error, isDirty },
      }) => {
        // Value is an array for checkbox groups
        const valueAsArray: T[] = value || []

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
                'fr-fieldset fr-mb-0',
                {
                  'fr-fieldset--error': error,
                  'fr-fieldset--disabled': disabled,
                  'fr-fieldset--valid': valid && isDirty && !invalid,
                },
                className,
                classes?.fieldset,
              )}
              style={style}
              aria-labelledby={`${id}__legend${
                ariaLabelBy ? ` ${ariaLabelBy}` : ''
              }`}
              role="group"
            >
              {!!label || !!hint ? (
                <legend
                  className="fr-fieldset__legend fr-fieldset__legend--regular fr-grid-row--full"
                  id={`${id}__legend`}
                >
                  {label} {asterisk && <RedAsterisk />}
                  {hint ? <span className="fr-hint-text">{hint}</span> : null}
                </legend>
              ) : null}
              {options.map((option, index) => {
                const optionValue = option.value as unknown as T
                const labelComponentProps =
                  LabelComponent === 'label'
                    ? undefined
                    : ({
                        option,
                        htmlFor: `${id}__${index + offset}`,
                        className: classes?.label,
                        ...components?.labelProps,
                      } as LabelComponentProps)

                return (
                  <div
                    key={option.value}
                    className={classNames(
                      'fr-fieldset__element',
                      {
                        'fr-fieldset__element--inline': inline,
                      },
                      classes?.fieldsetElement,
                    )}
                  >
                    <div
                      className={classNames(
                        'fr-checkbox-group',
                        {
                          'fr-checkbox-group--sm': small,
                        },
                        classes?.checkboxGroup,
                      )}
                    >
                      <input
                        defaultChecked={valueAsArray.includes(optionValue)}
                        key={`${id}__input__${option.value}__${
                          valueAsArray.includes(optionValue)
                            ? 'checked'
                            : 'unchecked'
                        }`}
                        type="checkbox"
                        id={`${id}__${index + offset}`}
                        disabled={disabled}
                        onBlur={onBlur}
                        onChange={(event) => {
                          const newValue = event.target.value as unknown as T
                          if (event.target.checked) {
                            // Add the value to the array if it's checked
                            onChange([...valueAsArray, newValue])
                          } else {
                            // Remove the value from the array if it's unchecked
                            onChange(
                              valueAsArray.filter((item) => item !== newValue),
                            )
                          }
                        }}
                        className={classes?.input}
                        value={option.value}
                        name={name}
                        ref={ref}
                      />
                      {LabelComponent === 'label' ? (
                        <label
                          className="fr-label"
                          htmlFor={`${id}__${index + offset}`}
                        >
                          {option.label}
                          {option.hint && (
                            <span className="fr-hint-text">{option.hint}</span>
                          )}
                        </label>
                      ) : (
                        // @ts-expect-error labelComponentProps is valid but ts doesn't understand it
                        <LabelComponent {...labelComponentProps} />
                      )}
                    </div>
                  </div>
                )
              })}
              {error && (
                <p
                  className="fr-messages-group fr-grid-row--full fr-mb-0"
                  id={`${id}__error`}
                  aria-live="assertive"
                >
                  <span className="fr-message fr-message--error">
                    {error.message}
                  </span>
                </p>
              )}
              {valid && isDirty && !invalid && (
                <p
                  className="fr-messages-group fr-grid-row--full fr-mb-0"
                  id={`${id}__valid`}
                  aria-live="assertive"
                >
                  <span className="fr-message fr-message--valid">{valid}</span>
                </p>
              )}
            </fieldset>
          </div>
        )
      }}
    />
  )
}

export default CheckboxGroupFormField
