import { Route } from 'next'
import { redirect } from 'next/navigation'
import Alert from '@codegouvfr/react-dsfr/Alert'
import type { Metadata } from 'next'
import SignupPanel from '@app/web/app/(public)/(authentication)/creer-un-compte/SignupPanel'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import { getServerUrl } from '@app/web/utils/baseUrl'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import { metadataTitle } from '@app/web/app/metadataTitle'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'

export const metadata: Metadata = {
  title: metadataTitle('Créer un compte'),
}

export const revalidate = 0
const SigninPage = async ({
  searchParams: { error, email, raison, suivant } = {},
}: {
  searchParams?: {
    error?: string
    raison?: 'connexion-sans-compte'
    email?: string
    suivant?: Route
  }
}) => {
  const user = await getSessionUser()
  if (user) {
    redirect(getServerUrl('/'))
  }

  const callbackUrl: Route = suivant ?? '/'

  return (
    <>
      <SkipLinksPortal links={defaultSkipLinks} />
      <Breadcrumbs currentPage="Créer un compte" />
      <main id={contentId}>
        <div className="fr-container fr-container--narrow">
          <h1 className="fr-h2">
            Création de compte sur {PublicWebAppConfig.projectTitle}
          </h1>
          {raison === 'connexion-sans-compte' ? (
            <Alert
              className="fr-mt-6v"
              closable
              title="Désolé, nous n’avons pas de compte associé à cette adresse email"
              description={`Veuillez créer un compte pour vous connecter à ${PublicWebAppConfig.projectTitle}`}
              severity="info"
            />
          ) : null}
        </div>
        <SignupPanel error={error} email={email} callbackUrl={callbackUrl} />
      </main>
    </>
  )
}

export default SigninPage
