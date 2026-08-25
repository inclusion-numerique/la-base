import { isFirewallUserAgent } from '@app/web/app/api/auth/[...nextauth]/isFirewallUserAgent'
import { handlers } from '@app/web/auth/auth'
import type { NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'
export const revalidate = 0

/**
 * https://next-auth.js.org/tutorials/avoid-corporate-link-checking-email-provider
 * Wraps the Auth.js route handlers to reject the user agents used by corporate link
 * checkers, which would otherwise burn single-use magic links before the user opens them.
 */
const withFirewallGuard =
  (handler: (request: NextRequest) => Promise<Response>) =>
  (request: NextRequest) =>
    isFirewallUserAgent(request)
      ? new Response('Bad Request', { status: 400 })
      : handler(request)

export const GET = withFirewallGuard(handlers.GET)
export const POST = withFirewallGuard(handlers.POST)
