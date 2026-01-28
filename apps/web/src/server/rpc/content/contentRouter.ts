import { prismaClient } from '@app/web/prismaClient'
import { publicProcedure, router } from '@app/web/server/rpc/createRouter'
import z from 'zod'

const ContentEventTypeValidation = z.enum([
  'linkClick',
  'fileDownload',
  'filePreview',
])

export const contentRouter = router({
  trackEvent: publicProcedure
    .input(
      z.object({
        contentId: z.string().uuid(),
        type: ContentEventTypeValidation,
      }),
    )
    .mutation(async ({ input }) => {
      const { contentId, type } = input

      const fieldMap = {
        linkClick: 'linkClickCount',
        fileDownload: 'fileDownloadCount',
        filePreview: 'filePreviewCount',
      } as const

      const field = fieldMap[type]

      const content = await prismaClient.content.findUnique({
        where: { id: contentId },
        select: {
          linkClickCount: true,
          fileDownloadCount: true,
          filePreviewCount: true,
        },
      })

      if (!content) {
        return
      }

      await prismaClient.content.update({
        where: { id: contentId },
        data: {
          [field]: content[field] === null ? 1 : { increment: 1 },
        },
      })
    }),
})
