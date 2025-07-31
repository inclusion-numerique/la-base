import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import { SessionUser } from '@app/web/auth/sessionUser'
import ProfileFollowersModal from '@app/web/features/profil/followers/components/ProfileFollowersModal'
import { ProfileFollowedBy } from '@app/web/server/profiles/getProfile'
import classNames from 'classnames'

const ProfileMetadata = ({
  resourcesCount,
  followedByCount,
  followedBy,
  className,
  context,
  user,
}: {
  resourcesCount: number
  followedByCount: number
  followedBy?: ProfileFollowedBy
  className?: string
  context: 'base' | 'profile' | 'card'
  user?: SessionUser | null
}) => (
  <div className={classNames('fr-flex-md fr-text--sm fr-mb-0', className)}>
    <span className="fr-icon-file-text-line fr-icon--sm fr-pr-1w" />
    <span>
      <b>{resourcesCount}</b>
      <span className="fr-hidden fr-display-inline-md">
        {' '}
        Ressource{sPluriel(resourcesCount)}
      </span>
    </span>
    <span className="fr-px-1w">·</span>
    {context === 'profile' && followedBy && followedByCount > 0 ? (
      <ProfileFollowersModal
        user={user}
        followedBy={followedBy}
        count={followedByCount}
      />
    ) : (
      <span>
        <span className="fr-icon-user-heart-line fr-icon--sm fr-mr-1w" />
        <b>{followedByCount}</b>
        <span className="fr-hidden fr-display-inline-md">
          {' '}
          Suivi{sPluriel(followedByCount)}
        </span>
      </span>
    )}
  </div>
)
export default ProfileMetadata
