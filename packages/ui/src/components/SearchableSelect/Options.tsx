import React, { ReactNode } from 'react'
import classNames from 'classnames'
import styles from './Options.module.css'

export type Option<T extends string> = {
  component?: ReactNode
  name: string
  value: T
  disabled?: boolean
}

const Options = <T extends string>({
  options,
  select,
  limit,
  noResultMessage,
  hideNoResultMessage,
  'data-testid': dataTestId,
}: {
  options: Option<T>[]
  select: (option: Option<T>) => void
  limit: number
  noResultMessage?: string
  hideNoResultMessage?: boolean
  'data-testid'?: string
}) => {
  if (options.length === 0) {
    if (hideNoResultMessage) {
      return null
    }
    return (
      <option className={classNames(styles.option, styles.disabled)}>
        {noResultMessage || 'Aucun résultat'}
      </option>
    )
  }
  return (
    <>
      {options.slice(0, limit).map((option, index) => (
        // eslint-disable-next-line jsx-a11y/no-static-element-interactions
        <div
          data-testid={dataTestId ? `${dataTestId}-option-${index}` : undefined}
          key={option.value}
          defaultValue={option.value}
          className={classNames(styles.option, {
            [styles.disabled]: option.disabled,
          })}
          onMouseDown={() => {
            if (!option.disabled) {
              select(option)
            }
          }}
        >
          {option.component || option.name}
        </div>
      ))}
    </>
  )
}

export default Options
