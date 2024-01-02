'use client'

import React, { ChangeEvent, useCallback, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import styles from '@app/web/components/Profile/Card/ProfileCard.module.css'
import { BaseMember } from '@app/web/server/bases/getBase'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import RoundProfileImage from '@app/web/components/RoundProfileImage'
import RemoveBaseMemberButton from '@app/web/components/Base/Members/RemoveBaseMemberButton'

const BaseAdminMemberCard = ({
  member,
  canChangeAccessLevel,
}: {
  member: BaseMember
  canChangeAccessLevel: boolean
}) => {
  const [isAdmin, setIsAdmin] = useState(member.isAdmin)
  const mutate = trpc.baseMember.mutate.useMutation()
  const router = useRouter()

  const onChange = useCallback(
    async (event: ChangeEvent<HTMLSelectElement>) => {
      const result = event.target.value === 'admin'
      setIsAdmin(result)
      await mutate.mutateAsync({
        baseId: member.baseId,
        memberId: member.member.id,
        isAdmin: result,
      })
      router.refresh()
    },
    [mutate, member, router],
  )

  return (
    <div className={styles.container} data-testid="member-card-admin">
      <Link className={styles.content} href={`/profils/${member.member.id}`}>
        <RoundProfileImage user={member.member} />
        {member.member.name}
      </Link>
      <div className={styles.actions}>
        {!canChangeAccessLevel && isAdmin ? (
          <div className={styles.select}>Administrateur</div>
        ) : (
          <>
            <select
              data-testid="member-card-role-select"
              onChange={onChange}
              className={styles.select}
              value={isAdmin ? 'admin' : 'member'}
            >
              <option value="admin">Administrateur</option>
              <option value="member">Membre</option>
            </select>
            <RemoveBaseMemberButton member={member} />
          </>
        )}
      </div>
    </div>
  )
}

export default withTrpc(BaseAdminMemberCard)
