import React from 'react'
import Link from 'next/link'
import { ProfilePageData } from '@app/web/server/profiles/getProfile'
import { FilteredProfile } from '@app/web/server/profiles/authorization'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import styles from './Header.module.css'
import ProfileInformations from './ProfileInformations'

const Header = ({
  profile,
  isConnectedUser,
  resourcesCount,
}: {
  profile: ProfilePageData | FilteredProfile
  isConnectedUser?: boolean
  resourcesCount: number
}) => (
  <div className={styles.container}>
    <div className="fr-container">
      <Breadcrumbs
        currentPage={isConnectedUser ? 'Mon Profil' : `${profile.name || ''}`}
      />
      <ProfileInformations profile={profile} resourcesCount={resourcesCount}>
        {isConnectedUser && (
          <Link
            data-testid="profile-edition-button"
            className="fr-mt-2w fr-btn fr-btn--secondary fr-icon-edit-line fr-btn--icon-left"
            href={`/profils/${profile.id}/editer`}
          >
            Modifier le profil
          </Link>
        )}
      </ProfileInformations>
    </div>
  </div>
)

export default Header
