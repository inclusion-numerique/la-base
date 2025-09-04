import SignupPanel from '@app/web/app/(public)/(authentication)/creer-un-compte/SignupPanel'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { getServerUrl } from '@app/web/utils/baseUrl'
import Notice from '@codegouvfr/react-dsfr/Notice'
import type { Metadata, Route } from 'next'
import { redirect } from 'next/navigation'

export const metadata: Metadata = {
  title: metadataTitle('Créer un compte'),
}

export const revalidate = 0
const SigninPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    error?: string
    raison?: 'connexion-sans-compte'
    email?: string
    suivant?: Route
  }>
}) => {
  const { error, raison, email, suivant } = await searchParams
  const user = await getSessionUser()
  if (user) {
    redirect(getServerUrl('/'))
  }

  const callbackUrl: Route = suivant ?? '/'

  return (
    <>
      <SkipLinksPortal />
      <Breadcrumbs className="fr-mb-0" currentPage="Créer un compte" />
      <div className="fr-container fr-container--narrow">
        {raison === 'connexion-sans-compte' ? (
          <Notice
            className="fr-mt-6v fr-notice--warning"
            title={
              <span className="fr-text--regular fr-text-label--grey">
                Nous n’avons pas de compte associé à cette adresse email.
                Veuillez créer un compte pour vous connecter.
              </span>
            }
          />
        ) : null}
        <SignupPanel error={error} email={email} callbackUrl={callbackUrl} />
      </div>
    </>
  )
}

export default SigninPage
