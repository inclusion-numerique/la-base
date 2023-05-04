import { getServerUrl } from '@app/web/utils/baseUrl'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { redirect } from 'next/navigation'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import { PublicWebAppConfig } from '@app/web/webAppConfig'
import Alert from '@codegouvfr/react-dsfr/Alert'
import { Route } from 'next'
import SignupPanel from '@app/web/app/(public)/(authentication)/creer-un-compte/SignupPanel'

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
      <h2>Création de compte sur {PublicWebAppConfig.projectTitle}</h2>
      {raison === 'connexion-sans-compte' ? (
        <Alert
          closable
          title="Désolé, nous n’avons pas de compte associé à cette adresse email"
          description={`Veuillez créer un compte pour vous connecter à ${PublicWebAppConfig.projectTitle}`}
          severity="info"
        />
      ) : null}
      <SignupPanel error={error} email={email} callbackUrl={callbackUrl} />
    </>
  )
}

export default SigninPage
