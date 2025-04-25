import React from 'react'
import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import Tag from '@codegouvfr/react-dsfr/Tag'
import { BasePageData } from '@app/web/server/bases/getBase'
import IconInSquare from '@app/web/components/IconInSquare'
import { SessionUser } from '@app/web/auth/sessionUser'
import { BaseMembersSortType } from '@app/web/app/(public)/bases/[slug]/(consultation)/membres/searchParams'
import InviteBaseMemberButton from '@app/web/features/base/invitation/components/InviteBaseMemberButton'
import BaseMembersSort from '@app/web/features/base/members/components/BaseMembersSort'
import BaseMemberCard from '@app/web/features/base/members/components/BaseMemberCard'

const BaseMembers = ({
  base,
  canAddAdmin,
  canAddMember,
  canChangeMemberRole,
  user,
  sortBy,
}: {
  base: BasePageData
  canAddMember: boolean
  canChangeMemberRole: boolean
  canAddAdmin: boolean
  user: SessionUser | null
  sortBy: BaseMembersSortType
}) => {
  const adminCount = base.members.filter((member) => member.isAdmin).length
  const contributorsCount = base.members.filter(
    (member) => !member.isAdmin && member.accepted,
  ).length
  const invitationsCount = base.members.filter(
    (member) => !member.accepted,
  ).length

  return (
    <div data-testid="base-members">
      <div className="fr-grid-row fr-justify-content-space-between fr-direction-sm-row fr-direction-column-reverse fr-mb-4w">
        <div className="fr-col-sm-auto fr-col-12">
          <div className="fr-flex fr-align-items-center fr-flex-gap-5v">
            <IconInSquare iconId="ri-team-line" />
            <h2 className="fr-mb-0 fr-h3 fr-text-label--blue-france">
              Membres · {base.members.length}
            </h2>
          </div>
        </div>
        {canAddMember && (
          <div className="fr-col-sm-auto fr-col-12 fr-mb-5w fr-mb-md-2w">
            <InviteBaseMemberButton
              className="fr-width-full fr-justify-content-center"
              base={base}
              canAddAdmin={canAddAdmin}
            />
          </div>
        )}
      </div>
      <div className="fr-mb-2w fr-flex fr-align-items-center fr-justify-content-space-between fr-flex-gap-3v">
        <div className="fr-flex fr-align-items-center fr-flex-gap-3v">
          <span className="fr-text--medium">
            {adminCount} administrateur{sPluriel(adminCount)}
            {contributorsCount > 0 &&
              ` · ${contributorsCount} contributeur${sPluriel(contributorsCount)}`}
          </span>
          {invitationsCount > 0 && (
            <Tag small className="fr-tag--info fr-text--bold fr-mr-1w">
              {invitationsCount} Invitation{sPluriel(invitationsCount)} en
              attente
            </Tag>
          )}
        </div>
        <BaseMembersSort slug={base.slug} sortBy={sortBy} />
      </div>
      {base.members.map((member) => (
        <BaseMemberCard
          canChangeMemberRole={canChangeMemberRole}
          member={member}
          key={member.member.id}
          isSessionUser={user?.id === member.member.id}
        />
      ))}
    </div>
  )
}

export default BaseMembers
