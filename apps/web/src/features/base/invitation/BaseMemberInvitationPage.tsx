import type { SessionUser } from '@app/web/auth/sessionUser'
import { InvitationAlreadyProcessed } from '@app/web/features/base/invitation/components/InvitationAlreadyProcessed'
import { BaseInvitation } from '@app/web/features/base/invitation/db/getBaseInvitation'
import { JoinBase } from '@app/web/features/base/invitation/JoinBase'

const BaseMemberInvitationPage = ({
  invitation,
  baseMembersCount,
  user,
}: {
  invitation: BaseInvitation
  baseMembersCount: number
  user: SessionUser | null
}) =>
  invitation == null ? (
    <InvitationAlreadyProcessed />
  ) : (
    <div className="fr-layout__main fr-container-fluid fr-height-full">
      <JoinBase
        invitation={invitation}
        baseMembersCount={baseMembersCount}
        baseTitle={invitation.base.title}
        user={user}
      />
    </div>
  )

export default BaseMemberInvitationPage
