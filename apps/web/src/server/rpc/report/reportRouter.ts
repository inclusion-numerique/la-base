import { prismaClient } from '@app/web/prismaClient'
import {
  ResourceReportValidation,
  UpdateResourceReportValidation,
} from '@app/web/resources/resourceReport'
import { sendResourceModerationEmail } from '@app/web/server/report/sendResourceModerationEmail'
import { sendResourceReportModeratorEmail } from '@app/web/server/report/sendResourceReportModeratorEmail'
import {
  moderatorProcedure,
  protectedProcedure,
  router,
} from '@app/web/server/rpc/createRouter'
import { notFoundError } from '@app/web/server/rpc/trpcErrors'
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
                createdById: true,
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
  deleteResource: moderatorProcedure
    .input(
      z.object({
        reportId: z.string(),
        resourceId: z.string(),
        moderatorName: z.string(),
        moderatorEmail: z.string(),
      }),
    )
    .mutation(
      async ({
        input: { resourceId, moderatorName, moderatorEmail, reportId },
        ctx: { user },
      }) => {
        const report = await prismaClient.resourceReport.findUnique({
          where: { id: reportId },
          select: {
            sentBy: {
              select: {
                id: true,
              },
            },
          },
        })
        const resource = await prismaClient.resource.findUnique({
          where: { id: resourceId },
          include: {
            createdBy: {
              select: {
                name: true,
                email: true,
                deleted: true,
              },
            },
          },
        })

        if (!resource || !report) {
          throw notFoundError()
        }

        const timestamp = new Date()

        // Delete the resource (same logic as resourceRouter.delete)
        await prismaClient.resource.update({
          where: { id: resourceId },
          data: {
            deleted: timestamp,
            updated: timestamp,
          },
        })

        await prismaClient.notification.create({
          data: {
            userId: resource.createdById,
            initiatorId: user.id,
            type: 'ReportedResource',
            resourceId: resource.id,
          },
        })

        // Send notification email to resource creator
        await sendResourceModerationEmail({
          resourceName: resource.title,
          resourceCreator: resource.createdBy,
          moderatorName,
          moderatorEmail,
        })

        await prismaClient.resourceReport.update({
          where: { id: reportId },
          data: {
            processed: new Date(),
          },
        })
      },
    ),
  updatePrivateComment: moderatorProcedure
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
  resolveReport: moderatorProcedure
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
