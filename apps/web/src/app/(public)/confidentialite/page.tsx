/* eslint jsx-a11y/control-has-associated-label: 0  */
import type { Metadata } from 'next'
import Link from 'next/link'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import { metadataTitle } from '@app/web/app/metadataTitle'
import Breadcrumbs from '@app/web/components/Breadcrumbs'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import { contentId, defaultSkipLinks } from '@app/web/utils/skipLinks'

export const revalidate = 0
export const metadata: Metadata = {
  title: metadataTitle('Politique de confidentialité'),
}

const ConfidentialityPage = () => (
  <div className="fr-container">
    <SkipLinksPortal links={defaultSkipLinks} />
    <Breadcrumbs currentPage="Politique de confidentialité" />
    <main
      id={contentId}
      className="fr-container landing-main-container fr-my-8w"
    >
      <div className="fr-grid-row fr-grid-row--center">
        <div className="fr-col-md-8">
          <h1>
            Politique de confidentialité - {PublicWebAppConfig.projectTitle}
          </h1>

          <p>Dernière mise à jour le 02/12/2024</p>

          <h2>Qui sommes-nous ?</h2>

          <p>Les Bases est un service public numérique développé au sein de 
            l’Incubateur des territoires de l’Agence Nationale de la Cohésion 
            des Territoires (ANCT). Il s’agit d’une plateforme qui facilite le 
            partage des ressources et des communs pour les acteurs de l’inclusion 
            numérique.</p>
            
            <p>Le responsable de traitement est l’ANCT,  représentée par Monsieur 
              Stanislas Bourron, Directeur général.</p>


              <p>
            Pour toute question ou demande relative à vos droits, vous pouvez
            nous contacter à l&apos;adresse&nbsp;
            <a
              href={
                PublicWebAppConfig.contactEmail &&
                `mailto:${PublicWebAppConfig.contactEmail}`
              }
            >
              {PublicWebAppConfig.contactEmail}
            </a>
            .
          </p>

          <h2>Pourquoi traitons-nous des données à caractère personnel ?</h2>

          <p>Les Bases traite des données à caractère personnel pour mettre à 
            disposition des acteurs de l’inclusion numérique un espace de partage de 
            ressources et de communs, qui se matérialise également par la création 
            d’un compte pour publier des contenus, les évaluer ou les recommander.</p>


          <h2>Quelles sont les données à caractère personnel que nous traitons ?</h2>

          <ul>
            <li>Données relatives aux utilisateurs : nom, prénom, adresse e-mail ;</li>
            <li>Données relatives à la lettre d’information : nom, prénom, adresse e-mail.</li>
          </ul>

          <h2>Qu’est-ce qui nous autorise à traiter des données à caractère personnel ?</h2>

                  

          <div className="fr-table" data-fr-js-table="true">
            <table className="data-table" data-fr-js-table-element="true">
              <thead>
                <tr>
                  <th scope="col">Catégories de données</th>
                  <th scope="col">Durée de conservation</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Données relatives aux utilisateurs</td>
                  <td>1 an à partir du dernier contact</td>
                </tr>
                <tr>
                  <td>Données relatives à la lettre d’information</td>
                  <td>Jusqu’à la désinscription</td>
                </tr>
                
              </tbody>
            </table>
          </div>

          <h2>Quels sont vos droits ?</h2>

          <p>
          Vous disposez :
            <ul>
              <li>D’un droit d’information et d’accès à vos données ;</li>
              <li>D’un droit de rectification ;</li>
              <li>D’un droit d’opposition ;</li>
              <li>D’un droit à la limitation du traitement de vos données.</li>
            </ul>          
          </p>
          <p>Pour exercer vos droits, vous pouvez nous contacter à : 
            <a
                href={
                  PublicWebAppConfig.contactEmail &&
                  `mailto:${PublicWebAppConfig.contactEmail}`
                }
              >
                {PublicWebAppConfig.contactEmail}
            </a>
          </p>
          <p>Ou contacter la déléguée à la protection des données à : dpo@anct.gouv.fr{/* ajouter un lien mailto */}
          </p>
          <p>Puisque ce sont des droits personnels, nous ne traiterons votre 
            demande que si nous sommes en mesure de vous identifier. Dans le 
            cas contraire, nous pouvons être amenés à vous demander une preuve 
            de votre identité.</p>*
          <p>Nous nous engageons à répondre à votre demande dans un délai 
            raisonnable qui ne saurait excéder 1 mois à compter de la réception 
            de votre demande. Si vous estimez que vos droits n’ont pas été respectés 
            après nous avoir contactés, vous pouvez adresser une réclamation à la CNIL.</p>

          <h2>Qui peut avoir accès à vos données ?</h2>

          <p> Les personnes suivantes ont accès à vos données en tant que destinataires :</p>
            <ul>
              <li>Les membres habilités de l’équipe Les Bases (administrateurs, développeurs 
                notamment) ont accès à vos données (notamment l’adresse e-mail), dans le 
                cadre de leurs missions.</li>
            </ul>
            
          <p>Autrement, la plateforme est publique et à destination de la communauté, les 
            noms et prénoms sont visibles par tous.</p>
          

          <h2>Qui nous aide à traiter vos données ?</h2>

          <p>Certaines données sont communiquées à des « sous-traitants » qui 
            agissent pour le compte de l’ANCT, selon ses instructions.</p>

          <div className="fr-table" data-fr-js-table="true">
            <table className="data-table" data-fr-js-table-element="true">
              <thead>
                <tr>
                  <th scope="col">Sous-traitant</th>
                  <th scope="col">Traitement réalisé</th>
                  <th scope="col">Pays destinataire</th>
                  <th scope="col">Garanties</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Scaleway</td>
                  <td>Hébergement</td>
                  <td>France</td>
                  <td>https://www-uploads.scaleway.com/DPA_FR_v17072024_439cb4fdae.pdf</td> {/* ajouter lien */}
                </tr>
                <tr>
                  <td>Brevo</td>
                  <td>Gestion de la lettre d’information</td>
                  <td>France</td>
                  <td>https://www.brevo.com/fr/legal/termsofuse/#accord-sur-le-traitement-des-donnees-a-caractere-personnel-dpa</td> {/* ajouter lien */}
                </tr>
                
              </tbody>
            </table>
          </div>

          <h2>Cookies et traceurs</h2>

          <p>Un cookie est un fichier déposé sur votre terminal lors de la 
            visite d’un site. Il a pour but de collecter des informations 
            relatives à votre navigation et de vous adresser des services 
            adaptés à votre terminal (ordinateur, mobile ou tablette).</p>
          
          <p>En application de l’article 5-3 de la directive ePrivacy, 
            transposée à l’article 82 de la loi n° 78-17 du 6 janvier 1978 
            relative à l’informatique, aux fichiers et aux libertés, les cookies 
            et traceurs suivent deux régimes distincts.</p>

          <p>D’une part, les cookies strictement nécessaires au service ou ayant 
            pour finalité exclusive de faciliter la communication par voie électronique, 
            sont dispensés de consentement préalable.</p>

          <p>D’autre part, les cookies n’étant pas strictement nécessaires au 
            service ou n’ayant pas pour finalité exclusive de faciliter la communication 
            par voie électronique, doivent être consenti par l’utilisateur.</p>

          <p>Ce consentement de la personne concernée constitue une base légale au 
            sens du RGPD, à savoir l’article 6-1 a). Les Bases ne dépose aucun cookie 
            tiers sur sa plateforme et ne nécessite aucun consentement.</p>

          <h2>Pour en savoir plus sur les cookies :</h2>

          <ul>
            <li>Cookies et traceurs : que dit la loi ?</li> {/* intégrer lien */}
            <li>Cookies les outils pour les maîtriser</li> {/* intégrer lien */}
          </ul>

          ----- {/* vérifier s'il faut ajouter la suite */}

          <h2>Suivi d&apos;audience et vie privée</h2>

          <h3>Cookies et consentement</h3>

          <p>
            Un cookie est un fichier déposé sur votre terminal lors de la visite
            d’un site. Il a pour but de collecter des informations relatives à
            votre navigation et de vous adresser des services adaptés à votre
            terminal (ordinateur, mobile ou tablette).
          </p>

          <p>
            Le site dépose des cookies de mesure d’audience (nombre de visites,
            pages consultées), respectant les conditions d’exemption du
            consentement de l’internaute définies par la recommandation
            «&nbsp;Cookies&nbsp;» de la Commission nationale informatique et
            libertés (CNIL). Cela signifie, notamment, que ces cookies ne
            servent qu’à la production de statistiques anonymes et ne permettent
            pas de suivre la navigation de l’internaute sur d’autres sites.
          </p>

          <p>
            <b>Nous utilisons pour cela Matomo,</b> un outil de mesure
            d’audience web libre, paramétré pour être en conformité avec la
            recommandation «&nbsp;Cookies&nbsp;» de la CNIL. Cela signifie que
            votre adresse IP, par exemple, est anonymisée avant d’être
            enregistrée. Il est donc impossible d’associer vos visites sur ce
            site à votre personne.
          </p>

          <p>Il convient d’indiquer que&nbsp;:</p>
          <ul>
            <li>
              Les données collectées ne sont pas recoupées avec d’autres
              traitements
            </li>
            <li>
              Les cookies ne permettent pas de suivre la navigation de
              l’internaute sur d’autres sites
            </li>
          </ul>
          <p />

          <p>
            Vous pouvez choisir de ne pas transmettre d&apos;informations à
            Matomo&nbsp;:
          </p>

          <p>
            À tout moment, vous pouvez refuser l’utilisation des cookies et
            désactiver le dépôt sur votre ordinateur en utilisant la fonction
            dédiée de votre navigateur (fonction disponible notamment sur
            Microsoft Internet Explorer 11, Google Chrome, Mozilla Firefox,
            Apple Safari et Opera).
          </p>

          <p>
            Pour aller plus loin, vous pouvez consulter les fiches proposées par
            la Commission Nationale de l&apos;Informatique et des Libertés
            (CNIL) :
          </p>
          <ul>
            <li>
              <a
                href="https://www.cnil.fr/fr/cookies-traceurs-que-dit-la-loi"
                target="_blank"
                rel="noreferrer"
              >
                Cookies &amp; traceurs : que dit la loi ?
                <span className="fr-sr-only">Ouvre une nouvelle fenêtre</span>
              </a>
            </li>
            <li>
              <a
                href="https://www.cnil.fr/fr/cookies-les-outils-pour-les-maitriser"
                target="_blank"
                rel="noreferrer"
              >
                Cookies : les outils pour les maîtriser
                <span className="fr-sr-only">Ouvre une nouvelle fenêtre</span>
              </a>
            </li>
          </ul>
          <p />
        </div>
      </div>
    </main>
  </div>
)
export default ConfidentialityPage
