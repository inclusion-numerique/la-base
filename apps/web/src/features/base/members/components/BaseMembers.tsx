import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import { BaseMembersSortType } from '@app/web/app/(public)/bases/[slug]/(consultation)/(autres)/membres/searchParams'
import type { SessionUser } from '@app/web/auth/sessionUser'
import IconInSquare from '@app/web/components/IconInSquare'
import InviteBaseMemberButton from '@app/web/features/base/invitation/components/InviteBaseMemberButton'
import { AdminBasePendingJoinRequests } from '@app/web/features/base/join-requests/components/AdminBasePendingJoinRequests'
import { BaseJoinRequest } from '@app/web/features/base/join-requests/components/BaseJoinRequest'
import { BasePendingJoinRequest } from '@app/web/features/base/join-requests/components/BasePendingJoinRequest'
import BaseMemberCard from '@app/web/features/base/members/components/BaseMemberCard'
import BaseMembersSort from '@app/web/features/base/members/components/BaseMembersSort'
import { BasePageData } from '@app/web/server/bases/getBase'
import Tag from '@codegouvfr/react-dsfr/Tag'

const BaseMembers = ({
  base,
  isBaseAdmin,
  canAddAdmin,
  canAddMember,
  canChangeMemberRole,
  user,
  sortBy,
}: {
  base: BasePageData
  isBaseAdmin: boolean
  canAddMember: boolean
  canChangeMemberRole: boolean
  canAddAdmin: boolean
  user: SessionUser | null
  sortBy: BaseMembersSortType
}) => {
  const acceptedMembers = base.members.filter((member) => member.accepted)
  const adminCount = acceptedMembers.filter((member) => member.isAdmin).length
  const contributorsCount = acceptedMembers.filter(
    (member) => !member.isAdmin,
  ).length
  const invitationsCount = base.members.filter(
    (member) => !member.accepted,
  ).length

  return (
    <div data-testid="base-members">
      <div className="fr-grid-row fr-justify-content-space-between fr-align-items-center fr-direction-sm-row fr-direction-column-md-reverse fr-mb-4w">
        <div className="fr-col-sm-auto fr-col-12">
          <div className="fr-flex fr-align-items-center fr-flex-gap-5v">
            <IconInSquare iconId="ri-team-line" />
            <h2 className="fr-mb-0 fr-h3 fr-text-label--blue-france">
              Membres&nbsp;·&nbsp;{acceptedMembers.length}
            </h2>
          </div>
        </div>
        {canAddMember && (
          <div className="fr-col-sm-auto fr-col-12 fr-mt-4w fr-mt-md-0">
            <InviteBaseMemberButton
              className="fr-width-full fr-justify-content-center"
              base={base}
              canAddAdmin={canAddAdmin}
              isBaseAdmin={isBaseAdmin}
            />
          </div>
        )}
        <BaseJoinRequest base={base} user={user} />
      </div>
      <BasePendingJoinRequest base={base} user={user} />
      {isBaseAdmin && <AdminBasePendingJoinRequests base={base} />}
      <div className="fr-mb-2w fr-flex fr-align-items-center fr-justify-content-space-between fr-flex-gap-3v">
        <div className="fr-hidden fr-unhidden-sm fr-flex fr-align-items-center fr-flex-gap-3v">
          <span className="fr-text--medium">
            {adminCount} administrateur{sPluriel(adminCount)}
            {contributorsCount > 0 &&
              ` · ${contributorsCount} contributeur${sPluriel(
                contributorsCount,
              )}`}
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
          base={base}
          canChangeMemberRole={canChangeMemberRole}
          member={member}
          key={member.member.id}
          user={user}
        />
      ))}
    </div>
  )
}

export default BaseMembers
