/* eslint react/destructuring-assignment: 0 */

import React, { ReactNode } from 'react'
import type {
  GroupBase,
  SelectComponentsConfig,
  StylesConfig,
  ThemeConfig,
} from 'react-select'
import Select from 'react-select'
import type { AsyncProps } from 'react-select/async'
import AsyncSelect from 'react-select/async'
import { Spinner } from '@app/web/ui/Spinner'
import dynamic from 'next/dynamic'
import styles from './CustomSelect.module.css'

export type CustomSelectProps<
  Option = { label: string; value: string },
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
> = Exclude<AsyncProps<Option, IsMulti, Group>, 'classNames' | 'theme'> & {
  inputId?: string
}

// TODO The custom theme is not sufficient for DSFR implementation, we should replace components and/or override classes
// See https://react-select.com/styles
const customTheme: ThemeConfig = {
  borderRadius: 4,
  spacing: {
    baseUnit: 6,
    menuGutter: 6,
    controlHeight: 38,
  },
  colors: {
    primary: 'var(--blue-france-975-75)', // Selected option (text is white...)
    primary75: 'var(--grey-950-100-active)', // ?
    primary50: 'var(--grey-950-100)', // Active option
    primary25: 'var(--grey-975-75)', // Hover option
    danger: 'var(--red-marianne-425-625)',
    dangerLight: 'var(--red-marianne-850-200)',
    neutral0: 'var(--grey-1000-50)',
    neutral5: 'var(--grey-925-125)',
    neutral10: 'var(--grey-950-125-hover)',
    neutral20: 'var(--grey-950-125-active)',
    neutral30: 'var(--grey-625-425)',
    neutral40: 'var(--grey-425-625)', // Button Color
    neutral50: 'var(--grey-425-625)', // Placeholder
    neutral60: 'var(--grey-425-625)',
    neutral70: 'var(--grey-200-850)',
    neutral80: 'var(--grey-50-1000)', // Value text
    neutral90: 'var(--grey-0-1000)',
  },
}

const customStyles: StylesConfig = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? 'var(--text-black-white-grey)' : provided.color,
  }),
  control: (provided) => ({
    ...provided,
    borderColor: 'var(--border-default-grey)',
  }),
}

const loadingMessage = (): ReactNode => (
  <div className={styles.loadingSpinnerContainer}>
    <Spinner />
  </div>
)

const noOptionsMessage = (): ReactNode => (
  <div className={styles.noOptionsContainer}>Aucun résultat</div>
)

// Fix failing hydration from server component to client side
// See https://github.com/JedWatson/react-select/issues/5459
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const DynamicValueContainer = dynamic(
  () =>
    import('react-select').then((module_) => module_.components.ValueContainer),
  {
    ssr: false,
    loading: () => (
      <span className="fr-border-radius--8" style={{ width: 16, height: 42 }} />
    ),
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
) as any
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ValueContainer = (props: any) => (
  <DynamicValueContainer {...props} aria-activedescendant={undefined} />
)

/**
 * TODO: Implement DSFR styles / custom components
 * See https://react-select.com/advanced#replacing-builtins
 */
const CustomSelect = <
  Option = { label: string; value: string },
  IsMulti extends boolean = false,
  Group extends GroupBase<Option> = GroupBase<Option>,
>({
  components,
  ...props
}: CustomSelectProps<Option, IsMulti, Group> & {
  // We require instanceId to avoid SSR id mismatch in react hydration
  instanceId: number | string
}) => {
  const classNames: CustomSelectProps<Option, IsMulti, Group>['classNames'] = {
    container: () => styles.container,
    control: () => styles.control,
    valueContainer: () => styles.valueContainer,
  }

  const componentsWithValueContainer: SelectComponentsConfig<
    Option,
    IsMulti,
    Group
  > = {
    ValueContainer,
    ...components,
  }

  // eslint-disable-next-line react/destructuring-assignment
  if (props.loadOptions) {
    return (
      <AsyncSelect
        {...props}
        components={componentsWithValueContainer}
        loadingMessage={props.loadingMessage ?? loadingMessage}
        noOptionsMessage={props.noOptionsMessage ?? noOptionsMessage}
        theme={customTheme}
        styles={customStyles as unknown as StylesConfig<Option, IsMulti, Group>}
        classNames={classNames}
      />
    )
  }

  return (
    <Select
      {...props}
      components={componentsWithValueContainer}
      loadingMessage={props.loadingMessage ?? loadingMessage}
      noOptionsMessage={props.noOptionsMessage ?? noOptionsMessage}
      theme={customTheme}
      styles={customStyles as unknown as StylesConfig<Option, IsMulti, Group>}
      classNames={classNames}
    />
  )
}

export default CustomSelect
