import Link from 'next/link'
import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { AuthCard } from '@app/web/app/(public)/(authentication)/AuthCard'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import SignoutButton from '@app/web/app/(public)/(authentication)/deconnexion/SignoutButton'
import { metadataTitle } from '@app/web/app/metadataTitle'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { contentId } from '@app/web/utils/skipLinks'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { getProconnectIdToken } from '@app/web/security/getProconnectIdToken'

export const revalidate = 0

export const metadata: Metadata = {
  title: metadataTitle('Déconnexion'),
}

const SignoutPage = async () => {
  const user = await getSessionUser()
  if (!user) {
    redirect('/')
  }

  const proConnectIdTokenHint = await getProconnectIdToken(user)

  return (
    <>
      <SkipLinksPortal />
      <Breadcrumbs currentPage="Déconnexion" />
      <AuthCard id={contentId}>
        <h1 className="fr-h2">Déconnexion</h1>
        <p>Êtes-vous sûr·e de vouloir vous déconnecter&nbsp;?</p>
        <ul className="fr-btns-group">
          <li>
            <SignoutButton proConnectIdTokenHint={proConnectIdTokenHint} />
          </li>
        </ul>
        <div className="fr-grid-row fr-grid-row--center">
          <Link className="fr-link" href="/">
            Retour à la page d’accueil
          </Link>
        </div>
      </AuthCard>
    </>
  )
}

export default SignoutPage
