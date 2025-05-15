import classNames from 'classnames'
import React, { ReactNode } from 'react'
import styles from './Options.module.css'

export type Option<T extends string> = {
  component?: ReactNode
  label: string
  value: T
  disabled?: boolean
}

const Options = <T extends string>({
  options,
  select,
  selectedIndex = -1,
  limit,
  noResultMessage,
  hideNoResultMessage,
  onHide,
  'data-testid': dataTestId,
}: {
  options: Option<T>[]
  select: (option: Option<T>) => void
  selectedIndex?: number
  limit: number
  noResultMessage?: string
  hideNoResultMessage?: boolean
  onHide?: () => void
  'data-testid'?: string
}) => {
  if (options.length === 0) {
    if (hideNoResultMessage) {
      onHide?.()
      return null
    }
    return (
      <option className={classNames(styles.option, styles.disabled)}>
        {noResultMessage || 'Aucun résultat'}
      </option>
    )
  }
  return (
    <ul className="fr-list-group fr-mb-0" role="listbox">
      {options.slice(0, limit).map((option, index) => (
        <li
          role="option"
          data-testid={dataTestId ? `${dataTestId}-option-${index}` : undefined}
          aria-selected={index === selectedIndex}
          key={option.value}
          defaultValue={option.value}
          className={classNames(
            styles.option,
            selectedIndex === index ? styles.focused : '',
            {
              [styles.disabled]: option.disabled,
            },
          )}
          onMouseDown={() => {
            if (!option.disabled) {
              select(option)
            }
          }}
        >
          {option.component || option.label}
        </li>
      ))}
    </ul>
  )
}

export default Options
