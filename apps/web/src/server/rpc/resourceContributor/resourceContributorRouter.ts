import { z } from 'zod'
import * as Sentry from '@sentry/nextjs'
import { prismaClient } from '@app/web/prismaClient'
import { filterAccess } from '@app/web/server/resources/authorization'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { InviteContributorCommandValidation } from '../../resourceContributors/inviteContributors'
import { getResource } from '../../resources/getResource'
import { forbiddenError, notFoundError, invalidError } from '../trpcErrors'
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
      const authorizations = filterAccess(resource, user)
      if (!authorizations.authorized || !authorizations.isAdmin) {
        return forbiddenError()
      }
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
      const authorizations = filterAccess(resource, user)
      if (!authorizations.authorized || !authorizations.isAdmin) {
        return forbiddenError()
      }
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
          // eslint-disable-next-line no-await-in-loop
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
          })
            // TODO: a sentry here would be nice
            .catch((error) => {
              Sentry.captureException(error)
            })
        }
      }
    }),
})
