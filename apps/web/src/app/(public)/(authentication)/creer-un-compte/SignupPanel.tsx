import { AuthCard } from '@app/web/app/(public)/(authentication)/AuthCard'
import { signinErrorMessage } from '@app/web/app/(public)/(authentication)/authenticationErrorMessage'
import ProConnectSigninButton from '@app/web/app/(public)/(authentication)/connexion/ProConnectSigninButton'
import EmailSignupForm from '@app/web/app/(public)/(authentication)/creer-un-compte/EmailSignupForm'
import LesBasesSvgLogo from '@app/web/components/LesBasesSvgLogo'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import Button from '@codegouvfr/react-dsfr/Button'
import type { Route } from 'next'

const SignupPanel = ({
  error,
  email,
  callbackUrl,
}: {
  error?: string
  email?: string
  callbackUrl: Route
}) => (
  <>
    <Button
      className="fr-my-4v"
      linkProps={{ href: '/' }}
      priority="tertiary no outline"
      iconId="fr-icon-arrow-left-line"
      iconPosition="left"
    >
      Retour à l'accueil
    </Button>
    <AuthCard>
      <div className="fr-flex fr-justify-content-center fr-align-items-center fr-mb-10v">
        <LesBasesSvgLogo width={88} height={88} />
      </div>

      <h1 className="fr-h4 fr-text-label--blue-france fr-text--center fr-mb-1v">
        Se créer un compte
      </h1>
      <span className="fr-text--xl fr-text--normal fr-flex fr-justify-content-center fr-text--center">
        Créez votre compte avec ProConnect ou avec votre adresse email
      </span>
      {error ? (
        <div className="fr-alert fr-alert--error fr-alert--sm fr-mb-6v">
          <p>{signinErrorMessage(error)}</p>
        </div>
      ) : null}
      {PublicWebAppConfig.isPreview ? (
        <p>
          La connexion avec ProConnect est uniquement disponible sur les
          environnement de production <i>main</i> et de recette <i>dev</i>.
          <br />
          <br />
          Sur cette environnement de preview <i>{PublicWebAppConfig.Branch}</i>,
          vous pouvez vous connecter avec votre email.
        </p>
      ) : (
        <div className="fr-connect-group">
          <ProConnectSigninButton
            className="fr-mt-8v"
            callbackUrl={callbackUrl}
          />
        </div>
      )}
      <p className="fr-hr-or fr-my-10v">ou</p>
      <h2 className="fr-h5">Se créer un compte avec son email</h2>
      <EmailSignupForm callbackUrl={callbackUrl} email={email} />
      <hr style={{ height: '1px' }} className="fr-my-10v fr-py-0" />
      <h2 className="fr-h5">Vous avez déjà un compte&nbsp;?</h2>
      <Button
        size="large"
        className="fr-width-full fr-flex fr-justify-content-center"
        linkProps={{ href: '/connexion' }}
        priority="secondary"
      >
        Se connecter
      </Button>
    </AuthCard>
  </>
)

export default SignupPanel
