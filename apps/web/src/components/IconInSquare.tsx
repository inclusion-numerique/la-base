import classNames from 'classnames'
import type { ButtonProps } from '@codegouvfr/react-dsfr/Button'
import styles from './IconInSquare.module.css'

const IconInSquare = ({
  className,
  iconId,
  size = 'medium',
  background = 'fr-background-alt--blue-france',
}: {
  background?: string
  className?: string
  iconId: ButtonProps.IconOnly['iconId']
  size?: 'small' | 'medium' | 'large'
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
      className={classNames('fr-text-title--blue-france', styles.icon, iconId)}
      aria-hidden
    />
  </div>
)

export default IconInSquare
