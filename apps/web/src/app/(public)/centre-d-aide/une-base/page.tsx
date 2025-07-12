import Newsletter from '@app/web/app/(public)/Newsletter'
import { metadataTitle } from '@app/web/app/metadataTitle'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import Notice from '@codegouvfr/react-dsfr/Notice'
import type { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'
import SkipLinksPortal from '../../../../components/SkipLinksPortal'
import { contentId } from '../../../../utils/skipLinks'
import BaseSideMenu from './BaseSideMenu'

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
        currentPage="Une base"
      />
    </div>
    <main id={contentId} className="fr-mb-15w">
      <div className="fr-container fr-flex fr-mt-6w">
        <BaseSideMenu />
        <div className="fr-flex-grow-1 ">
          <div className="fr-container landing-main-container">
            <div className="fr-grid-row fr-grid-row--center">
              <div className="fr-col-md-8">
                <h1 className="fr-page-title">Une base</h1>
                <img
                  className="fr-width-full"
                  src="/images/centre-d-aide/base.svg"
                  alt=""
                />
                <h2 id="base" className="fr-page-title fr-mt-5w fr-mb-3w">
                  Une base, c’est quoi&nbsp;?
                </h2>
                <p className="fr-text--lg">
                  Une base est un espace collaboratif entre plusieurs membres
                  souhaitant produire et/ou publier des ressources en commun.
                </p>
                <p className="fr-text--lg">
                  Une base peut notamment représenter une structure, une
                  administration, un collectif qui souhaite regrouper et publier
                  diverses ressources relatives à son activité, ses outils,
                  guides, etc.
                </p>
                <p className="fr-text--lg">
                  Une base, si elle est publique, sert d’espace de publication
                  commun pour ses membres.
                </p>
                <p className="fr-text--lg fr-mb-6w">
                  Une base peut être{' '}
                  <Link className="fr-link" href="une-base#base-publique">
                    publique
                  </Link>{' '}
                  (visible par tous les visiteurs) ou{' '}
                  <Link className="fr-link" href="une-base#base-privee">
                    privée
                  </Link>{' '}
                  (visible uniquement par ses membres).
                </p>
                <hr />
                <h2
                  id="utiliser-base"
                  className="fr-page-title fr-mt-5w fr-mb-3w"
                >
                  Comment utiliser une base&nbsp;?
                </h2>
                <ul>
                  <li>
                    Créez et publiez (si votre base est publique) des ressources
                    en commun depuis votre base
                  </li>
                  <li>
                    Retrouvez l’ensemble des ressources créées par les membres
                    de votre base
                  </li>
                  <li>
                    Enregistrez des ressources dans des collections communes
                  </li>
                  <li>
                    Retrouvez et gérez les membres de votre base et leurs rôles
                  </li>
                </ul>
                <p>
                  Les membres d’une base peuvent éditer l’ensemble de ses
                  contenus (ressources, collections, informations et paramètres)
                  ainsi qu’inviter de nouveaux membres. Retrouvez plus
                  d’informations{' '}
                  <Link
                    className="fr-link"
                    href="une-base#roles-et-permissions"
                  >
                    les rôles et les permissions ici
                  </Link>
                  .
                </p>
                <h3 id="base-publique" className="fr-mt-5w">
                  Base publique
                </h3>
                <p className="fr-text--lead fr-text-label--blue-france">
                  Utilisez votre base comme un espace de publication commun
                </p>
                <p>
                  Votre base publique est l’endroit où les visiteurs de la
                  plateforme peuvent retrouver toutes les ressources et
                  collections publiques créées par ses membres. Votre base sera
                  référencée dans le moteur de recherche de la plateforme et les
                  visiteurs peuvent également suivre votre base afin de
                  retrouver plus facilement les prochaines ressources publiées
                  sur celle-ci.
                </p>
                <p>
                  Les visiteurs pourront également retrouver les informations
                  que vous avez renseignées sur votre base (nom de la base,
                  département, description) ainsi que les membres et leurs
                  rôles.
                </p>
                <p className="fr-text--bold">
                  Retrouvez plus de détails sur la visibilité d’
                  <Link className="fr-link" href="une-base#visibilite-base">
                    une base publique ici.
                  </Link>
                </p>
                <Notice
                  className="fr-mb-3w"
                  title={
                    <span className="fr-text--regular fr-text-default--grey">
                      Si vous ne souhaitez pas utiliser votre base comme un
                      espace de publication commun, vous pouvez modifier la
                      visibilité de votre base et passer à une base privée.
                    </span>
                  }
                />
                <h3 id="base-privee" className="fr-mt-5w">
                  Base privée
                </h3>
                <p className="fr-text--lead fr-text-label--blue-france">
                  Utilisez votre base comme un espace de création & de collecte
                  de ressources commun
                </p>
                <p>
                  Si vous ne souhaitez pas utiliser votre base comme un espace
                  de publication commun, vous pouvez la passer en “privée”.
                </p>
                <p>
                  Une base privée vous permet d’avoir un espace commun de
                  création et de collecte de ressources partagé et visible
                  uniquement par les personnes qui en sont membres.
                </p>
                <p className="fr-text--bold">
                  Retrouvez plus de détails sur les usages d’
                  <Link className="fr-link" href="une-base#visibilite-base">
                    une base privée ici.
                  </Link>
                </p>
                <hr />
                <h2 id="creer-base" className="fr-page-title">
                  Créer une base
                </h2>
                <p>
                  Pour créer une nouvelle base, cliquez sur votre nom situé en
                  haut à droite dans la barre de navigation puis sur{' '}
                  <strong>“Créer une base”</strong> dans le menu déroulant.
                </p>
                <p>
                  Vous accédez ensuite au formulaire de création d’une base qui
                  va vous permettre de compléter les informations
                  suivantes&nbsp;:
                </p>
                <span className="fr-text--bold">
                  Renseigner des informations de la base&nbsp;:
                </span>
                <ul>
                  <li>Nom de la base (obligatoire)</li>
                  <li>Département (optionnel)</li>
                  <li>Description (optionnel)</li>
                </ul>
                <span className="fr-text--bold">
                  Renseigner des informations de contacts&nbsp;:
                </span>
                <ul className="fr-mb-2w">
                  <li>Adresse mail (obligatoire)</li>
                  <li>Liens vers un site internet (optionnel)</li>
                  <li>
                    Liens vers vos réseaux sociaux&nbsp;: Facebook, Linkedin, X
                    (Twitter) (optionnel)
                  </li>
                </ul>
                <p>
                  <span className="fr-text--bold">
                    Choisir la visibilité de la base&nbsp;:
                  </span>
                  publique ou privée -{' '}
                  <Link className="fr-link" href="une-base#visibilite-base">
                    en savoir plus ici
                  </Link>
                </p>
                <p>
                  <span className="fr-text--bold">Inviter des membres - </span>
                  <Link className="fr-link" href="une-base#membre-base">
                    en savoir plus ici
                  </Link>
                </p>
                <p>
                  <span className="fr-text--bold">
                    Ajouter un logo/une image de base et une image de couverture
                    -{' '}
                  </span>
                  <Link className="fr-link" href="une-base#image-et-logo">
                    en savoir plus ici
                  </Link>
                </p>
                <p>
                  Dès que vous avez renseigné les informations souhaitées, vous
                  pouvez cliquer en bas du formulaire sur le bouton{' '}
                  <strong>‘Créer la base’.</strong>
                </p>
                <Notice
                  className="fr-mb-6w"
                  title={
                    <span className="fr-text--regular fr-text-default--grey">
                      Vous pourrez modifier à tout moment les informations & les
                      paramètres de votre base en allant sur la page de votre
                      base et en cliquant sur le bouton ‘Modifier votre base’
                      présent dans l’en-tête.{' '}
                      <Link className="fr-link" href="une-base#infos-base">
                        En savoir plus ici
                      </Link>
                    </span>
                  }
                />
                <hr />
                <h2
                  id="membre-base"
                  className="fr-page-title fr-mt-3w fr-mb-3w"
                >
                  Gérer les membres d’une base
                </h2>
                <h3 id="roles-et-permissions" className="fr-mt-5w">
                  Les rôles & leurs permissions
                </h3>
                <p>
                  Sur une base, deux rôles sont disponibles&nbsp;:{' '}
                  <strong>Administrateur & contributeur</strong>
                </p>
                <p>
                  Le créateur d’une base est par défaut l’administrateur de
                  celle-ci. Les administrateurs peuvent nommer d’autres
                  administrateurs et ajouter et supprimer des contributeurs.
                </p>
                <p>
                  Retrouvez dans le tableau ci-dessous les différentes
                  permissions de ces deux rôles&nbsp;:
                </p>
                <div className="fr-table fr-table--bordered">
                  <table className="data-table" data-fr-js-table-element="true">
                    <thead>
                      <tr>
                        <th scope="col">
                          <span className="fr-sr-only">Propriétés</span>
                        </th>
                        <th scope="col">Administrateur</th>
                        <th scope="col">Contributeur</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="fr-background-contrast--grey">
                        <th colSpan={3}>
                          Permissions sur les ressources de la base
                        </th>
                      </tr>
                      <tr>
                        <td>Créer une ressource</td>
                        <td>
                          <span
                            role="img"
                            aria-hidden="true"
                            className="ri-check-line ri-2x fr-text-label--green-emeraude"
                          />
                          <span className="fr-sr-only">oui</span>
                        </td>
                        <td>
                          <span
                            role="img"
                            aria-hidden="true"
                            className="ri-check-line ri-2x fr-text-label--green-emeraude"
                          />
                          <span className="fr-sr-only">oui</span>
                        </td>
                      </tr>
                      <tr>
                        <td>Éditer une ressource</td>
                        <td>
                          <span
                            role="img"
                            aria-hidden="true"
                            className="ri-check-line ri-2x fr-text-label--green-emeraude"
                          />
                          <span className="fr-sr-only">oui</span>
                        </td>
                        <td>
                          <span
                            role="img"
                            aria-hidden="true"
                            className="ri-check-line ri-2x fr-text-label--green-emeraude"
                          />
                          <span className="fr-sr-only">oui</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Inviter/supprimer un contributeur sur une ressource
                        </td>
                        <td>
                          <span
                            role="img"
                            aria-hidden="true"
                            className="ri-check-line ri-2x fr-text-label--green-emeraude"
                          />
                          <span className="fr-sr-only">oui</span>
                        </td>
                        <td>
                          <span
                            role="img"
                            aria-hidden="true"
                            className="ri-check-line ri-2x fr-text-label--green-emeraude"
                          />
                          <span className="fr-sr-only">oui</span>
                        </td>
                      </tr>
                      <tr>
                        <td>Supprimer une ressource</td>
                        <td>
                          <span
                            role="img"
                            aria-hidden="true"
                            className="ri-check-line ri-2x fr-text-label--green-emeraude"
                          />
                          <span className="fr-sr-only">oui</span>
                        </td>
                        <td>
                          <span
                            role="img"
                            aria-hidden="true"
                            className="ri-check-line ri-2x fr-text-label--green-emeraude"
                          />
                          <span className="fr-sr-only">oui</span>
                        </td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr className="fr-background-contrast--grey">
                        <th colSpan={3}>
                          Permissions sur les collections de la base
                        </th>
                      </tr>
                      <tr>
                        <td>Créer une collection</td>
                        <td>
                          <span
                            role="img"
                            aria-hidden="true"
                            className="ri-check-line ri-2x fr-text-label--green-emeraude"
                          />
                          <span className="fr-sr-only">oui</span>
                        </td>
                        <td>
                          <span
                            role="img"
                            aria-hidden="true"
                            className="ri-check-line ri-2x fr-text-label--green-emeraude"
                          />
                          <span className="fr-sr-only">oui</span>
                        </td>
                      </tr>
                      <tr>
                        <td>Éditer une collection</td>
                        <td>
                          <span
                            role="img"
                            aria-hidden="true"
                            className="ri-check-line ri-2x fr-text-label--green-emeraude"
                          />
                          <span className="fr-sr-only">oui</span>
                        </td>
                        <td>
                          <span
                            role="img"
                            aria-hidden="true"
                            className="ri-check-line ri-2x fr-text-label--green-emeraude"
                          />
                          <span className="fr-sr-only">oui</span>
                        </td>
                      </tr>
                      <tr>
                        <td>Supprimer une collection</td>
                        <td>
                          <span
                            role="img"
                            aria-hidden="true"
                            className="ri-check-line ri-2x fr-text-label--green-emeraude"
                          />
                          <span className="fr-sr-only">oui</span>
                        </td>
                        <td>
                          <span
                            role="img"
                            aria-hidden="true"
                            className="ri-check-line ri-2x fr-text-label--green-emeraude"
                          />
                          <span className="fr-sr-only">oui</span>
                        </td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr className="fr-background-contrast--grey">
                        <th colSpan={3}>
                          Permissions sur les informations & paramètres de la
                          base
                        </th>
                      </tr>
                      <tr>
                        <td>Éditer les informations & paramètres de la base</td>
                        <td>
                          <span
                            role="img"
                            aria-hidden="true"
                            className="ri-check-line ri-2x fr-text-label--green-emeraude"
                          />
                          <span className="fr-sr-only">oui</span>
                        </td>
                        <td>
                          <span
                            role="img"
                            aria-hidden="true"
                            className="ri-check-line ri-2x fr-text-label--green-emeraude"
                          />
                          <span className="fr-sr-only">oui</span>
                        </td>
                      </tr>
                      <tr>
                        <td>Supprimer la base</td>
                        <td>
                          <span
                            role="img"
                            aria-hidden="true"
                            className="ri-check-line ri-2x fr-text-label--green-emeraude"
                          />
                          <span className="fr-sr-only">oui</span>
                        </td>
                        <td>
                          <span
                            role="img"
                            aria-hidden="true"
                            className="ri-close-line ri-2x fr-text-label--red-marianne"
                          />
                          <span className="fr-sr-only">non</span>
                        </td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr className="fr-background-contrast--grey">
                        <th colSpan={3}>
                          Permissions sur la gestion des membres de la base
                        </th>
                      </tr>
                      <tr>
                        <td>Inviter un membre</td>
                        <td>
                          <span
                            role="img"
                            aria-hidden="true"
                            className="ri-check-line ri-2x fr-text-label--green-emeraude"
                          />
                          <span className="fr-sr-only">oui</span>
                        </td>
                        <td>
                          <span
                            role="img"
                            aria-hidden="true"
                            className="ri-check-line ri-2x fr-text-label--green-emeraude"
                          />
                          <span className="fr-sr-only">oui</span>
                        </td>
                      </tr>
                      <tr>
                        <td>Modifier le rôle d’un membre</td>
                        <td>
                          <span
                            role="img"
                            aria-hidden="true"
                            className="ri-check-line ri-2x fr-text-label--green-emeraude"
                          />
                          <span className="fr-sr-only">oui</span>
                        </td>
                        <td>
                          <span
                            role="img"
                            aria-hidden="true"
                            className="ri-close-line ri-2x fr-text-label--red-marianne"
                          />
                          <span className="fr-sr-only">non</span>
                        </td>
                      </tr>
                      <tr>
                        <td>Supprimer un membre</td>
                        <td>
                          <span
                            role="img"
                            aria-hidden="true"
                            className="ri-check-line ri-2x fr-text-label--green-emeraude"
                          />
                          <span className="fr-sr-only">oui</span>
                        </td>
                        <td>
                          <span
                            role="img"
                            aria-hidden="true"
                            className="ri-close-line ri-2x fr-text-label--red-marianne"
                          />
                          <span className="fr-sr-only">non</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <h3 className="fr-mt-5w">Inviter/supprimer un membre</h3>
                <h4 className="fr-text--lead fr-mb-0">Inviter un membre</h4>
                <p>
                  Pour inviter un membre dans une de vos bases, allez dans
                  l’onglet <strong>‘Membres’</strong> de votre base, puis
                  cliquez sur le bouton <strong>‘Inviter un membre’.</strong>
                </p>
                <p>
                  Un menu va ensuite vous permettre d’inviter un ou plusieurs
                  nouveaux membres en renseignant&nbsp;:
                </p>
                <ul>
                  <li>Nom/prénom ou adresse mail s’ils ont déjà un profil</li>
                  <li>Adresse mail s’ils n’ont pas encore créé leur profil</li>
                </ul>
                <Notice
                  className="fr-mb-2w"
                  title={
                    <span className="fr-text--regular fr-text-default--grey">
                      Tous les membres d’une base peuvent ajouter des membres.
                      Si vous êtes administrateur, vous pouvez choisir leur
                      rôle.
                    </span>
                  }
                />
                <h4 className="fr-text--lead fr-mb-0">Supprimer un membre</h4>
                <p>
                  Pour supprimer un membre dans une de vos bases, allez dans
                  l’onglet <strong>‘Membres’</strong> de votre base, puis
                  cliquez sur le bouton <strong>’Retirer’</strong>
                </p>
                <Notice
                  className="fr-mb-6w"
                  title={
                    <span className="fr-text--regular fr-text-default--grey">
                      Seuls les administrateurs peuvent supprimer les membres
                      d’une base
                    </span>
                  }
                />
                <hr />
                <h2 id="infos-base" className="fr-page-title fr-mt-3w fr-mb-3w">
                  Informations & paramètres d’une base
                </h2>
                <p>
                  Dès lors que vous aurez créer une base, vous pouvez venir
                  modifier les informations & paramètres de votre base à tout
                  moment.
                </p>
                <p>
                  Pour modifier les paramètres de votre base, allez sur votre
                  base toujours disponible via le menu déroulant situé en haut à
                  droite dans la barre de navigation et cliquez sur{' '}
                  <strong>‘le nom de votre base’.</strong> Lorsque vous êtes sur
                  votre base, cliquez sur le bouton{' '}
                  <strong>‘Modifier la base’</strong> présent dans l’en-tête.
                </p>
                <img
                  className="fr-width-full fr-mb-2w"
                  src="/images/centre-d-aide/infos_base.svg"
                  alt=""
                />
                <p>
                  Sur cette page, vous pouvez venir modifier les différentes
                  informations & paramètres d’une base en cliquant sur le bouton{' '}
                  <strong>‘Modifier’ symbolisé par l’icône stylo</strong>{' '}
                  présent en haut à droite de chaque bloc. Après avoir modifier
                  les informations et/ou les paramètres dans un bloc, vous
                  pouvez
                  <strong>‘Enregistrer’</strong> ou <strong>‘Annuler’</strong>{' '}
                  vos modifications.
                </p>
                <p>
                  Retrouvez ci-dessous la liste des informations & paramètres
                  disponibles dans une base&nbsp;:
                </p>
                <h3 id="image-et-logo" className="fr-mt-5w">
                  Image de couverture & logo d’une base
                </h3>
                <p>
                  Vous pouvez modifier à tout moment le logo/image de base et
                  l’image de couverture de la base en cliquant sur le bouton{' '}
                  <strong>
                    “Modifier la photo” symbolisé par l’icône appareil
                  </strong>{' '}
                  photo en bas à droite du logo/image de base ou de l’image de
                  couverture.
                </p>
                <p>
                  <strong>
                    Format d’image du logo/image de votre base&nbsp;:
                  </strong>
                </p>
                <ul className="fr-mb-2w">
                  <li>Taille recommandée&nbsp;: 384x384 px.</li>
                  <li>Poids maximum&nbsp;: 10 Mo.</li>
                  <li>Formats supportés&nbsp;: jpg, png, webp.</li>
                </ul>
                <Notice
                  className="fr-mb-4w"
                  title={
                    <span className="fr-text--regular fr-text-default--grey">
                      Lorsque l’emplacement pour le logo de la base est vide, un
                      icône provenant de la libraire Open Source{' '}
                      <Link
                        className="fr-link"
                        href="https://avvvatars.com"
                        target="_blank"
                        rel="noreferrer"
                      >
                        avvvatars.com
                      </Link>{' '}
                      est intégré par défaut.
                    </span>
                  }
                />
                <p className="fr-text--bold">
                  Format d’image de couverture d’une base&nbsp;:
                </p>
                <ul>
                  <li>Taille recommandée&nbsp;: 2400x500 px.</li>
                  <li>Poids maximum&nbsp;: 10 Mo.</li>
                  <li>Formats supportés&nbsp;: jpg, png, webp.</li>
                </ul>
                <h3 className="fr-mt-5w">Informations de la base</h3>
                <p>
                  Vous pouvez en dire plus aux visiteurs de votre base en
                  renseignant les informations suivantes&nbsp;:
                </p>
                <ul>
                  <li>Nom de la base (obligatoire)</li>
                  <li>Département (optionnel)</li>
                  <li>
                    Description (optionnel)&nbsp;: Les 200 premiers caractères
                    de votre description seront directement visibles via le
                    moteur de recherche de la plateforme afin d’offrir aux
                    visiteurs d’avantage de contexte sur votre base.
                  </li>
                </ul>
                <Notice
                  className="fr-my-2w"
                  title={
                    <span className="fr-text--regular fr-text-default--grey">
                      Dans le cas d’un profil public, ses informations seront
                      visibles via votre page de profil public dans l’onglet{' '}
                      <strong>‘À propos’.</strong> Sur un profil privé, seul
                      votre nom & prénom seront visibles.
                    </span>
                  }
                />
                <h3 className="fr-mt-5w">Contacts</h3>
                <p>
                  Vous pouvez renseigner dans ce bloc différentes informations
                  de contacts&nbsp;:
                </p>
                <ul>
                  <li>
                    Adresse mail (obligatoire pour la création d’une base, mais
                    vous pouvez choisir de la rendre publique ou non afin de
                    pouvoir être contacté par les visiteurs de la plateforme)
                  </li>
                  <li>Lien vers votre site internet (optionnel)</li>
                  <li>
                    Liens vers vos réseaux sociaux&nbsp;: Facebook, Linkedin, X
                    (Twitter) (optionnel)
                  </li>
                </ul>
                <h3 id="visibilite-base" className="fr-mt-5w">
                  Visibilité de la base
                </h3>
                <p>
                  Vous pouvez venir modifier à tout moment la visibilité d’une
                  base dont vous êtes membre. Pour rappel, une base peut être{' '}
                  <Link className="fr-link" href="une-base#base-publique">
                    publique
                  </Link>{' '}
                  (visible par tous les visiteurs) ou{' '}
                  <Link className="fr-link" href="une-base#base-privee">
                    privée
                  </Link>{' '}
                  (Visible uniquement par les membres de votre base).
                </p>
                <p className="fr-text--bold">
                  Retrouvez ci-dessous le tableau comparatif des usages entre
                  base publique et privée&nbsp;:
                </p>
                <div
                  className="fr-table fr-table--bordered"
                  data-fr-js-table="true"
                >
                  <table className="data-table" data-fr-js-table-element="true">
                    <thead>
                      <tr>
                        <th scope="col">
                          <span className="fr-sr-only">Propriétés</span>
                        </th>
                        <th scope="col">Base&nbsp;publique</th>
                        <th scope="col">Base&nbsp;privée</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="fr-background-contrast--grey">
                        <th colSpan={3}>Visibilité de la base</th>
                      </tr>
                      <tr>
                        <td>
                          Référencée via la moteur de recherche de la
                          plateformee
                        </td>
                        <td>
                          <span
                            role="img"
                            aria-hidden="true"
                            className="ri-check-line ri-2x fr-text-label--green-emeraude"
                          />
                          <span className="fr-sr-only">oui</span>
                        </td>
                        <td>
                          <span
                            role="img"
                            aria-hidden="true"
                            className="ri-close-line ri-2x fr-text-label--red-marianne"
                          />
                          <span className="fr-sr-only">non</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Les visiteurs peuvent visiter la page de votre base
                        </td>
                        <td>
                          <span
                            role="img"
                            aria-hidden="true"
                            className="ri-check-line ri-2x fr-text-label--green-emeraude"
                          />
                          <span className="fr-sr-only">oui</span>
                        </td>
                        <td>
                          <span
                            role="img"
                            aria-hidden="true"
                            className="ri-close-line ri-2x fr-text-label--red-marianne"
                          />
                          <span className="fr-sr-only">non</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Les visiteurs peuvent voir vos ressources et
                          collections publiques
                        </td>
                        <td>
                          <span
                            role="img"
                            aria-hidden="true"
                            className="ri-check-line ri-2x fr-text-label--green-emeraude"
                          />
                          <span className="fr-sr-only">oui</span>
                        </td>
                        <td>
                          <span
                            role="img"
                            aria-hidden="true"
                            className="ri-close-line ri-2x fr-text-label--red-marianne"
                          />
                          <span className="fr-sr-only">non</span>
                        </td>
                      </tr>
                      <tr>
                        <td>Les visiteurs peuvent vous suivre</td>
                        <td>
                          <span
                            role="img"
                            aria-hidden="true"
                            className="ri-check-line ri-2x fr-text-label--green-emeraude"
                          />
                          <span className="fr-sr-only">oui</span>
                        </td>
                        <td>
                          <span
                            role="img"
                            aria-hidden="true"
                            className="ri-close-line ri-2x fr-text-label--red-marianne"
                          />
                          <span className="fr-sr-only">non</span>
                        </td>
                      </tr>
                      <tr>
                        <td>Les visiteurs peuvent vous contacter</td>
                        <td>
                          <span
                            role="img"
                            aria-hidden="true"
                            className="ri-check-line ri-2x fr-text-label--green-emeraude"
                          />
                          <span className="fr-sr-only">oui</span>
                        </td>
                        <td>
                          <span
                            role="img"
                            aria-hidden="true"
                            className="ri-close-line ri-2x fr-text-label--red-marianne"
                          />
                          <span className="fr-sr-only">non</span>
                        </td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr className="fr-background-contrast--grey">
                        <th colSpan={3}>Les ressources</th>
                      </tr>
                      <tr>
                        <td>Créer une ressource privée</td>
                        <td>
                          <span
                            role="img"
                            aria-hidden="true"
                            className="ri-check-line ri-2x fr-text-label--green-emeraude"
                          />
                          <span className="fr-sr-only">oui</span>
                        </td>
                        <td>
                          <span
                            role="img"
                            aria-hidden="true"
                            className="ri-check-line ri-2x fr-text-label--green-emeraude"
                          />
                          <span className="fr-sr-only">oui</span>
                        </td>
                      </tr>
                      <tr>
                        <td>Créer une ressource publique</td>
                        <td>
                          <span
                            role="img"
                            aria-hidden="true"
                            className="ri-check-line ri-2x fr-text-label--green-emeraude"
                          />
                          <span className="fr-sr-only">oui</span>
                        </td>
                        <td>
                          <span
                            role="img"
                            aria-hidden="true"
                            className="ri-close-line ri-2x fr-text-label--red-marianne"
                          />
                          <span className="fr-sr-only">non</span>
                        </td>
                      </tr>
                      <tr>
                        <td>Inviter un contributeur sur une ressource</td>
                        <td>
                          <span
                            aria-hidden="true"
                            className="ri-check-line ri-2x fr-text-label--green-emeraude"
                          />
                          <span className="fr-sr-only">oui</span>
                        </td>
                        <td>
                          <span
                            role="img"
                            aria-hidden="true"
                            className="ri-check-line ri-2x fr-text-label--green-emeraude"
                          />
                          <span className="fr-sr-only">oui</span>
                        </td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr className="fr-background-contrast--grey">
                        <th colSpan={3}>Les collections</th>
                      </tr>
                      <tr>
                        <td>Créer une collection privée</td>
                        <td>
                          <span
                            role="img"
                            aria-hidden="true"
                            className="ri-check-line ri-2x fr-text-label--green-emeraude"
                          />
                          <span className="fr-sr-only">oui</span>
                        </td>
                        <td>
                          <span
                            role="img"
                            aria-hidden="true"
                            className="ri-check-line ri-2x fr-text-label--green-emeraude"
                          />
                          <span className="fr-sr-only">oui</span>
                        </td>
                      </tr>
                      <tr>
                        <td>Créer une collection publique</td>
                        <td>
                          <span
                            role="img"
                            aria-hidden="true"
                            className="ri-check-line ri-2x fr-text-label--green-emeraude"
                          />
                          <span className="fr-sr-only">oui</span>
                        </td>
                        <td>
                          <span
                            role="img"
                            aria-hidden="true"
                            className="ri-close-line ri-2x fr-text-label--red-marianne"
                          />
                          <span className="fr-sr-only">non</span>
                        </td>
                      </tr>
                    </tbody>
                    <tbody>
                      <tr className="fr-background-contrast--grey">
                        <th colSpan={3}>Les membres de la base</th>
                      </tr>
                      <tr>
                        <td>Inviter un membre</td>
                        <td>
                          <span
                            role="img"
                            aria-hidden="true"
                            className="ri-check-line ri-2x fr-text-label--green-emeraude"
                          />
                          <span className="fr-sr-only">oui</span>
                        </td>
                        <td>
                          <span
                            role="img"
                            aria-hidden="true"
                            className="ri-check-line ri-2x fr-text-label--green-emeraude"
                          />
                          <span className="fr-sr-only">oui</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <h3 className="fr-mt-5w">Supprimer la base</h3>
                <p>
                  Cette action est irréversible et entraîne la suppression
                  définitive de votre base. Dans le cas où vous supprimer votre
                  base, toutes les ressources de la base seront supprimés
                  définitivement.
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
