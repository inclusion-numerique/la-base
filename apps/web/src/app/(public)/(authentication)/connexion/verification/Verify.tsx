import { AuthCard } from '@app/web/app/(public)/(authentication)/AuthCard'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import { cookies } from 'next/headers'

export const Verify = async () => {
  const cookieStore = await cookies()
  const email = cookieStore.get('email-signin')?.value
  return (
    <AuthCard>
      <div className="fr-grid-row fr-grid-row--center">
        <picture>
          <img
            src="/dsfr/artwork/pictograms/digital/mail-send.svg"
            alt="Boite email"
            style={{ textAlign: 'center', width: 96 }}
          />
        </picture>
      </div>
      <h1 style={{ textAlign: 'center' }} className="fr-mt-4v fr-h2">
        Rendez-vous dans votre boite email
      </h1>
      <p style={{ textAlign: 'center' }}>
        {email ? (
          <>
            Un lien de connexion sécurisé a été envoyé à l&apos;adresse {email}.
          </>
        ) : (
          <>Un lien de connexion sécurisé vous a été envoyé par&nbsp;email.</>
        )}
        <br />
        Veuillez l&apos;utiliser pour vous connecter.
      </p>
      <p className="fr-text--sm fr-mb-0" style={{ textAlign: 'center' }}>
        Vous pouvez fermer cet onglet de navigation.
        <br />
        En cas de problème ou de questions, merci de contacter{' '}
        <a
          href={
            PublicWebAppConfig.contactEmail &&
            `mailto:${PublicWebAppConfig.contactEmail}`
          }
        >
          {PublicWebAppConfig.contactEmail}
        </a>
        .
      </p>
    </AuthCard>
  )
}
