import React from 'react'
import Link from 'next/link'
import { ProfilePageData } from '@app/web/server/profiles/getProfile'
import { getServerUrl } from '@app/web/utils/baseUrl'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import { FollowButton } from '@app/web/components/Follows/FollowButton'
import { SessionUser } from '@app/web/auth/sessionUser'
import CopyLinkButton from '../CopyLinkButton'
import styles from './ProfileHeader.module.css'
import ProfileInformations from './ProfileInformations'

const headerId = 'header'
export const headerSkipLink = { label: 'Entête', anchor: `#${headerId}` }

const ProfileHeader = ({
  profile,
  canWrite,
  isOwner,
  resourcesCount,
  user,
}: {
  profile: ProfilePageData
  canWrite: boolean
  isOwner: boolean
  resourcesCount: number
  user: SessionUser | null
}) => (
  <div className={styles.container}>
    <div className="fr-container">
      <Breadcrumbs
        currentPage={isOwner ? 'Mon Profil' : `${profile.name || 'Profil'}`}
      />
      <div id={headerId}>
        <ProfileInformations profile={profile} resourcesCount={resourcesCount}>
          {canWrite ? (
            <div className={styles.buttons}>
              <Link
                data-testid="profile-edition-button"
                className="fr-mt-2w fr-btn fr-btn--secondary fr-icon-edit-line fr-btn--icon-left"
                href={`/profils/${profile.slug}/modifier`}
              >
                Modifier le profil
              </Link>
            </div>
          ) : (
            profile.isPublic && (
              <div className={styles.buttons}>
                <FollowButton
                  user={user}
                  profile={profile}
                  followPriority="primary"
                />
                {profile.emailIsPublic && (
                  <Link
                    className="fr-btn--sm fr-btn fr-btn--secondary fr-icon-mail-line fr-btn--icon-left"
                    href={`mailto:${profile.email}`}
                  >
                    Contacter
                  </Link>
                )}
                <CopyLinkButton
                  url={getServerUrl(`/profils/${profile.slug}`, true)}
                  priority="secondary"
                >
                  Partager
                </CopyLinkButton>
              </div>
            )
          )}
        </ProfileInformations>
      </div>
    </div>
  </div>
)

export default ProfileHeader
