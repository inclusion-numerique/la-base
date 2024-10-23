import type { Metadata } from 'next'
import Notice from '@codegouvfr/react-dsfr/Notice'
import Link from 'next/link'
import { metadataTitle } from '@app/web/app/metadataTitle'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { contentId } from '@app/web/utils/skipLinks'
import Newsletter from '@app/web/app/(public)/Newsletter'
import CollectionsSideMenu from './CollectionsSideMenu'

export const revalidate = 0
export const metadata: Metadata = {
  title: metadataTitle(`Centre d'aide`),
}

const ContentPolicyPage = () => (
  <>
    <SkipLinksPortal />
    <div className="fr-container">
      <Breadcrumbs
        parents={[
          { label: 'Centre d’aide', linkProps: { href: '/centre-d-aide' } },
        ]}
        currentPage="Les Collections"
      />
    </div>
    <main id={contentId} className="fr-mb-15w">
      <div className="fr-container fr-flex fr-mt-6w">
        <CollectionsSideMenu />
        <div className="fr-flex-grow-1">
          <div className="fr-container landing-main-container">
            <div className="fr-grid-row fr-grid-row--center">
              <div className="fr-col-md-8">
                <h1 className="fr-page-title">Les collections</h1>
                <img
                  className="fr-width-full"
                  src="/images/centre-d-aide/collections.svg"
                  alt=""
                />
                <h2 id="collection" className="fr-page-title fr-mt-5w fr-mb-4w">
                  Une collection, c’est quoi&nbsp;?
                </h2>
                <p className="fr-text--lg">
                  Les collections sont des dossiers qui vous permettent
                  d’enregistrer et d’organiser des ressources.
                </p>
                <p className="fr-text--lg">
                  Les collections peuvent regrouper à la fois des ressources que
                  vous avez créées et des ressources produites par d’autres
                  personnes.
                </p>
                <p className="fr-text--lg">
                  Les collections peuvent être associées à un profil ou à une
                  base. Dans les deux cas, vous pouvez y accéder via l’onglet{' '}
                  <strong>“Collections”</strong> (ou{' '}
                  <strong>“Mes collections”</strong> s’il s’agit de votre
                  profil).
                </p>
                <p className="fr-text--lg">
                  Une collection peut être <strong>publique</strong> (visible
                  par tous les visiteurs) ou <strong>privée</strong> (visible
                  uniquement par vous).
                </p>
                <p className="fr-text--lg fr-mb-7w">
                  Il est également possible d’enregistrer des collections créées
                  par d’autres utilisateurs. Vous retrouverez les collections
                  que vous enregistrez dans l’onglet{' '}
                  <strong>“Mes collections”</strong> puis
                  <strong>“Collections enregistrées”.</strong>
                </p>
                <hr />
                <h2
                  id="creation-collection"
                  className="fr-page-title fr-mt-5w fr-mb-4w"
                >
                  Création d’une collection
                </h2>
                <p>
                  Retrouvez ici les différentes étapes à suivre pour créer une
                  collection.
                </p>
                <p>
                  Vous pouvez créer une collection à tout moment depuis le
                  bouton{' '}
                  <strong>
                    ‘Créer une collection’ que vous pouvez retrouver&nbsp;:
                  </strong>
                </p>
                <ul>
                  <li>
                    Dans l’onglet <strong>‘Mes collections’</strong> dans votre
                    profil
                  </li>
                  <li>
                    Pour créer une collection partagée dans une base&nbsp;:
                    allez dans l’onglet <strong>‘Mes collections’</strong> dans
                    votre base
                  </li>
                </ul>
                <img
                  alt=""
                  className="fr-width-full fr-my-2w"
                  src="/images/centre-d-aide/creation_collections.svg"
                />
                <h3 className="fr-mt-5w">1. Titre & description</h3>
                <p>
                  Pour commencer, vous devez renseigner un titre et une
                  description pour présenter votre collection. Ce sont les
                  éléments qui seront visibles sur l’aperçu de votre collection
                  pour que les visiteurs puissent comprendre rapidement le sujet
                  de votre collection.
                </p>
                <h3 className="fr-mt-5w">2. Aperçu de la collection</h3>
                <p>
                  Vous pouvez ajouter une image de présentation de votre
                  collection qui sera visible dans la carte d’aperçu de votre
                  collection.
                </p>
                <p>Deux options s’offrent à vous&nbsp;:</p>
                <ul>
                  <li>
                    <strong>Aperçu des ressources&nbsp;:</strong> Par défaut,
                    l’image de présentation sera composé d’un aperçu des 3
                    dernières ressources que vous avez enregistré dans votre
                    collection
                  </li>
                  <li>
                    <strong>Importer un visuel&nbsp;:</strong> Vous pouvez
                    également importer votre propre visuel pour illustrer votre
                    collection.
                  </li>
                </ul>
                <p className="fr-text--bold">
                  Format d’image de présentation d’une collection&nbsp;:
                </p>
                <ul>
                  <li>Taille recommandée&nbsp;: 1764x1060 px.</li>
                  <li>Poids maximum&nbsp;: 10 Mo.</li>
                  <li>Formats supportés&nbsp;: jpg, png, webp.</li>
                </ul>
                <h3 className="fr-mt-5w">3. Aperçu de la collection</h3>
                <p>Choisissez qui peut voir votre collection.</p>
                <ul>
                  <li>
                    <strong>Collection publique&nbsp;:</strong> Visible par tous
                    les visiteurs.
                  </li>
                  <li>
                    <strong>Collection privée&nbsp;:</strong> Visible uniquement
                    par vous.
                  </li>
                </ul>
                <p>
                  Lorsque vous aurez compléter ces différentes informations,
                  vous pouvez cliquer sur le bouton{' '}
                  <strong>‘Créer la collection’.</strong> Votre collection est
                  maintenant publiée&nbsp;!
                </p>
                <p>
                  Vous pouvez retrouvez cette collection à tout moment depuis
                  votre profil ou votre base et modifier l’ensemble des
                  informations & paramètres (Informations, image de couverture,
                  visibilité).
                </p>
                <Notice
                  className="fr-mb-2w"
                  title={
                    <span className="fr-text--regular fr-text-default--grey">
                      Vous pourrez modifier à tout moment les informations & les
                      paramètres de votre collection en allant dans votre
                      collection et en cliquant sur le bouton{' '}
                      <strong>‘Modifier’.</strong>{' '}
                      <Link
                        className="fr-link"
                        href="les-collections#infos-collection"
                      >
                        En savoir plus ici
                      </Link>
                    </span>
                  }
                />
                <h2
                  id="ressources-collection"
                  className="fr-page-title fr-mt-5w fr-mb-3w"
                >
                  Enregistrer des ressources dans une collection
                </h2>
                <p>
                  Dans une collection, il est possible d’enregistrer l’ensemble
                  des ressources publiques publiées par d’autres utilisateurs
                  ainsi que vos propres ressources.
                </p>
                <p>
                  Pour enregistrer une ressource dans une collection, cliquez
                  sur le bouton <strong>‘Enregistrer’</strong> que vous pouvez
                  retrouver directement en bas à droite de la carte d’aperçu
                  d’une ressource ou dans la barre d’action visible lors de la
                  consultation d’une ressource.
                </p>
                <img
                  className="fr-width-full fr-my-2w"
                  src="/images/centre-d-aide/enregistrer_collections.svg"
                  alt=""
                />
                <p>
                  Une modale va ensuite vous permettre de choisir dans quel
                  collection vous souhaitez enregistrer la ressource. Plusieurs
                  choix s’offrent à vous&nbsp;:
                </p>
                <ul>
                  <li>
                    Enregistrer la ressource dans une collection personnelle que
                    vous pourrez retrouver dans votre profil
                  </li>
                  <li>
                    Enregistrer la ressource dans une collection partagée dans
                    une base dont vous êtes membre.
                  </li>
                  <li>
                    Vous pouvez enregistrer une ressource dans plusieurs
                    collections à la fois.
                  </li>
                </ul>
                <Notice
                  className="fr-mt-3w fr-mb-6w"
                  title={
                    <span className="fr-text--regular fr-text-default--grey">
                      Par défaut, vous avez une collection{' '}
                      <strong>‘Ressources enregistrées’</strong> créée dans
                      votre profil afin de pouvoir collecter directement des
                      ressources sans avoir à passer par la création d’une
                      collection.
                    </span>
                  }
                />
                <h2
                  id="enregistrer-collection"
                  className="fr-page-title fr-mt-5w fr-mb-3w"
                >
                  Enregistrer une collection
                </h2>
                <p>
                  Il est également possible d’enregistrer une collection d’une
                  base ou d’un profil qui vous intéresse.
                </p>
                <p>
                  Pour enregistrer une collection, cliquez sur le bouton{' '}
                  <strong>‘Enregistrer une collection’</strong> que vous pouvez
                  retrouver directement sur la carte d’aperçu d’une collection
                  ou dans la barre d’action visible lors de la consultation
                  d’une collection.
                </p>
                <p>
                  Une modale va ensuite vous permettre de choisir où vous
                  souhaitez enregistrer la collection.
                </p>
                <p className="fr-text--bold">
                  Plusieurs choix s’offrent à vous&nbsp;:
                </p>
                <ul>
                  <li>Enregistrer la collection dans votre profil</li>
                  <li>
                    Enregistrer la collection dans une base dont vous êtes
                    membre
                  </li>
                </ul>
                <p>
                  Lorsque vous avez enregistré une collection, vous pouvez la
                  retrouver dans l’onglet{' '}
                  <strong>‘Collections’ &gt; ‘Collections enregistrées’</strong>{' '}
                  de votre profil ou d’une base dont vous êtes membre.
                </p>
                <h2
                  id="infos-collection"
                  className="fr-page-title fr-mt-5w fr-mb-3w"
                >
                  Informations & paramètres d’une collection
                </h2>
                <p>
                  Dès lors que vous aurez créé une collection, vous pourrez
                  modifier à tout moment les informations & les paramètres de
                  votre collection en allant dans votre collection et en
                  cliquant sur le bouton <strong>‘Modifier’.</strong>
                </p>
                <p>
                  Sur cette page, vous pouvez retrouver les différents
                  paramètres précédemment définis lors de création de votre
                  collection. Vous pouvez venir les modifier en cliquant sur le
                  bouton{' '}
                  <strong>‘Modifier’ symbolisé par l’icône stylo.</strong>
                </p>
                <p>
                  Retrouvez ci-dessous les différentes informations & paramètres
                  d’une collection&nbsp;:
                </p>
                <ul>
                  <li>Titre & description de la collection</li>
                  <li>
                    Aperçu de la collection&nbsp;: Choisissez entre un aperçu
                    des ressources ou importer un visuel.
                  </li>
                  <li>
                    Visibilité de la collection&nbsp;: Choisissez qui peut voir
                    votre ressource.
                  </li>
                  <li>
                    Supprimer la collection&nbsp;: Cette action est irréversible
                    et entraîne la suppression définitive de la collection.
                    Utilisez cette fonction avec précaution.
                  </li>
                </ul>
                <p>
                  Pour chacun de ces paramètres, après les avoir modifier, vous
                  pouvez <strong>‘Enregistrer’</strong> ou{' '}
                  <strong>‘Annuler’</strong> vos modifications en bas à droite
                  de chaque bloc.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
    <Newsletter />
  </>
)
export default ContentPolicyPage
