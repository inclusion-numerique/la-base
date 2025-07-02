import { SessionUser } from '@app/web/auth/sessionUser'
import { LeaveBaseButton } from '@app/web/features/base/components/LeaveBaseButton'
import DeclineBaseInviteMemberButton from '@app/web/features/base/invitation/components/DeclineBaseInviteMemberButton'
import RemoveBaseMemberButton from '@app/web/features/base/invitation/components/RemoveBaseMemberButton'
import { BaseMember, BasePageData } from '@app/web/server/bases/getBase'
import Tag from '@codegouvfr/react-dsfr/Tag'
import classNames from 'classnames'
import React, { ChangeEvent } from 'react'
import styles from './BaseMemberRoleCard.module.css'

interface MemberRoleDisplayProps {
  base: BasePageData
  member: BaseMember
  isAdmin: boolean
  user: SessionUser | null
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => Promise<void>
  canChangeMemberRole: boolean
}

const BaseMemberRoleCard = ({
  base,
  member,
  isAdmin,
  user,
  onChange,
  canChangeMemberRole,
}: MemberRoleDisplayProps) => {
  const isSessionUser = member.memberId === user?.id
  if (!isSessionUser && !canChangeMemberRole && member.accepted) {
    return (
      <div
        className={classNames(
          styles.role,
          'fr-text--medium fr-text--sm fr-mb-0 fr-hint-text',
        )}
      >
        {isAdmin ? 'Administrateur' : 'Contributeur'}
      </div>
    )
  }

  if (isSessionUser) {
    return (
      <div className="fr-flex fr-align-items-center fr-flex-gap-2v">
        {member.accepted ? (
          <>
            <div
              className={classNames(
                styles.role,
                'fr-text--medium fr-text--sm fr-mb-0 fr-hint-text',
              )}
              data-testid="user-session-member-card-role"
            >
              {isAdmin ? 'Administrateur' : 'Contributeur'}
            </div>
            <LeaveBaseButton base={base} user={user} />
          </>
        ) : (
          <>
            <Tag small className="fr-tag--info fr-text--bold fr-mr-1w">
              Invitation envoyée
            </Tag>
            <DeclineBaseInviteMemberButton member={member} />
          </>
        )}
      </div>
    )
  }

  if (!member.accepted) {
    return (
      <>
        <Tag small className="fr-tag--info fr-text--bold fr-mr-1w">
          Invitation envoyée
        </Tag>
        {canChangeMemberRole && <RemoveBaseMemberButton member={member} />}
      </>
    )
  }

  return (
    <>
      <select
        data-testid="member-card-role-select"
        onChange={onChange}
        className="fr-text--left fr-text-sm--right fr-text--medium fr-text-label--blue-france fr-mr-1w"
        style={{ appearance: 'auto' }}
        value={isAdmin ? 'admin' : 'member'}
      >
        <option value="admin">Administrateur</option>
        <option value="member">Contributeur</option>
      </select>
      <RemoveBaseMemberButton member={member} />
    </>
  )
}

export default BaseMemberRoleCard
