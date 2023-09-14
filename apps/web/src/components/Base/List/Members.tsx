import React from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import { BaseMember } from '@app/web/server/bases/getBase'
import styles from './Members.module.css'
import MemberCard from './MemberCard'

const Members = ({
  members,
  isAdmin,
}: {
  members: BaseMember[]
  isAdmin: boolean
}) => (
  <div className={styles.container} data-testid="base-members">
    <div className={styles.header}>
      <h3 className="fr-mb-0">Membres · {members.length}</h3>
      {isAdmin && (
        <Button
          priority="secondary"
          iconId="fr-icon-user-add-line"
          nativeButtonProps={{ 'data-testid': 'base-invite-member-button' }}
        >
          Inviter un membre
        </Button>
      )}
    </div>
    {members.map((member) => (
      <MemberCard member={member} key={member.member.id} isAdmin={isAdmin} />
    ))}
  </div>
)

export default Members
