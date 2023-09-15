import { notFound, redirect } from 'next/navigation'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { getInvitation } from '@app/web/server/baseMembers/getInvitation'
import { acceptInvitation } from '@app/web/server/baseMembers/acceptInvitation'

const AcceptBaseInvitation = async ({
  params,
}: {
  params: { slug: string; token: string }
}) => {
  const user = await getSessionUser()
  if (!user) {
    redirect(
      `/connexion?suivant=/bases/${params.slug}/invitations/accepter/${params.token}`,
    )
  }

  const invitation = await getInvitation(
    decodeURI(params.slug),
    decodeURI(params.token),
    user,
  )

  if (!invitation) {
    notFound()
  }

  await acceptInvitation(invitation.id)
  redirect(`/bases/${params.slug}`)
}

export default AcceptBaseInvitation
