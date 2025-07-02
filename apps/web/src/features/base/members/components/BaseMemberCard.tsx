'use client'

import { SessionUser } from '@app/web/auth/sessionUser'
import EmptyUserAvatar from '@app/web/components/EmptyUserAvatar'
import RoundProfileImage from '@app/web/components/RoundProfileImage'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import BaseMemberRoleCard from '@app/web/features/base/members/components/BaseMemberRoleCard'
import { BaseMember, BasePageData } from '@app/web/server/bases/getBase'
import { trpc } from '@app/web/trpc'
import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { type ChangeEvent, useCallback, useState } from 'react'
import styles from './BaseMemberCard.module.css'

const BaseMemberCard = ({
  base,
  member,
  user,
  canChangeMemberRole,
}: {
  base: BasePageData
  member: BaseMember
  user: SessionUser | null
  canChangeMemberRole: boolean
}) => {
  const [isAdmin, setIsAdmin] = useState(member.isAdmin)
  const mutate = trpc.baseMember.changeRole.useMutation()
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
    <div className="fr-border-top" data-testid="member-card">
      <div
        className={classNames(
          styles.container,
          'fr-flex fr-direction-column fr-direction-sm-row fr-align-items-center fr-width-full fr-py-3w',
        )}
      >
        <div
          className={classNames(
            styles.container,
            'fr-flex fr-align-items-center fr-width-full',
          )}
        >
          {member.member.name ? (
            <RoundProfileImage user={member.member} />
          ) : (
            <EmptyUserAvatar />
          )}
          <div className="fr-flex fr-justify-content-space-between fr-direction-sm-row fr-direction-column fr-width-full fr-align-items-md-center">
            <Link
              className={styles.link}
              href={`/profils/${member.member.slug}`}
            >
              <h3 className="fr-text--md fr-text--medium fr-my-auto">
                {member.member.name ?? member.member.email}
              </h3>
              {!!member.member.email && member.member.name && (
                <span
                  className={classNames(
                    styles.role,
                    'fr-text--xs fr-mb-0 fr-hint-text',
                  )}
                >
                  {member.member.email}
                </span>
              )}
            </Link>
          </div>
        </div>
        <div className="fr-width-full fr-pl-5w fr-pl-md-0 fr-flex fr-justify-content-space-between fr-justify-content-md-end">
          <BaseMemberRoleCard
            base={base}
            canChangeMemberRole={canChangeMemberRole}
            member={member}
            isAdmin={isAdmin}
            user={user}
            onChange={onChange}
          />
        </div>
      </div>
    </div>
  )
}

export default withTrpc(BaseMemberCard)
