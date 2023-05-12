import { inferAsyncReturnType } from '@trpc/server'
import { CreateNextContextOptions } from '@trpc/server/src/adapters/next'
import { getSessionTokenFromCookies } from '@app/web/auth/getSessionTokenFromCookies'
import { getSessionUserFromSessionToken } from '@app/web/auth/getSessionUserFromSessionToken'

export const createContext = async ({ req, res }: CreateNextContextOptions) => {
  const sessionToken = getSessionTokenFromCookies(req.cookies)

  if (!sessionToken) {
    return { req, res, user: null }
  }
  const user = await getSessionUserFromSessionToken(sessionToken)

  return { req, res, user }
}

export type AppContext = inferAsyncReturnType<typeof createContext>
