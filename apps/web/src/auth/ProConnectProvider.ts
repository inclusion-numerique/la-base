import { proConnectProviderId } from '@app/web/auth/proConnect'
import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import { getServerUrl } from '@app/web/utils/baseUrl'
import axios from 'axios'
import jwt from 'jsonwebtoken'
import type { OAuthConfig } from 'next-auth/providers'

// ProConnect publie son document de découverte sous `/api/v2` et renvoie `iss` sur le
// callback d'autorisation (`authorization_response_iss_parameter_supported: true`).
// Auth.js v5 valide ce paramètre — next-auth v4 l'ignorait — donc l'issuer déclaré doit
// être l'identifiant exact, chemin `/api/v2` compris, et non la seule origine.
const issuer = `https://${PublicWebAppConfig.ProConnect.hostname}/api/v2`

/**
 * `@auth/core` ships an `oauth.d.ts` that references an `EndpointHandler` type it does not
 * declare, so these two handlers get no contextual typing and would be implicitly `any`.
 * We spell out the shapes we actually rely on.
 */
type TokenRequestContext = { params: { code?: string } }
type UserinfoRequestContext = { tokens: { access_token?: string } }

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
    // next-auth v4 créait systématiquement `state`, `pkce` et `nonce` ; Auth.js v5 se
    // limite à `['pkce']` par défaut. ProConnect refuse la requête d'autorisation sans
    // `state` (« state must be a string », code Y000400).
    checks: ['pkce', 'state'],
    // Allow an email user to login with Inclusion Connect
    allowDangerousEmailAccountLinking: true,
    clientId: PublicWebAppConfig.ProConnect.clientId,
    clientSecret: ServerWebAppConfig.ProConnect.clientSecret,
    issuer,
    authorization: {
      url: `${issuer}/authorize`,
      params: {
        // https://github.com/numerique-gouv/agentconnect-documentation/blob/main/doc_fs/scope-claims.md#correspondance-entre-scope-et-claims-sur-agentconnect
        scope: 'openid given_name usual_name email',
        // 'openid given_name usual_name email uid siret siren organizational_unit belonging_population phone chorusdt',

        acr_values: 'eidas1',
      },
    },
    token: {
      // L'URL est déclarée en plus du handler : Auth.js v5 bascule sur la découverte OIDC
      // dès que `token.url` et `userinfo.url` manquent tous deux. La déclarer nous en
      // dispense — un aller-retour réseau de moins au démarrage du flux.
      url: `${issuer}/token`,
      request: async (context: TokenRequestContext) => {
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
          url: `${issuer}/token`,
        })

        return { tokens: r.data }
      },
    },
    userinfo: {
      url: `${issuer}/userinfo`,
      request: async ({ tokens }: UserinfoRequestContext) => {
        const r = await axios<string>({
          method: 'GET',
          url: `${issuer}/userinfo`,
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
