import type { SessionUser } from '@app/web/auth/sessionUser'
import { FollowButton } from '@app/web/components/Follows/FollowButton'
import ProfileMetadata from '@app/web/components/Profile/ProfileMetadata'
import RoundProfileImage from '@app/web/components/RoundProfileImage'
import { countProfileResources } from '@app/web/server/profiles/countProfileResources'
import type { ProfileListItem } from '@app/web/server/profiles/getProfilesList'
import { formatName } from '@app/web/server/rpc/user/formatName'
import classNames from 'classnames'
import Link from 'next/link'

const ProfileCard = ({
  profile,
  user,
  canFollow = true,
  className,
  isAdmin,
  displayProfileMetadata = true,
}: {
  profile: ProfileListItem
  user: SessionUser | null
  canFollow?: boolean
  className?: string
  titleClassName?: string
  isAdmin?: boolean
  displayProfileMetadata?: boolean
}) => (
  <article
    className={classNames(className, 'fr-border-top')}
    data-testid="profile-card"
  >
    <div className="fr-py-2w fr-flex fr-flex-gap-4v fr-align-items-sm-center fr-direction-sm-row fr-direction-column">
      <div className="fr-flex fr-flex-gap-4v fr-align-items-center fr-flex-grow-1 ">
        <Link
          href={`/profils/${profile.slug}`}
          className="fr-link--no-underline"
        >
          <RoundProfileImage size={48} user={profile} />
        </Link>
        <div className="fr-flex fr-direction-column fr-flex-gap-1v">
          <Link
            className="fr-flex-grow-1 fr-link--no-underline"
            href={`/profils/${profile.slug}`}
          >
            <span className="fr-text--bold fr-text--md fr-mb-0">
              {profile.name && formatName(profile.name)}
            </span>
          </Link>
          <div className="fr-flex fr-flex-gap-2v fr-align-items-baseline">
            {displayProfileMetadata && (
              <ProfileMetadata
                user={null}
                className="fr-text-mention--grey"
                resourcesCount={countProfileResources(profile)}
                followedByCount={profile._count.followedBy}
                context="card"
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
