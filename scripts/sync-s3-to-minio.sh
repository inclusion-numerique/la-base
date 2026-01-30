#!/bin/bash
set +e

# Synchronise le bucket S3 de production vers le MinIO local
# Prerequis :
#   - MinIO local demarre (docker compose -f docker-compose.dev.yml up minio)
#   - mc (MinIO Client) installe : brew install minio/stable/mc
#   - Credentials Scaleway configurees dans les variables d'env ou .env

MINIO_ALIAS="local"
MINIO_ENDPOINT="http://localhost:9000"
MINIO_USER="minioadmin"
MINIO_PASS="minioadmin"
BUCKET="la-base-uploads"

SCW_ALIAS="scw"
SCW_ENDPOINT="https://s3.fr-par.scw.cloud"

# Prefix a synchroniser (par defaut: main/)
PREFIX="${1:-main/}"

echo "=== Sync S3 prod → MinIO local ==="
echo "Bucket: $BUCKET"
echo "Prefix: $PREFIX"
echo ""

# Configurer les alias mc
mc alias set "$MINIO_ALIAS" "$MINIO_ENDPOINT" "$MINIO_USER" "$MINIO_PASS" --api S3v4
mc alias set "$SCW_ALIAS" "$SCW_ENDPOINT" "${SCW_ACCESS_KEY:?SCW_ACCESS_KEY non defini}" "${SCW_SECRET_KEY:?SCW_SECRET_KEY non defini}" --api S3v4

# Creer le bucket local s'il n'existe pas
mc mb --ignore-existing "$MINIO_ALIAS/$BUCKET"

# Synchroniser chaque sous-dossier separement pour eviter qu'une erreur
# dans un dossier bloque la copie des autres
ERRORS=0

for SUBDIR in user images external-images; do
  SUBPATH="${PREFIX}${SUBDIR}/"
  echo ""
  echo "--- Synchronisation de $SUBPATH ---"
  mc mirror --overwrite --retry "$SCW_ALIAS/$BUCKET/$SUBPATH" "$MINIO_ALIAS/$BUCKET/$SUBPATH"
  if [ $? -ne 0 ]; then
    echo "  Erreurs sur $SUBPATH (certains fichiers non copies)"
    ERRORS=$((ERRORS + 1))
  fi
done

echo ""
if [ $ERRORS -eq 0 ]; then
  echo "Synchronisation terminee sans erreur."
else
  echo "Synchronisation terminee avec des erreurs sur $ERRORS dossier(s)."
  echo "Relancez le script pour reprendre les fichiers manquants."
fi
mc ls --summarize "$MINIO_ALIAS/$BUCKET/$PREFIX"
