'use client'

import React, { ChangeEvent, useCallback, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
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
    <div className="fr-border-top" data-testid="member-card-admin">
      <div className="fr-enlarge-link fr-flex fr-flex-gap-2v fr-align-items-center fr-width-full fr-py-3w">
        <RoundProfileImage user={member.member} />
        <div className="fr-flex fr-direction-sm-row fr-direction-column fr-width-full">
          <Link
            className="fr-p-1v fr-flex-grow-1"
            href={`/profils/${member.member.slug}`}
          >
            <h3 className="fr-text--md fr-text--regular fr-my-auto">
              {member.member.name}
            </h3>
          </Link>
          <div className="fr-position-relative" style={{ zIndex: 1 }}>
            {!canChangeAccessLevel && isAdmin ? (
              <div className="fr-text--semi-bold fr-text--sm fr-mb-0 fr-text-label--blue-france">
                Administrateur
              </div>
            ) : (
              <>
                <select
                  data-testid="member-card-role-select"
                  onChange={onChange}
                  className="fr-text--left fr-text-sm--right fr-text--semi-bold fr-text-label--blue-france"
                  style={{ appearance: 'auto' }}
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
      </div>
    </div>
  )
}

export default withTrpc(BaseAdminMemberCard)
