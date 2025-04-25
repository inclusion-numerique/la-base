import { notFound, redirect } from 'next/navigation'
import { Metadata } from 'next'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import BaseMemberInvitationPage from '@app/web/features/base/invitation/BaseMemberInvitationPage'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { getBaseInvitation } from '@app/web/features/base/invitation/db/getBaseInvitation'
import { getBaseMembersCount } from '@app/web/features/base/invitation/db/getBaseMembersCount'

export const metadata: Metadata = {
  title: metadataTitle('Invitation à rejoindre une base'),
}

const AcceptBaseInvitation = async ({
  params,
}: {
  params: { token: string }
}) => {
  const user = await getSessionUser()
  if (!user) {
    redirect(`/connexion?suivant=/invitations/base/${params.token}`)
  }

  const invitation = await getBaseInvitation(decodeURI(params.token), user)

  if (!invitation) {
    notFound()
  }
  const baseMembersCount = await getBaseMembersCount(invitation.base.id)

  return (
    <BaseMemberInvitationPage
      invitation={invitation}
      baseMembersCount={baseMembersCount}
    />
  )
}

export default AcceptBaseInvitation
