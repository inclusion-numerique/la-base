import { getSessionUser } from '@app/web/auth/getSessionUser'
import { redirect } from 'next/navigation'

const ProfilNotificationsPage = async () => {
  const user = await getSessionUser()
  if (!user) {
    redirect('/connexion?suivant=/profil/notifications')
  }

  redirect(`/profils/${user.slug}/modifier#notifications`)
}

export default ProfilNotificationsPage
