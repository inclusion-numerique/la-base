import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'

// Calculé à chaque requête : prérendu au build, le fichier dépendait de la
// variable BRANCH de l'environnement de build et bloquait toute la production
// quand elle était absente. Le conteneur, lui, connaît toujours sa branche.
export const dynamic = 'force-dynamic'

const headers = {
  'Content-Type': 'text/plain; charset=utf-8',
  'Cache-Control': 'public, max-age=3600',
}

// Disallow indexing of preview environments
export const GET = () =>
  PublicWebAppConfig.isMain
    ? new Response(
        `User-agent: *
Allow: /
`,
        { headers },
      )
    : new Response(
        `User-agent: *
Disallow: /
`,
        { headers },
      )
