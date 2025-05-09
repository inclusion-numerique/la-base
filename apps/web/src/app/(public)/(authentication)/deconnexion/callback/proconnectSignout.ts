import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import { encodeSerializableState } from '@app/web/utils/encodeSerializableState'
import { v4 } from 'uuid'

const proconnectSignoutRedirectPath = '/deconnexion/callback'

export type ProconnectSignoutState = {
  callbackUrl: string
  nonce: string
}

/**
 * After proconnect signout, we redirect to our callbackUrl with the state
 * This will only signout the user from proconnect, not from the app.
 * The proconnectSignoutRedirectPath callback will destroy the session and redirect to the callbackUrl
 */
export const generateProconnectSignoutUrl = ({
  origin,
  callbackUrl,
  idTokenHint,
}: {
  origin: string
  idTokenHint: string
  callbackUrl: string
}) => {
  const state = encodeSerializableState({
    callbackUrl,
    nonce: v4(),
  })

  const postLogoutRedirectUri = `${origin}${proconnectSignoutRedirectPath}`

  const queryParams = new URLSearchParams({
    state,
    post_logout_redirect_uri: postLogoutRedirectUri,
    id_token_hint: idTokenHint,
  })

  return `https://${PublicWebAppConfig.ProConnect.hostname}/api/v2/session/end?${queryParams.toString()}`
}
