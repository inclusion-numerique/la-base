import Breadcrumbs from '@app/web/components/Breadcrumbs'
import SkipLinksPortal from '@app/web/components/SkipLinksPortal'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Politique de confidentialité - Les Bases',
}

const ConfidentialityPage = () => (
  <div className="fr-container">
    <SkipLinksPortal />
    <Breadcrumbs currentPage="Politique de confidentialité" />
    <div className="fr-container landing-main-container fr-my-8w">
      <div className="fr-grid-row fr-grid-row--center">
        <div className="fr-col-md-8">
          <h1>Politique de confidentialité - Les Bases</h1>
          <p>Dernière mise à jour le 19/12/2024</p>

          <h2>Qui sommes-nous ?</h2>
          <p>
            Les Bases est un service public numérique développé au sein de
            l’Incubateur des territoires de l’Agence Nationale de la Cohésion
            des Territoires (ANCT). Il s’agit d’une plateforme qui facilite le
            partage des ressources et des communs pour les acteurs de
            l’inclusion numérique.
          </p>
          <p>
            Le responsable de traitement est l’ANCT, représentée par Monsieur
            Stanislas Bourron, Directeur général.
          </p>

          <h2>Pourquoi traitons-nous des données à caractère personnel ?</h2>
          <p>
            Les Bases traite des données à caractère personnel pour mettre à
            disposition des acteurs de l’inclusion numérique un espace de
            partage de ressources et de communs, qui se matérialise également
            par la création d’un compte pour publier des contenus, les évaluer
            ou les recommander.
          </p>

          <h2>
            Quelles sont les données à caractère personnel que nous traitons ?
          </h2>
          <ul>
            <li>
              Données relatives aux utilisateurs : nom, prénom, adresse e-mail
            </li>
            <li>
              Données relatives à la lettre d’information : nom, prénom, adresse
              e-mail
            </li>
          </ul>

          <h2>
            Qu’est-ce qui nous autorise à traiter des données à caractère
            personnel ?
          </h2>
          <p>
            Le traitement est nécessaire à l’exécution d’une mission d’intérêt
            public ou relevant de l’exercice de l’autorité publique dont est
            investie l’ANCT en tant que responsable de traitement, au sens de
            l’article 6-1 e) du RGPD.
          </p>
          <p>
            Cette mission d’intérêt public se traduit en pratique notamment par
            l’article L. 1231-2 du code général des collectivités territoriales
            (CGCT).
          </p>

          <h2>Pendant combien de temps conservons-nous vos données ?</h2>
          <p>
            Les données sont conservées selon les durées strictement nécessaires
            à la réalisation des finalités.
          </p>

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
          <ul>
            <li>Droit d’information et d’accès à vos données</li>
            <li>Droit de rectification</li>
            <li>Droit d’opposition</li>
            <li>Droit à la limitation du traitement de vos données</li>
          </ul>
          <p>
            Pour exercer vos droits, vous pouvez nous contacter à :{' '}
            <a href="mailto:lesbases@anct.gouv.fr">lesbases@anct.gouv.fr</a>
            <br />
            Ou contacter la déléguée à la protection des données à :{' '}
            <a href="mailto:dpo@anct.gouv.fr">dpo@anct.gouv.fr</a>
          </p>
          <p>
            Nous nous engageons à répondre à votre demande dans un délai
            raisonnable qui ne saurait excéder un mois. Si vous estimez que vos
            droits n’ont pas été respectés, vous pouvez adresser une réclamation
            à la{' '}
            <a
              href="https://www.cnil.fr"
              target="_blank"
              rel="noopener noreferrer"
            >
              CNIL
            </a>
            .
          </p>

          <h2>Qui peut avoir accès à vos données ?</h2>
          <p>
            Les personnes suivantes ont accès à vos données en tant que
            destinataires :
          </p>
          <ul>
            <li>
              Les membres habilités de l’équipe Les Bases (administrateurs,
              développeurs) ont accès à vos données, notamment l’adresse e-mail,
              dans le cadre de leurs missions.
            </li>
            <li>
              La plateforme est publique et à destination de la communauté, les
              noms et prénoms sont visibles par tous.
            </li>
          </ul>

          <h2>Qui nous aide à traiter vos données ?</h2>
          <p>
            Certaines données sont communiquées à des « sous-traitants » qui
            agissent pour le compte de l’ANCT, selon ses instructions.
          </p>

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
                  <td>
                    <a
                      href="https://www-uploads.scaleway.com/DPA_FR_v17072024_439cb4fdae.pdf"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Politique de confidentialité
                    </a>
                  </td>
                </tr>
                <tr>
                  <td>Brevo</td>
                  <td>Gestion de la lettre d’information</td>
                  <td>France</td>
                  <td>
                    <a
                      href="https://www.brevo.com/fr/legal/termsofuse/#accord-sur-le-traitement-des-donnees-a-caractere-personnel-dpa"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Politique de confidentialité
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2>Cookies et traceurs</h2>
          <p>
            Un cookie est un fichier déposé sur votre terminal lors de la visite
            d’un site. Il a pour but de collecter des informations relatives à
            votre navigation et de vous adresser des services adaptés à votre
            terminal (ordinateur, mobile ou tablette).
          </p>
          <p>
            En application de l’article 5-3 de la directive ePrivacy, transposée
            à l’article 82 de la loi n° 78-17 du 6 janvier 1978 relative à
            l’informatique, aux fichiers et aux libertés, les cookies et
            traceurs suivent deux régimes distincts.
          </p>
          <ul>
            <li>
              D’une part, les cookies strictement nécessaires au service ou
              ayant pour finalité exclusive de faciliter la communication par
              voie électronique, sont dispensés de consentement préalable.
            </li>
            <li>
              D’autre part, les cookies n’étant pas strictement nécessaires au
              service ou n’ayant pas pour finalité exclusive de faciliter la
              communication par voie électronique, doivent être consentis par
              l’utilisateur.
            </li>
          </ul>
          <p>
            Ce consentement de la personne concernée constitue une base légale
            au sens du RGPD, à savoir l’article 6-1 a). Les Bases ne dépose
            aucun cookie tiers sur sa plateforme et ne nécessite aucun
            consentement.
          </p>
          <p>Pour en savoir plus sur les cookies :</p>
          <ul>
            <li>
              <a
                href="https://www.cnil.fr/fr/cookies-et-traceurs-que-dit-la-loi"
                target="_blank"
                rel="noopener noreferrer"
              >
                Cookies et traceurs : que dit la loi ?
              </a>
            </li>
            <li>
              <a
                href="https://www.cnil.fr/fr/cookies-les-outils-pour-les-maitriser"
                target="_blank"
                rel="noopener noreferrer"
              >
                Cookies : les outils pour les maîtriser
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
)

export default ConfidentialityPage
