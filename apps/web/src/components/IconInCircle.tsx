import type { ButtonProps } from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import styles from './IconInCircle.module.css'

const IconInCircle = ({
  className,
  iconId,
  size = 'medium',
  background = 'fr-background-contrast--info',
}: {
  background?: string
  className?: string
  iconId: ButtonProps.IconOnly['iconId']
  size?: 'xsmall' | 'small' | 'medium' | 'semi-large' | 'large' | 'xlarge'
}) => (
  <div
    className={classNames(
      background,
      styles.container,
      styles[size],
      className,
    )}
  >
    <span
      className={classNames(styles.icon, styles.iconColor, iconId)}
      aria-hidden
    />
  </div>
)

export default IconInCircle
