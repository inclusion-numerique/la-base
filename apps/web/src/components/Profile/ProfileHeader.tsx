import React from 'react'
import Link from 'next/link'
import { ProfilePageData } from '@app/web/server/profiles/getProfile'
import { FilteredProfile } from '@app/web/server/profiles/authorization'
import { getServerUrl } from '@app/web/utils/baseUrl'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import { FollowButton } from '@app/web/components/Follows/FollowButton'
import { SessionUser } from '@app/web/auth/sessionUser'
import CopyLinkButton from '../CopyLinkButton'
import styles from './ProfileHeader.module.css'
import ProfileInformations from './ProfileInformations'

const ProfileHeader = ({
  profile,
  isConnectedUser,
  resourcesCount,
  user,
}: {
  profile: ProfilePageData | FilteredProfile
  isConnectedUser?: boolean
  resourcesCount: number
  user: SessionUser | null
}) => (
  <div className={styles.container}>
    <div className="fr-container">
      <Breadcrumbs
        currentPage={isConnectedUser ? 'Mon Profil' : `${profile.name || ''}`}
      />
      <ProfileInformations profile={profile} resourcesCount={resourcesCount}>
        {isConnectedUser ? (
          <Link
            data-testid="profile-edition-button"
            className="fr-mt-2w fr-btn fr-btn--secondary fr-icon-edit-line fr-btn--icon-left"
            href={`/profils/${profile.id}/modifier`}
          >
            Modifier le profil
          </Link>
        ) : (
          <div className={styles.buttons}>
            <FollowButton user={user} profile={profile} />
            <Link
              className="fr-btn--sm fr-btn fr-btn--secondary fr-icon-mail-line fr-btn--icon-left"
              href={`mailto:${profile.email}`}
            >
              Contacter
            </Link>
            <CopyLinkButton
              url={getServerUrl(`/profils/${profile.id}`, true)}
              priority="secondary"
            >
              Partager
            </CopyLinkButton>
          </div>
        )}
      </ProfileInformations>
    </div>
  </div>
)

export default ProfileHeader
