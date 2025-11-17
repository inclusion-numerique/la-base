import { SessionUser } from '@app/web/auth/sessionUser'
import { prismaClient } from '@app/web/prismaClient'
import { Prisma } from '@prisma/client'

export const getReportedResourcesList = async (user: SessionUser | null) => {
  const where = {
    processed: null,
    sentBy: {
      deleted: null,
    },
  } satisfies Prisma.ResourceReportWhereInput

  // For moderator role, add additional filtering for public resources only
  const whereClause =
    user?.role === 'Moderator'
      ? {
          ...where,
          resource: {
            isPublic: true,
            OR: [
              // Resource not in a base (base is null)
              { base: null },
              // Resource in a public base
              { base: { isPublic: true } },
            ],
          },
        }
      : where

  return prismaClient.resourceReport.findMany({
    select: {
      id: true,
      reason: true,
      comment: true,
      privateComment: true,
      created: true,
      updated: true,
      processed: true,
      sentBy: {
        select: {
          name: true,
          email: true,
          slug: true,
        },
      },
      resource: {
        select: {
          id: true,
          slug: true,
          title: true,
          createdBy: {
            include: { image: true },
          },
          base: { include: { image: true } },
        },
      },
    },
    where: whereClause,
    orderBy: {
      updated: 'desc',
    },
  })
}

export type ReportedResourceListPageData = Awaited<
  ReturnType<typeof getReportedResourcesList>
>

export type ReportedResource = Awaited<
  ReturnType<typeof getReportedResourcesList>
>[number]
