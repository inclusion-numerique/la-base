import { prismaClient } from '@app/web/prismaClient'

export const getResourceReports = ({ resourceId }: { resourceId?: string }) =>
  prismaClient.resourceReport.findMany({
    where: {
      resourceId,
    },
    include: {
      resource: true,
      sentBy: true,
    },
  })
