import Newsletter from '@app/web/app/(public)/Newsletter'
import { metadataTitle } from '@app/web/app/metadataTitle'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { contentId } from '@app/web/utils/skipLinks'
import Notice from '@codegouvfr/react-dsfr/Notice'
import type { Metadata } from 'next'
import Link from 'next/link'
import RessourcesSideMenu from './RessourcesSideMenu'

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
        currentPage="Les ressources"
      />
    </div>
    <main id={contentId} className="fr-mb-15w">
      <div className="fr-container fr-flex fr-mt-6w">
        <RessourcesSideMenu />
        <div className="fr-flex-grow-1 ">
          <div className="fr-container landing-main-container">
            <div className="fr-grid-row fr-grid-row--center">
              <div className="fr-col-md-8">
                <h1 className="fr-page-title">Les ressources</h1>
                <img
                  className="fr-width-full"
                  src="/images/centre-d-aide/ressources.svg"
                  alt=""
                />
                <h2 id="ressources" className="fr-page-title fr-mt-5w fr-mb-4w">
                  Une ressource, c’est quoi&nbsp;?
                </h2>
                <p className="fr-text--lg">
                  Une ressource est une fiche traitant d’un sujet particulier
                  (trame d’atelier, initiative, documentation diverse, etc...).
                </p>
                <p className="fr-text--lg">
                  Une ressource peut être créée par toute personne disposant
                  d’un profil. Extrêmement modulables, les ressources
                  fonctionnent selon un système de “blocs”&nbsp;: bloc de texte
                  , lien, fichier, image et titre. Ces blocs peuvent constamment
                  être modifiés et réassemblés selon vos besoins afin de créer
                  la ressource parfaite&nbsp;!
                </p>
                <p className="fr-text--lg fr-mb-5w">
                  Une ressource peut être{' '}
                  <Link
                    className="fr-link fr-text--lg"
                    href="les-ressources#parametre-ressource"
                  >
                    publique
                  </Link>{' '}
                  (tout visiteur de la plateforme peut la consulter) ou{' '}
                  <Link
                    className="fr-link fr-text--lg"
                    href="les-ressources#parametre-ressource"
                  >
                    privée
                  </Link>{' '}
                  (seuls vous et les personnes que vous ajoutez comme
                  contributeurs peuvent la consulter).
                </p>
                <hr />
                <h2
                  id="creation-ressource"
                  className="fr-page-title fr-mt-5w fr-mb-4w"
                >
                  Création d’une ressource&nbsp;?
                </h2>
                <p>
                  Par défaut, une ressource créée est automatiquement ajoutée à
                  votre profil.
                </p>
                <p>
                  Si vous le souhaitez, vous pouvez également ajouter cette
                  ressource à une base dont vous êtes membre. À tout moment,
                  vous pouvez retrouver{' '}
                  <strong>toutes les ressources que vous avez créées</strong> (y
                  compris celles ajoutées à aux bases dont vous êtes membre) sur
                  votre profil.
                </p>
                <p>
                  Retrouvez ici les différentes étapes à suivre pour créer une
                  ressource&nbsp;:
                </p>
                <p>
                  Vous pouvez créer une ressource à tout moment depuis le bouton{' '}
                  <strong>‘Créer une ressource’</strong> toujours accessible, en
                  haut à droite, dans la barre de navigation.
                </p>
                <img
                  className="fr-width-full"
                  src="/images/centre-d-aide/creation_ressources.svg"
                  alt=""
                />
                <h3 className="fr-mt-5w">1. Titre & description</h3>
                <p>
                  Pour commencer, vous devez renseigner un titre et une
                  description pour présenter le sujet de votre ressource. Ce
                  sont les éléments qui sont visibles via le moteur de recherche
                  pour que les visiteurs puissent comprendre rapidement le sujet
                  de votre ressource.
                </p>
                <h3 className="fr-mt-5w">2. Choisir où ajouter la ressource</h3>
                <p>
                  Par défaut, une ressource créée est automatiquement ajoutée à
                  votre profil. Si vous le souhaitez, vous pouvez également
                  ajouter cette ressource à une base dont vous êtes membre.
                </p>
                <h3 className="fr-mt-5w">3. Édition du contenu</h3>
                <p>
                  Extrêmement modulables, les ressources fonctionnent selon un
                  système de “blocs”&nbsp;: bloc de texte, lien, fichier, image
                  et titre. Ces blocs peuvent constamment être modifiés et
                  réassemblés selon vos besoins afin de créer la ressource
                  parfaite&nbsp;!
                </p>
                <p>
                  Voici les différentes possibilités d’éditions qui s’offrent à
                  vous&nbsp;:
                </p>
                <h4 className="fr-mt-5w">
                  Édition générale de votre ressource
                </h4>
                <ul>
                  <li>Modifier l’espace de publication de votre ressource</li>
                  <li>
                    Modifier le titre et la description de votre ressource
                  </li>
                  <li>
                    Ajouter une image de présentation de votre ressource&nbsp;:
                    Vous pouvez ajouter une image de présentation à votre
                    ressource afin de la valoriser. Cette image sera également
                    visible via le moteur de recherche pour attirer les
                    visiteurs.
                  </li>
                </ul>
                <p className="fr-text--bold">
                  Format d’image de présentation d’une ressource&nbsp;:
                </p>
                <ul className="fr-mb-3w">
                  <li>Taille recommandée&nbsp;: 1764x1260 px.</li>
                  <li>Poids maximum&nbsp;: 10 Mo</li>
                  <li>Formats supportés&nbsp;: jpg, png, webp.</li>
                </ul>
                <img
                  className="fr-width-full"
                  src="/images/centre-d-aide/edition_contenu_ressources.svg"
                  alt=""
                />
                <h4 className="fr-mt-5w">
                  Ajouter du contenu grâce aux blocs de contenu
                </h4>
                <p>
                  Afin d’ajouter des contenus à votre ressource, retrouvez à
                  tout moment le bouton <strong>‘Ajouter un contenu’</strong>,
                  qui va vous permettre d’ajouter des blocs de contenu à votre
                  ressource. Plusieurs blocs de contenus sont disponibles afin
                  de structurer et d’organiser votre ressource&nbsp;:
                </p>
                <img
                  className="fr-width-full fr-mb-2w"
                  src="/images/centre-d-aide/ajout_contenu_ressources.svg"
                  alt=""
                />
                <ul>
                  <li>
                    <strong>Titre de section&nbsp;:</strong> Les titres de
                    sections permettent de structurer le contenu et de créer un
                    sommaire afin que les visiteurs se rendent directement sur
                    une position précise de votre ressource.
                  </li>
                  <li>
                    <strong>Texte&nbsp;:</strong> Ajouter des contenus textuels
                    que vous pouvez éditer avec différentes possibilités de
                    mises en forme de vos textes.
                  </li>
                  <li>
                    <strong>Fichier&nbsp;:</strong> Vous pouvez ajouter tout
                    types de fichiers ne dépassant pas les 100 Mo. Ce fichier
                    pourra ensuite être téléchargé et/ou visualiser par les
                    visiteurs de votre ressource. Afin de donner du contexte aux
                    visiteurs sur le fichier, vous pouvez ajouter, en optionnel,
                    un titre ainsi qu’une légende.
                  </li>
                  <li>
                    <strong>Image&nbsp;:</strong> Vous pouvez ajouter des images
                    qui vont vous permettre d’illustrer votre ressource. Les
                    formats supportés sont le jpeg, png et webp d’une taille
                    maximale de 20 Mo. Afin de donner du contexte aux visiteurs
                    sur l’image, vous pouvez ajouter, en optionnel, un titre, un
                    texte alternatif (Il s’agit d’un court texte qui décrit ce
                    que représente l’image . Cette information favorise
                    l’accessibilité et le référencement) ainsi qu’une légende.
                  </li>
                  <li>
                    <strong>Lien&nbsp;:</strong> Vous pouvez ajouter un lien
                    vers un site externe ou une ressource publiée sur Les Bases.
                    Vous avez le possibilité d’afficher un aperçu visuel du
                    lien. Afin de donner du contexte aux visiteurs sur le lien,
                    vous pouvez ajouter, en optionnel, un titre ainsi qu’une
                    légende.
                  </li>
                </ul>
                <h4 className="fr-mt-5w">
                  Déplacer, modifier, supprimer des blocs de contenu
                </h4>
                <p>
                  Vous pouvez à tout moment venir déplacer, modifier et
                  supprimer ces différents blocs pour faire évoluer le contenu
                  de votre ressource. Au survol d’un bloc de contenu que vous
                  avez créée, vous verrez apparaitre 3 boutons vous permettant
                  de réaliser ces actions&nbsp;:
                </p>
                <h5 className="fr-text--lead fr-mb-0">Déplacer un bloc</h5>
                <p>
                  En haut à gauche du bloc, vous aurez une{' '}
                  <strong>‘poignée’</strong> qui vous permettra de déplacer le
                  bloc vers le haut ou vers le bas.
                </p>
                <h5 className="fr-text--lead fr-mb-0">Modifier un bloc</h5>
                <p>
                  En bas à gauche du bloc, vous aurez un bouton{' '}
                  <strong>‘Modifier’</strong> qui vous permettra de modifier
                  l’ensemble du contenu du bloc.
                </p>
                <h5 className="fr-text--lead fr-mb-0">Supprimer un bloc</h5>
                <p>
                  En bas à droite du bloc, vous aurez un{' '}
                  <strong>bouton présentant l’icône de ‘corbeille’</strong> pour
                  supprimer un bloc.
                </p>
                <h3 className="fr-mt-5w">4. Publier la ressource</h3>
                <p>
                  Lorsque votre ressource est prête à être publié, vous pouvez
                  cliquer sur le bouton <strong>‘Publier la ressource’.</strong>{' '}
                  Vous arriverez sur la dernière étape avant la publication de
                  votre ressource où vous allez pouvoir définir qui peut
                  consulter votre ressource.
                </p>
                <h4 className="fr-text--lead fr-mb-0">
                  Ressource publiée dans
                </h4>
                <p>
                  Vous pouvez toujours modifier l’espace de publication de votre
                  ressource (uniquement votre profil, ou vous pouvez l’ajouter à
                  une base dont vous êtes membre).
                </p>
                <h4 className="fr-text--lead fr-mb-0">
                  Choix de la visibilité
                </h4>
                <p>Choisissez qui peut voir votre ressource.</p>
                <ul>
                  <li>
                    <strong>Ressource publique&nbsp;:</strong> Visible par tous
                    les visiteurs.
                  </li>
                  <li>
                    <strong>Ressource privée&nbsp;: </strong>Visible uniquement
                    par vous et les contributeurs que vous avez invités.
                  </li>
                </ul>
                <p>
                  Si vous sélectionnez ressource publique, il vous sera demandé
                  de remplir trois champs d’indexation afin de permettre aux
                  autres visiteurs de la plateforme de trouver votre ressource
                  via le moteur de recherche.
                </p>
                <p>
                  Il vous sera demandé de renseigner les 3 champs d’indexations
                  suivants&nbsp;:
                </p>
                <ul>
                  <li>
                    <strong>Thématiques&nbsp;:</strong> Quelles sont les
                    principales thématiques abordées par la ressource&nbsp;?
                  </li>
                  <li>
                    <strong>Type de support&nbsp;:</strong> Votre ressource
                    est-elle un article&nbsp;? Un site internet&nbsp;? Un
                    tutoriel&nbsp;?
                  </li>
                  <li>
                    <strong>Publics cibles&nbsp;:</strong> Quel est le public
                    visé par la ressource&nbsp;?
                  </li>
                </ul>
                <img
                  className="fr-width-full fr-my-2w"
                  src="/images/centre-d-aide/publier_ressources.svg"
                  alt=""
                />
                <Notice
                  className="fr-mb-2w"
                  title={
                    <span className="fr-text--sm fr-text--regular fr-text-default--grey">
                      <strong>Bon à savoir&nbsp;:</strong> ces 3 champs
                      d’indexations permettent ensuite aux visiteurs de
                      retrouver vos ressources grâce aux 3 filtres mise à
                      disposition afin d’affiner la recherche
                    </span>
                  }
                />
                <p>
                  Si vous sélectionnez ressource privée, vous n’aurez pas à
                  remplir cette indexation (car votre ressource ne sera pas
                  référencée dans le moteur de recherche de la plateforme). Afin
                  de pouvoir partager cette ressource à d’autres personnes, vous
                  aurez la possibilité d’inviter des contributeurs, qui pourront
                  voir et éditer votre ressource.
                </p>
                <p>
                  Lorsque vous aurez compléter ces différentes informations,
                  vous pouvez cliquer sur le bouton{' '}
                  <strong>‘Publier maintenant’.</strong> Votre ressource est
                  maintenant publiée&nbsp;!
                </p>
                <Notice
                  className="fr-mb-6w"
                  title={
                    <span className="fr-text--sm fr-text--regular fr-text-default--grey">
                      Vous pouvez retrouvez cette ressource à tout moment depuis
                      votre profil et modifier l’ensemble des éléments (espace
                      de publication, contenus, visibilité, contributeurs et les
                      différents paramètres) pour continuer à faire évoluer vos
                      ressources. Pour cela, cliquez sur le bouton{' '}
                      <strong>‘Modifier’</strong> présent sur l’aperçu ou lors
                      de la consultation de votre ressource. En savoir plus ci-
                      dessous
                    </span>
                  }
                />
                <h4 className="fr-text--lead fr-mb-0">Choix de la licence</h4>
                <p>
                  Choisissez sous quelle licence vous souhaitez publier votre
                  ressource.
                </p>
                <p>
                  Par défaut, toutes les ressources publiées sur la plateforme
                  sont sous licence{' '}
                  <Link
                    href="https://www.etalab.gouv.fr/licence-ouverte-open-licence/"
                    className="fr-link"
                    target="_blank"
                  >
                    Etalab 2.0
                  </Link>
                  . Mais vous pouvez publier vos ressources sous une autre
                  licence (ou sans licence). Nous vous proposons notamment deux
                  licences Creative Commons :{' '}
                  <Link
                    href="https://creativecommons.org/licenses/by-sa/4.0/deed.fr"
                    className="fr-link"
                    target="_blank"
                  >
                    CC BY-SA 4.0
                  </Link>
                  ou{' '}
                  <Link
                    href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.fr"
                    className="fr-link"
                    target="_blank"
                  >
                    CC BY-NC-SA 4.0
                  </Link>
                  . Pour en savoir plus sur les différentes licences, consultez
                  la dernière partie de cette article{' '}
                  <Link href="#licence-ressource">Licence des ressources</Link>.
                </p>
                <hr />
                <h2
                  id="parametre-ressource"
                  className="fr-page-title fr-mt-3w fr-mb-3w"
                >
                  Paramètres d’une ressource
                </h2>
                <p>
                  Dès lors que vous aurez publier votre ressource, vous pouvez
                  venir modifier les paramètres de votre ressource.
                </p>
                <p>
                  Pour trouver les paramètres de votre ressource, cliquez sur le
                  bouton <strong>‘modifier’</strong> qui apparait en bas à
                  droite de la carte d’aperçu d’une ressource, ou dans la barre
                  d’action visible lors de la consultation d’une ressource.
                </p>
                <p>
                  Ensuite, cliquez sur le bouton ‘…’ , dans la barre de
                  navigation en bas de votre écran, permettant de voir plus
                  d’options. Cliquez ensuite sur{' '}
                  <strong>‘Paramètres de la ressource’.</strong>
                </p>
                <p>
                  Sur cette page, vous pouvez retrouver les différents
                  paramètres précédemment définis lors de la première
                  publication. Vous pouvez venir les modifier en cliquant sur le{' '}
                  <strong>bouton ‘Modifier’ symbolisé par l’icône stylo</strong>
                  .
                </p>
                <p>
                  Retrouvez ci-dessous les différents paramètres d’une ressource
                  &nbsp;:
                </p>
                <ul>
                  <li>
                    <strong>Ressource publiée dans&nbsp;:</strong> Choisissez
                    l’espace de publication de votre ressource (uniquement votre
                    profil, ou vous pouvez l’ajouter à une base dont vous êtes
                    membre)
                  </li>
                  <li>
                    <strong>Visibilité de la ressource&nbsp;:</strong>{' '}
                    Choisissez qui peut voir votre ressource (ressource publique
                    ou privée).
                  </li>
                  <li>
                    <strong>Licence de la ressource&nbsp;:</strong>Choisissez
                    sous quel licence vous souhaitez publier votre ressource. (
                    <span className="fr-text--underline">Etalab 2.0</span>,{' '}
                    <span className="fr-text--underline">CC BY-SA 4.0</span> ou{' '}
                    <span className="fr-text--underline">CC BY-NC-SA 4.0</span>)
                  </li>
                  <li>
                    <strong>Indexation&nbsp;:</strong> L’indexation permettra
                    aux autres utilisateurs de la base de trouver votre
                    ressource via le moteur de recherche (uniquement pour les
                    ressources publiques).
                  </li>
                  <li>
                    <strong>Contributeurs&nbsp;:</strong> Les contributeurs
                    peuvent voir, éditer, inviter d’autres contributeurs et
                    supprimer la ressource.
                  </li>
                  <li>
                    <strong>Supprimer la ressource&nbsp;:</strong> Cette action
                    est irréversible et entraîne la suppression définitive de la
                    ressource. Utilisez cette fonction avec précaution. Tous les
                    contenus de la ressource seront supprimés avec elle.
                  </li>
                </ul>
                <p>
                  Pour chacun de ces paramètres, après les avoir modifier, vous
                  pouvez <strong>‘Enregistrer’</strong> ou{' '}
                  <strong>‘Annuler’</strong> vos modifications en bas à droite
                  de chaque bloc.
                </p>
                <hr />
                <h2
                  id="licence-ressource"
                  className="fr-page-title fr-mt-3w fr-mb-6w"
                >
                  Licence des ressources
                </h2>
                <h3>Des ressources libres et gratuites</h3>
                <p className="fr-mb-6w">
                  Toutes les ressources publiées sur la plateforme sont mises à
                  disposition gratuitement et, par défaut, sous licence&nbsp;
                  <Link
                    href="https://www.etalab.gouv.fr/licence-ouverte-open-licence/"
                    className="fr-link"
                    target="_blank"
                  >
                    Etalab 2.0
                  </Link>
                  &nbsp;(Il est possible de choisir une autre licence pour vos
                  ressources). Les utilisateurs ne doivent en aucun cas demander
                  des compensations financières pour l’utilisation ou la
                  diffusion des contenus partagés.
                </p>
                <h3>Choisir sous quelle licence publier votre ressource</h3>
                <p>
                  Par défaut, toutes les ressources publiées sur la plateforme
                  sont sous licence{' '}
                  <Link
                    href="https://www.etalab.gouv.fr/licence-ouverte-open-licence/"
                    className="fr-link"
                    target="_blank"
                  >
                    Etalab 2.0
                  </Link>
                  . Mais vous pouvez publier vos ressources sous une autre
                  licence via les paramètres de votre ressource. Nous vous
                  proposons notamment deux licences Creative Commons :{' '}
                  <Link
                    href="https://creativecommons.org/licenses/by-sa/4.0/deed.fr"
                    className="fr-link"
                    target="_blank"
                  >
                    CC BY-SA 4.0
                  </Link>{' '}
                  ou{' '}
                  <Link
                    href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.fr"
                    className="fr-link"
                    target="_blank"
                  >
                    CC BY-NC-SA 4.0
                  </Link>
                </p>
                <p>
                  Pour modifier la licence de votre ressource, allez dans{' '}
                  <strong>les paramètres de votre ressource</strong> et cliquer
                  sur le bouton <strong>Modifier avec l'icône stylo</strong>.
                  Vous pourrez choisir entre ces 3 licences et cliquer sur le
                  bouton <strong>Enregistrer</strong> en bas du bloc pour
                  confirmer votre choix.
                </p>
                <p>
                  Retrouvez ci-dessous plus d'informations sur les{' '}
                  <strong>3 licences disponibles</strong> :
                </p>
                <h4>1. Licence par défaut : Etalab 2.0</h4>
                <p>
                  Par défaut, toutes les ressources publiées sur la plateforme
                  sont sous licence{' '}
                  <Link
                    href="https://www.etalab.gouv.fr/licence-ouverte-open-licence/"
                    className="fr-link"
                    target="_blank"
                  >
                    Etalab 2.0
                  </Link>
                  . Cette licence permet la réutilisation libre, gratuite, non
                  exclusive et mondiale de l’information, à des fins
                  commerciales ou non, pour une durée illimitée.
                </p>
                <Notice
                  className="fr-mb-2w"
                  title={
                    <span className="fr-text--sm fr-text--regular fr-text-default--grey">
                      Si votre structure employeuse et/ou si vous représenter
                      une administration publique, vous êtes dans l’obligation
                      d'utiliser la licence ouverte{' '}
                      <Link
                        href="https://www.etalab.gouv.fr/licence-ouverte-open-licence/"
                        className="fr-link fr-text--sm"
                        target="_blank"
                      >
                        Etalab 2.0
                      </Link>
                    </span>
                  }
                />
                <p>Les utilisateurs des ressources sont autorisés à :</p>
                <ul>
                  <li>
                    <strong>Partager</strong> — copier, distribuer et
                    communiquer le contenu par tous moyens et sous tous formats,
                  </li>
                  <li>
                    <strong>Adapter</strong> — remixer, transformer et créer à
                    partir du matériel pour toute utilisation, y compris
                    commerciale.
                  </li>
                </ul>
                <p>À condition de :</p>
                <ul>
                  <li>
                    <strong>Citer la source de l’information</strong> — Vous
                    devez créditer la source de l’information (au moins le nom
                    du concédant) et indiquer la date de dernière mise à jour. —
                    mentionner la ressource originale et son auteur,
                  </li>
                </ul>
                <Notice
                  className="fr-mb-6w"
                  title={
                    <span className="fr-text--sm fr-text--regular fr-text-default--grey">
                      <strong>Exemple de mention :</strong>
                      <br />
                      Ministère de xxx - Données originales téléchargées
                      sur&nbsp;
                      <Link
                        className="fr-text--sm"
                        href="http://www.data.gouv.fr/fr/datasets/xxx/"
                      >
                        http://www.data.gouv.fr/fr/datasets/xxx/
                      </Link>
                      , mise à jour du 14 février 2017.
                    </span>
                  }
                />
                <h4>2. Licence Creative Commons : CCBY-SA 4.0</h4>
                <p>
                  <strong>
                    Si vous souhaitez que vos ressources publiées sur la
                    plateforme soient réutilisés et partagés dans les mêmes
                    conditions
                  </strong>
                  , c’est à dire sous la même licence, nous vous conseillons
                  :&nbsp;
                  <Link
                    className="fr-link"
                    href="https://creativecommons.org/licenses/by-sa/4.0/deed.fr"
                    target="_blank"
                  >
                    CC BY-SA 4.0
                  </Link>
                </p>
                <p>Les utilisateurs des ressources sont autorisés à :</p>
                <ul>
                  <li>
                    <strong>Partager</strong> — copier, distribuer et
                    communiquer le contenu par tous moyens et sous tous formats,
                  </li>
                  <li>
                    <strong>Adapter</strong> — remixer, transformer et créer à
                    partir du matériel pour toute utilisation, y compris
                    commerciale.
                  </li>
                </ul>
                <p>À condition de :</p>
                <ul>
                  <li>
                    <strong>Citer l'auteur</strong> — Vous devez créditer
                    l’auteur, fournir un lien vers la licence et indiquer si des
                    modifications ont été effectuées.
                  </li>
                  <li>
                    <strong>Partager dans les mêmes conditions</strong> — Si
                    vous modifiez ou transformez ce contenu, vous devez diffuser
                    votre contribution sous la même licence.
                  </li>
                </ul>
                <h4 className="fr-mt-6w">
                  3. Licence Creative Commons : CC BY-NC-SA 4.0
                </h4>
                <p>
                  <strong>
                    Si vous ne souhaitez pas que vos ressources publiées sur la
                    plateforme soient réutilisés à des fins commerciales
                  </strong>
                  , publiez vos ressources sous licence Creative Commons :{' '}
                  <Link
                    className="fr-link"
                    href="https://creativecommons.org/licenses/by-nc-sa/4.0/deed.fr"
                    target="_blank"
                  >
                    CC BY-NC-SA 4.0
                  </Link>
                </p>
                <p>Les utilisateurs des ressources sont autorisés à :</p>
                <ul>
                  <li>
                    <strong>Partager</strong> — copier, distribuer et
                    communiquer le contenu par tous moyens et sous tous formats
                  </li>
                  <li>
                    <strong>Adapter</strong> — remixer, transformer et créer à
                    partir du contenu,
                  </li>
                </ul>
                <p>À condition de :</p>
                <ul>
                  <li>
                    <strong>Citer l'auteur</strong> — Vous devez créditer
                    l’auteur, fournir un lien vers la licence et indiquer si des
                    modifications ont été effectuées.
                  </li>
                  <li>
                    <strong>Pas d'usage commercial</strong> — Vous ne pouvez pas
                    utiliser ce contenu à des fins commerciales.
                  </li>
                  <li>
                    <strong>Partager dans les mêmes conditions</strong> — Si
                    vous modifiez ou transformez ce contenu, vous devez diffuser
                    votre contribution sous la même licence.
                  </li>
                </ul>
                <h4 className="fr-mt-6w">
                  4. Pas de licence - Aucun droit réservé
                </h4>
                <p>
                  <strong>
                    Si vous souhaitez que vos ressources publiées sur la
                    plateforme soient dans le domaine public et libre de
                    restrictions de droits d’auteur
                  </strong>
                  ,&nbsp;vous pouvez également publier vos ressources sans
                  licences.
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
