import type { Metadata } from 'next'
import Button from '@codegouvfr/react-dsfr/Button'
import { metadataTitle } from '@app/web/app/metadataTitle'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { contentId } from '@app/web/utils/skipLinks'

export const revalidate = 0
export const metadata: Metadata = {
  title: metadataTitle('Profil supprimé'),
}

const ProfilSupprimePage = () => (
  <>
    <SkipLinksPortal />
    <main
      id={contentId}
      className="fr-container landing-main-container fr-my-8w"
    >
      <h1>Profil supprimé</h1>
      <p>Votre profil a bien été supprimé.</p>
      <Button linkProps={{ href: '/' }}>Retour à la page d&apos;accueil</Button>
    </main>
  </>
)
export default ProfilSupprimePage
