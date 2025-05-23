import InviteBaseMemberRemoveButton from '@app/web/features/base/invitation/components/InviteBaseMemberRemoveButton'
import InviteUserType from '@app/web/features/base/invitation/components/InviteUserType'

interface InviteMemberRoleDisplayProps {
  type: 'admin' | 'member'
  onChange: (type: 'admin' | 'member') => void
  onDelete: () => void
  canAddAdmin: boolean
}

const InviteBaseMemberRoleCard = ({
  type,
  onChange,
  onDelete,
  canAddAdmin,
}: InviteMemberRoleDisplayProps) => {
  return (
    <div className="fr-flex fr-align-items-center fr-flex-gap-3v">
      <InviteUserType
        onChange={onChange}
        canAddAdmin={canAddAdmin}
        selectedMemberType={type}
      />
      <InviteBaseMemberRemoveButton onDelete={onDelete} />
    </div>
  )
}

export default InviteBaseMemberRoleCard
