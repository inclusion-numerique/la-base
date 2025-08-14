import { AuthCard } from '@app/web/app/(public)/(authentication)/AuthCard'
import SignoutButton from '@app/web/app/(public)/(authentication)/deconnexion/SignoutButton'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import IconInSquare from '@app/web/components/IconInSquare'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
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

  return (
    <>
      <SkipLinksPortal />
      <Breadcrumbs currentPage="Déconnexion" />
      <div className="fr-container fr-container--narrow">
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
          <div className="fr-width-full">
            <SignoutButton
              className="fr-width-full fr-flex fr-justify-content-center fr-mb-6v"
              size="large"
            />
          </div>
          <div className="fr-grid-row fr-grid-row--center">
            <Link className="fr-link" href="/">
              Retour
            </Link>
          </div>
        </AuthCard>
      </div>
    </>
  )
}

export default SignoutPage
