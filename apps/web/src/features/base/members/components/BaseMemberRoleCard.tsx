import { ChangeEvent } from 'react'
import Tag from '@codegouvfr/react-dsfr/Tag'
import { BaseMember } from '@app/web/server/bases/getBase'
import LeaveBaseMemberButton from '@app/web/features/base/invitation/components/LeaveBaseMemberButton'
import RemoveBaseMemberButton from '@app/web/features/base/invitation/components/RemoveBaseMemberButton'

interface MemberRoleDisplayProps {
  member: BaseMember
  isAdmin: boolean
  isSessionUser: boolean
  onChange?: (event: ChangeEvent<HTMLSelectElement>) => Promise<void>
  canChangeMemberRole: boolean
}

const BaseMemberRoleCard = ({
  member,
  isAdmin,
  isSessionUser,
  onChange,
  canChangeMemberRole,
}: MemberRoleDisplayProps) => {
  if (!isSessionUser && !canChangeMemberRole && member.accepted) {
    return (
      <div className="fr-text--semi-bold fr-text--sm fr-mb-0 fr-hint-text">
        {isAdmin ? 'Administrateur' : 'Contributeur'}
      </div>
    )
  }

  if (isSessionUser) {
    return (
      <div className="fr-flex fr-align-items-center fr-flex-gap-2v">
        {member.accepted ? (
          <>
            <div className="fr-text--semi-bold fr-text--sm fr-mb-0 fr-hint-text">
              {isAdmin ? 'Administrateur' : 'Contributeur'}
            </div>
            <LeaveBaseMemberButton member={member} />
          </>
        ) : (
          <>
            <Tag small className="fr-tag--info fr-text--bold fr-mr-1w">
              INVITATION ENVOYÉE
            </Tag>
            <LeaveBaseMemberButton member={member} title="Refuser" />
          </>
        )}
      </div>
    )
  }

  if (!member.accepted) {
    return (
      <>
        <Tag small className="fr-tag--info fr-text--bold fr-mr-1w">
          INVITATION ENVOYÉE
        </Tag>
        <RemoveBaseMemberButton member={member} />
      </>
    )
  }

  return (
    <>
      <select
        data-testid="member-card-role-select"
        onChange={onChange}
        className="fr-text--left fr-text-sm--right fr-text--semi-bold fr-text-label--blue-france fr-mr-1w"
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
