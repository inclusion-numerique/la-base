import React from 'react'
import Link from 'next/link'
import IconLink from '@app/web/components/Icon/IconLink'
import CopyLinkButton from '@app/web/components/CopyLinkButton'
import { getServerUrl } from '@app/web/utils/baseUrl'
import { ProfileListItem } from '@app/web/server/profiles/getProfilesList'
import styles from './Card.module.css'

const ProfileCard = ({ profile }: { profile: ProfileListItem }) => (
  <div className={styles.container} data-testid="profile-card">
    <Link className={styles.content} href={`/profils/${profile.id}`}>
      <div className={styles.logo} />
      {profile.name}
    </Link>
    <div className={styles.iconActions}>
      <IconLink
        title="Mettre en favoris"
        href="/"
        icon="fr-icon-heart-line"
        small
      />
      <CopyLinkButton url={getServerUrl(`/profils/${profile.id}`, true)} />
    </div>
  </div>
)

export default ProfileCard
