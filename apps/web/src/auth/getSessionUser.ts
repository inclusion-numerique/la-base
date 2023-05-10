import { cookies } from 'next/headers'
import { cache } from 'react'
import 'server-only'
import {
  secureSessionCookie,
  sessionCookie,
} from '@app/web/auth/getSessionTokenFromCookies'
import { getSessionUserFromSessionToken } from '@app/web/auth/getSessionUserFromSessionToken'
import { SessionUser } from '@app/web/auth/sessionUser'

export const getSessionToken = (): string | null => {
  const allCookies = cookies()
  const sessionToken =
    allCookies.get(secureSessionCookie) ?? allCookies.get(sessionCookie)

  if (!sessionToken) {
    return null
  }
  return sessionToken.value
}

export const getAuthenticatedSessionToken = (): string => {
  const token = getSessionToken()
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
  const sessionToken = getSessionToken()

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
