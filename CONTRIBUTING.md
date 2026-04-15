# Guide de Contribution

## Table des matieres

- [Contexte du projet](#contexte-du-projet)
- [Architecture du monorepo](#architecture-du-monorepo)
- [Prerequis](#prerequis)
- [Installation](#installation)
- [Demarrage](#demarrage)
- [Scripts disponibles](#scripts-disponibles)
- [Infrastructure Terraform (CDK)](#infrastructure-terraform-cdk)
- [Procedures de contribution](#procedures-de-contribution)
- [Stack technique](#stack-technique)

---

## Contexte du projet

**Les Bases** (https://lesbases.anct.gouv.fr) est une plateforme collaborative de partage de ressources et communs numeriques a l'echelle nationale, maintenue par l'Incubateur des Territoires (ANCT).

Le projet est structure en [monorepo](https://en.wikipedia.org/wiki/Monorepo) et heberge sur [Scaleway](https://www.scaleway.com). Le deploiement est automatise via [CircleCI](https://circleci.com/) : toute fusion sur `main` declenche une mise en production. Chaque branche de feature genere un environnement de preview.

Licence : [AGPL-3.0-or-later](./LICENSE)

---

## Architecture du monorepo

### Applications (`apps/`)

| Dossier | Description |
|---------|-------------|
| [web](apps/web) | Application Next.js full-stack (front + back via React Server Components) |
| [cli](apps/cli) | Outils en ligne de commande pour les scripts CI/CD (deploiement, migrations, etc.) |

### Packages (`packages/`)

| Dossier | Description |
|---------|-------------|
| [cdk](packages/cdk) | Infrastructure as Code avec Terraform CDK (CDKTF) pour Scaleway |
| [config](packages/config) | Configuration des services via variables d'environnement |
| [e2e](packages/e2e) | Tests end-to-end avec Cypress |
| [emails](packages/emails) | Templates d'emails (MJML / React) |
| [fixtures](packages/fixtures) | Donnees de test pour le seeding de la base |
| [lint](packages/lint) | Configuration des regles de linting |
| [storybook](packages/storybook) | Bibliotheque de composants UI |
| [test](packages/test) | Configuration Jest (tests unitaires et integration) |
| [ui](packages/ui) | Composants et utilitaires generiques de la [stack](https://github.com/inclusion-numerique/stack) |

### Orchestration

- **pnpm** : gestionnaire de paquets (workspaces)
- **Turborepo** : orchestration des taches du monorepo (`turbo.json`)

---

## Prerequis

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/) >= 22 (recommandation : utiliser [nvm](https://github.com/nvm-sh/nvm))
- [pnpm](https://pnpm.io/) 10.x
- [Docker](https://www.docker.com/) et Docker Compose (optionnel mais recommande)
- [PostgreSQL](https://www.postgresql.org/) (optionnel si Docker est utilise)

---

## Installation

### 1. Cloner le depot

```bash
git clone git@github.com:inclusion-numerique/la-base.git
cd la-base
```

### 2. Installer la bonne version de Node

```bash
nvm use --lts
```

### 3. Installer les dependances

```bash
pnpm install
```

### 4. Configurer les variables d'environnement

```bash
cp .env.dist .env
```

Editez le fichier `.env` selon vos besoins. Les variables principales sont :

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Connexion PostgreSQL principale |
| `MIGRATION_DATABASE_URL` | Connexion PostgreSQL legacy |
| `NEXTAUTH_SECRET` | Cle de chiffrement des sessions |
| `NEXTAUTH_URL` | URL de callback d'authentification |
| `SMTP_SERVER` / `SMTP_PORT` | Serveur SMTP (MailDev en dev) |
| `S3_HOST` / `UPLOADS_BUCKET` | Stockage objet (MinIO en dev) |
| `NEXT_PUBLIC_SENTRY_DSN` | DSN Sentry (monitoring) |

La liste exhaustive est disponible dans [.env.dist](.env.dist).

### 5. Demarrer les services Docker

```bash
pnpm docker:start
```

Cela demarre :

| Service | Port | Description |
|---------|------|-------------|
| PostgreSQL (principal) | `5433` | `postgresql://la-base:password@localhost:5433/la-base` |
| PostgreSQL (legacy) | `5435` | `postgresql://la-base:password@localhost:5435/la-base-legacy` |
| MinIO (S3) | `9000` (API) / `9001` (Console) | Stockage objet compatible S3 (`minioadmin/minioadmin`) |
| MailDev | `1080` (Web) / `1025` (SMTP) | Interception des emails (`mailuser/mailpassword`) |

### 6. Initialiser la base de donnees

```bash
pnpm db:init
```

### 7. Charger les fixtures (optionnel)

```bash
pnpm fixtures:load
```

Deux utilisateurs de test sont disponibles :

- **Jean-Michel Sans Rien** : `user.les.bases+sans+rien@gmail.com`
- **Jean-Michel Avec Tout** : `user.les.bases+avec+tout@gmail.com`

> Lors de la connexion en dev, un "Magic link" apparait dans la console Next.js.

---

## Demarrage

### Lancer uniquement l'application web

```bash
pnpm start:web
```

- Web : http://localhost:3000

### Lancer web + storybook

```bash
pnpm dev
```

- Web : http://localhost:3000
- Storybook : http://localhost:6006

---

## Scripts disponibles

### Developpement et build

| Commande | Description |
|----------|-------------|
| `pnpm dev` | Lance web + storybook en mode developpement |
| `pnpm start:web` | Lance uniquement l'app web sur http://localhost:3000 |
| `pnpm build` | Build des applications `cli` et `web` |
| `pnpm -F web build:analyze` | Build web avec analyse du bundle |

### Base de donnees

| Commande | Description |
|----------|-------------|
| `pnpm db:init` | Genere le client Prisma et applique les migrations |
| `pnpm prisma:generate-migration <nom>` | Cree une nouvelle migration a partir du schema Prisma |
| `pnpm fixtures:load` | Charge les donnees de test dans la base |

### Docker

| Commande | Description |
|----------|-------------|
| `pnpm docker:start` | Demarre les conteneurs (BDD, mail, MinIO) |
| `pnpm docker:stop` | Arrete les conteneurs |
| `pnpm docker:reset` | Reset complet : stop, suppression volumes, redemarrage, re-init BDD |

### Tests

| Commande | Description |
|----------|-------------|
| `pnpm test` | Tests unitaires Jest (tout sauf e2e) |
| `pnpm test:integration` | Tests d'integration (necessite Docker) |
| `pnpm test:e2e` | Tests end-to-end Cypress |
| `pnpm -F storybook test-storybook` | Tests des composants Storybook |

### Qualite de code

| Commande | Description |
|----------|-------------|
| `pnpm lint` | Linting avec Biome |
| `pnpm format` | Formatage avec Prettier (`*.ts`, `*.tsx`, `*.md`, `*.css`) |
| `pnpm tsc` | Verification de types TypeScript |

### Infrastructure (CDK)

| Commande | Description |
|----------|-------------|
| `pnpm -F cdk synth` | Genere le code Terraform a partir du CDK |
| `pnpm -F cdk cdktf` | Exécute le CLI cdktf |
| `pnpm -F cdk output` | Affiche les outputs Terraform (donnees sensibles incluses) |
| `pnpm -F cdk clean-cdktf` | Nettoie et reinitialise le CDKTF |

### Utilitaires

| Commande | Description |
|----------|-------------|
| `pnpm cli` | Execute l'application CLI (scripts de deploiement) |
| `pnpm scw` | Execute des commandes Scaleway CLI |
| `pnpm clean` | Supprime `node_modules` a la racine |
| `pnpm clean:workspaces` | Supprime `node_modules` dans tous les workspaces |
| `pnpm with-env` | Execute une commande avec les variables d'environnement chargees |

---

## Infrastructure Terraform (CDK)

L'infrastructure est definie en TypeScript avec [CDKTF](https://developer.hashicorp.com/terraform/cdktf) (CDK for Terraform) et deployee sur **Scaleway** (region `fr-par`).

### Architecture a deux stacks

L'infrastructure est divisee en deux stacks Terraform :

#### 1. `ProjectStack` (ressources partagees, deploye une seule fois)

Contient les ressources communes a tous les environnements :

```
ProjectStack
├── Compute
│   ├── ContainerNamespace        # Namespace pour les conteneurs serverless
│   └── RegistryNamespace         # Registre Docker (la-base-web-app)
│
├── Base de donnees
│   └── RdbInstance                # PostgreSQL 14 manage (db-pro2-xxs)
│       ├── Haute disponibilite activee
│       ├── Stockage : 30 Go SBS_15K
│       ├── Chiffrement au repos
│       ├── Sauvegardes auto (quotidienne, hebdomadaire, mensuelle)
│       └── 500 connexions max
│
├── Stockage objet
│   ├── ObjectBucket (uploads)         # Fichiers uploades (CORS active)
│   ├── ObjectBucket (legacy-uploads)  # Bucket de migration v1
│   └── ObjectBucket (backups)         # Sauvegardes BDD
│
├── Email transactionnel
│   └── TemDomain                 # Scaleway TEM (SPF, DKIM, DMARC)
│
├── DNS (DomainRecord)
│   ├── NS     → ns0.dom.scw.cloud, ns1.dom.scw.cloud
│   ├── A      → IP maildev
│   ├── CNAME  → app web, email (imap, smtp, webmail), CDN uploads, DKIM Brevo
│   ├── MX     → mx.ox.numerique.gouv.fr
│   └── TXT    → SPF, DKIM, DMARC, verification Brevo
│
├── Monitoring
│   ├── Cockpit                   # Observabilite Scaleway (metriques, logs)
│   ├── CockpitToken              # Token d'authentification conteneurs
│   └── CockpitGrafanaUser        # Utilisateurs Grafana (editor, viewer)
│
└── Secrets
    ├── Secret                    # Scaleway Secret Manager
    └── SecretVersion             # Versioning des secrets
```

#### 2. `WebAppStack` (ressources par branche/environnement)

Deploye pour chaque environnement (`main`, `dev`, branches de feature) :

```
WebAppStack
├── Container                     # Conteneur serverless de l'app web
├── ContainerDomain               # Mapping domaine personnalise
├── RdbDatabase                   # Base de donnees dediee a l'environnement
├── RdbUser                       # Utilisateur BDD dedie
├── RdbPrivilege                  # Droits d'acces BDD
├── DomainRecord                  # Enregistrement DNS pour le sous-domaine
└── ContainerCron (main uniquement)
    ├── Sauvegarde horaire
    ├── Sauvegarde quotidienne
    ├── Sauvegarde hebdomadaire
    ├── Envoi des newsletters
    └── Verification d'inactivite des comptes
```

### Differences par environnement

| | Main (production) | Dev / Preview |
|---|---|---|
| **Domaine** | lesbases.anct.gouv.fr | v2.labase.incubateur.anct.gouv.fr |
| **Conteneurs** | 2 a 5 instances | 0 a 1 instance |
| **CPU / Memoire** | 2240 mVCPU / 3072 Mo | 1120 mVCPU / 2048 Mo |
| **Email** | Brevo + Scaleway TEM | MailDev |
| **SMTP** | smtp.tem.scw.cloud:587 | maildev.lesbases.anct.gouv.fr |
| **Jobs planifies** | Actifs (sauvegardes, newsletters) | Desactives |
| **Donnees** | Production | Dump de main + fixtures |

### Backend Terraform

L'etat Terraform est stocke dans un bucket S3 Scaleway : `la-base-terraform-state`.

### Commandes CDK

```bash
# Generer le code Terraform
pnpm -F cdk synth

# Voir le plan d'execution
pnpm -F cdk cdktf diff

# Deployer l'infrastructure
pnpm -F cdk cdktf deploy

# Afficher les outputs (avec donnees sensibles)
pnpm -F cdk output
```

### CI/CD (CircleCI)

Le pipeline CircleCI definit 4 workflows :

1. **web_app_deployment** (automatique a chaque push)
   - Installation des dependances
   - Lint et verification de types
   - Tests unitaires, integration, composants, e2e
   - Build de l'application web
   - Deploiement du stack web

2. **project_infrastructure_deployment** (declenchement manuel)
   - Lint et tests de l'infrastructure
   - Calcul du diff Terraform
   - Approbation manuelle requise
   - Deploiement de l'infrastructure projet

3. **chromatic_deployment** (declenchement manuel)
   - Deploiement du Storybook sur Chromatic

4. **web_app_preview_deletion** (declenchement manuel)
   - Destruction des environnements de preview

---

## Procedures de contribution

### Branches

- Creer les branches a partir d'une version a jour de `dev`
- Prefixer avec : `build/`, `chore/`, `ci/`, `docs/`, `feat/`, `fix/`, `perf/`, `refactor/`, `revert/`, `style/` ou `test/`
- Ref : [Conventional Commits](https://kapeli.com/cheat_sheets/Conventional_Commits.docset/Contents/Resources/Documents/index)

### Commits

Les messages de commit doivent suivre la specification [Commits Conventionnels](https://www.conventionalcommits.org/fr).

### Workflow de contribution

1. Creer une branche : `git checkout -b feat/ma-fonctionnalite`
2. Commiter : `git commit -m "feat: ajoute ma fonctionnalite"`
3. Pousser : `git push origin feat/ma-fonctionnalite`
4. Ouvrir une Pull Request vers `dev`

### Deploiement

La fusion d'une branche dans `main` declenche automatiquement le deploiement en production.

---

## Stack technique

### Langages et frameworks

- [TypeScript](https://www.typescriptlang.org/) - Langage principal
- [React](https://react.dev/) 19 - Bibliotheque UI avec Server Components
- [Next.js](https://nextjs.org/) 15 - Framework full-stack
- [tRPC](https://trpc.io/) - API type-safe
- [Prisma](https://www.prisma.io/) - ORM TypeScript / PostgreSQL
- [Zod](https://zod.dev/) - Validation de schemas

### UI et design

- [DSFR](https://www.systeme-de-design.gouv.fr/) - Systeme de Design de l'Etat
- [React DSFR](https://github.com/codegouvfr/react-dsfr) - Integration React du DSFR
- [TipTap](https://tiptap.dev/) - Editeur de texte riche
- [Recharts](https://recharts.org/) - Visualisation de donnees
- [Remix Icon](https://remixicon.com/) - Icones
- [Framer Motion](https://www.framer.com/motion/) - Animations

### Backend et services

- [NextAuth.js](https://next-auth.js.org/) - Authentification
- [ProConnect](https://proconnect.gouv.fr/) - Authentification gouvernementale
- [Nodemailer](https://nodemailer.com/) + [MJML](https://mjml.io/) - Emails transactionnels
- [Brevo](https://www.brevo.com/) - Service d'email
- [Friendly Captcha](https://friendlycaptcha.com/) - CAPTCHA

### Infrastructure et deploiement

- [Scaleway](https://www.scaleway.com/) - Hebergement cloud
- [CDKTF](https://developer.hashicorp.com/terraform/cdktf) - Infrastructure as Code (TypeScript)
- [Docker](https://www.docker.com/) - Conteneurisation
- [CircleCI](https://circleci.com/) - CI/CD

### Qualite et monitoring

- [Biome](https://biomejs.dev/) - Linter et formateur
- [Prettier](https://prettier.io/) - Formatage de code
- [Jest](https://jestjs.io/) - Tests unitaires et integration
- [Cypress](https://www.cypress.io/) - Tests end-to-end
- [Storybook](https://storybook.js.org/) - Documentation de composants
- [Sentry](https://sentry.io/) - Monitoring d'erreurs
- [Matomo](https://matomo.org/) - Analytics
- [Cockpit / Grafana](https://www.scaleway.com/en/cockpit/) - Observabilite infrastructure
