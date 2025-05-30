import { SessionUser } from '@app/web/auth/sessionUser'
import { JoinBase } from '@app/web/features/base/invitation/JoinBase'
import { InvitationAlreadyProcessed } from '@app/web/features/base/invitation/components/InvitationAlreadyProcessed'
import { BaseInvitation } from '@app/web/features/base/invitation/db/getBaseInvitation'
import React from 'react'

const BaseMemberInvitationPage = ({
  invitation,
  baseMembersCount,
}: {
  invitation: BaseInvitation
  baseMembersCount: number
}) =>
  invitation == null ? (
    <InvitationAlreadyProcessed />
  ) : (
    <div className="fr-layout__main fr-container-fluid fr-height-full">
      <JoinBase
        invitation={invitation}
        baseMembersCount={baseMembersCount}
        baseTitle={invitation.base.title}
      />
    </div>
  )

export default BaseMemberInvitationPage
