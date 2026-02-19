import { metadataTitle } from '@app/web/app/metadataTitle'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { contentId } from '@app/web/utils/skipLinks'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: metadataTitle('Plan du site'),
}

const PlanDuSitePage = () => (
  <div className="fr-container">
    <SkipLinksPortal />
    <Breadcrumbs currentPage="Plan du site" />
    <main
      role="main"
      id={contentId}
      className="fr-container landing-main-container fr-mb-8w"
    >
      <div className="fr-grid-row fr-grid-row--center">
        <div className="fr-col-md-8">
          <h1 className="fr-h2">Plan du site</h1>

          <h2 className="fr-h3">Accueil</h2>
          <ul>
            <li>
              <Link href="/">Accueil</Link>
            </li>
            <li>
              <Link href="/rechercher/tout/ressources">
                Rechercher des ressources
              </Link>
            </li>
          </ul>

          <h2 className="fr-h3">Thématiques</h2>
          <ul>
            <li>
              <Link href="/inclusion-numerique">Inclusion numérique</Link>
            </li>
            <li>
              <Link href="/culture-numerique">Culture numérique</Link>
            </li>
            <li>
              <Link href="/communs-et-souverainete">
                Communs et souveraineté
              </Link>
            </li>
            <li>
              <Link href="/numerique-et-environnement">
                Numérique et environnement
              </Link>
            </li>
          </ul>

          <h2 className="fr-h3">Compte utilisateur</h2>
          <ul>
            <li>
              <Link href="/connexion">Connexion</Link>
            </li>
            <li>
              <Link href="/creer-un-compte">Créer un compte</Link>
            </li>
          </ul>

          <h2 className="fr-h3">Ressources</h2>
          <ul>
            <li>
              <Link href="/rechercher/tout/ressources">Ressources</Link>
            </li>
          </ul>

          <h2 className="fr-h3">Bases</h2>
          <ul>
            <li>
              <Link href="/rechercher/tout/bases">Bases</Link>
            </li>
          </ul>

          <h2 className="fr-h3">Profils</h2>
          <ul>
            <li>
              <Link href="/rechercher/tout/profils">Profils</Link>
            </li>
          </ul>

          <h2 className="fr-h3">Informations légales</h2>
          <ul>
            <li>
              <Link href="/mentions-legales">Mentions légales</Link>
            </li>
            <li>
              <Link href="/confidentialite">Politique de confidentialité</Link>
            </li>
            <li>
              <Link href="/cgu">Conditions générales d'utilisation</Link>
            </li>
            <li>
              <Link href="/charte">Charte</Link>
            </li>
            <li>
              <Link href="/accessibilite">Accessibilité</Link>
            </li>
            <li>
              <Link href="/statistiques">Statistiques</Link>
            </li>
          </ul>
        </div>
      </div>
    </main>
  </div>
)

export default PlanDuSitePage
