import { prismaClient } from '@app/web/prismaClient'
import type { Base, Resource, UserRole } from '@prisma/client'

export type ReportedResourceVisibility = Pick<Resource, 'isPublic'> & {
  base: Pick<Base, 'isPublic'> | null
}

export const reportEmailRecipientRoles = ({
  isPublic,
  base,
}: ReportedResourceVisibility): UserRole[] =>
  isPublic && (base === null || base.isPublic)
    ? ['Admin', 'Support', 'Moderator']
    : ['Admin', 'Support']

export const getReportEmailRecipients = async (
  resource: ReportedResourceVisibility,
): Promise<string[]> => {
  const users = await prismaClient.user.findMany({
    where: {
      role: { in: reportEmailRecipientRoles(resource) },
      deleted: null,
      reportEmailNotifications: true,
    },
    select: { email: true },
  })

  return users.map(({ email }) => email)
}
