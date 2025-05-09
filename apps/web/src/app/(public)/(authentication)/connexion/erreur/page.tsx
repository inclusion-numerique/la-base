import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import { AuthCard } from '@app/web/app/(public)/(authentication)/AuthCard'
import { metadataTitle } from '@app/web/app/metadataTitle'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import type { Metadata } from 'next'
import Link from 'next/link'

export const revalidate = 0

export const metadata: Metadata = {
  title: metadataTitle('Connexion'),
}

const errorMessage = (error?: string): string | undefined => {
  if (error === 'Verification') {
    return "Le lien de connexion n'est plus valide. Il a peut-être déjà été utilisé ou est expiré."
  }

  return 'Une erreur est survenue lors de la connexion. Veuillez réessayer.'
}

const ErrorPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) => {
  const { error } = await searchParams
  return (
    <>
      <SkipLinksPortal />
      <Breadcrumbs
        currentPage="Erreur"
        parents={[{ label: 'Connexion', linkProps: { href: '/connexion' } }]}
      />
      <AuthCard>
        <h1 style={{ textAlign: 'center' }} className="fr-mb-12v fr-h2">
          Connexion à {PublicWebAppConfig.projectTitle}
        </h1>
        <div className="fr-alert fr-alert--error fr-alert--sm fr-mb-6v">
          <h2 className="h6">Connexion impossible</h2>
          <p>{errorMessage(error)}</p>
        </div>

        <ul className="fr-btns-group fr-mt-12v">
          <li>
            <Link href="/connexion" target="_self" className="fr-btn">
              Retour à la page de connexion
            </Link>
          </li>
        </ul>
      </AuthCard>
    </>
  )
}

export default ErrorPage
