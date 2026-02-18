import { SelectOptionValid } from '@app/ui/components/Form/OptionBadge'
import classNames from 'classnames'
import { MouseEventHandler } from 'react'
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
  as: Component = 'button',
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
  as?: 'button' | 'span'
  'data-testid'?: string
}) => (
  <Component
    data-testid={dataTestId}
    {...(Component === 'button'
      ? {
          type: 'button' as const,
          disabled: disabled || option.disabled,
          onClick: disabled ? undefined : onClick,
          'aria-label': ariaLabelPrefix
            ? `${ariaLabelPrefix} ${option.label}`
            : undefined,
        }
      : {})}
    className={classNames(
      `fr-tag ${size === 'sm' ? 'fr-tag--sm' : ''}`,
      className,
    )}
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
    <span className={classNames(textClassName, 'fr-text--start')}>
      {option.label}
    </span>
    {!!iconId && (
      <span
        className={classNames(iconId, iconClassName, 'fr-ml-1w fr-icon--sm')}
      />
    )}
  </Component>
)
export default ThematicOptionBadge
