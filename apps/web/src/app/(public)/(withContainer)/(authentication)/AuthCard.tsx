import { PropsWithChildren } from 'react'
import styles from './AuthCard.module.css'

export const AuthCard = ({ children }: PropsWithChildren) => (
  <div className={styles.card}>
    <main role="main" id="content" className={styles.inner}>
      {children}
    </main>
  </div>
)
