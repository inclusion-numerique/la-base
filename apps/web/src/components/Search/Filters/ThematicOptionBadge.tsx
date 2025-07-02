import { SelectOptionValid } from '@app/ui/components/Form/OptionBadge'
import classNames from 'classnames'
import React, { MouseEventHandler } from 'react'
import styles from './ThematicOptionBadge.module.css'

export const ThematicOptionBadge = ({
  option,
  iconId,
  iconClassName,
  textClassName,
  categoryIconClassName,
  onClick,
  disabled,
  size,
  className,
  ariaLabelPrefix,
  'data-testid': dataTestId,
}: {
  option: Pick<SelectOptionValid, 'invalid' | 'disabled' | 'label'>
  iconId?: string
  iconClassName?: string
  textClassName: string
  categoryIconClassName?: string
  onClick?: MouseEventHandler
  disabled?: boolean
  size?: 'sm' | 'md'
  className?: string
  ariaLabelPrefix?: string
  'data-testid'?: string
}) => (
  <button
    data-testid={dataTestId}
    type="button"
    className={classNames(
      `fr-tag${size === 'sm' ? 'fr-tag--sm' : ''}`,
      className,
    )}
    disabled={disabled || option.disabled}
    onClick={disabled ? undefined : onClick}
    aria-label={`${ariaLabelPrefix} ${option.label}`}
  >
    {!!categoryIconClassName && (
      <span
        className={classNames(
          categoryIconClassName,
          styles.categoryIcon,
          'fr-mr-1w fr-icon--sm',
        )}
      />
    )}
    <span className={textClassName}>{option.label}</span>
    {!!iconId && (
      <span
        className={classNames(iconId, iconClassName, 'fr-ml-1w fr-icon--sm')}
      />
    )}
  </button>
)
export default ThematicOptionBadge
