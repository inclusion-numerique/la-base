import { metadataTitle } from '@app/web/app/metadataTitle'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { getBaseMembersCount } from '@app/web/features/base/invitation/db/getBaseMembersCount'
import BaseJoinRequestPage from '@app/web/features/base/join-requests/BaseJoinRequestPage'
import { getBaseJoinRequestByToken } from '@app/web/features/base/join-requests/db/getBaseJoinRequestByToken'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: metadataTitle('Demande pour rejoindre une base'),
}

const AcceptBaseJoinRequest = async ({
  params,
}: {
  params: Promise<{ token: string }>
}) => {
  const { token } = await params
  const user = await getSessionUser()

  const joinRequest = await getBaseJoinRequestByToken(decodeURI(token), user)

  if (!joinRequest) {
    notFound()
  }

  const baseMembersCount = await getBaseMembersCount(joinRequest.base.id)

  return (
    <BaseJoinRequestPage
      joinRequest={joinRequest}
      baseMembersCount={baseMembersCount}
      user={user}
    />
  )
}

export default AcceptBaseJoinRequest
