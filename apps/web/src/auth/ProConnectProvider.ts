import { proConnectProviderId } from '@app/web/auth/proConnect'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import { getServerUrl } from '@app/web/utils/baseUrl'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import type { OAuthConfig } from 'next-auth/providers'

const issuer = `https://${PublicWebAppConfig.ProConnect.hostname}`

export type ProConnectProfile = {
  sub: string
  email: string
  given_name: string
  usual_name: string
  aud: string
  exp: number
  iat: number
  iss: string
}

/**
 * https://github.com/numerique-gouv/agentconnect-documentation/blob/main/doc_fs.md
 */

export const ProConnectProvider = () =>
  ({
    id: proConnectProviderId,
    name: 'ProConnect',
    type: 'oauth',
    version: '2.0',
    // Allow an email user to login with Inclusion Connect
    allowDangerousEmailAccountLinking: true,
    clientId: PublicWebAppConfig.ProConnect.clientId,
    clientSecret: ServerWebAppConfig.ProConnect.clientSecret,
    issuer,
    authorization: {
      url: `${issuer}/api/v2/authorize`,
      params: {
        // https://github.com/numerique-gouv/agentconnect-documentation/blob/main/doc_fs/scope-claims.md#correspondance-entre-scope-et-claims-sur-agentconnect
        scope: 'openid given_name usual_name email',
        // 'openid given_name usual_name email uid siret siren organizational_unit belonging_population phone chorusdt',

        acr_values: 'eidas1',
      },
    },
    token: {
      request: async (context) => {
        const body = {
          grant_type: 'authorization_code',
          client_id: PublicWebAppConfig.ProConnect.clientId,
          client_secret: ServerWebAppConfig.ProConnect.clientSecret,
          redirect_uri: getServerUrl('/api/auth/callback/proconnect'),
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
          url: `${issuer}/api/v2/token`,
        })

        return { tokens: r.data }
      },
    },
    userinfo: {
      request: async ({ tokens }) => {
        const r = await axios<string>({
          method: 'GET',
          url: `${issuer}/api/v2/userinfo`,
          headers: {
            Authorization: tokens.access_token
              ? `Bearer ${tokens.access_token}`
              : '',
          },
        })
        // User info returns a JWT token instead of a JSON object, we decode it
        return jwt.decode(r.data) as ProConnectProfile
      },
    },
    profile: ({ email, sub, given_name, usual_name }) => ({
      id: sub,
      name: `${given_name} ${usual_name}`.trim(),
      firstName: given_name,
      lastName: usual_name,
      email: email.toLowerCase(),
      provider: proConnectProviderId,
    }),
  }) satisfies OAuthConfig<ProConnectProfile>
