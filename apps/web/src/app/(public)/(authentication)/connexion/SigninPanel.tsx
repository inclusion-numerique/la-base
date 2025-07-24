import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import { AuthCard } from '@app/web/app/(public)/(authentication)/AuthCard'
import { signinErrorMessage } from '@app/web/app/(public)/(authentication)/authenticationErrorMessage'
import { EmailSigninForm } from '@app/web/app/(public)/(authentication)/connexion/EmailSigninForm'
import ProConnectSigninButton from '@app/web/app/(public)/(authentication)/connexion/ProConnectSigninButton'
import LesBasesSvgLogo from '@app/web/components/LesBasesSvgLogo'
import { type LoginIntent, getLoginTitle } from '@app/web/security/login'
import Button from '@codegouvfr/react-dsfr/Button'
import type { Route } from 'next'

const SigninPanel = ({
  error,
  callbackUrl,
  intent,
}: {
  intent?: LoginIntent
  error?: string
  callbackUrl: Route
}) => (
  <>
    {' '}
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
        {getLoginTitle(intent)}
      </h1>
      <span className="fr-text--xl fr-text--normal fr-flex fr-justify-content-center fr-text--center">
        Connectez-vous avec ProConnect ou avec votre adresse email
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
            className="fr-mt-10v"
            callbackUrl={callbackUrl}
          />
        </div>
      )}
      <p className="fr-hr-or fr-my-10v">ou</p>
      <h2 className="fr-h5">Se connecter avec son email</h2>
      <EmailSigninForm callbackUrl={callbackUrl} />
      <hr style={{ height: '1px' }} className="fr-my-10v fr-py-0" />{' '}
      <h2 className="fr-h5">Vous n’avez pas de compte ?</h2>
      <div className="fr-width-full">
        <Button
          size="large"
          className="fr-width-full fr-flex fr-justify-content-center fr-mt-6v"
          linkProps={{
            href:
              callbackUrl === '/'
                ? '/creer-un-compte'
                : `/creer-un-compte?suivant=${callbackUrl}`,
          }}
          priority="secondary"
        >
          Créer un compte
        </Button>
      </div>
    </AuthCard>
  </>
)

export default SigninPanel
