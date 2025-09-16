import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import { SessionUser } from '@app/web/auth/sessionUser'
import ProfileFollowersModal from '@app/web/features/profil/followers/components/ProfileFollowersModal'
import type { ProfileFollowedByData } from '@app/web/server/profiles/getProfile'
import classNames from 'classnames'

const ProfileMetadata = ({
  resourcesCount,
  followedByCount,
  followedByData,
  className,
  context,
  user,
}:
  | {
      resourcesCount: number
      // in base and card context, we only need the followedByCount to display the modal, not the followedByData
      context: 'base' | 'card'
      followedByCount: number
      followedByData?: undefined
      className?: string
      user: SessionUser | null
    }
  | {
      resourcesCount: number
      // in profile context, we need all profile followedByData to display the modal
      context: 'profile'
      followedByCount?: undefined
      followedByData: ProfileFollowedByData
      className?: string
      user: SessionUser | null
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
    {context === 'profile' && followedByData.counts.total > 0 ? (
      <ProfileFollowersModal user={user} followedByData={followedByData} />
    ) : (
      <span>
        <span className="fr-icon-user-heart-line fr-icon--sm fr-mr-1w" />
        <b>{followedByCount ?? followedByData.counts.total}</b>
        <span className="fr-hidden fr-display-inline-md">
          {' '}
          Suivi{sPluriel(followedByCount ?? followedByData.counts.total)}
        </span>
      </span>
    )}
  </div>
)
export default ProfileMetadata
