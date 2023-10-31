import React from 'react'
import { BasePageData } from '@app/web/server/bases/getBase'
import ProfileCard from '@app/web/components/Profile/Card/Card'
import AdminMemberCard from '../List/AdminMemberCard'
import InviteMemberButton from './InviteMemberButton'
import styles from './Members.module.css'

const Members = ({
  base,
  isMember,
  isAdmin,
}: {
  base: BasePageData
  isMember: boolean
  isAdmin: boolean
}) => {
  // Cannot change access level of admins if there is only one admin
  const canChangeAccessLevelOfAdmins =
    base.members.filter((member) => member.isAdmin).length > 1

  return (
    <div className={styles.container} data-testid="base-members">
      <div className={styles.header}>
        <h3 className="fr-mb-0">Membres · {base.members.length}</h3>
        {isMember && <InviteMemberButton base={base} isAdmin={isAdmin} />}
      </div>
      {isAdmin
        ? base.members.map((member) => (
            <AdminMemberCard
              member={member}
              key={member.member.id}
              canChangeAccessLevel={canChangeAccessLevelOfAdmins}
            />
          ))
        : base.members.map((member) => (
            <ProfileCard profile={member.member} key={member.member.id} />
          ))}
    </div>
  )
}

export default Members
