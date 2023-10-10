import React, { PropsWithChildren, ReactNode } from 'react'
import classNames from 'classnames'
import styles from './EmptyBox.module.css'

const EmptyBox = ({
  title,
  children,
  className,
}: { title: ReactNode; className?: string } & PropsWithChildren) => (
  <div
    className={classNames(styles.container, className)}
    data-testid="empty-box"
  >
    <h6 className="fr-mb-1w">{title}</h6>
    {children}
  </div>
)

export default EmptyBox
