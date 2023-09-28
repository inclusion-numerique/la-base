import React, { MouseEventHandler } from 'react'
import classNames from 'classnames'
import { SelectOption } from './utils/options'
import styles from './OptionBadge.module.css'

export type SelectOptionValid = SelectOption<string> & { invalid?: boolean }

export const OptionBadge = ({
  option,
  onClick,
  disabled,
  size,
  className,
}: {
  option: Pick<SelectOptionValid, 'invalid' | 'disabled' | 'name'>
  onClick: MouseEventHandler
  disabled?: boolean
  size?: 'sm' | 'md'
  className?: string
}) => (
  <button
    type="button"
    className={classNames(
      `fr-tag fr-mr-1w ${size === 'sm' ? 'fr-tag--sm' : ''}`,
      { [styles.invalid]: option.invalid },
      className,
    )}
    disabled={disabled || option.disabled}
    onClick={disabled ? undefined : onClick}
    aria-label={`Retirer ${option.name}`}
  >
    {option.name}
    <span className="fr-icon-close-line fr-ml-1w fr-icon--sm" />
  </button>
)
