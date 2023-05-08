import '@app/web/auth/nextAuthSetup'
import EmailProvider from 'next-auth/providers/email'
import KeycloakProvider, { KeycloakProfile } from 'next-auth/providers/keycloak'
import NextAuth, { NextAuthOptions } from 'next-auth'
import { sendVerificationRequest } from '@app/web/auth/sendVerificationRequest'
import { nextAuthAdapter } from '@app/web/auth/nextAuthAdapter'
import { inclusionConnectProviderId } from '@app/web/auth/inclusionConnect'
import { PublicWebAppConfig, ServerWebAppConfig } from '@app/web/webAppConfig'

export const authOptions: NextAuthOptions = {
  adapter: nextAuthAdapter,
  pages: {
    signIn: '/connexion',
    signOut: '/deconnexion',
    error: '/connexion/erreur',
    verifyRequest: '/connexion/verification',
    // This would be the first page the user sees after signing up
    // newUser: '/bienvenue',
  },
  providers: [
    EmailProvider({
      ...ServerWebAppConfig.Auth.Email,
      sendVerificationRequest,
    }),
    KeycloakProvider({
      // Allow an email user to login with Inclusion Connect
      allowDangerousEmailAccountLinking: true,
      id: inclusionConnectProviderId,
      name: 'Inclusion Connect',
      clientId: PublicWebAppConfig.InclusionConnect.clientId,
      clientSecret: ServerWebAppConfig.InclusionConnect.clientSecret,
      // KeycloakProvider adds wellknown open id config path
      issuer: PublicWebAppConfig.InclusionConnect.issuer,
      profile: (profile: KeycloakProfile) => ({
        id: profile.sub,
        name: profile.name ?? profile.preferred_username,
        firstName: profile.given_name,
        lastName: profile.family_name,
        email: profile.email,
        image: profile.picture,
        provider: inclusionConnectProviderId,
      }),
    }),
  ],
  callbacks: {
    signIn({ account, user }) {
      const isAllowedToSignIn =
        // KeyCloak is a type of oauth
        account?.type === 'oauth' ||
        // If user exists and comes from prisma, we will have User model properties defined
        ('created' in user &&
          !!user.created &&
          'updated' in user &&
          !!user.updated)

      if (isAllowedToSignIn) {
        return true
      }
      // Return false to display a default error message
      // return false

      // Or you can return a URL to redirect to:
      return `/creer-un-compte?raison=connexion-sans-compte&email=${
        user?.email ?? ''
      }`
    },
    session: ({ session, user }) => {
      if (session.user) {
        // eslint-disable-next-line no-param-reassign
        session.user.id = user.id
      }
      return session
    },
  },
}

export default NextAuth(authOptions)
