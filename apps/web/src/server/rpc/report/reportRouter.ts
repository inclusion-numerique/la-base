import { v4 } from 'uuid'
import { prismaClient } from '@app/web/prismaClient'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'
import { ResourceReportValidation } from '@app/web/resources/resourceReport'
import { sendResourceReportModeratorEmail } from '@app/web/server/report/sendResourceReportModeratorEmail'

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
})
