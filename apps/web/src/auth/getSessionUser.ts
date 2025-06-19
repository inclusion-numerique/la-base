import { cookies } from 'next/headers'
import { cache } from 'react'
import 'server-only'
import {
  secureSessionCookie,
  sessionCookie,
} from '@app/web/auth/getSessionTokenFromCookies'
import { getSessionUserFromSessionToken } from '@app/web/auth/getSessionUserFromSessionToken'
import type { SessionUser } from '@app/web/auth/sessionUser'

export const getSessionToken = async (): Promise<string | null> => {
  const cookieStore = await cookies()
  const sessionToken =
    cookieStore.get(secureSessionCookie) ?? cookieStore.get(sessionCookie)

  if (!sessionToken) {
    return null
  }
  return sessionToken.value
}

export const getAuthenticatedSessionToken = async (): Promise<string> => {
  const token = await getSessionToken()
  if (!token) {
    throw new Error('Unauthenticated user')
  }
  return token
}

// User session is cached per request https://beta.nextjs.org/docs/data-fetching/caching#per-request-caching
const cachedGetSessionUserFromSessionToken = cache(
  getSessionUserFromSessionToken,
)

export const getSessionUser = async (): Promise<SessionUser | null> => {
  const sessionToken = await getSessionToken()

  if (!sessionToken) {
    return null
  }

  return cachedGetSessionUserFromSessionToken(sessionToken)
}

export const getAuthenticatedSessionUser = () =>
  getSessionUser().then((user) => {
    if (!user) {
      throw new Error('Unauthenticated user')
    }
    return user
  })
