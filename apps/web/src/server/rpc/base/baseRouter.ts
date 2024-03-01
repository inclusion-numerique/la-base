import z from 'zod'
import { v4 } from 'uuid'
import * as Sentry from '@sentry/nextjs'
import { prismaClient } from '@app/web/prismaClient'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { CreateBaseCommandValidation } from '@app/web/server/bases/createBase'
import {
  UpdateBaseCommandValidation,
  UpdateBaseImageCommandValidation,
} from '@app/web/server/bases/updateBase'
import { createAvailableSlug } from '@app/web/server/slug/createAvailableSlug'
import { authorizeOrThrow, invalidError } from '@app/web/server/rpc/trpcErrors'
import { createSlug } from '@app/web/utils/createSlug'
import { findFirstAvailableSlug } from '@app/web/server/slug/findFirstAvailableSlug'
import { generateBaseExcerpt } from '@app/web/bases/baseExcerpt'
import { handleResourceMutationCommand } from '@app/web/server/resources/feature/handleResourceMutationCommand'
import { sendInviteMemberEmail } from '@app/web/server/rpc/baseMember/invitationEmail'
import {
  baseAuthorization,
  BasePermissions,
} from '@app/web/authorization/models/baseAuthorization'
import { baseAuthorizationTargetSelect } from '@app/web/authorization/models/baseAuthorizationTargetSelect'

export const baseRouter = router({
  create: protectedProcedure
    .input(CreateBaseCommandValidation)
    .mutation(async ({ input, ctx: { user } }) => {
      const slug = await createAvailableSlug(input.title, 'bases')

      const members = await prismaClient.user.findMany({
        select: { id: true, email: true },
        where: {
          id: { in: input.members.filter((member) => member !== user.id) },
        },
      })

      const tokens: Record<string, string> = {}
      for (const member of members) {
        tokens[member.id] = v4()
      }

      const base = await prismaClient.base.create({
        data: {
          ...input,
          excerpt: generateBaseExcerpt(input.description),
          slug,
          titleDuplicationCheckSlug: slug,
          createdById: user.id,
          members: {
            create: [
              { memberId: user.id, isAdmin: true, accepted: new Date() },
              ...members.map((member) => ({
                memberId: member.id,
                acceptationToken: tokens[member.id],
              })),
            ],
          },
        },
      })

      Promise.all([
        members.map((member) =>
          sendInviteMemberEmail({
            baseTitle: input.title,
            from: user,
            url: `/invitations/base/${tokens[member.id]}`,
            email: member.email,
          }),
        ),
      ]).catch((error) => Sentry.captureException(error))

      return base
    }),
  mutate: protectedProcedure
    .input(UpdateBaseCommandValidation)
    .mutation(async ({ input, ctx: { user } }) => {
      const base = await prismaClient.base.findUnique({
        where: { id: input.id },
        select: { ...baseAuthorizationTargetSelect, slug: true },
      })

      if (!base) {
        throw invalidError('Base not found')
      }
      authorizeOrThrow(
        baseAuthorization(base, user).hasPermission(BasePermissions.WriteBase),
      )

      /**
       * We update the slug if the title has changed
       */
      const beforeSlug = base.slug
      const afterSlug =
        'title' in input.data ? createSlug(input.data.title) : null
      const slugHasChanged = afterSlug && beforeSlug !== afterSlug

      // To leave slug unchanged, set to undefined for prisma data
      const slug = slugHasChanged
        ? await findFirstAvailableSlug(afterSlug, 'bases')
        : undefined

      const dataWithSlug = {
        ...input.data,
        slug,
        excerpt:
          'description' in input.data
            ? generateBaseExcerpt(input.data.description)
            : undefined,
      }

      if ('isPublic' in input.data && input.data.isPublic === false) {
        // All public resources must be made private
        const resources = await prismaClient.resource.findMany({
          select: { id: true },
          where: { baseId: input.id, isPublic: true },
        })
        // All public collections must be made private
        const collections = await prismaClient.collection.findMany({
          select: { id: true },
          where: { baseId: input.id, isPublic: true },
        })

        return prismaClient.$transaction(async (transaction) => {
          await Promise.all(
            resources.map((resource) =>
              handleResourceMutationCommand(
                {
                  name: 'ChangeVisibility',
                  payload: { resourceId: resource.id, isPublic: false },
                },
                { user },
                transaction,
              ),
            ),
          )

          await Promise.all(
            collections.map((collection) =>
              transaction.collection.update({
                where: { id: collection.id },
                data: { isPublic: false },
              }),
            ),
          )

          return transaction.base.update({
            where: { id: input.id },
            data: dataWithSlug,
          })
        })
      }
      return prismaClient.base.update({
        where: { id: input.id },
        data: dataWithSlug,
      })
    }),
  delete: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ input, ctx: { user } }) => {
      const base = await prismaClient.base.findUnique({
        where: { id: input.id },
        select: baseAuthorizationTargetSelect,
      })

      if (!base) {
        throw invalidError('Base not found')
      }

      authorizeOrThrow(
        baseAuthorization(base, user).hasPermission(BasePermissions.DeleteBase),
      )

      const timestamp = new Date()
      return prismaClient.base.update({
        data: {
          deleted: timestamp,
          updated: timestamp,
        },
        where: { id: input.id },
      })
    }),
  updateImage: protectedProcedure
    .input(UpdateBaseImageCommandValidation)
    .mutation(async ({ input: { id, ...images }, ctx: { user } }) => {
      const base = await prismaClient.base.findUnique({
        where: { id },
        select: baseAuthorizationTargetSelect,
      })

      if (!base) {
        throw invalidError('Base not found')
      }

      authorizeOrThrow(
        baseAuthorization(base, user).hasPermission(BasePermissions.WriteBase),
      )

      prismaClient.base.update({
        where: { id },
        data: images,
      })
    }),
})
