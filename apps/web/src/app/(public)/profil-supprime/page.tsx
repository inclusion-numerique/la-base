import type { Metadata } from 'next'
import Button from '@codegouvfr/react-dsfr/Button'
import { metadataTitle } from '@app/web/app/metadataTitle'

export const revalidate = 0
export const metadata: Metadata = {
  title: metadataTitle('Profil supprimé'),
}

const ProfilSupprimePage = () => (
  <div className="fr-container landing-main-container fr-my-8w">
    <h1>Profil supprimé</h1>
    <p>Votre profil a bien été supprimé.</p>
    <Button linkProps={{ href: '/' }}>Retour à la page d&apos;accueil</Button>
  </div>
)
export default ProfilSupprimePage
