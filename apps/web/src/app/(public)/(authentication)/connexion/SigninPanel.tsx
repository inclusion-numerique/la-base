import { Route } from 'next'
import ButtonsGroup from '@codegouvfr/react-dsfr/ButtonsGroup'
import { AuthCard } from '@app/web/app/(public)/(authentication)/AuthCard'
import { signinErrorMessage } from '@app/web/app/(public)/(authentication)/authenticationErrorMessage'
import { EmailSigninForm } from '@app/web/app/(public)/(authentication)/connexion/EmailSigninForm'
import InclusionConnectSigninButton from '@app/web/app/(public)/(authentication)/connexion/InclusionConnectSigninButton'
import { getLoginTitle, LoginIntent } from '@app/web/security/login'

const SigninPanel = ({
  error,
  callbackUrl,
  intent,
}: {
  intent?: LoginIntent
  error?: string
  callbackUrl: Route
}) => (
  <AuthCard>
    <h1 className="fr-h4">{getLoginTitle(intent)}</h1>
    {error ? (
      <div className="fr-alert fr-alert--error fr-alert--sm fr-mb-6v">
        <p>{signinErrorMessage(error)}</p>
      </div>
    ) : null}
    <h2 className="fr-h5">Se connecter avec InclusionConnect</h2>
    <div className="fr-connect-group">
      <InclusionConnectSigninButton callbackUrl={callbackUrl} />
    </div>
    <p className="fr-hr-or fr-mt-6v">ou</p>
    <h2 className="fr-h5">Se connecter avec son email</h2>
    <EmailSigninForm callbackUrl={callbackUrl} />
    <hr className="fr-mt-6v" />
    <h2 className="fr-mt-4v fr-h5">Vous n’avez pas de compte ?</h2>
    <ButtonsGroup
      buttons={[
        {
          children: 'Créer un compte',
          linkProps: {
            href:
              callbackUrl === '/'
                ? '/creer-un-compte'
                : `/creer-un-compte?suivant=${callbackUrl}`,
          },
          priority: 'secondary',
        },
      ]}
    />
  </AuthCard>
)

export default SigninPanel
