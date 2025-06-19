import { getSessionTokenFromCookies } from '@app/web/auth/getSessionTokenFromCookies'
import { getSessionUserFromSessionToken } from '@app/web/auth/getSessionUserFromSessionToken'
import type { FetchCreateContextFnOptions } from '@trpc/server/src/adapters/fetch/types'
import * as cookie from 'cookie'

export const createContext = async ({
  req,
  resHeaders,
  info,
}: FetchCreateContextFnOptions) => {
  const cookies = cookie.parse(req.headers.get('cookie') || '')
  const sessionToken = getSessionTokenFromCookies(cookies)

  if (!sessionToken) {
    return { req, user: null, resHeaders, info, sessionToken: null }
  }
  const user = await getSessionUserFromSessionToken(sessionToken)

  return { req, user, resHeaders, info, sessionToken }
}

export type AppContext = Awaited<ReturnType<typeof createContext>>
