import { isFirewallUserAgent } from '@app/web/app/api/auth/[...nextauth]/isFirewallUserAgent'
import { nextAuthOptions } from '@app/web/auth/auth'
import type { NextRequest } from 'next/server'
import NextAuth from 'next-auth'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const handler = (
  request: NextRequest,
  res: {
    params: { nextauth: string[] }
  },
) => {
  // https://next-auth.js.org/tutorials/avoid-corporate-link-checking-email-provider
  if (isFirewallUserAgent(request)) {
    return new Response('Bad Request', { status: 400 })
  }

  return NextAuth(request, res, nextAuthOptions)
}

export { handler as GET, handler as POST }
