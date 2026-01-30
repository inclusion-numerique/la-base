# Recyclage des fichiers S3 orphelins

Script CLI pour identifier et supprimer les fichiers images du bucket S3 qui ne sont plus references en base de donnees depuis plus de 3 mois.

## Contexte

Le bucket `la-base-uploads` accumule des fichiers qui ne sont plus utilises :
- Images uploadees puis supprimees de l'interface
- Caches WebP de processing pour des images qui n'existent plus
- Fichiers legacy non migres

Le script detecte ces fichiers orphelins et genere un rapport CSV avant toute suppression.

## Perimetre

**Inclus dans le nettoyage :**

| Categorie | Description |
|-----------|-------------|
| `no-upload-record` | Fichier S3 sans record `Upload` en base de donnees |
| `upload-no-image` | Record `Upload` existant mais aucune `Image` ne le reference |
| `image-no-entity` | Record `Image` existant mais aucune entite (User, Base, Resource, Collection, Content) ne le reference |
| `orphaned-webp-cache` | Cache WebP dont l'image source est orpheline ou inexistante |
| `legacy-unreferenced` | Fichier sous `legacy/` sans reference en DB (opt-in via `--include-legacy`) |

**Exclu du nettoyage :**
- Fichiers `external-image/` (cache d'images externes, regenerable a la demande)
- Fichiers non-image references par `Content.fileKey`

## Utilisation

```bash
# Dry-run (defaut) — genere un rapport CSV sans rien supprimer
pnpm cli s3:recycle-orphaned-files

# Scanner aussi les fichiers legacy
pnpm cli s3:recycle-orphaned-files --include-legacy

# Changer le seuil (6 mois au lieu de 3)
pnpm cli s3:recycle-orphaned-files --threshold-months 6

# Specifier le repertoire de sortie du CSV
pnpm cli s3:recycle-orphaned-files --output-dir ./reports

# Suppression reelle (apres validation du rapport dry-run)
pnpm cli s3:recycle-orphaned-files --delete

# Contre l'environnement de production
pnpm cli s3:recycle-orphaned-files --deployment main --delete
```

### Options

| Option | Defaut | Description |
|--------|--------|-------------|
| `--deployment <branch>` | — | Cible de deploiement (ex: `main`, `dev`) |
| `--prefix <prefix>` | `main/` | Prefix S3 a scanner |
| `--include-legacy` | `false` | Scanner aussi le prefix `legacy/` |
| `--threshold-months <n>` | `3` | Nombre de mois pour le seuil d'anciennete |
| `--output-dir <dir>` | `./` | Repertoire de sortie du rapport CSV |
| `--delete` | `false` | Supprimer reellement (par defaut: dry-run) |
| `--batch-size <n>` | `100` | Taille de batch pour les suppressions S3 |

### Rapport genere

Le script produit :

1. **Un fichier CSV** (delimiteur `;`, UTF-8 BOM) avec les colonnes :
   `Key`, `Category`, `Reason`, `Size (bytes)`, `Last Modified`

2. **Un resume stdout** avec le nombre de fichiers par categorie et l'espace recuperable total.

## Test local avec MinIO

Le bucket S3 de production est partage. Pour tester le script en local sans risque, utiliser MinIO. Un container docker est disponible pour le démarrer dans le docker compose de dev.

### 1. Demarrer MinIO

```bash
docker compose -f docker-compose.dev.yml up minio minio-init -d
```

MinIO est accessible sur :
- API S3 : `http://localhost:9000`
- Console web : `http://localhost:9001` (login: `minioadmin` / `minioadmin`)

### 2. Configurer l'environnement

Dans `.env`, remplacer les variables S3 pour pointer vers MinIO :

```bash
S3_HOST=localhost:9000
AWS_ACCESS_KEY_ID=minioadmin
AWS_SECRET_ACCESS_KEY=minioadmin
```

Le client S3 detecte automatiquement `localhost` et active `forcePathStyle` + `http://` (requis par MinIO).

### 3. Synchroniser les donnees de production

Prerequis : [MinIO Client (`mc`)](https://min.io/docs/minio/linux/reference/minio-mc.html) installe (`brew install minio/stable/mc`) -- ou utiliser le container docker de dev.

```bash
# Synchroniser le prefix main/ (necessite les credentials Scaleway en variables d'env)
SCW_ACCESS_KEY=<votre_cle> SCW_SECRET_KEY=<votre_secret> ./scripts/sync-s3-to-minio.sh

# Ou un sous-ensemble specifique
SCW_ACCESS_KEY=<votre_cle> SCW_SECRET_KEY=<votre_secret> ./scripts/sync-s3-to-minio.sh main/images/
```

### 4. Lancer le script

```bash
# Dry-run d'abord
pnpm cli s3:recycle-orphaned-files

# Verifier le CSV genere, puis supprimer
pnpm cli s3:recycle-orphaned-files --delete
```

## Architecture

```
apps/cli/src/commands/storage/
  recycleOrphanedFiles.ts    # Commande CLI (point d'entree et orchestration)
  findOrphanedFiles.ts       # Detection des orphelins (requetes DB + classification)
  generateOrphanReport.ts    # Generation CSV + resume stdout
  deleteOrphanedFiles.ts     # Suppression DB (Image/Upload) + S3 en batch
  types.ts                   # Types partages
```

### Algorithme de detection

1. Charger en memoire : tous les `Upload`, toutes les `Image` avec leurs relations, tous les `Content.fileKey`
2. Lister tous les objets S3 sous le prefix demande
3. Pour chaque objet S3 :
   - Skip si `external-image/` (exclu)
   - Skip si reference par `Content.fileKey` (fichier non-image)
   - Skip si plus recent que le seuil de 3 mois
   - Si c'est un cache WebP : verifier si l'image source existe et est referencee
   - Sinon : verifier la chaine `Upload` → `Image` → entite

### Suppression (mode `--delete`)

1. Le rapport CSV est genere **avant** toute suppression
2. Records DB nettoyes en respectant les FK : `Image` puis `Upload`
3. Fichiers S3 supprimes en batch via `DeleteObjectsCommand`
4. Les caches WebP n'ont pas de record DB, suppression S3 uniquement
