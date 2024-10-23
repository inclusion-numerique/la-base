import type { Metadata } from 'next'
import Link from 'next/link'
import { metadataTitle } from '@app/web/app/metadataTitle'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { contentId } from '@app/web/utils/skipLinks'

export const metadata: Metadata = {
  title: metadataTitle('Mentions légales'),
}

const LegalPage = () => (
  <div className="fr-container">
    <SkipLinksPortal />
    <Breadcrumbs currentPage="Mentions légales" />
    <main
      id={contentId}
      className="fr-container landing-main-container fr-my-8w"
    >
      <div className="fr-grid-row fr-grid-row--center">
        <div className="fr-col-md-8">
          <h1>Mentions légales</h1>
          <h2>Éditeur</h2>
          <p>
            <strong>{process.env.NEXT_PUBLIC_APP_NAME}</strong> est édité au
            sein de l’incubateur de l’Agence Nationale de la Cohésion des
            Territoires :
          </p>
          <p>
            Agence Nationale de la Cohésion des Territoires <br />
            20, avenue de Ségur <br />
            TSA 10717 <br />
            75 334 Paris Cedex 07 <br />
            Téléphone : 01 85 58 60 00
          </p>
          <h2>Directeur de la publication</h2>
          <p>Monsieur Stanislas Bourron, Directeur général.</p>

          <h2>Hébergement du site</h2>
          <p>Ce site est hébergé par :</p>
          <p>
            Scaleway SAS <br />
            8 rue de la ville l’évêque <br />
            75008 Paris
          </p>
          <h2>Accessibilité</h2>
          <p>
            La conformité aux normes d’accessibilité numérique est un objectif
            ultérieur mais nous tâchons de rendre ce site accessible à toutes et
            à tous.
          </p>
          <h2>Signaler un dysfonctionnement</h2>
          <p>
            Si vous rencontrez un défaut d’accessibilité vous empêchant
            d’accéder à un contenu ou une fonctionnalité du site, merci de nous
            en faire part.
          </p>
          <p>
            Si vous n’obtenez pas de réponse rapide de notre part, vous êtes en
            droit de faire parvenir vos doléances ou une demande de saisine au
            Défenseur des droits.
          </p>
          <h2>En savoir plus</h2>
          <p>
            Pour en savoir plus sur la politique d’accessibilité numérique de
            l’État : <br />
            <Link
              href="http://references.modernisation.gouv.fr/accessibilite-numerique"
              target="_blank"
            >
              Cliquez ici
            </Link>
          </p>
          <h2>Sécurité</h2>
          <p>
            Le site est protégé par un certificat électronique, matérialisé pour
            la grande majorité des navigateurs par un cadenas. Cette protection
            participe à la confidentialité des échanges.
          </p>
          <p>
            En aucun cas les services associés à la plateforme ne seront à
            l’origine d’envoi d&lsquo;email pour demander la saisie
            d’informations personnelles.
          </p>
        </div>
      </div>
    </main>
  </div>
)
export default LegalPage
