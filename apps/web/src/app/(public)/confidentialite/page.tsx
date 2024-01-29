/* eslint jsx-a11y/control-has-associated-label: 0  */
import type { Metadata } from 'next'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import { metadataTitle } from '@app/web/app/metadataTitle'

export const revalidate = 0
export const metadata: Metadata = {
  title: metadataTitle('Politique de confidentialité'),
}

const ConfidentialityPage = () => (
  <div className="fr-container landing-main-container fr-my-8w">
    <div className="fr-grid-row fr-grid-row--center">
      <div className="fr-col-md-8">
        <h1>Politique de confidentialité</h1>

        <h2>Traitement des données à caractère personnel</h2>

        <p>Ce site recueille des données à caractère personnel.</p>

        <p>
          Seules sont recueillies les données expressément nécessaires au bon
          fonctionnement du service et au respect des obligations légales de
          l&apos;éditeur.
        </p>

        <p>
          Les seules données recueillies sont celles fournies directement par
          les usagers dans le contexte de l&apos;utilisation du service.
        </p>

        <p>
          Conformément à la Loi Informatique et Liberté du 06/01/78, vous
          disposez d&apos;un droit d&apos;accès et de rectification des
          informations nominatives vous concernant.
        </p>

        <p>
          Pour toute question ou demande relative à vos droits, vous pouvez nous
          contacter à l&apos;adresse&nbsp;
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

        <p>
          Si vous souhaitez faire supprimer les données vous concernant, cela
          aura potentiellement pour impact l&apos;impossibilité pour nous de
          continuer à vous fournir les services proposés par ce site.
        </p>

        <h2>Responsable du traitement</h2>

        <p>
          Le Ministère de la Transition écologique et le Ministère de la
          Cohésion des territoires et des Relations avec les collectivités
          territoriales sont les responsables du traitement de vos données à
          caractère personnel.
        </p>

        <p>Ils sont situés Tour Sequoia, 1 place Carpeaux, 92800 Puteaux.</p>

        <h2>Destinataires des données</h2>

        <p>
          Le responsable de traitement s’engage à ce que les données soient
          traitées par les seules personnes autorisées.
        </p>

        <p>
          Vos données ne sont pas transférées vers des états en dehors de
          l&apos;Union Européenne.
        </p>

        <h2>Sous-traitants</h2>

        <p>
          Certaines des données sont envoyées à des sous-traitants pour réaliser
          certaines missions. Le responsable de traitement s&apos;est assuré de
          la mise en œuvre par ses sous-traitants de garanties adéquates et du
          respect de conditions strictes de confidentialité, d’usage et de
          protection des données.
        </p>

        <p>
          Les sociétés Scalingo (hébergeur), Sendinblue (envoi emails)
          interviennent en tant que sous-traitants.
        </p>

        <p>
          Aides-territoires s’est assurée de la mise en œuvre par ses
          sous-traitants de garanties adéquates et du respect de conditions
          strictes de confidentialité, d’usage et de protection des données.
        </p>

        <div className="fr-table" data-fr-js-table="true">
          <table className="data-table" data-fr-js-table-element="true">
            <thead>
              <tr>
                <th scope="col">Partenaire</th>
                <th scope="col">Scalingo</th>
                <th scope="col">SendinBlue</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Pays destinataire</th>
                <td>France</td>
                <td>France</td>
              </tr>
              <tr>
                <th>Traitement réalisé</th>
                <td>Hébergement du site</td>
                <td>
                  Envoi de mails et lettres d&apos;information aux utilisateurs
                </td>
              </tr>
              <tr>
                <th>Garanties</th>
                <td>https://scalingo.com/fr/privacy-policy</td>
                <td>https://fr.sendinblue.com/legal/privacypolicy/</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h2>Base légale du traitement</h2>

        <p>
          Le traitement de données est rendu licite parce qu’il est nécessaire à
          l’exécution d’une mission d’intérêt public ou relevant de l’exercice
          de l’autorité publique dont est investi le responsable de traitement,
          telle qu’entendue par l’article 6-e du règlement (UE) n°2016/679 du
          Parlement européen et du Conseil relatif à la protection des personnes
          physiques à l’égard du traitement des données à caractère personnel et
          à la libre circulation de ces données.
        </p>

        <p>
          Les données sont également transférées sur les serveurs de notre
          prestataire en charge de l&apos;envoi de la newsletter : Sendinblue,
          Société par actions simplifiée au capital de 137.531 euros,
          immatriculée au RCS de Paris sous le numéro 498 019 298 et dont le
          siège social est situé 55 rue d&apos;Amsterdam, 75008 Paris, France.
        </p>

        <h2>Durée de conservation</h2>

        <p>
          Vous pouvez vous désincrire de la newsletter soit en nous envoyant un
          email, soit en utilisant les liens de désinscription présents dans nos
          emails d&apos;alerte ou newsletter, ou directement dans le formulaire
          d&apos;édition du profil, rubrique &ldquo;Mon compte&rdquo;.
        </p>

        <p>
          Vos coordonnées sont conservées jusqu&apos;à un an après votre
          dernière action sur le site, (dernière connexion à condition de
          n&apos;avoir aucune aide en cours de validité, envoi d&apos;un
          message, etc), ou un an suite à votre demande d’effacement des données
          ou demande de désinscription.
        </p>

        <h2>Finalités du traitement</h2>

        <p>
          La finalité du traitement de données réalisé par Aides-territoires est
          de faciliter la connaissance et l&apos;accès aux aides financières et
          en ingénierie pour permettre aux collectivités et acteurs du
          territoire de réaliser leurs projets.
        </p>

        <h2>Liste des traitements</h2>

        <p>
          En accord avec le Règlement Européen pour la Protection des données
          (RGPD), vous trouverez ci-dessous la liste des traitements nécessitant
          recueil de données à caractère personnel.
        </p>

        <div className="fr-table" data-fr-js-table="true">
          <table className="data-table" data-fr-js-table-element="true">
            <tbody>
              <tr>
                <th>Traitement&nbsp;→</th>
                <th>Accès authentifié</th>
                <th>Inscription newsletter</th>
                <th>Alerte nouveaux résultats</th>
                <th>Formulaire de contact</th>
              </tr>
              <tr>
                <th>Finalité du traitement&nbsp;→</th>
                <td>
                  fourniture du service permettant aux utilisateurs de se créer
                  un compte, de diffuser des dispositifs et de les consulter.
                </td>
                <td>envoi régulier ( mensuel) d’une lettre d’info</td>
                <td>envoi d’emails</td>
                <td>
                  demande adressée à l’équipe {process.env.NEXT_PUBLIC_APP_NAME}
                  , en vue d’une réponse personnalisée
                </td>
              </tr>
              <tr>
                <th>Durée de conservation</th>
                <td>
                  Vos coordonnées sont conservées jusqu&apos;à un an après votre
                  dernière action sur le site ou demande de suppression
                </td>
                <td>
                  Vos coordonnées sont conservées jusqu&apos;à un an après une
                  demande de désinscription à la newsletter
                </td>
                <td>
                  Vos coordonnées sont conservées jusqu&apos;à un an après votre
                  dernière action sur le site ou demande de suppression
                </td>
                <td>
                  Vos coordonnées sont conservées jusqu&apos;à un an après
                  l’envoi de votre message
                </td>
              </tr>
              <tr>
                <th>Prénom/nom</th>
                <td>Oui</td>
                <td />
                <td />
                <td>Oui</td>
              </tr>
              <tr>
                <th>Structure</th>
                <td>Oui</td>
                <td />
                <td />
                <td>Optionnel</td>
              </tr>
              <tr>
                <th>Fonction</th>
                <td>Oui</td>
                <td />
                <td />
                <td>Optionnel</td>
              </tr>
              <tr>
                <th>Adresse</th>
                <td>Oui</td>
                <td />
                <td />
                <td>Optionnel</td>
              </tr>
              <tr>
                <th>Téléphone</th>
                <td />
                <td />
                <td />
                <td>Optionnel</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>Oui</td>
                <td>Oui</td>
                <td>Oui</td>
                <td>Oui</td>
              </tr>
            </tbody>
          </table>
        </div>

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
          libertés (CNIL). Cela signifie, notamment, que ces cookies ne servent
          qu’à la production de statistiques anonymes et ne permettent pas de
          suivre la navigation de l’internaute sur d’autres sites.
        </p>

        <p>
          <b>
            Nous utilisons différents types de cookies, certains nécessitant
            votre consentement.
          </b>
        </p>

        <p>
          <b>Nous utilisons pour cela Matomo,</b> un outil de mesure d’audience
          web libre, paramétré pour être en conformité avec la recommandation
          «&nbsp;Cookies&nbsp;» de la CNIL. Cela signifie que votre adresse IP,
          par exemple, est anonymisée avant d’être enregistrée. Il est donc
          impossible d’associer vos visites sur ce site à votre personne.
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

        <div className="fr-mb-3w" id="piwik-consent">
          <iframe
            title="Matomo"
            style={{ border: 0, height: 200, width: 600 }}
            src="https://matomo.incubateur.anct.gouv.fr/index.php?module=CoreAdminHome&action=optOut&language=en&backgroundColor=&fontColor=&fontSize=16px&fontFamily=Helvetica"
          />
        </div>

        <p>
          À tout moment, vous pouvez refuser l’utilisation des cookies et
          désactiver le dépôt sur votre ordinateur en utilisant la fonction
          dédiée de votre navigateur (fonction disponible notamment sur
          Microsoft Internet Explorer 11, Google Chrome, Mozilla Firefox, Apple
          Safari et Opera).
        </p>

        <p>
          Pour aller plus loin, vous pouvez consulter les fiches proposées par
          la Commission Nationale de l&apos;Informatique et des Libertés (CNIL)
          :
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
        <h3>Je contribue à enrichir vos données, puis-je y accéder ?</h3>

        <p>
          Bien sûr ! Les statistiques d’usage de la majorité de nos produits
          sont disponibles en accès libre sur&nbsp;
          <a
            href="https://stats.data.gouv.fr/"
            target="_blank"
            rel="noreferrer"
          >
            stats.data.gouv.fr
            <span className="fr-sr-only">Ouvre une nouvelle fenêtre</span>
          </a>
          .
        </p>

        <h2>Sécurité et confidentialité</h2>

        <p>
          Les données personnelles sont traitées dans des conditions sécurisées,
          selon les moyens actuels de la technique, dans le respect des
          dispositions relatives à la protection de la vie privée et notamment
          au référentiel général de sécurité, prévu à l’article 9 de
          l’ordonnance 2005-1516 du 8 décembre 2005 relative aux échanges
          électroniques entre les usagers et les autorités administratives et
          entre les autorités administratives.
        </p>

        <p>
          Les moyens de sécurisation suivants ont notamment été mis en
          œuvre&nbsp;:
        </p>

        <ul>
          <li>
            Contrôle d’accès&nbsp;: la base de données des utilisateurs n’est
            accessible qu’aux seuls membres de l’administration du service;
          </li>
          <li>
            Mesures de traçabilité&nbsp;: les logs applicatifs permettent de
            savoir qui a eu accès à cette base de données&nbsp;;
          </li>
          <li>
            Mesures de protection des logiciels&nbsp;: les mises à jour et les
            mesures de protection sont assurées par l&apos;hébergeur
            Scalingo&nbsp;;
          </li>
          <li>
            Sauvegarde des données&nbsp;: les sauvegardes sont assurées par
            l&apos;hébergeur Scalingo&nbsp;;
          </li>
          <li>
            Chiffrement des données&nbsp;: site uniquement accessible en HTTPS.
          </li>
        </ul>

        <h2>Droit des personnes</h2>

        <p>
          Vous disposez des droits suivants concernant vos données à caractère
          personnel&nbsp;:
        </p>

        <ul>
          <li>
            Droit d’information, d’accès et de communication des données&nbsp;;
          </li>
          <li>Droit à la limitation&nbsp;;</li>
          <li>Droit de rectification des données&nbsp;;</li>
          <li>Droit d&apos;opposition.</li>
        </ul>

        <p>
          Pour toute demande, vous pouvez écrire un email à l’équipe La France
          des solutions&nbsp;:{' '}
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

        <p>
          Si vous estimez, après nous avoir contactés, que vos droits ne sont
          pas respectés ou que le traitement n’est pas conforme à la
          réglementation sur la protection des données à caractère personnel,
          vous pouvez adresser une réclamation à{' '}
          <a href="https://www.cnil.fr" target="_blank" rel="noreferrer">
            la CNIL
            <span className="fr-sr-only">Ouvre une nouvelle fenêtre</span>
          </a>
          .
        </p>
      </div>
    </div>
  </div>
)
export default ConfidentialityPage
