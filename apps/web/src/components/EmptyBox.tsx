import React, { PropsWithChildren } from 'react'
import styles from './EmptyBox.module.css'

const EmptyBox = ({
  title,
  children,
}: { title: string } & PropsWithChildren) => (
  <div className={styles.container} data-testid="base-ressources-empty-state">
    <h6 className="fr-mb-1w">{title}</h6>
    {children}
  </div>
)

export default EmptyBox
