import React from 'react'
import { BasePageData } from '@app/web/server/bases/getBase'
import styles from './Members.module.css'
import MemberCard from './MemberCard'
import InviteMemberButton from './InviteMemberButton'

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
    {base.members.map((member) => (
      <MemberCard member={member} key={member.member.id} isAdmin={isAdmin} />
    ))}
  </div>
)

export default Members
