import RedAsterisk from '@app/ui/components/Form/RedAsterisk'
import type { SelectOption } from '@app/ui/components/Form/utils/options'
import { UiComponentProps } from '@app/ui/utils/uiComponentProps'
import classNames from 'classnames'
import { type ComponentType, type CSSProperties, ReactNode } from 'react'
import { Control, Controller, FieldValues } from 'react-hook-form'
import { FieldPath } from 'react-hook-form/dist/types/path'

export type LabelComponentPropsType<O extends SelectOption> = {
  option: O
  htmlFor: string
  className?: string
}

export type RadioFormFieldProps<
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
  components?: {
    label?: ComponentType<LabelComponentProps>
    labelProps?: Omit<LabelComponentProps, 'option' | 'htmlFor'>
  }
  classes?: {
    label?: string
    input?: string
    fieldset?: string
    fieldsetElement?: string
    radioGroup?: string
  }
  startIndex?: number
}

const RadioFormField = <
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
  startIndex = 0,
  style,
  classes,
  components,
  'data-testid': dataTestId,
}: UiComponentProps & RadioFormFieldProps<T, O, LabelComponentProps>) => {
  const id = `input-form-field__${path}`
  const LabelComponent = components?.label || 'label'

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
                const labelComponentProps =
                  LabelComponent === 'label'
                    ? undefined
                    : ({
                        option,
                        htmlFor: `${id}__${index + startIndex}`,
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
                        'fr-radio-group',
                        {
                          'fr-radio-group--sm': small,
                        },
                        classes?.radioGroup,
                      )}
                    >
                      <input
                        key={`${id}__input__${
                          (value as string | boolean | undefined)?.toString() ??
                          'undefined'
                        }`}
                        defaultChecked={value === option.value}
                        type="radio"
                        id={`${id}__${index + startIndex}`}
                        disabled={disabled}
                        onBlur={onBlur}
                        onChange={(event) => {
                          if (event.target.checked) {
                            onChange(option.value)
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
                          htmlFor={`${id}__${index + startIndex}`}
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
                <div
                  className="fr-messages-group fr-grid-row--full"
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
                  className="fr-messages-group fr-grid-row--full"
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
