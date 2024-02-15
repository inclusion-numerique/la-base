import { notFound, redirect } from 'next/navigation'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { getBaseInvitation } from '@app/web/server/baseMembers/getBaseInvitation'
import { acceptInvitation } from '@app/web/server/baseMembers/acceptInvitation'

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

  await acceptInvitation(invitation.id)
  redirect(`/bases/${invitation.base.slug}`)
}

export default AcceptBaseInvitation
