import React from 'react'
import Link from 'next/link'
import { ProfilePageData } from '@app/web/server/profiles/getProfile'
import { getServerUrl } from '@app/web/utils/baseUrl'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import { FollowButton } from '@app/web/components/Follows/FollowButton'
import { SessionUser } from '@app/web/auth/sessionUser'
import CopyLinkButton from '../CopyLinkButton'
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
  <div className="fr-background-alt--blue-france fr-pb-md-10w fr-pb-5w">
    <div className="fr-container">
      <Breadcrumbs
        currentPage={isOwner ? 'Mon Profil' : `${profile.name || 'Profil'}`}
      />
      <div id={headerId}>
        <ProfileInformations profile={profile} resourcesCount={resourcesCount}>
          {canWrite ? (
            <div>
              <Link
                data-testid="profile-edition-button"
                className="fr-mt-md-0 fr-mt-2w fr-btn fr-btn--secondary fr-icon-edit-line fr-btn--icon-left fr-width-full fr-justify-content-center"
                href={`/profils/${profile.slug}/modifier`}
              >
                Modifier le profil
              </Link>
            </div>
          ) : (
            profile.isPublic && (
              <div className="fr-flex fr-flex-gap-4v fr-direction-column fr-direction-sm-row fr-mt-md-0 fr-mt-2w">
                <FollowButton
                  user={user}
                  profile={profile}
                  followPriority="primary"
                  className="fr-width-full fr-justify-content-center"
                />
                {profile.emailIsPublic && (
                  <Link
                    className="fr-btn--sm fr-btn fr-btn--tertiary fr-icon-mail-line fr-btn--icon-left fr-width-full fr-justify-content-center"
                    href={`mailto:${profile.email}`}
                  >
                    Contacter
                  </Link>
                )}
                <CopyLinkButton
                  full
                  size="small"
                  url={getServerUrl(`/profils/${profile.slug}`, true)}
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
