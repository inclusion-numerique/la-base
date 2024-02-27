import React from 'react'
import { BasePageData } from '@app/web/server/bases/getBase'
import BaseAdminMemberCard from '@app/web/components/Base/Members/BaseAdminMemberCard'
import ProfileCard from '@app/web/components/Profile/Card/ProfileCard'
import InviteBaseMemberButton from '@app/web/components/Base/Members/InviteBaseMemberButton'
import styles from './BaseMembers.module.css'

const BaseMembers = ({
  base,
  canAddAdmin,
  canAddMember,
  canRemoveMember,
  canChangeMemberRole,
}: {
  base: BasePageData
  canAddMember: boolean
  canChangeMemberRole: boolean
  canRemoveMember: boolean
  canAddAdmin: boolean
}) => {
  // Cannot change access level of admins if there is only one admin
  const canChangeAccessLevelOfAdmins =
    base.members.filter((member) => member.isAdmin).length > 1

  return (
    <div className={styles.container} data-testid="base-members">
      <div className={styles.header}>
        <h3 className="fr-mb-0">Membres · {base.members.length}</h3>
        {canAddMember && (
          <InviteBaseMemberButton base={base} canAddAdmin={canAddAdmin} />
        )}
      </div>
      {canChangeMemberRole
        ? base.members.map((member) => (
            <BaseAdminMemberCard
              member={member}
              key={member.member.id}
              canChangeAccessLevel={canChangeAccessLevelOfAdmins}
            />
          ))
        : base.members.map((member) => (
            <ProfileCard
              profile={member.member}
              key={member.member.id}
              user={null}
              canFollow={false}
            />
          ))}
    </div>
  )
}

export default BaseMembers
