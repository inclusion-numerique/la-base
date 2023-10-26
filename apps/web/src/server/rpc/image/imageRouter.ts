import { v4 } from 'uuid'
import { prismaClient } from '@app/web/prismaClient'
import { computeImageMetadata } from '@app/web/server/image/computeImageMetadata'
import { defaultCropValues } from '@app/web/server/image/defaultCropValues'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import {
  ImageValidation,
  UpdateImageValidation,
} from '@app/web/server/rpc/image/imageValidation'

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
    .mutation(async ({ input: { id, ...cropping }, ctx: { user } }) =>
      // TODO SECURITY: check if the user can update this image
      // An updated image has to change its id to override browser caches
      prismaClient.image.update({
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
      }),
    ),
})
