import type { Metadata } from 'next'
import Link from 'next/link'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import { metadataTitle } from '@app/web/app/metadataTitle'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'
import Breadcrumbs from '@app/web/components/Breadcrumbs'

export const metadata: Metadata = {
  title: metadataTitle('Déclaration d’accessibilité'),
}
export const revalidate = 0
const AccessibilityStatementPage = () => (
  <div className="fr-container">
    <SkipLinksPortal links={defaultSkipLinks} />
    <Breadcrumbs currentPage="Accessibilité" />

    <main
      id={contentId}
      className="fr-container landing-main-container fr-my-8w"
    >
      <h1>Déclaration d’accessibilité</h1>
      <p>
        Établie le <span>04 mars 2024</span>.
      </p>
      <p>
        <span>Agence National de la Cohésion des Territoires</span> s’engage à
        rendre son service accessible, conformément à l’article 47 de la loi n°
        2005-102 du 11 février 2005.
      </p>
      <p>
        Cette déclaration d’accessibilité s’applique à{' '}
        <strong>{PublicWebAppConfig.projectTitle}</strong>.
      </p>

      <h2>Stratégie et plan d&apos;action</h2>
      <p>
        La stratégie d&apos;accessibilité suit{' '}
        <Link
          href="https://beta.gouv.fr/accessibilite/schema-pluriannuel"
          target="_blank"
        >
          le schéma pluriannuel 2024-2027 publié par Beta gouv.
        </Link>
      </p>

      <p>
        La plateforme ayant été mise en ligne en 2024, il n&apos;y a pas de
        bilan 2023 des actions menées.
      </p>
      <p>Le plan d&apos;action 2024 :</p>
      <ul>
        <li>Plateforme intégralement navigable au clavier</li>
        <li>Hierarchie des titres</li>
        <li>Plateforme navigable en zoom 200%</li>
        <li>Lien d&apos;évitements</li>
        <li>Rendre accessible la création de ressources</li>
        <li>Passage de l&apos;audit RGAA</li>
      </ul>
      <br />
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
      <h2>Améliorations</h2>
      <p>
        Voici une liste des améliorations nécessaires recensées et en cours de
        développement :
      </p>
      <ul>
        <li>Le menu déroulant de profil n&apos;est pas navigable au clavier</li>
        <li>
          La création de ressource ne permet pas de déplacer les blocs de
          contenu en glisser-déposer au clavier{' '}
        </li>
      </ul>
      <h2>Contact</h2>
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
  </div>
)
export default AccessibilityStatementPage
