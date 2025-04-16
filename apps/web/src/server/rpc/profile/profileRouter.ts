import { z } from 'zod'
import {
  profileAuthorization,
  ProfilePermissions,
} from '@app/web/authorization/models/profileAuthorization'
import { profileAuthorizationTargetSelect } from '@app/web/authorization/models/profileAuthorizationTargetSelect'
import { prismaClient } from '@app/web/prismaClient'
import { searchMember } from '@app/web/server/profiles/searchMember'
import {
  UpdateProfileContactsCommandValidation,
  UpdateProfileImageCommandValidation,
  UpdateProfileInformationsCommandValidation,
  UpdateProfileVisibilityCommandValidation,
} from '@app/web/server/profiles/updateProfile'
import { handleResourceMutationCommand } from '@app/web/server/resources/feature/handleResourceMutationCommand'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { authorizeOrThrow, invalidError } from '@app/web/server/rpc/trpcErrors'
import { findFirstAvailableSlug } from '@app/web/server/slug/findFirstAvailableSlug'
import { createSlug } from '@app/web/utils/createSlug'

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

const creatorBasesToDelete = (userId: string) => ({
  where: {
    createdById: userId,
    members: { every: { memberId: userId } },
    deleted: null,
  },
})

const basesToDelete = (userId: string) => ({
  where: {
    members: {
      some: {
        memberId: userId,
      },
    },
    deleted: null,
  },
  select: {
    id: true,
    members: {
      select: { memberId: true },
      where: { member: { deleted: null } },
    },
  },
})

const collectionsToDelete = (userId: string) => ({
  where: {
    createdById: userId,
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
      const profile = await prismaClient.user.findUnique({
        where: { id: user.id, deleted: null },
        select: { slug: true, ...profileAuthorizationTargetSelect },
      })

      if (!profile) {
        throw invalidError('User not found')
      }

      authorizeOrThrow(
        profileAuthorization(profile, user).hasPermission(
          ProfilePermissions.WriteProfile,
        ),
      )
      if (input.isPublic === false) {
        // All public resources not in a base must be made private
        const resources = await prismaClient.resource.findMany({
          select: { id: true },
          where: { createdById: user.id, baseId: null, isPublic: true },
        })

        // All public collections not in a base must be made private
        const collections = await prismaClient.collection.findMany({
          select: { id: true },
          where: { createdById: user.id, baseId: null, isPublic: true },
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
      const profile = await prismaClient.user.findUnique({
        where: { id: user.id, deleted: null },
        select: { slug: true, ...profileAuthorizationTargetSelect },
      })

      if (!profile) {
        throw invalidError('User not found')
      }

      authorizeOrThrow(
        profileAuthorization(profile, user).hasPermission(
          ProfilePermissions.WriteProfile,
        ),
      )

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
    .mutation(async ({ input: contacts, ctx: { user } }) => {
      const profile = await prismaClient.user.findUnique({
        where: { id: user.id, deleted: null },
        select: { slug: true, ...profileAuthorizationTargetSelect },
      })

      if (!profile) {
        throw invalidError('User not found')
      }

      authorizeOrThrow(
        profileAuthorization(profile, user).hasPermission(
          ProfilePermissions.WriteProfile,
        ),
      )
      return prismaClient.user.update({
        where: { id: user.id },
        data: {
          emailIsPublic: contacts.emailIsPublic,
          website: contacts.website === '' ? null : contacts.website,
          facebook: contacts.facebook === '' ? null : contacts.facebook,
          twitter: contacts.twitter === '' ? null : contacts.twitter,
          linkedin: contacts.linkedin === '' ? null : contacts.linkedin,
        },
      })
    }),
  updateImage: protectedProcedure
    .input(UpdateProfileImageCommandValidation)
    .mutation(async ({ input, ctx: { user } }) => {
      const profile = await prismaClient.user.findUnique({
        where: { id: user.id, deleted: null },
        select: { slug: true, ...profileAuthorizationTargetSelect },
      })

      if (!profile) {
        throw invalidError('User not found')
      }

      authorizeOrThrow(
        profileAuthorization(profile, user).hasPermission(
          ProfilePermissions.WriteProfile,
        ),
      )
      return prismaClient.user.update({
        where: { id: user.id },
        data: { imageId: input.imageId },
      })
    }),
  delete: protectedProcedure
    .input(z.object({ userId: z.string().uuid() }))
    .mutation(async ({ input: { userId }, ctx: { user: sessionUser } }) => {
      const profile = await prismaClient.user.findUnique({
        where: { id: userId, deleted: null },
        select: { slug: true, ...profileAuthorizationTargetSelect },
      })
      if (!profile) {
        throw invalidError('User not found')
      }

      authorizeOrThrow(
        profileAuthorization(profile, sessionUser).hasPermission(
          ProfilePermissions.WriteProfile,
        ),
      )

      const timestamp = new Date()

      await prismaClient.resource.updateMany({
        ...resourcesToDelete(profile.id),
        ...softDelete(timestamp),
      })

      // Delete all bases created by the user we want to delete
      await prismaClient.base.updateMany({
        ...creatorBasesToDelete(profile.id),
        ...softDelete(timestamp),
      })

      const userBases = await prismaClient.base.findMany({
        ...basesToDelete(profile.id),
      })

      const basesToSoftDelete = userBases
        .filter((base) => base.members.length === 1)
        .map((base) => base.id)

      if (basesToSoftDelete.length > 0) {
        await prismaClient.base.updateMany({
          where: { id: { in: basesToSoftDelete } },
          ...softDelete(timestamp),
        })
      }

      await prismaClient.collection.updateMany({
        ...collectionsToDelete(profile.id),
        ...softDelete(timestamp),
      })

      return prismaClient.user.update({
        where: { id: profile.id },
        data: {
          ...deletedUser(profile.id, timestamp),
          accounts: { deleteMany: {} },
          sessions: { deleteMany: {} },
        },
      })
    }),
})
