import React from 'react'
import { BasePageData } from '@app/web/server/bases/getBase'
import ProfileCard from '@app/web/components/Profile/Card/Card'
import AdminMemberCard from './AdminMemberCard'
import InviteMemberButton from './InviteMemberButton'
import styles from './Members.module.css'

const Members = ({
  base,
  isAdmin,
}: {
  base: BasePageData
  isAdmin: boolean
}) => (
  <div className={styles.container} data-testid="base-members">
    <div className={styles.header}>
      <h3 className="fr-mb-0">Membres · {base.members.length}</h3>
      {isAdmin && <InviteMemberButton base={base} />}
    </div>
    {isAdmin
      ? base.members.map((member) => (
          <AdminMemberCard member={member} key={member.member.id} />
        ))
      : base.members.map((member) => (
          <ProfileCard profile={member.member} key={member.member.id} />
        ))}
  </div>
)

export default Members
