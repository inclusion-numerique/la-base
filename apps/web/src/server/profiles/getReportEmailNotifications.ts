import type { SessionUser } from '@app/web/auth/sessionUser'
import { prismaClient } from '@app/web/prismaClient'

export const getReportEmailNotifications = async (
  user: Pick<SessionUser, 'id' | 'role'>,
): Promise<boolean | null> => {
  if (user.role === 'User') {
    return null
  }

  const settings = await prismaClient.user.findUnique({
    where: { id: user.id },
    select: { reportEmailNotifications: true },
  })

  return settings?.reportEmailNotifications ?? null
}
