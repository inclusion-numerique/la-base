import Link from 'next/link'
import { currentCguVersion } from '../currentCguVersion'

/**
 * Change the currentCguVersion in currentCguVersion.ts if the contents changes
 */
export const CurrentCguContent = () => (
  <>
    <h1>
      Les bases du numérique d’intérêt général&nbsp;-&nbsp;Conditions générales
      d’utilisation
    </h1>
    <p className="fr-text--xs fr-text-mention--grey">
      Version {currentCguVersion}
    </p>
    <p>
      Les présentes conditions générales d’utilisation (ci-après « CGU ») fixent
      le cadre juridique de Les bases du numérique d’intérêt général (ci-après
      la « Plateforme ») et définissent les conditions d’accès et d’utilisation
      proposées à l’Utilisateur.
    </p>
    <hr className="fr-separator-6v" />
    <h2>Article 1 - Champ d’application</h2>
    <p>
      Le présent document a pour objet d’encadrer l’utilisation de la Plateforme
      qui est d’accès libre et gratuit à l’Utilisateur.
    </p>
    <p>
      Toute utilisation de la Plateforme est subordonnée au respect intégral des
      présentes CGU.
    </p>
    <hr className="fr-separator-6v" />
    <h2>Article 2 - Définitions</h2>
    <ul>
      <li>
        «&nbsp;Éditeur&nbsp;» de la plateforme est l’Agence nationale de la
        cohésion des territoires (ANCT).
      </li>
      <li>
        «&nbsp;Service&nbsp;» désigne toutes les fonctionnalités offertes par la
        Plateforme pour répondre à ses finalités.
      </li>
      <li>
        «&nbsp;Utilisateur&nbsp;» désigne toute personne physique, qui dispose
        d’un compte sur la Plateforme.
      </li>
    </ul>
    <hr className="fr-separator-6v" />
    <h2>Article 3 - Objet</h2>
    <p>
      La Plateforme est un service public numérique développé au sein de
      l’Incubateur des territoires de l’ANCT et qui a pour objectif de mettre à
      disposition un outil de ressourcerie utile au quotidien pour les acteurs
      de l’inclusion, de la médiation numérique et du numérique d’intérêt
      général, leur permettant de :
    </p>
    <ul>
      <li>Mettre en lumière la richesse des ressources déjà existantes</li>
      <li>
        Stimuler la création de nouvelles ressources répondant à des besoins
        collectivement identifiés
      </li>
      <li>
        Favoriser une large diffusion, utilisation et appropriation des
        ressources.
      </li>
    </ul>
    <hr className="fr-separator-6v" />
    <h2>Article 4 - Fonctionnalités</h2>
    <h3>4.1 Accès et connexion à l’espace Utilisateur</h3>
    <p>
      L’Utilisateur s’authentifie et se connecte à son espace via ProConnect. Il
      renseigne son adresse e-mail, son département (facultatif) et doit créer
      un mot de passe. Il peut aussi se connecter via lien magique.
    </p>
    <p>
      Il reçoit un mail de validation qui le redirige vers la Plateforme qu’il
      peut utiliser.
    </p>
    <h3>4.2 Fonctionnalités ouvertes à l’Utilisateur</h3>
    <p>Chaque Utilisateur peut notamment&nbsp;:</p>
    <ul>
      <li>Créer une ressource et la modifier,</li>
      <li>Créer une base et la modifier,</li>
      <li>
        Inviter d’autres contributeurs sur une base ou demander à y contribuer,
      </li>
      <li>Suivre des bases ou des profils,</li>
      <li>Consulter des ressources, bases, profils ou collection,</li>
      <li>Créer des collections et y enregistrer des ressources.</li>
    </ul>
    <p>
      L’Utilisateur peut également, à tout moment, modifier ses informations
      personnelles, la visibilité de son profil (public/privé) et supprimer son
      compte.
    </p>
    <hr className="fr-separator-6v" />
    <h2>Article 5 - Responsabilités</h2>
    <h3>5.1 L’Éditeur de la Plateforme</h3>
    <p>
      Les sources des informations diffusées sur la Plateforme sont réputées
      fiables mais l’Éditeur ne garantit pas qu’elle soit exempte de défauts,
      d’erreurs ou d’omissions.
    </p>
    <p>
      L’Éditeur s’engage à la sécurisation de la Plateforme, notamment en
      prenant toutes les mesures nécessaires permettant de garantir la sécurité
      et la confidentialité des informations fournies. Il ne peut être tenu
      responsable en cas d’usurpation d’identité ou de toute utilisation
      frauduleuse de la Plateforme.
    </p>
    <p>
      L’Éditeur fournit les moyens nécessaires et raisonnables pour assurer un
      accès continu, sans contrepartie financière, au Service.
    </p>
    <p>
      Il ne peut être tenu responsable des pertes et/ou préjudices, de quelque
      nature qu’ils soient, qui pourraient être causés à la suite d’un
      dysfonctionnement ou d’une indisponibilité de la Plateforme. De telles
      situations n’ouvriront droit à aucune compensation ou indemnité d’aucune
      nature dont financière.
    </p>
    <p>
      En cas de manquement à une ou plusieurs des stipulations des présentes
      CGU, l’Éditeur s’autorise à suspendre ou révoquer n’importe quel compte et
      toutes les actions réalisées par ce biais, s’il estime que l’usage réalisé
      de la Plateforme porte préjudice à son image ou ne correspond pas aux
      exigences de sécurité. Et le cas échéant, à informer l’employeur de
      l’Utilisateur des désordres et / ou comportements observés.
    </p>
    <h3>5.2 L’Utilisateur</h3>
    <p>
      L’Utilisateur s’assure de garder son mot de passe secret. Toute
      divulgation du mot de passe, quelle que soit sa forme, est interdite. Il
      assume les risques liés à l’utilisation de son identifiant et mot de
      passe.
    </p>
    <p>
      L’Utilisateur s’engage à ne pas mettre en ligne de contenus ou
      informations contraires aux dispositions légales et réglementaires en
      vigueur et ne pas renseigner de données non nécessaires aux finalités ou
      des données sensibles notamment dans les zones de champs libres.
    </p>
    <p>
      L’Utilisateur s’engage à respecter la{' '}
      <Link href="/charte" target="_blank" className="fr-link">
        Charte des Bases du numérique d’intérêt général.
      </Link>
    </p>
    <p>
      Toute information transmise par l’Utilisateur est de sa seule
      responsabilité. Il est rappelé que toute personne procédant à une fausse
      déclaration pour elle-même ou pour autrui s’expose, notamment, aux
      sanctions prévues à l’article 441-1 du code pénal, prévoyant des peines
      pouvant aller jusqu’à trois ans d’emprisonnement et 45&nbsp;000 euros
      d’amende.
    </p>
    <hr className="fr-separator-6v" />
    <h2>Article 6 - Mise à jour des conditions générales d’utilisation</h2>
    <p>
      Les termes des présentes conditions générales d’utilisation peuvent être
      amendés à tout moment, sans préavis, en fonction des modifications
      apportées au Service, de l’évolution de la législation ou pour tout autre
      motif jugé nécessaire. Chaque modification donne lieu à une nouvelle
      version qui doit être acceptée par l’Utilisateur.
    </p>
  </>
)
