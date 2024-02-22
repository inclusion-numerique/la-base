/* eslint jsx-a11y/control-has-associated-label: 0  */
import type { Metadata } from 'next'
import { metadataTitle } from '@app/web/app/metadataTitle'
import Breadcrumbs from '@app/web/components/Breadcrumbs'

export const revalidate = 0
export const metadata: Metadata = {
  title: metadataTitle(`Conditions générales d'utilisation`),
}

const ContentPolicyPage = () => (
  <div className="fr-container">
    <Breadcrumbs currentPage="Conditions générales d'utilisation" />

    <div className="fr-container landing-main-container fr-my-8w">
      <div className="fr-grid-row fr-grid-row--center">
        <div className="fr-col-md-8">
          <h1>Charte et conditions d&#39;utilisation - Les Bases</h1>
          <hr />
          <h2 id="charte-de-la-base">Charte</h2>
          <p>
            <strong>
              Les Bases est une plateforme de mise en réseau des ressources
              produites par les acteurs et actrices du numérique d&#39;intérêt
              général, notamment sur l&#39;inclusion et la médiation numérique.
            </strong>
          </p>
          <hr />
          <p>Le numérique d&#39;intérêt général se veut à la fois :</p>
          <ul>
            <li>
              <strong>inclusif</strong> : aisément appropriable par toutes et
              tous ;
            </li>
            <li>
              <strong>ouvert</strong> : en facilitant l&#39;émergence de communs
              numériques grâce à l&#39;ouverture et la circulation des données
            </li>
            <li>
              <strong>accessible</strong> : compréhensible et utilisable par les
              personnes en situation de handicap
            </li>
            <li>
              <strong>éthique</strong> : respectueux des droits utilisateurs et
              utilisatrices
            </li>
            <li>
              <strong>durable</strong> : sobre pour limiter son empreinte
              environnementale
            </li>
            <li>
              <strong>souverain</strong> : doté de services et technologies
              indépendantes
            </li>
          </ul>
          <p>
            Les Bases permet aux utilisateurs et aux utilisatrices, qu&#39;il
            s&#39;agisse d&#39;agents et agentes de collectivités, de médiateurs
            ou médiatrices numériques, Hubs territoriaux pour un numérique
            inclusif, associations, structures de l&#39;ESS, élus, ou toute
            autre personne intéressée de près ou de loin par le numérique
            d&#39;intérêt général, de partager ou documenter des outils,
            ressources, dispositifs.
          </p>
          <hr />

          <h3>
            <strong>1) Objet</strong>
          </h3>

          <p>
            L&#39;objet de la plateforme est de favoriser la mise en réseau des
            ressources produites par les acteurs et actrices du numérique
            d&#39;intérêt général et l&#39;interconnaissance des actions de tous
            et toutes en faveur du développement d&#39;un numérique
            d&#39;intérêt général.
          </p>
          <p>
            <strong>
              Elle n&#39;a pas vocation à favoriser le démarchage de clients par
              des acteurs commerciaux.
            </strong>
          </p>
          <br />
          <hr />

          <h3>
            <strong>2) Utilisation</strong>
          </h3>

          <h6>Inscription</h6>
          <p>
            Les ressources publiques publiées sont accessibles sans création de
            compte.
          </p>
          <p>
            L&#39;inscription sur Les Bases permet d&#39;administrer une base
            ouverte ou fermée et d&#39;interagir avec les contenus publiés par
            les autres utilisateurs et utilisatrices. Il revient à chaque
            utilisateur et utilisatrice de définir les modalités d&#39;ouverture
            de la base qu&#39;il ou elle administre.
          </p>
          <h6>Publication d&#39;une ressource</h6>
          <p>
            La publication d&#39;une ressource par un utilisateur ou une
            utilisatrice induit une vigilance particulière en matière de droits
            de la propriété intellectuelle. Il importe d&#39;avoir lu les
            conditions ci-dessous avant de publier une ressource.
          </p>

          <p>
            Si dans le cadre de sa ressource, l&#39;utilisateur ou
            l&#39;utilisatrice réutilise des ressources produites par d’autres
            (par exemple, des extraits d’articles de Wikipédia), il ou elle a
            vérifié avant publication que celles-ci sont mises à disposition
            sous des licences permettant cette réutilisation.
          </p>

          <p>
            L&#39;utilisateur-rice peut publier une ressource qu&#39;il-elle
            n&#39;a pas créé si celle-ci est mise à disposition sous une licence
            libre qui permet de la référencer sur Les Bases ou si
            l&#39;utilisateur-rice a obtenu l&#39;autorisation de son
            créateur-rice de la partager sur Les Bases.
          </p>
          <h6>Choix de la licence de la ressource</h6>

          <p>
            L&#39;utilisateur ou l&#39;utilisatrice peut choisir une licence
            pour la ressource au moment de sa publication parmi les licences
            suivantes :
          </p>
          <ul>
            <li>Libre</li>
            <li>Commerciale</li>
            <li>Gratuite</li>
            <li>Autres licences</li>
          </ul>
          <br />
          <hr />
          <h3>3) Hébergement</h3>
          <p>
            L&#39;Agence Nationale de la Cohésion des Territoires (ANCT), en
            tant qu&#39;établissement public au service de l&#39;outillage des
            collectivités territoriales, fournit au secteur du numérique
            d&#39;intérêt général une infrastructure propice à la mise en réseau
            à et l&#39;échange de ressources.
          </p>
          <br />
          <hr />
          <h3>
            <strong>4) Edition des contenus publiés</strong>
          </h3>
          <p>
            L&#39;ANCT n&#39;est responsable que du contenu qu&#39;elle édite
            elle-même ou via ses marques déposées (Conseillers numériques France
            Services, Aidants Connect, Numérique en Commun[s]). Chaque
            utilisateur et utilisatrice est responsable du contenu qu&#39;il ou
            elle publie sur Les Bases.
          </p>
          <p>L&#39;ANCT ne peut en aucun cas être tenue responsable :</p>
          <ul>
            <li>
              du contenu publié par les utilisateurs et les utilisatrices, que
              cela soit dans une fiche ressource ou dans une base ;
            </li>
            <li>
              de la réutilisation des contenus publiés par un utilisateur ou une
              utilisatrice par une personne tierce, que cela soit sur Les Bases
              ou sur tout autre support numérique ou physique.
            </li>
          </ul>
          <br />
          <hr />
          <h3>
            <strong>5) Ressources publiées</strong>
          </h3>
          <p>
            Toute ressource traitant ou oeuvrant au développement du numérique
            d&#39;intérêt général peut être publiée sur Les Bases.
          </p>
          <br />
          <hr />
          <h3>
            <strong>6) Modération</strong>
          </h3>
          <p>
            La modération est effectuée par les utilisateurs et utilisatrices
            grâce à un système de signalements.
            <strong>
              Les personnes utilisant Les Bases s&#39;engagent à publier des
              ressources ou des commentaires respectueux des lois en vigueur
            </strong>
            .
          </p>
          <p>
            L&#39;ANCT est alertée, en dernier ressort, des signalements
            effectuées et peut-être amenée à faire des demandes de modification
            ou de suppression à l&#39;éditeur ou l&#39;éditrice d&#39;une
            ressource, ou modifier ou supprimer elle-même une ressource le cas
            échéant.
          </p>
          <p>
            <strong>
              Si l&#39;ANCT constate que des utilisateurs ou des utilisatrices
              utilisent la plateforme à des fins de démarchage commerciale, elle
              se réserve le droit de contacter le producteur ou la productrice
              de la ressource ou de la base concernée pour lui demander de la
              modifier ou de la supprimer au besoin.
            </strong>
          </p>
        </div>
      </div>
    </div>
  </div>
)
export default ContentPolicyPage
