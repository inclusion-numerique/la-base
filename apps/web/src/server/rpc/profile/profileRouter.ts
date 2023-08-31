import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { prismaClient } from '@app/web/prismaClient'
import { UpdateProfileVisibilityCommandValidation } from '../../profiles/updateProfile'

export const profileRouter = router({
  mutate: protectedProcedure
    .input(UpdateProfileVisibilityCommandValidation)
    .mutation(async ({ input, ctx: { user } }) =>
      prismaClient.user.update({ where: { id: user.id }, data: input }),
    ),
})
