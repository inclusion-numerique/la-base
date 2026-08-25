#!/usr/bin/env bash
# Monte l'environnement des tests e2e et lance Cypress.
#
# Les tests vident la base au démarrage. Ce script leur donne une base jetable dédiée
# plutôt que celle du `.env`, qui est en général la base de développement — la lancer
# telle quelle efface son contenu.
#
#   ./scripts/e2e-local.sh                      # toute la suite
#   ./scripts/e2e-local.sh --spec "cypress/e2e/authentication/*.cy.ts"
#
# Les arguments sont transmis à `cypress run`.
set -euo pipefail

repo="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$repo"

db_port=55444
db_url="postgresql://e2e:e2e@localhost:${db_port}/e2e"
env_file="$repo/.env.e2e.local"

echo "▸ Base jetable"
if ! docker ps --format '{{.Names}}' | grep -qx la-base-e2e; then
  docker rm -f la-base-e2e >/dev/null 2>&1 || true
  docker run -d --name la-base-e2e \
    -e POSTGRES_USER=e2e -e POSTGRES_PASSWORD=e2e -e POSTGRES_DB=e2e \
    -p "${db_port}:5432" postgres:14.0 >/dev/null
  until docker exec la-base-e2e pg_isready -U e2e >/dev/null 2>&1; do sleep 1; done
fi

echo "▸ Maildev"
if ! docker ps --format '{{.Names}}' | grep -qx la-base-maildev-e2e; then
  docker rm -f la-base-maildev-e2e >/dev/null 2>&1 || true
  docker run -d --name la-base-maildev-e2e \
    -e MAILDEV_INCOMING_USER=mailuser -e MAILDEV_INCOMING_PASS=mailpassword \
    -p 1025:1025 -p 1080:1080 maildev/maildev >/dev/null
  sleep 3
fi

echo "▸ Environnement"
# Les surcharges sont placées après la copie du .env : dotenv-cli retient la première
# occurrence d'une clé, mais Next et Node retiennent la dernière du fichier.
grep -vE '^(DATABASE_URL|SMTP_SERVER|SMTP_PORT|SMTP_USERNAME|SMTP_PASSWORD|IS_E2E|CI|PORT)=' .env > "$env_file"
cat >> "$env_file" <<EOF
DATABASE_URL="${db_url}"
SMTP_SERVER=localhost
SMTP_PORT=1025
SMTP_USERNAME=mailuser
SMTP_PASSWORD=mailpassword
IS_E2E=true
CI=true
PORT=3000
EOF

echo "▸ Migrations"
DATABASE_URL="$db_url" pnpm --silent -F @app/web prisma migrate deploy >/dev/null

echo "▸ Build"
pnpm --silent -F @app/web exec dotenv -e "$env_file" -- next build >/dev/null

echo "▸ Démarrage de l'application"
if ss -lntH 'sport = :3000' 2>/dev/null | grep -q .; then
  echo "  ✖ le port 3000 est déjà occupé — les tests interrogeraient cette application-là." >&2
  exit 1
fi
dist="$(mktemp -d)"
cp -r apps/web/.next/standalone/. "$dist/"
cp -r apps/web/public "$dist/apps/web/public"
cp -r apps/web/.next/static "$dist/apps/web/.next/static"
app_log="$repo/.e2e-app.log"
# `exec` remplace le sous-shell par node : `$!` désigne alors le serveur lui-même. Sans
# cela, le `kill` du trap ne tue que le sous-shell, node survit orphelin en gardant le
# port 3000, et le run suivant interroge ce zombie — dont le répertoire vient d'être
# supprimé — au lieu de sa propre application.
( cd "$dist" && exec env HOSTNAME=localhost node --env-file="$env_file" apps/web/server.js >"$app_log" 2>&1 ) &
app_pid=$!
trap 'kill "$app_pid" 2>/dev/null || true; rm -rf "$dist"' EXIT

for _ in $(seq 1 60); do
  curl -sf -o /dev/null http://localhost:3000/api/auth/providers && break
  sleep 1
done

echo "▸ Cypress   (journal de l'application : .e2e-app.log)"
# Le fichier e2e passe en premier : dotenv-cli fait gagner la première occurrence.
pnpm -F @app/e2e exec dotenv -e "$env_file" -e ../../.env -e ./cypress.env -- cypress run "$@"
