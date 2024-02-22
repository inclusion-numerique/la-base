import type { Metadata } from 'next'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import { metadataTitle } from '@app/web/app/metadataTitle'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'

export const metadata: Metadata = {
  title: metadataTitle('Déclaration d’accessibilité'),
}
export const revalidate = 0
const AccessibilityStatementPage = () => (
  <>
    <SkipLinksPortal links={defaultSkipLinks} />
    <main
      id={contentId}
      className="fr-container landing-main-container fr-my-8w"
    >
      <h1>Déclaration d’accessibilité</h1>
      <p>
        Établie le <span>07 novembre 2022</span>.
      </p>
      <p>
        <span>Agence National de la Cohésion des Territoires</span> s’engage à
        rendre son service accessible, conformément à l’article 47 de la loi n°
        2005-102 du 11 février 2005.
      </p>
      <p>
        Cette déclaration d’accessibilité s’applique à{' '}
        <strong>{process.env.NEXT_PUBLIC_APP_NAME}</strong>{' '}
        <span>
          (<span>https://{process.env.NEXT_PUBLIC_APP_SLUG}.anct.gouv.fr</span>)
        </span>
        .
      </p>
      <h2>État de conformité</h2>
      <p>
        <strong>{process.env.NEXT_PUBLIC_APP_NAME}</strong> est{' '}
        <strong>
          <span data-printfilter="lowercase">non conforme</span>{' '}
        </strong>
        avec le{' '}
        <abbr title="Référentiel général d’amélioration de l’accessibilité">
          RGAA
        </abbr>
        . <span>Le site n’a encore pas été audité.</span>
      </p>
      <h2>Amélioration et contact</h2>
      <p>
        Si vous n’arrivez pas à accéder à un contenu ou à un service, vous
        pouvez contacter le responsable de{' '}
        <span>{process.env.NEXT_PUBLIC_APP_NAME}</span> pour être orienté vers
        une alternative accessible ou obtenir le contenu sous une autre forme.
      </p>
      <ul className="basic-information feedback h-card">
        <li>
          E-mail&nbsp;:{' '}
          <a
            href={
              PublicWebAppConfig.contactEmail &&
              `mailto:${PublicWebAppConfig.contactEmail}`
            }
          >
            {PublicWebAppConfig.contactEmail}
          </a>
        </li>
      </ul>
      <h2>Voie de recours</h2>
      <p>
        Cette procédure est à utiliser dans le cas suivant&nbsp;: vous avez
        signalé au responsable du site internet un défaut d’accessibilité qui
        vous empêche d’accéder à un contenu ou à un des services du portail et
        vous n’avez pas obtenu de réponse satisfaisante.
      </p>
      <p>Vous pouvez&nbsp;:</p>
      <ul>
        <li>
          Écrire un message au{' '}
          <a href="https://formulaire.defenseurdesdroits.fr/">
            Défenseur des droits
          </a>
        </li>
        <li>
          Contacter{' '}
          <a href="https://www.defenseurdesdroits.fr/saisir/delegues">
            le délégué du Défenseur des droits dans votre région
          </a>
        </li>
        <li>
          Envoyer un courrier par la poste (gratuit, ne pas mettre de
          timbre)&nbsp;:
          <br />
          Défenseur des droits
          <br />
          Libre réponse 71120 75342 Paris CEDEX 07
        </li>
      </ul>
      <hr />
      <p>
        Cette déclaration d’accessibilité a été créée le{' '}
        <span>07 novembre 2022</span> grâce au{' '}
        <a href="https://betagouv.github.io/a11y-generateur-declaration/#create">
          Générateur de Déclaration d’Accessibilité de BetaGouv
        </a>
        .
      </p>
    </main>
  </>
)
export default AccessibilityStatementPage
