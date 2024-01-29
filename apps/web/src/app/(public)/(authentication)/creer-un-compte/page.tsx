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
      <Breadcrumbs currentPage="Créer un compte" />
      <div className="fr-container fr-container--narrow">
        <h2>Création de compte sur {PublicWebAppConfig.projectTitle}</h2>
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
    </>
  )
}

export default SigninPage
