import type { ProconnectSignoutState } from '@app/web/app/(public)/(authentication)/deconnexion/callback/proconnectSignout'
import { generateProconnectSignoutUrl } from '@app/web/app/(public)/(authentication)/deconnexion/callback/proconnectSignout'
import { getSessionTokenFromNextRequestCookies } from '@app/web/auth/getSessionTokenFromCookies'
import { getSessionUserFromSessionToken } from '@app/web/auth/getSessionUserFromSessionToken'
import { proConnectProviderId } from '@app/web/auth/proConnect'
import { prismaClient } from '@app/web/prismaClient'
import { refreshProconnectIdToken } from '@app/web/security/getProconnectIdToken'
import {
  type EncodedState,
  encodeSerializableState,
} from '@app/web/utils/encodeSerializableState'
import type { NextRequest } from 'next/server'
import { v4 } from 'uuid'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const isJwtUnexpired = (token: string, clockSkewSeconds = 3): boolean => {
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

export const GET = async (request: NextRequest) => {
  const { searchParams, origin } = request.nextUrl
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  const sessionToken = getSessionTokenFromNextRequestCookies(request.cookies)
  const user = sessionToken
    ? await getSessionUserFromSessionToken(sessionToken)
    : null

  // If no local session, skip provider logout and just redirect back
  if (!user) {
    return new Response('OK', {
      status: 303,
      headers: { location: callbackUrl },
    })
  }

  // Try to get a valid id_token for logout
  const account = await prismaClient.account.findFirst({
    where: { userId: user.id, provider: proConnectProviderId },
    select: { id_token: true, refresh_token: true },
  })

  let idTokenHint: string | null = account?.id_token ?? null

  if (!idTokenHint || !isJwtUnexpired(idTokenHint)) {
    idTokenHint = account?.refresh_token
      ? await refreshProconnectIdToken(account.refresh_token)
      : null
  }

  if (idTokenHint) {
    const proconnectLogoutUrl = generateProconnectSignoutUrl({
      origin,
      callbackUrl,
      idTokenHint,
    })
    return new Response('OK', {
      status: 303,
      headers: { location: proconnectLogoutUrl },
    })
  }

  // Fallback: go directly to our local callback which will clear the session and redirect back
  const state = encodeSerializableState<ProconnectSignoutState>({
    callbackUrl,
    nonce: v4(),
  }) as EncodedState<ProconnectSignoutState>

  const postLogoutRedirectUri = `${origin}/deconnexion/callback?state=${encodeURIComponent(
    state,
  )}`

  return new Response('OK', {
    status: 303,
    headers: { location: postLogoutRedirectUri },
  })
}
