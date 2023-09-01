import { Route } from 'next'
import ButtonsGroup from '@codegouvfr/react-dsfr/ButtonsGroup'
import { AuthCard } from '@app/web/app/(public)/(withContainer)/(authentication)/AuthCard'
import { signinErrorMessage } from '@app/web/app/(public)/(withContainer)/(authentication)/authenticationErrorMessage'
import InclusionConnectSigninButton from '@app/web/app/(public)/(withContainer)/(authentication)/connexion/InclusionConnectSigninButton'
import EmailSignupForm from '@app/web/app/(public)/(withContainer)/(authentication)/creer-un-compte/EmailSignupForm'

const SignupPanel = ({
  error,
  email,
  callbackUrl,
}: {
  error?: string
  email?: string
  callbackUrl: Route
}) => (
  <AuthCard>
    {error ? (
      <div className="fr-alert fr-alert--error fr-alert--sm fr-mb-6v">
        <p>{signinErrorMessage(error)}</p>
      </div>
    ) : null}
    <p className="fr-hr-or fr-mt-6v">ou</p>
    <h5>Se créer un compte avec InclusionConnect</h5>
    <div className="fr-connect-group">
      <InclusionConnectSigninButton callbackUrl={callbackUrl} />
    </div>
    <p className="fr-hr-or fr-mt-6v">ou</p>
    <h5>Se créer un compte avec son email</h5>
    <EmailSignupForm callbackUrl={callbackUrl} email={email} />
    <hr className="fr-mt-6v" />
    <h5 className="fr-mt-4v">Vous avez déjà un compte ?</h5>
    <ButtonsGroup
      buttons={[
        {
          children: 'Se connecter',
          linkProps: { href: '/connexion' },
          priority: 'secondary',
        },
      ]}
    />
  </AuthCard>
)

export default SignupPanel
