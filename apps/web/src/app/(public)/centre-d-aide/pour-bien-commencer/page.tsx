import type { Metadata } from 'next'
import Notice from '@codegouvfr/react-dsfr/Notice'
import Link from 'next/link'
import { metadataTitle } from '@app/web/app/metadataTitle'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'
import Webinaire from '../../Webinaire'
import CommencerSideMenu from './CommencerSideMenu'

export const revalidate = 0

export const metadata: Metadata = {
  title: metadataTitle(`Pour bien commencer`),
}

const ContentPolicyPage = () => (
  <>
    <SkipLinksPortal links={defaultSkipLinks} />
    <div className="fr-container">
      <Breadcrumbs
        parents={[
          { label: 'Centre d’aide', linkProps: { href: '/centre-d-aide' } },
        ]}
        currentPage="Pour bien commencer"
      />
    </div>
    <main id={contentId} className="fr-mt-1w fr-mb-15w">
      <div className="fr-container fr-flex">
        <CommencerSideMenu />
        <div className="fr-flex-grow-1 ">
          <div className="fr-container landing-main-container">
            <div className="fr-grid-row fr-grid-row--center">
              <div className="fr-col-md-8">
                <h1 className="fr-page-title">Pour bien commencer</h1>
                <img
                  className="fr-width-full"
                  src="/images/centre-d-aide/Frame341.svg"
                  alt=""
                />
                <h2 id="apropos" className="fr-page-title fr-mt-5w fr-mb-3w">
                  Les Bases du numérique d’intérêt général, de quoi
                  parle-t-on&nbsp;?
                </h2>
                <p className="fr-text--lg fr-text--bold">
                  La plateforme collaborative de partage de ressources & communs
                  numériques à l’échelle nationale.
                </p>
                <p className="fr-text--lg">
                  Sans se substituer aux sites internet, bibliothèques d’outils,
                  ressourceries... qui existent déjà, Les Bases a pour vocation
                  de devenir le centre de ressources des acteurs du numérique
                  d’intérêt général en rendant accessible, pour la première fois
                  au niveau national, l’ensemble des contenus et outils produits
                  par et pour le secteur.
                </p>
                <p className="fr-text--lg">
                  Les Bases est une plateforme ouverte à toutes celles et ceux
                  intéressés par le partage de ressources en lien avec le
                  numérique d’intérêt général. Que vous soyez agent public ou
                  salarié privé, médiateur ou aidant numérique, il existe
                  forcément une bonne raison d’utiliser Les Bases&nbsp;!
                </p>
                <h3 className="fr-mt-5w">
                  Quel est l’objectif de cette plateforme&nbsp;?
                </h3>
                <p>
                  Il n’existe pas aujourd’hui d’espace partagé (ou plusieurs,
                  mais non-exhaustifs, ou parfois peu maintenus) répertoriant
                  les dispositifs et ressources de l’inclusion numérique et du
                  numérique d’intérêt général. Or, le besoin des professionnels
                  de l’inclusion et de la médiation numérique, des acteurs
                  locaux et des collectivités territoriales d’un outil dédié au
                  recensement d’outils et de ressources est récurrent.
                </p>
                <p>
                  Le programme Société Numérique de l’Agence Nationale de la
                  Cohésion des Territoires (ANCT) a souhaité créer dans ce cadre
                  un outil utile au quotidien pour les acteurs de l’inclusion et
                  de la médiation numérique, leur permettant de&nbsp;:
                </p>
                <ul>
                  <li>
                    Mettre en lumière la richesse de l’offre déjà existante
                  </li>
                  <li>
                    Stimuler la création de nouvelles ressources répondant à des
                    besoins collectivement identifiés
                  </li>
                  <li>
                    Favoriser une large diffusion, utilisation et appropriation
                    des ressources.
                  </li>
                </ul>
                <h3 className="fr-mt-5w">
                  Comment utiliser cette plateforme&nbsp;?
                </h3>
                <h4 className="fr-text--lead">Faire de la veille</h4>
                <p className="fr-text--bold">
                  Inspirez-vous des ressources produites par une communauté au
                  service du numérique d’intérêt général.
                </p>
                <p>
                  La Base du numérique d’intérêt général permet de rechercher,
                  prendre connaissance, et s’inspirer des ressources produites
                  par la communauté grâce à un moteur de recherche et des
                  thématiques adaptées, avec la possibilité d’enregistrer des
                  ressources ou des collections partagées par d’autres.
                </p>
                <h4 className="fr-text--lead">
                  Produire & diffuser des ressources
                </h4>
                <p className="fr-text--bold">
                  Présentez, valorisez & publiez vos ressources afin qu’elles
                  soient diffusées auprès d’un large public.
                </p>
                <p>
                  Les Bases du numérique d’intérêt général permet de présenter
                  et mettre en valeur vos ressources grâce à un système
                  modulaire de présentation des contenus, qui vous donne toute
                  la liberté pour composer de vraies pages d’information et de
                  démonstration (exemples d’utilisation, conditions pour
                  l’utilisation des outils, la reproduction et l’adaptation des
                  initiatives...). Ces pages peuvent ensuite être rendues
                  publiques, c’est-à-dire consultables par tous, qu’ils soient
                  membres ou non de la plateforme.
                </p>
                <h4 className="fr-text--lead">Contribuer à une communauté</h4>
                <p>
                  Collaborez avec d’autres utilisateurs & contribuez à la
                  création et l’amélioration de ressources, localement ou à
                  l’échelle nationale.
                </p>
                <h3 className="fr-mt-5w">
                  Qui peut utiliser cette plateforme&nbsp;?
                </h3>
                <p>
                  Cette plateforme contributive est ouverte à toutes les
                  personnes qui souhaitent découvrir et/ou publier et partager
                  des ressources dédiées à l’inclusion, la médiation numérique
                  et le numérique d’intérêt général.
                </p>
                <p>
                  Cette plateforme est notamment destinée à l’ensemble des
                  acteurs du numérique d’intérêt général&nbsp;:
                </p>
                <ul className="fr-mb-5w">
                  <li>Aidants numériques</li>
                  <li>Médiateurs numériques</li>
                  <li>Travailleurs sociaux</li>
                  <li>Agents publics</li>
                  <li>Travailleurs associatifs et salariés de l’ESS</li>
                  <li>Agents de collectivités</li>
                  <li>Élus</li>
                  <li>Enseignants & professionnels de la formation</li>
                  <li>Entreprises</li>
                  <li>Autres professionnels</li>
                </ul>
                <hr />
                <h2 id="compte" className="fr-page-title fr-mt-5w fr-mb-3w">
                  Créer son compte & se connecter
                </h2>
                <h3>Création de compte</h3>
                <h4 className="fr-text--lead fr-mb-0">Inclusion Connect</h4>
                <p>
                  Inclusion Connect{' '}
                  <Link
                    href="https://connect.inclusion.beta.gouv.fr/accounts/register/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    (https://connect.inclusion.beta.gouv.fr/accounts/register/)
                  </Link>{' '}
                  est une solution de connexion unique à plusieurs services
                  publics pour les professionnels de l’inclusion.
                </p>
                <p>
                  Vous pouvez créer votre compte sur Les Bases, et vous y
                  connecter par le biais d’Inclusion Connect, qui fournira votre
                  nom, prénom et email à la plateforme Les Bases.
                </p>
                <h4 className="fr-text--lead fr-mb-0">Email</h4>
                <p>
                  Renseignez votre nom, prénom et email, et votre compte est
                  prêt à être utilisé&nbsp;!
                </p>
                <h3 className="fr-mt-5w">Se connecter</h3>
                <h4 className="fr-text--lead fr-mb-0">Inclusion Connect</h4>
                <p>
                  Inclusion Connect{' '}
                  <Link
                    href="https://connect.inclusion.beta.gouv.fr/accounts/register/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    (https://connect.inclusion.beta.gouv.fr/accounts/register/)
                  </Link>{' '}
                  est une solution de connexion unique à plusieurs services
                  publics pour les professionnels de l’inclusion.
                </p>
                <p>
                  Vous pouvez créer votre compte sur Les Bases, et vous y
                  connecter par le biais d’Inclusion Connect, qui fournira votre
                  nom, prénom et email à la plateforme Les Bases.
                </p>
                <h4 className="fr-text--lead fr-mb-0">Connexion par email</h4>
                <p>
                  Vous pouvez également renseigner l’email utilisé pour votre
                  compte et vous recevrez un lien de connexion pour vous
                  connecter. Pas besoin de retenir de mot de passe&nbsp;!
                </p>
                <hr />
                <h2 id="profil" className="fr-page-title fr-mt-5w fr-mb-3w">
                  Profitez dès à présent de votre profil
                </h2>
                <p>
                  Lorsque vous vous inscrivez sur Les Bases du numérique
                  d’intérêt général, un profil est automatiquement créé avec les
                  informations que vous remplissez lors de votre inscription. Ce
                  profil est donc personnel et individuel.
                </p>
                <Notice
                  className="fr-mb-3w"
                  title={
                    <>
                      <span className="fr-text-default--grey">
                        À savoir pour les utilisateurs de la 1ère version de la
                        plateforme
                      </span>{' '}
                      <Link className="fr-link" href="le-profil#un-profil">
                        En savoir plus ici
                      </Link>
                    </>
                  }
                />
                <p>Grâce à votre profil, vous pouvez&nbsp;:</p>
                <ul className="fr-mb-2w">
                  <li>
                    Créer et publier directement vos ressources depuis votre
                    profil
                  </li>
                  <li>
                    Enregistrer des ressources qui vous intéressent grâce aux
                    collections.
                  </li>
                  <li>
                    Rejoindre une ou plusieurs bases pour collaborer à la
                    création de ressources.
                  </li>
                  <li>
                    Suivre les bases et les profils qui vous intéressent pour
                    les retrouver plus facilement.
                  </li>
                </ul>
                <Notice
                  className="fr-mb-2w"
                  title={
                    <Link className="fr-link" href="le-profil">
                      Retrouvez ici plus d’informations sur comment utiliser
                      votre profil
                    </Link>
                  }
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Webinaire />
  </>
)

export default ContentPolicyPage
