import { PropsWithChildren } from 'react'
import styles from './AuthCard.module.css'

export const AuthCard = ({ children }: PropsWithChildren) => (
  <div className={styles.card}>
    <div className={styles.inner}>{children}</div>
  </div>
)
