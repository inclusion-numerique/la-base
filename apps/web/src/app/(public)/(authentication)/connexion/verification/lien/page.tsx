import { metadataTitle } from '@app/web/app/metadataTitle'
import { getSessionUser } from '@app/web/auth/getSessionUser'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { getServerUrl } from '@app/web/utils/baseUrl'
import type { Metadata } from 'next'
import { notFound, redirect } from 'next/navigation'
import { AuthCard } from '../../../AuthCard'
import MagicLinkBufferRedirection from './MagicLinkBufferRedirection'

export const revalidate = 0

export const metadata: Metadata = {
  title: metadataTitle('Connexion'),
}

const MagicLinkBufferPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ url: string }>
}) => {
  const user = await getSessionUser()
  if (user) {
    redirect(getServerUrl('/'))
  }

  const { url } = await searchParams

  if (!url) {
    notFound()
  }

  return (
    <>
      <SkipLinksPortal />
      <Breadcrumbs
        currentPage="Vérification"
        parents={[{ label: 'Connexion', linkProps: { href: '/connexion' } }]}
      />
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
          Vérification du lien de connexion
        </h1>
        <p style={{ textAlign: 'center' }}>
          Vous allez être redirigé dans quelques instants.
        </p>
        <p className="fr-text--sm fr-mb-0" style={{ textAlign: 'center' }}>
          Si ce n’est pas le cas, veuillez cliquer sur le lien suivant&nbsp;:
          <br />
          <a href={url}>Connexion</a>.
        </p>
      </AuthCard>
      <MagicLinkBufferRedirection url={url} />
    </>
  )
}

export default MagicLinkBufferPage
