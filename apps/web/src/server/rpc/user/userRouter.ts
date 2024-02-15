import { v4 } from 'uuid'
import { prismaClient } from '@app/web/prismaClient'
import {
  protectedProcedure,
  publicProcedure,
  router,
} from '@app/web/server/rpc/createRouter'
import { ServerUserSignupValidation } from '@app/web/server/rpc/user/userSignup.server'
import { createAvailableSlug } from '@app/web/server/slug/createAvailableSlug'

export const userRouter = router({
  signup: publicProcedure
    .input(ServerUserSignupValidation)
    .mutation(
      async ({
        input: { firstName: firstNameInput, lastName: lastNameInput, email },
      }) => {
        const firstName = firstNameInput?.trim() || null
        const lastName = lastNameInput?.trim() || null
        const name = `${firstName ?? ''} ${lastName ?? ''}`.trim() || null
        const slugTitle = name || 'utilisateur'

        const slug = await createAvailableSlug(slugTitle, 'users')
        const collectionSlug = await createAvailableSlug(
          `${slug}-favoris`,
          'collections',
        )

        return prismaClient.$transaction(async (transaction) => {
          const user = await transaction.user.create({
            data: {
              id: v4(),
              firstName,
              lastName,
              name,
              slug,
              email,
            },
            select: {
              id: true,
              email: true,
            },
          })
          await transaction.collection.create({
            data: {
              id: v4(),
              title: 'Mes favoris',
              slug: collectionSlug,
              createdById: user.id,
              isFavorites: true,
            },
          })
          return user
        })
      },
    ),
  markOnboardingV2AsSeen: protectedProcedure.mutation(({ ctx: { user } }) =>
    prismaClient.user.update({
      where: {
        id: user.id,
      },
      data: {
        hasSeenV2Onboarding: new Date(),
      },
      select: {
        id: true,
        hasSeenV2Onboarding: true,
      },
    }),
  ),
})
