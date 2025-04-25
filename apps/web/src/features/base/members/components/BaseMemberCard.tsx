'use client'

import EmptyUserAvatar from '@app/web/components/EmptyUserAvatar'
import RoundProfileImage from '@app/web/components/RoundProfileImage'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import BaseMemberRoleCard from '@app/web/features/base/members/components/BaseMemberRoleCard'
import { BaseMember } from '@app/web/server/bases/getBase'
import { trpc } from '@app/web/trpc'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { type ChangeEvent, useCallback, useState } from 'react'
import { BaseMember } from '@app/web/server/bases/getBase'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import RoundProfileImage from '@app/web/components/RoundProfileImage'
import BaseMemberRoleCard from '@app/web/features/base/members/components/BaseMemberRoleCard'

const BaseMemberCard = ({
  member,
  isSessionUser,
  canChangeMemberRole,
}: {
  member: BaseMember
  isSessionUser: boolean
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
      <div className="fr-enlarge-link fr-flex fr-flex-gap-2v fr-align-items-center fr-width-full fr-py-3w">
        {member.member.name ? (
          <RoundProfileImage user={member.member} />
        ) : (
          <EmptyUserAvatar />
        )}
        <div className="fr-flex fr-direction-sm-row fr-direction-column fr-width-full fr-align-items-center">
          <Link
            className="fr-p-1v fr-flex-grow-1"
            href={`/profils/${member.member.slug}`}
          >
            <h3 className="fr-text--md fr-text--medium fr-my-auto">
              {member.member.name ?? member.member.email}
            </h3>
            {!!member.member.email && member.member.name && (
              <span className="fr-text--xs fr-mb-0 fr-hint-text">
                {member.member.email}
              </span>
            )}
          </Link>
          <div className="fr-position-relative" style={{ zIndex: 1 }}>
            <BaseMemberRoleCard
              canChangeMemberRole={canChangeMemberRole}
              member={member}
              isAdmin={isAdmin}
              isSessionUser={isSessionUser}
              onChange={onChange}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default withTrpc(BaseMemberCard)
