import Button from '@codegouvfr/react-dsfr/Button'
import type { PropsWithChildren } from 'react'
import styles from './AuthCard.module.css'

export const AuthCard = ({
  children,
  id,
}: PropsWithChildren<{ id?: string }>) => (
  <div className={styles.card} id={id}>
    <main role="main" className={styles.inner}>
      {children}
    </main>
  </div>
)
