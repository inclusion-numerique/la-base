import NextAuth, { type NextAuthOptions } from 'next-auth'
import type { NextRequest } from 'next/server'
import Email from 'next-auth/providers/email'
import { nextAuthAdapter } from '@app/web/auth/nextAuthAdapter'
import { ProConnectProvider } from '@app/web/auth/ProConnectProvider'
import { isFirewallUserAgent } from '@app/web/app/api/auth/[...nextauth]/isFirewallUserAgent'
import { sendVerificationRequest } from '@app/web/auth/sendVerificationRequest'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import { signinCallback } from '@app/web/auth/signinCallback'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const authOptions: NextAuthOptions = {
  // debug: process.env.NODE_ENV !== 'production',
  adapter: nextAuthAdapter,
  pages: {
    signIn: '/connexion',
    signOut: '/deconnexion',
    error: '/connexion/erreur',
    verifyRequest: '/connexion/verification',
    // This would be the first page the user sees after signing up
    // newUser: '/bienvenue',
  },
  providers: PublicWebAppConfig.isPreview
    ? [
        Email({
          ...ServerWebAppConfig.Email,
          sendVerificationRequest,
        }),
      ]
    : [
        // Proconnect is only available in main or dev environments
        ProConnectProvider(),
        Email({
          ...ServerWebAppConfig.Email,
          sendVerificationRequest,
        }),
      ],
  callbacks: {
    signIn: signinCallback,
    session: ({ session, user }) => {
      if (session.user) {
        // eslint-disable-next-line no-param-reassign
        session.user.id = user.id
      }
      return session
    },
  },
}

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

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return NextAuth(request, res, authOptions)
}

export { handler as GET, handler as POST }
