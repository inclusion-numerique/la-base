import { prismaClient } from '@app/web/prismaClient'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import {
  BaseFollowValidation,
  ProfileFollowValidation,
} from '@app/web/follows/follows'
import { authorizeOrThrow, invalidError } from '@app/web/server/rpc/trpcErrors'
import {
  baseAuthorization,
  BasePermissions,
} from '@app/web/authorization/models/baseAuthorization'
import { baseAuthorizationTargetSelect } from '@app/web/authorization/models/baseAuthorizationTargetSelect'
import {
  profileAuthorization,
  ProfilePermissions,
} from '@app/web/authorization/models/profileAuthorization'
import { profileAuthorizationTargetSelect } from '@app/web/authorization/models/profileAuthorizationTargetSelect'

export const followRouter = router({
  followBase: protectedProcedure
    .input(BaseFollowValidation)
    .mutation(async ({ input: { baseId }, ctx: { user } }) => {
      const base = await prismaClient.base.findUnique({
        where: { id: baseId },
        select: baseAuthorizationTargetSelect,
      })

      if (!base) {
        throw invalidError('Base not found')
      }

      authorizeOrThrow(
        baseAuthorization(base, user).hasPermission(
          BasePermissions.ReadGeneralBaseInformation,
        ),
      )

      return prismaClient.baseFollow.create({
        data: {
          baseId,
          followerId: user.id,
        },
        select: {
          id: true,
        },
      })
    }),
  followProfile: protectedProcedure
    .input(ProfileFollowValidation)
    .mutation(async ({ input: { profileId }, ctx: { user } }) => {
      const profile = await prismaClient.user.findUnique({
        where: { id: profileId },
        select: profileAuthorizationTargetSelect,
      })

      if (!profile) {
        throw invalidError('Profile not found')
      }

      authorizeOrThrow(
        profileAuthorization(profile, user).hasPermission(
          ProfilePermissions.ReadGeneralProfileInformation,
        ),
      )
      return prismaClient.profileFollow.create({
        data: {
          profileId,
          followerId: user.id,
        },
        select: {
          id: true,
        },
      })
    }),
  unfollowBase: protectedProcedure
    .input(BaseFollowValidation)
    .mutation(({ input: { baseId }, ctx: { user } }) =>
      prismaClient.baseFollow.delete({
        where: {
          baseId_followerId: {
            baseId,
            followerId: user.id,
          },
        },
      }),
    ),
  unfollowProfile: protectedProcedure
    .input(ProfileFollowValidation)
    .mutation(({ input: { profileId }, ctx: { user } }) =>
      prismaClient.profileFollow.delete({
        where: {
          profileId_followerId: {
            profileId,
            followerId: user.id,
          },
        },
      }),
    ),
})
