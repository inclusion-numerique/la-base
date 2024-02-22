import Link from 'next/link'
import type { Metadata } from 'next'
import { AuthCard } from '@app/web/app/(public)/(authentication)/AuthCard'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import { metadataTitle } from '@app/web/app/metadataTitle'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'

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

const ErrorPage = ({
  searchParams: { error } = {},
}: {
  searchParams?: { error?: string }
}) => (
  <>
    <SkipLinksPortal links={defaultSkipLinks} />
    <Breadcrumbs
      currentPage="Erreur"
      parents={[{ label: 'Connexion', linkProps: { href: '/connexion' } }]}
    />
    <main id={contentId}>
      <AuthCard>
        <h2 style={{ textAlign: 'center' }} className="fr-mb-12v">
          Connexion à {PublicWebAppConfig.projectTitle}
        </h2>
        <div className="fr-alert fr-alert--error fr-alert--sm fr-mb-6v">
          <h6>Connexion impossible</h6>
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
    </main>
  </>
)

export default ErrorPage
