import type { ButtonProps } from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import styles from './IconInSquare.module.css'

const IconInSquare = ({
  className,
  iconId,
  size = 'medium',
  background = 'fr-background-alt--blue-france',
  iconClassName = 'fr-text-title--blue-france',
}: {
  background?: string
  className?: string
  iconId: ButtonProps.IconOnly['iconId']
  iconClassName?: string
  size?: 'small' | 'medium' | 'semi-large' | 'large' | 'xlarge'
}) => (
  <div
    className={classNames(
      background,
      'fr-border-radius--8',
      styles.container,
      styles[size],
      className,
    )}
  >
    <span
      className={classNames(styles.icon, iconId, iconClassName)}
      aria-hidden
    />
  </div>
)

export default IconInSquare
