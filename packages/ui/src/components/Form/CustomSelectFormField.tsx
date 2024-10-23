import React, { ReactNode, useCallback } from 'react'
import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  PathValue,
} from 'react-hook-form'
import classNames from 'classnames'
import type { GroupBase, Options, OptionsOrGroups } from 'react-select'
import type { UiComponentProps } from '@app/ui/utils/uiComponentProps'
import RedAsterisk from '@app/ui/components/Form/RedAsterisk'
import CustomSelect, {
  CustomSelectProps,
} from '@app/ui/components/CustomSelect/CustomSelect'

export type CustomSelectFormFieldProps<
  FormData extends FieldValues,
  Option = { label: string; value: string },
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
  PathProperty extends FieldPath<FormData> = FieldPath<FormData>,
> = {
  label: ReactNode
  path: PathProperty
  control: Control<FormData>
  disabled?: boolean
  hint?: string
  valid?: string
  asterisk?: boolean
  info?: ReactNode
  // The value that will be set in the form controller for given PathProperty
  optionToFormValue?: (option: Option) => PathValue<FormData, PathProperty>
  // The unique key will be used internally to compare the value of the form controller with the options
  // (e.g. for initial selected value)
  getOptionKey?: (option: Option) => string
  // The unique key will be used internally to compare the value of the form controller with the options
  // It should give the same key as getOptionKey to be able ton compare
  getValueKey?: (value: PathValue<FormData, PathProperty>) => string
  valueCompareFn?: (
    value: PathValue<FormData, PathProperty>,
    b: Option,
  ) => boolean
  defaultOptions?: Option[]
} & Omit<
  CustomSelectProps<Option, IsMulti, Group>,
  'onChange' | 'name' | 'onBlur' | 'defaultOptions'
>

const defaultGetOptionKey = (option: unknown): string => {
  if (!option || !Object.prototype.hasOwnProperty.call(option, 'value')) {
    throw new Error(
      'CustomSelect option has no "value" property. If you are using a custom Option type, pass the correct getOptionKey() function',
    )
  }
  return (option as { value: string }).value
}

const defaultGetValueKey = (value: unknown): string | null | undefined => {
  if (value === null || value === undefined) {
    return value
  }
  if (typeof value === 'string') {
    return value
  }

  if (Array.isArray(value)) {
    return value.map((v) => defaultGetValueKey(v)).join(',')
  }
  throw new Error(
    'CustomSelect value is not a string. If you are using a custom Option type, pass the correct getValueKey() function',
  )
}

const defaultGetOptionValue = (option: unknown) => {
  if (!option || !Object.prototype.hasOwnProperty.call(option, 'value')) {
    throw new Error(
      'CustomSelect option has no "value" property. If you are using a custom Option type, pass the correct "getOptionValue" prop to CustomSelect.',
    )
  }

  return (option as { value: string }).value
}

const defaultGetOptionLabel = (option: unknown) => {
  if (!option || !Object.prototype.hasOwnProperty.call(option, 'label')) {
    throw new Error(
      'CustomSelect option has no "label" property. If you are using a custom Option type, pass the correct "getOptionLabel" prop to CustomSelect.',
    )
  }

  return (option as { label: string }).label
}

const defaultOptionToFormValue = defaultGetOptionValue

const CustomSelectFormField = <
  FormData extends FieldValues = FieldValues,
  Option = { label: string; value: string },
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
  PathProperty extends FieldPath<FormData> = FieldPath<FormData>,
>({
  label,
  path,
  control,
  hint,
  options,
  defaultOptions,
  defaultValue,
  disabled,
  valid,
  asterisk,
  info,
  className,
  isMulti,
  getOptionLabel: getOptionLabelProperty,
  getValueKey: getValueKeyProperty,
  getOptionKey: getOptionKeyProperty,
  optionToFormValue: optionToFormValueProperty,
  ...customSelectProps
}: UiComponentProps &
  CustomSelectFormFieldProps<
    FormData,
    Option,
    IsMulti,
    Group,
    PathProperty
  >) => {
  const id = `custom-select-form-field__${path}`

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getOptionLabel = useCallback(
    getOptionLabelProperty ?? defaultGetOptionLabel,
    [],
  )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const optionToFormValue = useCallback(
    optionToFormValueProperty ?? defaultOptionToFormValue,
    [],
  )
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getOptionKey = useCallback(
    getOptionKeyProperty ?? defaultGetOptionKey,
    [],
  )

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getValueKey = useCallback(getValueKeyProperty ?? defaultGetValueKey, [])

  const isOptionSelected: (
    option: Option,
    selectValue: Options<Option>,
  ) => boolean = (option, selectValue) => {
    const optionKey = getOptionKey(option)

    return selectValue.some((v) => getOptionKey(v) === optionKey)
  }

  const optionFromFormValue = useCallback(
    (
      optionsToMatch: OptionsOrGroups<Option, Group>,
      value:
        | PathValue<FormData, PathProperty>
        | PathValue<FormData, PathProperty>[],
    ): Option | Option[] | undefined => {
      if (isMulti) {
        // Value is an array of values
        const multiValues = value as PathValue<FormData, PathProperty>[]

        const result: Option[] = []

        // eslint-disable-next-line no-unreachable-loop
        for (const oneOfMultiValue of multiValues) {
          const oneOfMultiValueKey = getValueKey(oneOfMultiValue)
          for (const optionOrGroup of optionsToMatch) {
            if (
              typeof optionOrGroup === 'object' &&
              !!optionOrGroup &&
              'options' in optionOrGroup
            ) {
              const found = optionOrGroup.options.find(
                (o) => getOptionKey(o) === oneOfMultiValueKey,
              )
              if (found) {
                result.push(found as Option)
              }

              continue
            }

            if (getOptionKey(optionOrGroup) === oneOfMultiValueKey) {
              result.push(optionOrGroup)
            }
          }

          return result
        }
      }

      const singleValueKey = getValueKey(
        value as PathValue<FormData, PathProperty>,
      )

      for (const optionOrGroup of optionsToMatch) {
        if (
          typeof optionOrGroup === 'object' &&
          !!optionOrGroup &&
          'options' in optionOrGroup
        ) {
          const found = optionOrGroup.options.find(
            (o) => getOptionKey(o) === singleValueKey,
          )
          if (found) {
            return found as Option
          }
          continue
        }

        if (getOptionKey(optionOrGroup) === singleValueKey) {
          return optionOrGroup
        }
      }

      return undefined
    },
    [isMulti, getValueKey, getOptionKey],
  )

  return (
    <Controller
      control={control}
      name={path}
      render={({
        field: { ref: _ref, value, onChange, ...fieldProps },
        fieldState: { invalid, error, isDirty },
      }) => {
        let ariaDescribedBy: string | undefined
        if (error) {
          ariaDescribedBy = `${id}__error`
        } else if (valid && isDirty && !invalid) {
          ariaDescribedBy = `${id}__valid`
        }
        const onChangeProperty: CustomSelectProps<
          Option,
          IsMulti,
          Group
        >['onChange'] = (option) => {
          const newValue = Array.isArray(option)
            ? option.map(optionToFormValue)
            : optionToFormValue(option as Option)

          onChange(newValue)
        }

        const valueOption = options
          ? optionFromFormValue([...options, ...(defaultOptions ?? [])], value)
          : undefined

        return (
          <div
            className={classNames(
              'fr-select-group',
              {
                'fr-input-group--error': error,
                'fr-input-group--valid': valid && isDirty && !invalid,
                'fr-input-group--disabled': disabled,
              },
              className,
            )}
          >
            <label className="fr-label fr-mb-1v" htmlFor={id}>
              {label} {asterisk && <RedAsterisk />}
              {hint ? <span className="fr-hint-text">{hint}</span> : null}
            </label>
            <CustomSelect
              {...customSelectProps}
              {...fieldProps}
              onChange={onChangeProperty}
              value={valueOption}
              defaultValue={defaultValue}
              getOptionValue={optionToFormValue}
              getOptionLabel={getOptionLabel}
              isOptionSelected={isOptionSelected}
              options={options}
              defaultOptions={defaultOptions}
              isDisabled={disabled}
              aria-describedby={ariaDescribedBy}
              inputId={id}
              instanceId={customSelectProps.instanceId ?? id}
            />
            {info && (
              <p id={`${id}__info`} className="fr-hint-text fr-mt-1v fr-mb-0">
                {info}
              </p>
            )}
            {error && (
              <p id={`${id}__error`} className="fr-error-text">
                {error.message}
              </p>
            )}
            {valid && isDirty && !invalid && (
              <p id={`${id}__valid`} className="fr-valid-text">
                {valid}
              </p>
            )}
          </div>
        )
      }}
    />
  )
}

export default CustomSelectFormField
