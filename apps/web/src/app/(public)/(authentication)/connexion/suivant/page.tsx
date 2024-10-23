import { redirect } from 'next/navigation'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { getLoginRedirectUrl } from '@app/web/security/getHomepage'

/**
 * Cette page permet de rediriger l'utilisateur après une connexion réussie
 * si aucune redirection n'est spécifiée lors du signin.
 */
const Page = async () => {
  const user = await getSessionUser()
  redirect(getLoginRedirectUrl(user))

  return null
}

export default Page
