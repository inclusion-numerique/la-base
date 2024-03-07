import React, { PropsWithChildren, ReactNode } from 'react'
import classNames from 'classnames'
import styles from './EmptyBox.module.css'

const EmptyBox = ({
  title,
  children,
  className,
  titleAs: EmptyBoxTitle = 'h2',
}: {
  title: ReactNode
  className?: string
  titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
} & PropsWithChildren) => (
  <div
    className={classNames(styles.container, className)}
    data-testid="empty-box"
  >
    <EmptyBoxTitle className="fr-mb-1w fr-h6">{title}</EmptyBoxTitle>
    {children}
  </div>
)

export default EmptyBox
