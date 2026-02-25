# Les Bases

[![Coverage Status](https://coveralls.io/repos/github/inclusion-numerique/la-base/badge.svg?branch=main)](https://coveralls.io/github/inclusion-numerique/la-base?branch=main)

<h2 id="à-propos">🪧 À propos</h2>

Bienvenue sur les bases ! La plateforme collaborative de partage de ressources & communs numériques à l’échelle nationale. \
Ce [monorepo](https://en.wikipedia.org/wiki/Monorepo) fournit l'ensemble des projets nécessaires au fonctionnement de la plateforme.

## 📑 Table des matières

- 🪧 [À propos](#à-propos)
- 🌐 [Accès au service](#acces)
- 🔗 [Liens utiles](#liens-utiles)
- 📦 [Contenu](#contenu)
- 🤗 [Contribution](#contribution)
- 📝 [Licence](#licence)

<h2 id="acces">🌐 Accès au service</h2>

La plateforme est disponible en production sur : https://lesbases.anct.gouv.fr.

<h2 id="liens-utiles">🔗 Liens utiles</h2>

- [Notion](https://www.notion.so/Programme-inclusion-num-rique-de-l-Incubateur-des-Territoires-6eab8b90c1da4e5baf442e176b80588d)
- [Figma](https://www.figma.com/files/team/1187779503722591734/P%C3%B4le-Inclusion-Num%C3%A9rique?fuid=886724371034466768)
- [Storybook](https://643fe520a32f5159eae14dba-qsspfhuduj.chromatic.com)

<h2 id="contenu">📦 Contenu</h2>

### Applications

Les `Applications` contiennent le code source des éléments propres au projet

- [cli](apps/cli) : Suite d'outils en ligne de commande qui servent à exécuter des scripts complexes nécessaires lors de processus automatisés tels que l'intégration et le déploiement automatisé.
- [web](apps/web) : Source du projet web next.js qui permet de faire tourner les bases, front et back en utilisant des servers components.

### Packages

Les `Packages` contiennent des outils de support et des communs dont l'origine provient de la [stack](https://github.com/inclusion-numerique/stack).

- [cdk](packages/cdk) : [Définition de l'infrastructure](packages/cdk/Readme.md) avec Terraform rédigé avec la version TypeScript du [CDKTF](https://developer.hashicorp.com/terraform/cdktf) pour déployer l'application sur [Scaleway](https://www.scaleway.com).
- [config](packages/config) : [Configuration des services](packages/config/Readme.md) utilisés lors de la génération, le déploiement et l'exécution via des variables d'environnement.
- [e2e](packages/e2e) : Tests de bout en bout opérés par [Cypress](https://www.cypress.io/).
- [emails](packages/emails) : Templates pour les emails utilisés par l'application.
- [fixtures](packages/fixtures) : Ensemble de données à insérer dans la base de données pour avoir un ensemble cohérent plutôt qu'un projet vide.
- [lint](packages/lint) : Configuration des règles de syntaxes à respecter dans le projet.
- [storybook](packages/storybook) : Configuration de storybook, utilisé pour administrer une bibliothèque des composants disponibles dans l'application.
- [test](packages/test) : Configuration de jest, utilisé pour les tests unitaires et les tests d'intégration.
- [ui](packages/ui) : Composants et utilitaires génériques provenant de la [stack](https://github.com/inclusion-numerique/stack/tree/main/packages/ui).

<h2 id="contribution">🤗 Contribution</h2>

Pour contribuer, nous vous invitons à consulter le [guide de contribution](./CONTRIBUTING.md). Ce guide vous fournira des instructions détaillées sur la manière de configurer le projet localement, ainsi que sur la manière de soumettre des contributions de manière efficace.

<h2 id="licence">📝 Licence</h2>

Voir le fichier [LICENSE](./LICENSE) du dépôt.
