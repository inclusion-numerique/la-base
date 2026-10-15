import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'

// Dynamique : dépend de la branche du conteneur, pas de celle du build
export const dynamic = 'force-dynamic'
export const revalidate = 0

const robotsHeaders = {
  'Content-Type': 'text/plain; charset=utf-8',
  'Cache-Control': 'public, max-age=3600',
}

// Hors production (previews, dev, local), rien n'est exploré
export const GET = () =>
  new Response(
    `User-agent: *
${PublicWebAppConfig.isMain ? 'Allow' : 'Disallow'}: /
`,
    { headers: robotsHeaders },
  )
