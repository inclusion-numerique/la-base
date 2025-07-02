import { AuthCard } from '@app/web/app/(public)/(authentication)/AuthCard'
import SignoutButton from '@app/web/app/(public)/(authentication)/deconnexion/SignoutButton'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import IconInSquare from '@app/web/components/IconInSquare'
import LesBasesSvgLogo from '@app/web/components/LesBasesSvgLogo'
import RoundImage from '@app/web/components/RoundImage'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { getProconnectIdToken } from '@app/web/security/getProconnectIdToken'
import { contentId } from '@app/web/utils/skipLinks'
import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

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
        <div className="fr-flex fr-justify-content-center fr-align-items-center fr-mb-10v">
          <IconInSquare size="large" iconId="ri-logout-box-line" />
        </div>
        <h1 className="fr-h2 fr-text-label--blue-france fr-text--center fr-mb-1v">
          Déconnexion
        </h1>
        <p className="fr-text--lg fr-text--center fr-mb-10v">
          Êtes-vous sûr·e de vouloir vous déconnecter&nbsp;?
        </p>
        <SignoutButton
          proConnectIdTokenHint={proConnectIdTokenHint}
          className="fr-mb-6v"
        />
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
