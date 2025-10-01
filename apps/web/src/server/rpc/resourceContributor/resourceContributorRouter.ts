import { resourceAuthorization } from '@app/web/authorization/models/resourceAuthorization'
import { prismaClient } from '@app/web/prismaClient'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { createAvailableSlug } from '@app/web/server/slug/createAvailableSlug'
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
          email: true,
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
        (!input.contributors || input.contributors.length === 0) &&
        (!input.newMembers || input.newMembers.length === 0)
      ) {
        return invalidError(
          'Veuillez sélectionner au moins un contributeur à inviter',
        )
      }

      if (input.contributors && input.contributors.length > 0) {
        /**
         * Do not re-add existing contributors
         */
        const contributorsToAdd = input.contributors.filter(
          (inputContributor) =>
            !resource.contributors.some(
              (resourceContributor) =>
                resourceContributor.contributorId === inputContributor.id,
            ),
        )
        const contributorsUserIds = contributorsToAdd.map((c) => c.id)

        const contributors = await prismaClient.user.findMany({
          select: { id: true, email: true },
          where: { id: { in: contributorsUserIds } },
        })

        for (const contributor of contributors) {
          const contributorToAdd = contributorsToAdd.find(
            (c) => c.id === contributor.id,
          )
          if (contributorToAdd) {
            await prismaClient.resourceContributors.create({
              data: {
                resourceId: input.resourceId,
                contributorId: contributorToAdd.id,
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
      }

      if (input.newMembers && input.newMembers.length > 0) {
        const existingUsers = await prismaClient.user.findMany({
          where: {
            email: {
              in: input.newMembers.map((member) => member.email),
            },
          },
        })

        /**
         * Do not re-add existing contributors in the resource
         */
        const existingContributorIds = resource.contributors.map(
          (c) => c.contributorId,
        )
        const existingContributors = await prismaClient.user.findMany({
          select: { id: true, email: true },
          where: { id: { in: existingContributorIds } },
        })

        const membersToProcess = input.newMembers.filter(
          (inputMember) =>
            !existingContributors.some(
              (existingContributor) =>
                existingContributor.email === inputMember.email,
            ),
        )

        const createResourceContributor = async (
          member: { email: string },
          contributorId: string,
          sendEmail: boolean = true,
        ) => {
          await prismaClient.resourceContributors.create({
            data: {
              resourceId: input.resourceId,
              contributorId,
            },
          })
          if (sendEmail) {
            sendNewContributorEmail({
              from: user,
              url: `/ressources/${resource.slug}`,
              email: member.email,
              resource,
            }).catch((error) => Sentry.captureException(error))
          }
        }

        // We process existing users accounts first to avoid creating new users if they already exist
        const existingUsersToAdd = membersToProcess.filter((inputMember) =>
          existingUsers.some(
            (existingUser) => existingUser.email === inputMember.email,
          ),
        )

        for (const member of existingUsersToAdd) {
          const existingUser = existingUsers.find(
            (u) => u.email === member.email,
          )
          if (existingUser) {
            await createResourceContributor(member, existingUser.id)
          }
        }

        const newUsersToAdd = membersToProcess.filter(
          (inputMember) =>
            !existingUsers.some(
              (existingUser) => existingUser.email === inputMember.email,
            ),
        )

        for (const member of newUsersToAdd) {
          const slug = await createAvailableSlug('utilisateur', 'users')
          const createdUser = await prismaClient.user.create({
            data: {
              email: member.email,
              slug,
            },
          })
          await createResourceContributor(member, createdUser.id, false)
        }
      }
    }),
})
