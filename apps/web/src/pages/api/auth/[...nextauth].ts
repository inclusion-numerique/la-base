import axios from 'axios'
import NextAuth, { NextAuthOptions, TokenSet } from 'next-auth'
import EmailProvider from 'next-auth/providers/email'
import KeycloakProvider, { KeycloakProfile } from 'next-auth/providers/keycloak'
import { inclusionConnectProviderId } from '@app/web/auth/inclusionConnect'
import { nextAuthAdapter } from '@app/web/auth/nextAuthAdapter'
import '@app/web/auth/nextAuthSetup'
import { sendVerificationRequest } from '@app/web/auth/sendVerificationRequest'
import { PublicWebAppConfig, ServerWebAppConfig } from '@app/web/webAppConfig'

export const authOptions: NextAuthOptions = {
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
  providers: [
    EmailProvider({
      ...ServerWebAppConfig.Auth.Email,
      sendVerificationRequest,
    }),
    {
      id: inclusionConnectProviderId,
      name: 'Inclusion Connect',
      type: 'oauth',
      version: '2.0',
      // Allow an email user to login with Inclusion Connect
      allowDangerousEmailAccountLinking: true,
      clientId: PublicWebAppConfig.InclusionConnect.clientId,
      clientSecret: ServerWebAppConfig.InclusionConnect.clientSecret,
      issuer: PublicWebAppConfig.InclusionConnect.iss,
      authorization: {
        url: `${PublicWebAppConfig.InclusionConnect.issuer}/protocol/openid-connect/auth`,
        params: {
          scope: 'openid profile email ',
        },
      },
      token: {
        request: async (context) => {
          const body = {
            grant_type: 'authorization_code',
            client_id: PublicWebAppConfig.InclusionConnect.clientId,
            client_secret: ServerWebAppConfig.InclusionConnect.clientSecret,
            redirect_uri:
              'http://localhost:3000/api/auth/callback/inclusion-connect',
            code: context.params.code || 'undefined',
          }
          const data = new URLSearchParams(body).toString()
          const r = await axios<{
            access_token: string
            expires_in: number
            token_type: 'Bearer'
            scope: string
            refresh_token: string
            id_token: string
          }>({
            method: 'POST',
            headers: {
              'content-type': 'application/x-www-form-urlencoded',
            },
            data,
            url: `${PublicWebAppConfig.InclusionConnect.issuer}/protocol/openid-connect/token`,
          })
          return { tokens: r.data }
        },
      },
      userinfo: {
        request: async ({ tokens }) => {
          const r = await axios<{
            sub: string
            email: string
            given_name: string
            family_name: string
          }>({
            method: 'POST',
            url: `${PublicWebAppConfig.InclusionConnect.issuer}/protocol/openid-connect/userinfo`,
            headers: {
              Authorization: tokens.access_token
                ? `Bearer ${tokens.access_token}`
                : '',
            },
          })
          return r.data
        },
      },
      profile: (profile: {
        sub: string
        email: string
        given_name: string
        family_name: string
      }) => ({
        id: profile.sub,
        name: `${profile.given_name} ${profile.family_name}`,
        firstName: profile.given_name,
        lastName: profile.family_name,
        email: profile.email,
        provider: inclusionConnectProviderId,
      }),
    },
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
