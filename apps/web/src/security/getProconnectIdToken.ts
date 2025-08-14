import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import { proConnectProviderId } from '@app/web/auth/proConnect'
import type { SessionUser } from '@app/web/auth/sessionUser'
import { prismaClient } from '@app/web/prismaClient'
import axios from 'axios'

const isJwtUnexpired = (token: string, clockSkewSeconds = 60): boolean => {
  try {
    const [, payloadB64] = token.split('.')
    if (!payloadB64) return false
    const payloadJson = Buffer.from(payloadB64, 'base64').toString('utf8')
    const payload = JSON.parse(payloadJson) as { exp?: number }
    if (!payload?.exp || typeof payload.exp !== 'number') return false
    const nowInSeconds = Math.floor(Date.now() / 1000)

    return payload.exp > nowInSeconds + clockSkewSeconds
  } catch {
    return false
  }
}

export const getProconnectIdToken = ({
  id,
}: Pick<SessionUser, 'id'>): Promise<string | null> =>
  prismaClient.account
    .findFirst({
      where: {
        userId: id,
        provider: proConnectProviderId,
        id_token: { not: null },
      },
      select: {
        id_token: true,
      },
    })
    .then((result) => {
      const token = result?.id_token ?? null
      if (!token) return null
      return isJwtUnexpired(token) ? token : null
    })

const issuer = `https://${PublicWebAppConfig.ProConnect.hostname}`

export async function refreshProconnectIdToken(
  refreshToken: string,
): Promise<string | null> {
  try {
    const data = new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: PublicWebAppConfig.ProConnect.clientId,
      refresh_token: refreshToken,
    }).toString()

    const response = await axios<{ id_token: string }>({
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      data,
      url: `${issuer}/api/v2/token`,
    })

    const idToken = response.data?.id_token
    return typeof idToken === 'string' && idToken.length > 0 ? idToken : null
  } catch {
    return null
  }
}
