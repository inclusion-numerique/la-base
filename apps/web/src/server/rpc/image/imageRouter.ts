import { v4 } from 'uuid'
import { prismaClient } from '@app/web/prismaClient'
import { computeImageMetadata } from '@app/web/server/image/computeImageMetadata'
import { defaultCropValues } from '@app/web/server/image/defaultCropValues'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import {
  ImageValidation,
  UpdateImageValidation,
} from '@app/web/server/rpc/image/imageValidation'
import { profileAuthorizationTargetSelect } from '@app/web/authorization/models/profileAuthorizationTargetSelect'
import { baseAuthorizationTargetSelect } from '@app/web/authorization/models/baseAuthorizationTargetSelect'
import { collectionAuthorizationTargetSelect } from '@app/web/authorization/models/collectionAuthorizationTargetSelect'
import { resourceAuthorizationTargetSelect } from '@app/web/authorization/models/resourceAuthorizationTargetSelect'
import { authorizeOrThrow, invalidError } from '@app/web/server/rpc/trpcErrors'
import {
  profileAuthorization,
  ProfilePermissions,
} from '@app/web/authorization/models/profileAuthorization'
import {
  baseAuthorization,
  BasePermissions,
} from '@app/web/authorization/models/baseAuthorization'
import {
  collectionAuthorization,
  CollectionPermissions,
} from '@app/web/authorization/models/collectionAuthorization'
import {
  resourceAuthorization,
  ResourcePermissions,
} from '@app/web/authorization/models/resourceAuthorization'

export const imageRouter = router({
  create: protectedProcedure
    .input(ImageValidation)
    .mutation(async ({ input: { file, ...imageData }, ctx: { user } }) => {
      // The file is already in storage, we get its metadata and store it in database

      const { height, width, originalHeight, originalWidth } =
        await computeImageMetadata({
          uploadKey: file.key,
          ...defaultCropValues,
        })

      const data = {
        height,
        width,
        originalHeight,
        originalWidth,
        upload: {
          create: {
            uploadedBy: { connect: { id: user.id } },
            ...file,
          },
        },
        ...imageData,
      }

      return prismaClient.image.create({
        data,
        include: {
          upload: true,
        },
      })
    }),
  update: protectedProcedure
    .input(UpdateImageValidation)
    .mutation(async ({ input: { id, ...cropping }, ctx: { user } }) => {
      // We have to check the context of this image to see if the user can update it
      const image = await prismaClient.image.findUnique({
        where: { id },
        select: {
          user: { select: profileAuthorizationTargetSelect },
          base: { select: baseAuthorizationTargetSelect },
          baseCoverImage: { select: baseAuthorizationTargetSelect },
          collection: { select: collectionAuthorizationTargetSelect },
          resource: { select: resourceAuthorizationTargetSelect },
          content: {
            select: {
              resource: { select: resourceAuthorizationTargetSelect },
            },
          },
        },
      })

      if (!image) {
        throw invalidError('Image not found')
      }

      if (image.user) {
        authorizeOrThrow(
          profileAuthorization(image.user, user).hasPermission(
            ProfilePermissions.WriteProfile,
          ),
        )
      }

      if (image.base) {
        authorizeOrThrow(
          baseAuthorization(image.base, user).hasPermission(
            BasePermissions.WriteBase,
          ),
        )
      }

      if (image.baseCoverImage) {
        authorizeOrThrow(
          baseAuthorization(image.baseCoverImage, user).hasPermission(
            BasePermissions.WriteBase,
          ),
        )
      }

      if (image.collection) {
        authorizeOrThrow(
          collectionAuthorization(image.collection, user).hasPermission(
            CollectionPermissions.WriteCollection,
          ),
        )
      }

      if (image.resource) {
        authorizeOrThrow(
          resourceAuthorization(image.resource, user).hasPermission(
            ResourcePermissions.WriteResource,
          ),
        )
      }

      if (image.content?.resource) {
        authorizeOrThrow(
          resourceAuthorization(image.content.resource, user).hasPermission(
            ResourcePermissions.WriteResource,
          ),
        )
      }

      // An updated image has to change its id to override browser caches
      return prismaClient.image.update({
        data: { ...cropping, id: v4() },
        where: {
          id,
          upload: {
            uploadedById: user.id,
          },
        },
        include: {
          upload: true,
        },
      })
    }),
})
