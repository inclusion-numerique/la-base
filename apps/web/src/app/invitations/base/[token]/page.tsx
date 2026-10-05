import { metadataTitle } from '@app/web/app/metadataTitle'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import BaseMemberInvitationPage from '@app/web/features/base/invitation/BaseMemberInvitationPage'
import { getBaseInvitation } from '@app/web/features/base/invitation/db/getBaseInvitation'
import { getBaseMembersCount } from '@app/web/features/base/invitation/db/getBaseMembersCount'
import { Metadata } from 'next'
import { notFound } from 'next/navigation'

export const metadata: Metadata = {
  title: metadataTitle('Invitation à rejoindre une base'),
  // Page à jeton : ni indexée, ni liens suivis (description de base libre)
  robots: 'noindex, nofollow',
}

const AcceptBaseInvitation = async ({
  params,
}: {
  params: Promise<{ token: string }>
}) => {
  const { token } = await params
  const user = await getSessionUser()

  const invitation = await getBaseInvitation(decodeURI(token), user)

  if (!invitation) {
    notFound()
  }
  const baseMembersCount = await getBaseMembersCount(invitation.base.id)

  return (
    <BaseMemberInvitationPage
      invitation={invitation}
      baseMembersCount={baseMembersCount}
      user={user}
    />
  )
}

export default AcceptBaseInvitation
