import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import { ProConnectProvider } from '@app/web/auth/ProConnectProvider'
import { nextAuthAdapter } from '@app/web/auth/nextAuthAdapter'
import { sendVerificationRequest } from '@app/web/auth/sendVerificationRequest'
import { signinCallback } from '@app/web/auth/signinCallback'
import type { AuthOptions } from 'next-auth'
import Email from 'next-auth/providers/email'

export const nextAuthOptions = {
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
        session.user.id = user.id
      }
      return session
    },
  },
} satisfies AuthOptions
