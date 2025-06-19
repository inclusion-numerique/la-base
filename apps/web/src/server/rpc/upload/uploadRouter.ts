import {
  fileValidation,
  maximumFileSizeInBytes,
} from '@app/ui/components/Form/utils/fileValidation.server'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import { prismaClient } from '@app/web/prismaClient'
import { createLegacySignedUrl } from '@app/web/server/createLegacySignedUrl'
import {
  createSignedGetUrl,
  createSignedUploadUrl,
} from '@app/web/server/createSignedUrl'
import {
  protectedProcedure,
  publicProcedure,
  router,
} from '@app/web/server/rpc/createRouter'
import { notFoundError } from '@app/web/server/rpc/trpcErrors'
import { z } from 'zod'

export const uploadRouter = router({
  create: protectedProcedure
    .input(
      z.object({
        file: fileValidation({
          maxSizeInBytes: maximumFileSizeInBytes,
        }),
      }),
    )
    .mutation(async ({ input: { file }, ctx: { user } }) => {
      // The file is already in storage, we get its metadata and store it in database
      const result = await prismaClient.upload.create({
        data: {
          ...file,
          uploadedById: user.id,
        },
      })

      return result
    }),
  generateDownloadUrl: publicProcedure
    .input(z.object({ key: z.string() }))
    .mutation(async ({ input: { key } }) => {
      // You can put your own security logic here
      const file = await prismaClient.upload.findUnique({
        where: {
          key,
        },
      })
      if (!file) {
        throw notFoundError()
      }

      if (key.startsWith('legacy/')) {
        const { url } = await createLegacySignedUrl({
          key: key.replace(/^legacy\//, ''),
          bucket: ServerWebAppConfig.LegacyS3.uploadsBucket,
        })

        return { url }
      }
      const { url } = await createSignedGetUrl({
        key,
        bucket: ServerWebAppConfig.S3.uploadsBucket,
      })

      return { url }
    }),
  generateUploadUrl: protectedProcedure
    .input(z.object({ filename: z.string(), mimeType: z.string() }))
    .mutation(async ({ input: { filename, mimeType }, ctx: { user } }) => {
      const { url, key } = await createSignedUploadUrl({
        name: filename,
        directory: `user/${user.id}`,
        bucket: ServerWebAppConfig.S3.uploadsBucket,
        mimeType,
      })

      return { url, key }
    }),
})
