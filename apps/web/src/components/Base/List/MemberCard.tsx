import React from 'react'
import Link from 'next/link'
import { BaseMember } from '@app/web/server/bases/getBase'
import styles from './MemberCard.module.css'
import RemoveMemberButton from './RemoveMemberButton'

const MemberCard = ({
  member,
  isAdmin,
}: {
  member: BaseMember
  isAdmin: boolean
}) => (
  <div className={styles.container} data-testid="member-card">
    <Link className={styles.content} href={`/profils/${member.member.id}`}>
      <div className={styles.logo} />
      {member.member.name}
    </Link>
    <div className={styles.actions}>
      {member.isAdmin ? 'Administrateur' : 'Membre'}
      {isAdmin && <RemoveMemberButton member={member} />}{' '}
    </div>
  </div>
)

export default MemberCard
