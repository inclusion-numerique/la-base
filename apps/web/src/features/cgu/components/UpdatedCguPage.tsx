import ExternalLink from '@app/ui/components/ExternalLink'
import { AuthCard } from '@app/web/app/(public)/(authentication)/AuthCard'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import { getProconnectIdToken } from '@app/web/security/getProconnectIdToken'
import { redirect } from 'next/navigation'
import UpdateCguButtons from './UpdateCguButtons'

const UpdatedCguPage = async ({ suivant = '/' }: { suivant?: string }) => {
  const user = await getSessionUser()
  if (!user) {
    return redirect(suivant)
  }

  const proConnectIdTokenHint = await getProconnectIdToken(user)
  return (
    <div className="fr-container fr-container--narrow fr-mt-6v fr-mt-md-20v">
      <AuthCard>
        <h1 className="fr-h4">
          Mise à jour de nos Conditions Générales d'Utilisation
        </h1>
        <p className="fr-mb-12v">
          Nous avons récemment mis à jour nos Conditions Générales
          d'Utilisation. Cette nouvelle version prend notamment en compte la{' '}
          <ExternalLink href="/charte" className="fr-link">
            Charte des Bases du numérique d'intérêt général
          </ExternalLink>{' '}
          qui présente les conditions à respecter pour publier une ressource
          afin d'apporter plus de transparence et de clarté sur la modération de
          la plateforme.
          <br />
          <br />
          Pour continuer à utiliser notre plateforme, nous vous invitons à lire
          et accepter les nouvelles CGU.
          <br />
          <br />
          En cliquant sur «&nbsp;J'accepte&nbsp;», vous confirmez avoir lu et
          accepté les nouvelles{' '}
          <ExternalLink href="/cgu" className="fr-link">
            Conditions Générales d'Utilisation
          </ExternalLink>
          .
        </p>

        <UpdateCguButtons
          suivant={suivant}
          proConnectIdTokenHint={proConnectIdTokenHint}
        />
      </AuthCard>
    </div>
  )
}

export default UpdatedCguPage
