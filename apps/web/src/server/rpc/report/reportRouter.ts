import { prismaClient } from '@app/web/prismaClient'
import {
  ResourceReportValidation,
  UpdateResourceReportValidation,
} from '@app/web/resources/resourceReport'
import { sendResourceReportModeratorEmail } from '@app/web/server/report/sendResourceReportModeratorEmail'
import {
  adminProcedure,
  protectedProcedure,
  router,
} from '@app/web/server/rpc/createRouter'
import { v4 } from 'uuid'
import { z } from 'zod'

export const reportRouter = router({
  resource: protectedProcedure
    .input(ResourceReportValidation)
    .mutation(
      async ({ input: { resourceId, reason, comment }, ctx: { user } }) => {
        const report = await prismaClient.resourceReport.create({
          data: {
            resourceId,
            id: v4(),
            reason,
            comment,
            sentById: user.id,
          },
          include: {
            resource: {
              select: {
                id: true,
                slug: true,
                title: true,
              },
            },
            sentBy: {
              select: {
                id: true,
                name: true,
                slug: true,
                email: true,
              },
            },
          },
        })

        // There will be an email sent to the sentBy user
        // There will be an email sent to the resource creator ?

        await sendResourceReportModeratorEmail({
          report,
          resource: report.resource,
          sentBy: report.sentBy,
        })

        return report
      },
    ),

  updatePrivateComment: adminProcedure
    .input(UpdateResourceReportValidation)
    .mutation(async ({ input: { reportId, privateComment } }) => {
      return prismaClient.resourceReport.update({
        where: { id: reportId },
        data: {
          privateComment,
          updated: new Date(),
        },
      })
    }),

  resolveReport: adminProcedure
    .input(z.object({ reportId: z.string() }))
    .mutation(async ({ input: { reportId } }) => {
      return prismaClient.resourceReport.update({
        where: { id: reportId },
        data: {
          processed: new Date(),
        },
      })
    }),
})
