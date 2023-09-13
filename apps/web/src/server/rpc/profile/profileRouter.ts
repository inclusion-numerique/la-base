import { prismaClient } from '@app/web/prismaClient'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { UpdateProfileVisibilityCommandValidation } from '@app/web/server/profiles/updateProfile'

export const profileRouter = router({
  mutate: protectedProcedure
    .input(UpdateProfileVisibilityCommandValidation)
    .mutation(async ({ input, ctx: { user } }) =>
      prismaClient.user.update({ where: { id: user.id }, data: input }),
    ),
})
