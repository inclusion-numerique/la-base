import React from 'react'
import { MatchingProfil } from '@app/web/server/profiles/getProfile'
import styles from './InviteMemberCard.module.css'

const InviteMemberCard = ({ member }: { member: MatchingProfil }) => (
  <div className={styles.container}>
    <div className={styles.logo} />
    <div>
      <span className="fr-text--sm fr-mb-0">{member.name}</span>
      <span className="fr-text--xs fr-mb-0 fr-hint-text">{member.email}</span>
    </div>
  </div>
)

export default InviteMemberCard
