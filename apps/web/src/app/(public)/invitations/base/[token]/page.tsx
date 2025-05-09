import { getSessionUser } from '@app/web/auth/getSessionUser'
import { acceptInvitation } from '@app/web/server/baseMembers/acceptInvitation'
import { getBaseInvitation } from '@app/web/server/baseMembers/getBaseInvitation'
import { notFound, redirect } from 'next/navigation'

const AcceptBaseInvitation = async ({
  params,
}: { params: Promise<{ token: string }> }) => {
  const { token } = await params
  const user = await getSessionUser()
  if (!user) {
    redirect(`/connexion?suivant=/invitations/base/${token}`)
  }

  const invitation = await getBaseInvitation(decodeURI(token), user)

  if (!invitation) {
    notFound()
  }

  await acceptInvitation(invitation.id)
  redirect(`/bases/${invitation.base.slug}`)
}

export default AcceptBaseInvitation
