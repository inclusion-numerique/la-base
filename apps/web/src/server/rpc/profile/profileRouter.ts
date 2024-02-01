import { z } from 'zod'
import { prismaClient } from '@app/web/prismaClient'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import {
  UpdateProfileContactsCommandValidation,
  UpdateProfileImageCommandValidation,
  UpdateProfileInformationsCommandValidation,
  UpdateProfileVisibilityCommandValidation,
} from '@app/web/server/profiles/updateProfile'
import { searchMember } from '@app/web/server/profiles/searchMember'
import { invalidError } from '@app/web/server/rpc/trpcErrors'
import { createSlug } from '@app/web/utils/createSlug'
import { findFirstAvailableSlug } from '@app/web/server/slug/findFirstAvailableSlug'
import { handleResourceMutationCommand } from '@app/web/server/resources/feature/handleResourceMutationCommand'

const deletedUser = (id: string, timestamp: Date) => ({
  firstName: null,
  lastName: null,
  name: 'Profil supprimé',
  email: `utilisateur-supprimé+${id}@lesbases.anct.gouv.fr`,
  emailIsPublic: false,
  website: null,
  facebook: null,
  twitter: null,
  linkedin: null,
  imageId: null,
  location: null,
  title: null,
  description: null,
  department: null,
  isPublic: false,
  deleted: timestamp,
  updated: timestamp,
})

const resourcesToDelete = (userId: string) => ({
  where: {
    createdById: userId,
    contributors: { none: {} },
    deleted: null,
  },
})

const basesToDelete = (userId: string) => ({
  where: {
    ownerId: userId,
    members: { every: { memberId: userId } },
    deleted: null,
  },
})

const collectionsToDelete = (userId: string) => ({
  where: {
    ownerId: userId,
    baseId: null,
    savedCollection: { none: {} },
    deleted: null,
  },
})

const softDelete = (timestamp: Date) => ({
  data: { deleted: timestamp, updated: timestamp },
})

export const profileRouter = router({
  searchProfileForMember: protectedProcedure
    .input(
      z.object({
        query: z.string(),
        notInBaseId: z.string().optional(),
        notInResourceId: z.string().optional(),
      }),
    )
    .query(async ({ input: { query, notInBaseId, notInResourceId } }) =>
      query.length > 1
        ? searchMember({
            query,
            notInBaseId,
            notInResourceId,
          })
        : [],
    ),
  updateVisibility: protectedProcedure
    .input(UpdateProfileVisibilityCommandValidation)
    .mutation(async ({ input, ctx: { user } }) => {
      if (input.isPublic === false) {
        // All public resources not in a base must be made private
        const resources = await prismaClient.resource.findMany({
          select: { id: true },
          where: { createdById: user.id, baseId: null, isPublic: true },
        })

        // All public collections not in a base must be made private
        const collections = await prismaClient.collection.findMany({
          select: { id: true },
          where: { ownerId: user.id, baseId: null, isPublic: true },
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

          return transaction.user.update({
            where: { id: user.id },
            data: input,
          })
        })
      }
      return prismaClient.user.update({ where: { id: user.id }, data: input })
    }),
  updateInformations: protectedProcedure
    .input(UpdateProfileInformationsCommandValidation)
    .mutation(async ({ input: informations, ctx: { user } }) => {
      // TODO security check
      const profile = await prismaClient.user.findUnique({
        where: { id: user.id, deleted: null },
        select: { slug: true },
      })

      if (!profile) {
        throw invalidError('User not found')
      }

      const firstName = informations.firstName?.trim() || null
      const lastName = informations.lastName?.trim() || null
      const name = `${firstName ?? ''} ${lastName ?? ''}`.trim() || null
      const slugTitle = name || 'p'

      const afterSlug = createSlug(slugTitle)

      // Get new slug if it has changed
      const slug =
        user.slug === afterSlug
          ? undefined
          : await findFirstAvailableSlug(afterSlug, 'users')

      return prismaClient.user.update({
        where: { id: user.id },
        data: {
          ...informations,
          firstName,
          lastName,
          name,
          slug,
        },
      })
    }),
  updateContacts: protectedProcedure
    .input(UpdateProfileContactsCommandValidation)
    .mutation(async ({ input: contacts, ctx: { user } }) =>
      prismaClient.user.update({
        where: { id: user.id },
        data: {
          emailIsPublic: contacts.emailIsPublic,
          website: contacts.website === '' ? null : contacts.website,
          facebook: contacts.facebook === '' ? null : contacts.facebook,
          twitter: contacts.twitter === '' ? null : contacts.twitter,
          linkedin: contacts.linkedin === '' ? null : contacts.linkedin,
        },
      }),
    ),
  updateImage: protectedProcedure
    .input(UpdateProfileImageCommandValidation)
    .mutation(async ({ input, ctx: { user } }) =>
      prismaClient.user.update({
        where: { id: user.id },
        data: { imageId: input.imageId },
      }),
    ),
  delete: protectedProcedure.mutation(
    async ({
      ctx: {
        user: { id: userId },
      },
    }) => {
      const timestamp = new Date()

      await prismaClient.resource.updateMany({
        ...resourcesToDelete(userId),
        ...softDelete(timestamp),
      })

      await prismaClient.base.updateMany({
        ...basesToDelete(userId),
        ...softDelete(timestamp),
      })

      await prismaClient.collection.updateMany({
        ...collectionsToDelete(userId),
        ...softDelete(timestamp),
      })

      return prismaClient.user.update({
        where: { id: userId },
        data: {
          ...deletedUser(userId, timestamp),
          accounts: { deleteMany: {} },
          sessions: { deleteMany: {} },
        },
      })
    },
  ),
})
