import React from 'react'
import { MatchingProfil } from '@app/web/server/profiles/getProfile'
import styles from './InviteUserCard.module.css'

const InviteUserCard = ({ user }: { user: MatchingProfil }) => (
  <div className={styles.container}>
    <div className={styles.logo} />
    <div>
      <span className="fr-text--sm fr-mb-0">{user.name}</span>
      <span className="fr-text--xs fr-mb-0 fr-hint-text">{user.email}</span>
    </div>
  </div>
)

export default InviteUserCard
