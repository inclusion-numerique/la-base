import { PublicWebAppConfig } from '@app/web/webAppConfig'

export const GET = () =>
  new Response(
    JSON.stringify({ status: 'ok', publicConfiguration: PublicWebAppConfig }),
    { headers: { 'Content-Type': 'application/json' } },
  )
