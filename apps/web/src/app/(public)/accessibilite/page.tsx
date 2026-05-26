import ExternalLink from '@app/ui/components/ExternalLink'
import { metadataTitle } from '@app/web/app/metadataTitle'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import { contentId } from '@app/web/utils/skipLinks'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: metadataTitle('Déclaration d\u2019accessibilité'),
}
const AccessibilityStatementPage = () => (
  <div className="fr-container">
    <SkipLinksPortal />
    <Breadcrumbs currentPage="Accessibilité" />

    <main
      role="main"
      id={contentId}
      className="fr-container landing-main-container fr-my-8w"
    >
      <h1>Déclaration d'accessibilité</h1>
      <p>
        Établie le <span>04 mars 2024</span>. Mis à jour le{' '}
        <span>22 mai 2026</span>.
      </p>
      <p>
        <span>Agence National de la Cohésion des Territoires</span> s'engage à
        rendre son service accessible, conformément à l'article 47 de la loi n°
        2005-102 du 11 février 2005.
      </p>
      <p>
        Cette déclaration d'accessibilité s'applique à{' '}
        <strong>{PublicWebAppConfig.projectTitle}</strong>.
      </p>

      <h2>État de conformité</h2>
      <p>
        <strong>{PublicWebAppConfig.projectTitle}</strong> est{' '}
        <strong>
          <span data-printfilter="lowercase">partiellement conforme</span>
        </strong>{' '}
        avec le{' '}
        <abbr title="Référentiel général d'amélioration de l'accessibilité">
          RGAA
        </abbr>
        . L&apos;audit de conformité réalisé en novembre 2025 et le contre-audit
        réalisé en février 2026 révèle que sur l&apos;échantillon du site audité
        50&nbsp;% des critères du RGAA version 4.1.2 sont respectés.
      </p>
      <p>Le taux moyen de conformité est de 77,87&nbsp;%.</p>
      <p>Détail :</p>
      <ul>
        <li>Nombre de critères applicables : 58</li>
        <li>Nombre de critères conformes : 29</li>
        <li>Nombre de critères non conformes : 29</li>
      </ul>
      <p>
        Le détail des non conformités est disponible{' '}
        <ExternalLink href="https://ara.numerique.gouv.fr/rapport/578fGFkzQvnxvoA39-_Gb/resultats">
          ici
        </ExternalLink>
        .
      </p>

      <h2>Stratégie et plan d&apos;action</h2>
      <p>
        La stratégie d&apos;accessibilité suit{' '}
        <ExternalLink href="https://docs.numerique.gouv.fr/docs/b8f7f83e-56cd-489f-a474-55ec325a2ba6/">
          le schéma pluriannuel d&apos;accessibilité de l&apos;Incubateur des
          territoires 2025-2027.
        </ExternalLink>
      </p>
      <p>Le plan d&apos;action 2026 :</p>
      <p>
        Un effort important a été mené durant le début d&apos;année 2026 avec
        l&apos;audit puis le contre audit (passant la note de 33 à 50&nbsp;% des
        critères respectés). Aucune action supplémentaire n&apos;est prévue à ce
        jour dans le domaine de l&apos;accessibilité.
      </p>

      <h2>Contact</h2>
      <p>
        Si vous n'arrivez pas à accéder à un contenu ou à un service, vous
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
        signalé au responsable du site internet un défaut d'accessibilité qui
        vous empêche d'accéder à un contenu ou à un des services du portail et
        vous n'avez pas obtenu de réponse satisfaisante.
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
        Cette déclaration d'accessibilité a été créée le{' '}
        <span>07 novembre 2022</span> grâce au{' '}
        <a href="https://betagouv.github.io/a11y-generateur-declaration/#create">
          Générateur de Déclaration d'Accessibilité de BetaGouv
        </a>
        .
      </p>
    </main>
  </div>
)
export default AccessibilityStatementPage
