import z from 'zod'
import { prismaClient } from '@app/web/prismaClient'
import { getBase } from '@app/web/server/bases/getBase'
import { filterAccess } from '@app/web/server/bases/authorization'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { forbiddenError, notFoundError } from '../trpcErrors'

export const baseMemberRouter = router({
  remove: protectedProcedure
    .input(z.object({ baseId: z.string(), memberId: z.string() }))
    .mutation(async ({ input, ctx: { user } }) => {
      const base = await getBase(input.baseId, user)
      if (!base) {
        return notFoundError()
      }
      const authorizations = filterAccess(base, user)
      if (!authorizations.authorized || !authorizations.isAdmin) {
        return forbiddenError()
      }

      return prismaClient.baseMembers.delete({
        where: { memberId_baseId: input },
      })
    }),
})
