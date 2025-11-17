import type { AppContext } from '@app/web/server/rpc/createContext'
import { transformer } from '@app/web/utils/serialization'
import { initTRPC, TRPCError } from '@trpc/server'

const t = initTRPC.context<AppContext>().create({
  transformer,
  errorFormatter({ shape }) {
    return shape
  },
})

export const { router } = t
const { procedure, middleware } = t
/**
 * Unprotected procedure
 * */
export const publicProcedure = procedure

/**
 * Reusable middleware to ensure
 * users are logged in
 */
const isAuthenticated = middleware(({ ctx, next }) => {
  if (!ctx.user) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'Not authenticated',
    })
  }
  return next({
    ctx: {
      // infers the user as non-nullable
      user: ctx.user,
    },
  })
})
/**
 * Reusable middleware to ensure
 * users are active
 */
const isActive = middleware(({ ctx, next }) => {
  const { user, sessionToken } = ctx

  if (!user || !user.emailVerified || !sessionToken) {
    throw new TRPCError({
      code: 'UNAUTHORIZED',
      message: 'User status non active',
    })
  }
  return next({
    ctx: {
      ...ctx,
      // Infer the user as non nullable in next execution
      user,
      sessionToken,
    },
  })
})

/**
 * Reusable middleware to ensure
 * users have administration access
 */
const isAdministrator = middleware(({ ctx, next }) => {
  const { user } = ctx

  if (
    !user ||
    (user.role !== 'Admin' &&
      user.role !== 'Support' &&
      user.role !== 'Moderator')
  ) {
    throw new TRPCError({
      code: 'FORBIDDEN',
      message: 'Access denied: Administrator role required',
    })
  }
  return next({
    ctx,
  })
})

/**
 * Protected procedure
 * */
export const protectedProcedure = procedure.use(isAuthenticated).use(isActive)

/**
 * Administration procedure
 * */
export const adminProcedure = protectedProcedure.use(isAdministrator)
