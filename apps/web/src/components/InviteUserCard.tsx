import RoundProfileImage from '@app/web/components/RoundProfileImage'
import type { SearchProfilesResult } from '@app/web/server/profiles/searchProfiles'
import React from 'react'
import styles from './InviteUserCard.module.css'

const InviteUserCard = ({ user }: { user: SearchProfilesResult[number] }) => (
  <div className={styles.container}>
    <RoundProfileImage user={user} />
    <div>
      <span className="fr-text--sm fr-mb-0">{user.name}</span>
      <span className="fr-text--xs fr-mb-0 fr-hint-text">{user.email}</span>
    </div>
  </div>
)

export default InviteUserCard
