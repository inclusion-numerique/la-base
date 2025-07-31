import classNames from 'classnames'
import styles from './RedAsterisk.module.css'

const RedAsterisk = ({ className }: { className?: string }) => (
  <span className={classNames(styles.redAsterisk, className)}>*</span>
)

export default RedAsterisk
