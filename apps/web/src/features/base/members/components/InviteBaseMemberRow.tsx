import { SelectOptionValid } from '@app/ui/components/Form/OptionBadge'
import EmptyUserAvatar from '@app/web/components/EmptyUserAvatar'
import RoundProfileImage from '@app/web/components/RoundProfileImage'
import InviteBaseMemberRoleCard from '@app/web/features/base/members/components/InviteBaseMemberRoleCard'
import classNames from 'classnames'
import styles from './InviteBaseMemberRow.module.css'

const InviteBaseMemberRow = ({
  member,
  onSelectRole,
  onDelete,
  canAddAdmin,
}: {
  member: SelectOptionValid<{
    email?: string
    firstName?: string
    lastName?: string
    image?: { id: string; altText?: string | null } | null
  }>
  onSelectRole: (type: 'admin' | 'member') => void
  onDelete: () => void
  canAddAdmin: boolean
}) => {
  const memberProfile = {
    firstName: member.extra?.firstName ?? null,
    lastName: member.extra?.lastName ?? null,
    image: member.extra?.image ?? null,
  }

  return (
    <div
      className={classNames(
        'fr-enlarge-link fr-flex fr-flex-gap-3v fr-align-items-center fr-width-full fr-py-3w',
        member.invalid && styles.invalid,
      )}
    >
      {(member.extra?.firstName && member.extra?.lastName) ||
      member.extra?.image ? (
        <RoundProfileImage user={memberProfile} />
      ) : (
        <EmptyUserAvatar />
      )}
      <div className="fr-flex fr-direction-sm-row fr-direction-column fr-width-full fr-justify-content-space-between fr-align-items-center">
        <div>
          <h3 className="fr-text--sm fr-text--medium fr-text-mention--grey fr-my-auto">
            {member.label}
          </h3>
          {!!member.extra?.email && (
            <span className="fr-text--xs fr-mb-0 fr-hint-text">
              {member.extra.email}
            </span>
          )}
        </div>

        <InviteBaseMemberRoleCard
          type={member.type}
          onChange={onSelectRole}
          onDelete={onDelete}
          canAddAdmin={canAddAdmin}
        />
      </div>
    </div>
  )
}

export default InviteBaseMemberRow
