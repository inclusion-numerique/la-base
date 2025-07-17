import { SessionUser } from '@app/web/auth/sessionUser'
import { LeaveBaseButton } from '@app/web/features/base/components/LeaveBaseButton'
import { BaseProfileListItemWithAllFields } from '@app/web/server/bases/getBasesList'
import { ProfilePageData } from '@app/web/server/profiles/getProfile'
import classNames from 'classnames'
import styles from './ProfileBaseMemberRoleCard.module.css'

const ProfileBaseMemberRoleCard = ({
  profile,
  base,
  user,
  isOwner,
}: {
  profile: ProfilePageData
  base: BaseProfileListItemWithAllFields
  user: SessionUser | null
  isOwner: boolean
}) => {
  const isAdmin = base.members.find(
    (member) => member.memberId === profile.id,
  )?.isAdmin
  return (
    <div
      className="fr-flex fr-align-items-center fr-flex-gap-4v"
      data-testid="user-session-member-card-role"
    >
      <span
        className={classNames(
          styles.role,
          'fr-text--medium fr-text--sm fr-mb-0 fr-hint-text',
        )}
      >
        {isAdmin ? 'Administrateur' : 'Contributeur'}
      </span>
      {isOwner && <LeaveBaseButton user={user} base={base} />}
    </div>
  )
}
export default ProfileBaseMemberRoleCard
