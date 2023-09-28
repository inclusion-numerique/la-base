import { z } from 'zod'
import { prismaClient } from '@app/web/prismaClient'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { UpdateProfileVisibilityCommandValidation } from '@app/web/server/profiles/updateProfile'
import { getMatchingProfils } from '@app/web/server/profiles/getProfile'

export const profileRouter = router({
  getMatchingUsers: protectedProcedure
    .input(
      z.object({
        filter: z.string(),
        baseId: z.string().optional(),
        resourceId: z.string().optional(),
      }),
    )
    .query(async ({ input }) =>
      input.filter
        ? getMatchingProfils(input.filter, input.baseId, input.resourceId)
        : [],
    ),
  mutate: protectedProcedure
    .input(UpdateProfileVisibilityCommandValidation)
    .mutation(async ({ input, ctx: { user } }) =>
      prismaClient.user.update({ where: { id: user.id }, data: input }),
    ),
})
