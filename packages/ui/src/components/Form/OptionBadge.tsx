import classNames from 'classnames'
import { MouseEventHandler } from 'react'
import styles from './OptionBadge.module.css'
import { SelectOption } from './utils/options'

export type SelectOptionValid<
  E extends Record<string, unknown> = Record<string, unknown>,
> = SelectOption<string, E> & {
  invalid?: boolean
  type: 'admin' | 'member'
}

export const OptionBadge = ({
  option,
  onClick,
  disabled,
  size,
  className,
  'data-testid': dataTestId,
}: {
  option: Pick<SelectOptionValid, 'invalid' | 'disabled' | 'label'>
  onClick: MouseEventHandler
  disabled?: boolean
  size?: 'sm' | 'md'
  className?: string
  'data-testid'?: string
}) => (
  <button
    data-testid={dataTestId}
    type="button"
    className={classNames(
      `fr-tag fr-mr-1w ${size === 'sm' ? 'fr-tag--sm' : ''}`,
      { [styles.invalid]: option.invalid },
      className,
    )}
    disabled={disabled || option.disabled}
    onClick={disabled ? undefined : onClick}
    aria-label={`Retirer ${option.label}`}
  >
    {option.label}
    <span className="fr-icon-close-line fr-ml-1w fr-icon--sm" />
  </button>
)
export default OptionBadge
