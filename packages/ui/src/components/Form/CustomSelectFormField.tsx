import CustomSelect, {
  CustomSelectProps,
} from '@app/ui/components/CustomSelect/CustomSelect'
import RedAsterisk from '@app/ui/components/Form/RedAsterisk'
import { UiComponentProps } from '@app/ui/utils/uiComponentProps'
import classNames from 'classnames'
import React, { ReactNode, useCallback, useState } from 'react'
import { Control, Controller, FieldValues, PathValue } from 'react-hook-form'
import { FieldPath } from 'react-hook-form/dist/types/path'
import type { GroupBase, OnChangeValue, Options } from 'react-select'

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
  clearInputOnChange?: boolean
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
  onChange?: (options: OnChangeValue<Option, IsMulti>) => void
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
  clearInputOnChange,
  getOptionLabel: getOptionLabelProperty,
  getValueKey: getValueKeyProperty,
  getOptionKey: getOptionKeyProperty,
  optionToFormValue: optionToFormValueProperty,
  onChange: onChangeCustom,
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

  const getOptionLabel = useCallback(
    getOptionLabelProperty ?? defaultGetOptionLabel,
    [],
  )
  const optionToFormValue = useCallback(
    optionToFormValueProperty ?? defaultOptionToFormValue,
    [],
  )
  const getOptionKey = useCallback(
    getOptionKeyProperty ?? defaultGetOptionKey,
    [],
  )

  const isOptionSelected: (
    option: Option,
    selectValue: Options<Option>,
  ) => boolean = (option, selectValue) => {
    const optionKey = getOptionKey(option)

    return selectValue.some((v) => getOptionKey(v) === optionKey)
  }

  const [selected, setSelected] = useState(defaultValue)

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
          if (option == null) {
            onChange(null)
            setSelected([])
            return
          }

          const newValue = Array.isArray(option)
            ? option.map(optionToFormValue)
            : optionToFormValue(option as Option)

          setSelected(option)

          onChange(newValue)
          onChangeCustom?.(option)
        }

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
              value={clearInputOnChange ? [] : (selected ?? defaultValue)}
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
