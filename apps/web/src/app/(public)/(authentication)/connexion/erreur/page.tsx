import Link from 'next/link'
import { AuthCard } from '@app/web/app/(public)/(authentication)/AuthCard'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import { PublicWebAppConfig } from '@app/web/webAppConfig'

export const revalidate = 0

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
    <Breadcrumbs
      currentPage="Erreur"
      parents={[{ label: 'Connexion', linkProps: { href: '/connexion' } }]}
    />
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
            Retour
          </Link>
        </li>
      </ul>
    </AuthCard>
  </>
)

export default ErrorPage
