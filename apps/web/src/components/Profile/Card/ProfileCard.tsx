import React from 'react'
import Link from 'next/link'
import { ProfileListItem } from '@app/web/server/profiles/getProfilesList'
import RoundProfileImage from '@app/web/components/RoundProfileImage'
import { SessionUser } from '@app/web/auth/sessionUser'
import { FollowButton } from '@app/web/components/Follows/FollowButton'
import ProfileMetadata from '@app/web/components/Profile/ProfileMetadata'
import { countProfileResources } from '@app/web/server/profiles/countProfileResources'
import { formatName } from '@app/web/server/rpc/user/formatName'

const ProfileCard = ({
  profile,
  user,
  canFollow = true,
  titleAs: ProfileTitle = 'h2',
  isAdmin,
  displayProfileMetadata = true,
}: {
  profile: ProfileListItem
  user: SessionUser | null
  canFollow?: boolean
  titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  isAdmin?: boolean
  displayProfileMetadata?: boolean
}) => (
  <article className="fr-border-top" data-testid="profile-card">
    <div className="fr-py-2w fr-flex fr-flex-gap-4v fr-align-items-sm-center fr-direction-sm-row fr-direction-column">
      <div className="fr-flex fr-flex-gap-4v fr-align-items-center fr-flex-grow-1 ">
        <RoundProfileImage size={48} user={profile} />
        <div className="fr-flex fr-direction-column fr-flex-gap-2v">
          <Link className="fr-flex-grow-1" href={`/profils/${profile.slug}`}>
            <ProfileTitle className="fr-text--md fr-text--medium fr-mb-0">
              {profile.name && formatName(profile.name)}
            </ProfileTitle>
          </Link>
          <div className="fr-flex fr-flex-gap-2v fr-align-items-baseline">
            {displayProfileMetadata && (
              <ProfileMetadata
                className="fr-text-mention--grey"
                resourcesCount={countProfileResources(profile)}
                followedByCount={profile._count.followedBy}
              />
            )}
            {isAdmin != null && (
              <div className="fr-text-mention--grey">
                {isAdmin ? 'Administrateur' : 'Membre'}
              </div>
            )}
          </div>
        </div>
      </div>
      {canFollow && profile.id !== user?.id ? (
        <div style={{ zIndex: 1 }}>
          <FollowButton profile={profile} user={user} />
        </div>
      ) : null}
    </div>
  </article>
)

export default ProfileCard
