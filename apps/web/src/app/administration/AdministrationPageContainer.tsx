import classNames from 'classnames'
import { PropsWithChildren } from 'react'
import styles from './AdministrationLayout.module.css'

const AdministrationPageContainer = ({
  size = 944,
  children,
  className,
}: PropsWithChildren<{
  size?: 944 | 894 | 794 | 'full'
  className?: string
}>) => (
  <div
    className={classNames(
      styles.contentContainer,
      styles[`contentContainer--${size}`],
      className,
    )}
  >
    {children}
  </div>
)

export default AdministrationPageContainer
