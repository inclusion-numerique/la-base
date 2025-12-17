import { SessionUser } from '@app/web/auth/sessionUser'
import { JoinRequestAlreadyProcessed } from '@app/web/features/base/join-requests/components/JoinRequestAlreadyProcessed'
import { BaseJoinRequestByToken } from '@app/web/features/base/join-requests/db/getBaseJoinRequestByToken'
import { JoinRequestAdmin } from '@app/web/features/base/join-requests/JoinRequestAdmin'

const BaseJoinRequestPage = ({
  joinRequest,
  baseMembersCount,
  user,
}: {
  joinRequest: BaseJoinRequestByToken | null
  baseMembersCount: number
  user: SessionUser | null
}) =>
  !joinRequest || joinRequest.accepted || joinRequest.declined ? (
    <JoinRequestAlreadyProcessed />
  ) : (
    <div className="fr-layout__main fr-container-fluid fr-height-full">
      <JoinRequestAdmin
        joinRequest={joinRequest}
        baseMembersCount={baseMembersCount}
        baseTitle={joinRequest.base.title}
        user={user}
      />
    </div>
  )

export default BaseJoinRequestPage
