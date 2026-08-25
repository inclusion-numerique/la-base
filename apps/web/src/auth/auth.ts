import {
  secureSessionCookie,
  sessionCookie,
} from '@app/web/auth/getSessionTokenFromCookies'
import { nextAuthAdapter } from '@app/web/auth/nextAuthAdapter'
import { ProConnectProvider } from '@app/web/auth/ProConnectProvider'
import { sendVerificationRequest } from '@app/web/auth/sendVerificationRequest'
import { signinCallback } from '@app/web/auth/signinCallback'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import NextAuth, { type NextAuthConfig } from 'next-auth'
import Email from 'next-auth/providers/email'

/**
 * Mirrors the `origin.startsWith('https:')` check Auth.js uses to decide whether to
 * prefix its cookies with `__Secure-`, expressed with our own base url logic.
 * @see getServerBaseUrl
 */
const useSecureCookies = !!process.env.BASE_URL

/**
 * Auth.js v5 renamed its cookies from `next-auth.*` to `authjs.*`. We pin the v4 names so
 * that sessions issued before the upgrade stay valid, and so that the places where we read
 * the session cookie ourselves keep working.
 * @see getSessionTokenFromCookies
 * @see sessionTokenFromCookies
 */
const sessionTokenCookieName = useSecureCookies
  ? secureSessionCookie
  : sessionCookie

export const nextAuthOptions = {
  // debug: process.env.NODE_ENV !== 'production',
  adapter: nextAuthAdapter,
  // v4 read NEXTAUTH_SECRET from the environment on its own, v5 looks for AUTH_SECRET.
  // We pass it explicitly to keep the existing variable name everywhere it is provisioned.
  secret: process.env.NEXTAUTH_SECRET,
  // v5 no longer trusts the request host by default outside of Vercel.
  trustHost: true,
  session: { strategy: 'database' },
  cookies: {
    sessionToken: {
      name: sessionTokenCookieName,
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: useSecureCookies,
      },
    },
  },
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
        session.user.id = user.id
      }
      return session
    },
  },
} satisfies NextAuthConfig

export const { handlers, auth, signIn, signOut } = NextAuth(nextAuthOptions)
