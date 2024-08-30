import React from 'react'
import type { Metadata } from 'next'
import Notice from '@codegouvfr/react-dsfr/Notice'
import Link from 'next/link'
import { metadataTitle } from '@app/web/app/metadataTitle'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'
import Newsletter from '@app/web/app/(public)/Newsletter'
import ProfilSideMenu from './ProfilSideMenu'

export const revalidate = 0

export const metadata: Metadata = {
  title: metadataTitle(`Centre d'aide`),
}

const ContentPolicyPage = () => (
  <>
    <SkipLinksPortal links={defaultSkipLinks} />
    <div className="fr-container">
      <Breadcrumbs
        parents={[
          { label: 'Centre d’aide', linkProps: { href: '/centre-d-aide' } },
        ]}
        currentPage="Le profil"
      />
    </div>
    <main id={contentId} className="fr-mt-1w fr-mb-15w">
      <div className="fr-container fr-flex">
        <ProfilSideMenu />
        <div className="fr-flex-grow-1">
          <div className="fr-container landing-main-container">
            <div className="fr-grid-row fr-grid-row--center">
              <div className="fr-col-md-8">
                <h1 className="fr-page-title">Le profil</h1>
                <img
                  className="fr-width-full"
                  src="/images/centre-d-aide/profil.svg"
                  alt=""
                />
                <h2 id="un-profil" className="fr-page-title fr-mt-5w fr-mb-4w">
                  Un profil... c’est quoi&nbsp;?
                </h2>
                <p className="fr-text--lg">
                  Votre profil est un espace personnel où vous pouvez accéder à
                  toutes les ressources que vous avez créées, à vos collections,
                  aux bases dont vous êtes membre ainsi qu’aux profils et aux
                  bases que vous suivez.
                </p>
                <p className="fr-text--lg">
                  Votre profil, s’il est public, peut également être utilisé
                  comme un espace personnel de publication.
                </p>
                <p className="fr-text--lg">
                  Un profil peut être{' '}
                  <Link href="le-profil#profil-public" className="fr-link">
                    public
                  </Link>{' '}
                  (visible par tous les visiteurs) ou{' '}
                  <Link href="le-profil#profil-prive" className="fr-link">
                    privé
                  </Link>{' '}
                  (visible uniquement par le créateur du profil).
                </p>
                <p className="fr-text--lg">
                  Lorsque vous vous inscrivez sur Les Bases du numérique
                  d’intérêt général, un profil est automatiquement créé avec les
                  informations que vous remplissez lors de votre inscription. Ce
                  profil est donc personnel et individuel.
                </p>
                <Notice
                  className="fr-mb-7w"
                  title={
                    <span className="fr-text--regular">
                      <span className="fr-text-default--grey fr-text--bold">
                        À savoir pour les utilisateurs de la 1ère version de la
                        plateforme
                      </span>
                      <span className="fr-text-default--grey fr-mt-2w fr-display-block">
                        Si vous aviez créé une base personnelle, c’est-à-dire
                        portant votre nom et prénom, et sur laquelle vous étiez
                        le ou la seule à publier du contenu, celle-ci est
                        automatiquement devenue un profil sur Les Bases.
                      </span>
                    </span>
                  }
                />
                <hr />
                <h2 id="utiliser" className="fr-page-title fr-mt-5w fr-mb-3w">
                  Comment utiliser votre profil&nbsp;?
                </h2>
                <ul>
                  <li>
                    Retrouvez l’ensemble des ressources que vous avez créées ou
                    auxquelles vous avez contribué dans un même espace
                  </li>
                  <li>
                    Créez et publiez (si votre{' '}
                    <Link href="le-profil#profil-public" className="fr-link">
                      profil est public
                    </Link>
                    ) directement vos ressources depuis votre profil
                  </li>
                  <li>
                    Enregistrez des ressources qui vous intéressent grâce aux
                    collections.
                  </li>
                  <li>
                    Rejoignez une ou plusieurs bases pour collaborer à la
                    création de ressources.
                  </li>
                  <li>
                    Suivez les bases & les profils qui vous intéressent pour les
                    retrouver plus facilement.
                  </li>
                </ul>
                <h3 id="profil-public" className="fr-mt-5w">
                  Profil public
                </h3>
                <p className="fr-text--lead fr-text-label--blue-france">
                  Utilisez votre profil comme un espace de publication personnel
                </p>
                <p>
                  Votre page de profil public est l’endroit où les visiteurs de
                  la plateforme peuvent retrouver toutes vos ressources et
                  collections publiques. Votre profil sera référencé dans le
                  moteur de recherche de la plateforme et les visiteurs peuvent
                  également vous suivre afin de retrouver plus facilement vos
                  prochaines ressources publiées.
                </p>
                <p>
                  Les visiteurs pourront également retrouver les informations
                  que vous avez renseigné sur votre profil (prénom, nom,
                  département, description) ainsi que les bases dont vous êtes
                  membres et les bases et profils que vous suivez.
                </p>
                <p className="fr-text--bold">
                  Retrouvez plus de détails sur la visibilité d’
                  <Link href="le-profil#visibilite-profil" className="fr-link">
                    un profil public ici.
                  </Link>
                </p>
                <Notice
                  className="fr-mb-3w"
                  title={
                    <span className="fr-text--regular fr-text-default--grey">
                      Si vous ne souhaitez pas utiliser votre profil comme un
                      espace personnel de publication, vous pouvez modifier la
                      visibilité de votre profil et passer à un profil privé.
                    </span>
                  }
                />
                <h3 id="profil-prive" className="fr-mt-5w">
                  Profil privé
                </h3>
                <p className="fr-text--lead fr-text-label--blue-france">
                  Utilisez votre profil comme un espace de création & de
                  collecte de ressources personnel
                </p>
                <p>
                  Un profil privé vous permet d’avoir un espace de création & de
                  collecte de ressources personnel.
                </p>
                <Notice
                  className="fr-mb-3w"
                  title={
                    <span className="fr-text--regular fr-text-default--grey">
                      Avec un profil “privé”, vous pouvez toujours devenir
                      membre d’une base et publier des ressources sur cette
                      base. Vous pouvez donc toujours participer à des espaces
                      de publications communs.
                    </span>
                  }
                />
                <p>
                  Avec un profil privé, vous n’avez donc plus la possibilité de
                  publier des ressources directement depuis votre profil et
                  votre page profil ne sera pas référencée dans le moteur de
                  recherche de la plateforme. La visibilité de votre profil pour
                  les visiteurs se limitera à votre nom et prénom.
                </p>
                <p>
                  Mis à part cette différence de visibilité, un profil privé
                  vous donne accès aux mêmes usages qu’un profil public.
                </p>
                <p className="fr-text--bold fr-mb-6w">
                  Retrouvez plus de détails sur la visibilité d’
                  <Link href="le-profil#visibilite-profil" className="fr-link">
                    un profil privé ici.
                  </Link>
                </p>
                <hr />
                <h2
                  id="info-profil"
                  className="fr-page-title fr-mt-3w fr-mb-3w"
                >
                  Informations & paramètres du profil
                </h2>
                <p>
                  Dès lors que vous aurez créer votre profil, vous pouvez venir
                  modifier les informations & paramètres de votre profil à tout
                  moment.
                </p>
                <p>
                  Pour modifier les paramètres de votre profil, allez sur votre
                  page profil toujours disponible via le menu déroulant situé en
                  haut à droite dans la barre de navigation et cliquez sur{' '}
                  <strong>‘Voir mon profil’</strong>. Lorsque vous êtes sur
                  votre profil, cliquez sur le bouton{' '}
                  <strong>‘Modifier le profil’</strong> présent dans l’en-tête.
                </p>
                <img
                  alt=""
                  className="fr-width-full fr-mb-2w"
                  src="/images/centre-d-aide/infos_profil.svg"
                />
                <p>
                  Sur cette page, vous pouvez venir modifier les différentes
                  informations & paramètres sur votre profil en cliquant sur le
                  bouton <strong>‘Modifier’ symbolisé par l’icône stylo</strong>{' '}
                  présent en haut à droite de chaque bloc. Après avoir modifier
                  les informations et/ou les paramètres dans un bloc, vous
                  pouvez <strong>‘Enregistrer’</strong> ou{' '}
                  <strong>‘Annuler’</strong> vos modifications pour chacun des
                  blocs.
                </p>
                <h3 className="fr-mt-5w">Image de profil</h3>
                <p>
                  Vous pouvez modifier votre image de profil en cliquant sur le
                  bouton{' '}
                  <strong>
                    ‘Modifier la photo de profil’ symbolisé par l’icône appareil
                    photo
                  </strong>
                  . Par défaut, votre image de profil sera composé des initiales
                  de votre nom & prénom.
                </p>
                <p className="fr-text--bold">Format d’image de profil</p>
                <ul>
                  <li>Taille recommandée&nbsp;: 384x384 px.</li>
                  <li>Poids maximum&nbsp;: 10 Mo.</li>
                  <li>Formats supportés&nbsp;: jpg, png, webp.</li>
                </ul>
                <h3 className="fr-mt-5w">Informations sur votre profil</h3>
                <p>
                  Vous pouvez en dire plus sur vous-même aux visiteurs de votre
                  profil en renseignant les informations suivantes&nbsp;:
                </p>
                <ul>
                  <li>Prénom (obligatoire)</li>
                  <li>Nom (obligatoire)</li>
                  <li>Département (optionnel)</li>
                  <li>Description (optionnel)</li>
                </ul>
                <Notice
                  className="fr-my-2w"
                  title={
                    <span className="fr-text--regular fr-text-default--grey">
                      Dans le cas d’un profil public, ses informations seront
                      visibles via votre page de profil public dans l’onglet{' '}
                      <strong>‘À propos’</strong>. Sur un profil privé, seul
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
                    Adresse mail (obligatoire pour la création de compte, mais
                    vous pouvez choisir de la rendre publique ou non afin de
                    pouvoir être contacté par les visiteurs de la plateforme)
                  </li>
                  <li>Lien vers votre site internet (optionnel)</li>
                  <li>
                    Liens vers vos réseaux sociaux&nbsp;: Facebook, Linkedin, X
                    (Twitter) (optionnel)
                  </li>
                </ul>
                <Notice
                  className="fr-my-2w"
                  title={
                    <span className="fr-text--regular fr-text-default--grey">
                      Dans le cas d’un profil public, ses informations seront
                      visibles via votre page de profil public dans l’onglet{' '}
                      <strong>‘À propos’</strong>.
                    </span>
                  }
                />
                <h3 id="visibilite-profil" className="fr-mt-5w">
                  Visibilité du profil
                </h3>
                <p>
                  Vous pouvez venir modifier à tout moment la visibilité de
                  votre profil. Pour rappel, un profil peut être{' '}
                  <Link className="fr-link" href="le-profil#profil-public">
                    public
                  </Link>{' '}
                  (visible par tous les visiteurs) ou{' '}
                  <Link className="fr-link" href="le-profil#profil-prive">
                    privé
                  </Link>{' '}
                  (visible uniquement par le créateur du profil).
                </p>
                <span className="fr-text--bold">
                  Retrouvez ci-dessous le tableau comparatif des usages entre
                  profil public et privé&nbsp;:
                </span>
                <div className="fr-table fr-table--bordered">
                  <table className="data-table" data-fr-js-table-element="true">
                    <thead>
                      <tr>
                        <th scope="col">
                          <span className="fr-sr-only">Propriétés</span>
                        </th>
                        <th scope="col">Profil&nbsp;public</th>
                        <th scope="col">Profil&nbsp;privé</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="fr-background-contrast--grey">
                        <th colSpan={3}>Visibilité du profil</th>
                      </tr>
                      <tr>
                        <td>
                          Référencé via la moteur de recherche de la plateforme
                        </td>
                        <td>
                          <span
                            aria-hidden="true"
                            className="ri-check-line ri-2x fr-text-label--green-emeraude"
                          />
                          <span className="fr-sr-only">oui</span>
                        </td>
                        <td>
                          <span
                            aria-hidden="true"
                            className="ri-close-line ri-2x fr-text-label--red-marianne"
                          />
                          <span className="fr-sr-only">non</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Les visiteurs peuvent visiter la page de votre profil
                        </td>
                        <td>
                          <span
                            aria-hidden="true"
                            className="ri-check-line ri-2x fr-text-label--green-emeraude"
                          />
                          <span className="fr-sr-only">oui</span>
                        </td>
                        <td>
                          <span
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
                            aria-hidden="true"
                            className="ri-check-line ri-2x fr-text-label--green-emeraude"
                          />
                          <span className="fr-sr-only">oui</span>
                        </td>
                        <td>
                          <span
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
                            aria-hidden="true"
                            className="ri-check-line ri-2x fr-text-label--green-emeraude"
                          />
                          <span className="fr-sr-only">oui</span>
                        </td>
                        <td>
                          <span
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
                            aria-hidden="true"
                            className="ri-check-line ri-2x fr-text-label--green-emeraude"
                          />
                          <span className="fr-sr-only">oui</span>
                        </td>
                        <td>
                          <span
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
                            aria-hidden="true"
                            className="ri-check-line ri-2x fr-text-label--green-emeraude"
                          />
                          <span className="fr-sr-only">oui</span>
                        </td>
                        <td>
                          <span
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
                            aria-hidden="true"
                            className="ri-check-line ri-2x fr-text-label--green-emeraude"
                          />
                          <span className="fr-sr-only">oui</span>
                        </td>
                        <td>
                          <span
                            aria-hidden="true"
                            className="ri-close-line ri-2x fr-text-label--red-marianne"
                          />
                          <span className="fr-sr-only">non</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Créer une ressource publique ou privée dans une base
                          dont je suis membre
                        </td>
                        <td>
                          <span
                            aria-hidden="true"
                            className="ri-check-line ri-2x fr-text-label--green-emeraude"
                          />
                          <span className="fr-sr-only">oui</span>
                        </td>
                        <td>
                          <span
                            aria-hidden="true"
                            className="ri-check-line ri-2x fr-text-label--green-emeraude"
                          />
                          <span className="fr-sr-only">oui</span>
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
                            aria-hidden="true"
                            className="ri-check-line ri-2x fr-text-label--green-emeraude"
                          />
                          <span className="fr-sr-only">oui</span>
                        </td>
                        <td>
                          <span
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
                            aria-hidden="true"
                            className="ri-check-line ri-2x fr-text-label--green-emeraude"
                          />
                          <span className="fr-sr-only">oui</span>
                        </td>
                        <td>
                          <span
                            aria-hidden="true"
                            className="ri-close-line ri-2x fr-text-label--red-marianne"
                          />
                          <span className="fr-sr-only">non</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          Créer une collection publique ou privée dans une base
                          dont je suis membre
                        </td>
                        <td>
                          <span
                            aria-hidden="true"
                            className="ri-check-line ri-2x fr-text-label--green-emeraude"
                          />
                          <span className="fr-sr-only">oui</span>
                        </td>
                        <td>
                          <span
                            aria-hidden="true"
                            className="ri-close-line ri-2x fr-text-label--red-marianne"
                          />
                          <span className="fr-sr-only">non</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <h3 className="fr-mt-5w">Supprimer le profil</h3>
                <p>
                  Cette action est irréversible et entraîne la suppression
                  définitive de votre profil. Dans le cas où vous supprimez
                  votre profil, toutes les ressources dont vous êtes le seul
                  contributeur et les bases dont vous êtes le seul membre seront
                  également supprimées.
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
