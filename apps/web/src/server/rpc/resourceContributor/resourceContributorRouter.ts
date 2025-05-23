import { resourceAuthorization } from '@app/web/authorization/models/resourceAuthorization'
import { prismaClient } from '@app/web/prismaClient'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import * as Sentry from '@sentry/nextjs'
import { z } from 'zod'
import { InviteContributorCommandValidation } from '../../resourceContributors/inviteContributors'
import { getResource } from '../../resources/getResource'
import { authorizeOrThrow, invalidError, notFoundError } from '../trpcErrors'
import { sendNewContributorEmail } from './invitationEmail'

export const resourceContributorRouter = router({
  getContributors: protectedProcedure
    .input(z.object({ resourceId: z.string() }))
    .query(async ({ input }) =>
      prismaClient.user.findMany({
        select: {
          id: true,
          name: true,
          firstName: true,
          lastName: true,
          image: {
            select: {
              id: true,
              altText: true,
            },
          },
        },
        where: {
          resources: {
            some: {
              resourceId: input.resourceId,
            },
          },
        },
      }),
    ),
  delete: protectedProcedure
    .input(z.object({ resourceId: z.string(), contributorId: z.string() }))
    .mutation(async ({ input, ctx: { user } }) => {
      const resource = await getResource({ id: input.resourceId }, user)
      if (!resource) {
        return notFoundError()
      }
      authorizeOrThrow(
        resourceAuthorization(resource, user).hasPermission(
          'RemoveResourceContributor',
        ),
      )

      await prismaClient.resourceContributors.delete({
        where: {
          contributorId_resourceId: {
            resourceId: input.resourceId,
            contributorId: input.contributorId,
          },
        },
      })
    }),
  invite: protectedProcedure
    .input(InviteContributorCommandValidation)
    .mutation(async ({ input, ctx: { user } }) => {
      const resource = await getResource({ id: input.resourceId }, user)
      if (!resource) {
        return notFoundError()
      }

      authorizeOrThrow(
        resourceAuthorization(resource, user).hasPermission(
          'AddResourceContributor',
        ),
      )

      if (
        resource.contributors.some(({ contributorId }) =>
          input.contributors.includes(contributorId),
        )
      ) {
        return invalidError()
      }

      const contributors = await prismaClient.user.findMany({
        select: { id: true, email: true },
        where: { id: { in: input.contributors } },
      })
      for (const contributor of contributors) {
        const contributorId = input.contributors.find(
          (x) => x === contributor.id,
        )
        if (contributorId) {
          await prismaClient.resourceContributors.create({
            data: {
              resourceId: input.resourceId,
              contributorId,
            },
          })

          sendNewContributorEmail({
            from: user,
            url: `/ressources/${resource.slug}`,
            email: contributor.email,
            resource,
          }).catch((error) => {
            Sentry.captureException(error)
          })
        }
      }
    }),
})
