import { PublicWebAppConfig } from '@app/web/PublicWebAppConfig'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import {
  createContact,
  toBrevoContact,
} from '@app/web/external-apis/brevo/contact'
import { prismaClient } from '@app/web/prismaClient'
import {
  protectedProcedure,
  publicProcedure,
  router,
} from '@app/web/server/rpc/createRouter'
import { ServerUserSignupValidation } from '@app/web/server/rpc/user/userSignup.server'
import { createAvailableSlug } from '@app/web/server/slug/createAvailableSlug'
import * as Sentry from '@sentry/nextjs'
import { v4 } from 'uuid'
import { invalidError } from '../trpcErrors'
import { formatName } from './formatName'

export const userRouter = router({
  signup: publicProcedure
    .input(ServerUserSignupValidation)
    .mutation(
      async ({
        input: {
          firstName: firstNameInput,
          lastName: lastNameInput,
          email,
          profileName: honeypotProfileNameInput,
          timer,
        },
      }) => {
        // We check for probable spam bot behavior
        // We disable the check in CI as we don't want to block the e2e tests
        const shouldCheckForBot = !ServerWebAppConfig.isCi

        if (shouldCheckForBot) {
          if (honeypotProfileNameInput) {
            // This is a invisible honeypot field, this means a bot submited the form
            Sentry.captureMessage('Bot detected - signup - honeypot', {
              level: 'info',
              extra: {
                honeypotProfileNameInput,
                firstName: firstNameInput,
                lastName: lastNameInput,
                email,
                timer,
              },
            })
            throw invalidError('Cannot process signup request')
          }

          if (timer < 4000) {
            // This is too fast for a human, this means a bot
            Sentry.captureMessage('Bot detected - signup -timer', {
              level: 'info',
              extra: {
                firstName: firstNameInput,
                lastName: lastNameInput,
                email,
                timer,
              },
            })
            throw invalidError('Cannot process signup request')
          }
        }

        const firstName =
          firstNameInput == null ? null : formatName(firstNameInput)
        const lastName =
          lastNameInput == null ? null : formatName(lastNameInput)
        const name = `${firstName ?? ''} ${lastName ?? ''}`.trim() || null
        const slugTitle = name || 'utilisateur'

        const slug = await createAvailableSlug(slugTitle, 'users')
        const collectionSlug = await createAvailableSlug(
          `${slug}-favoris`,
          'collections',
        )

        return prismaClient.$transaction(async (transaction) => {
          // For the signup flow, 2 cases are possible:
          // - The user is already registered (on base invitation purpose) : in the case we need to update the user
          // - The user is not registered : in the case we need to create a new user

          const commonBody = {
            firstName,
            lastName,
            name,
            slug,
            signedUpAt: new Date(),
            email,
          }
          const user = await transaction.user.upsert({
            where: { email },
            create: {
              id: v4(),
              ...commonBody,
            },
            update: commonBody,
            select: {
              id: true,
              email: true,
              firstName: true,
              lastName: true,
            },
          })

          await transaction.collection.create({
            data: {
              id: v4(),
              title: 'Mes favoris',
              description: 'Retrouvez vos ressources favorites !',
              slug: collectionSlug,
              createdById: user.id,
              isFavorites: true,
            },
          })

          if (user != null && PublicWebAppConfig.isMain) {
            await createContact({
              contact: toBrevoContact(user),
              listIds: [ServerWebAppConfig.Brevo.usersListId],
            })
          }
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
