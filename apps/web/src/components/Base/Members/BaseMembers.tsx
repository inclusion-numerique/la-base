import ProfileCard from '@app/web/components/Profile/Card/ProfileCard'
import InviteBaseMemberButton from '@app/web/features/base/invitation/components/InviteBaseMemberButton'
import type { BasePageData } from '@app/web/server/bases/getBase'
import React from 'react'

const BaseMembers = ({
  base,
  canAddAdmin,
  canAddMember,
  canChangeMemberRole,
}: {
  base: BasePageData
  canAddMember: boolean
  canChangeMemberRole: boolean
  canAddAdmin: boolean
}) => {
  // Cannot change access level of admins if there is only one admin
  const canChangeAccessLevelOfAdmins =
    base.members.filter((member) => member.isAdmin).length > 1

  return (
    <div data-testid="base-members">
      <div className="fr-grid-row fr-justify-content-space-between fr-direction-sm-row fr-direction-column-reverse fr-mb-4w">
        <div className="fr-col-sm-auto fr-col-12">
          <h2 className="fr-mb-0 fr-h3">Membres · {base.members.length}</h2>
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
      {canChangeMemberRole
        ? base.members.map((member) => (
            <BaseAdminMemberCard
              member={member}
              key={member.member.id}
              canChangeAccessLevel={canChangeAccessLevelOfAdmins}
            />
          ))
        : base.members.map((member) => (
            <ProfileCard
              titleAs="h3"
              profile={member.member}
              key={member.member.id}
              user={null}
              canFollow={false}
              isAdmin={member.isAdmin}
              displayProfileMetadata={false}
            />
          ))}
    </div>
  )
}

export default BaseMembers
