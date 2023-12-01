import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export const GET = () =>
  new Response(
    JSON.stringify({ status: 'ok', publicConfiguration: PublicWebAppConfig }),
    { headers: { 'Content-Type': 'application/json' } },
  )
