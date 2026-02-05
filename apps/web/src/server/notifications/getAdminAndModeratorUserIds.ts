import { prismaClient } from '@app/web/prismaClient'

export async function getAdminAndModeratorUserIds(
  excludeUserId?: string,
): Promise<string[]> {
  const users = await prismaClient.user.findMany({
    where: {
      role: { in: ['Admin', 'Support', 'Moderator'] },
      deleted: null,
    },
    select: { id: true },
  })

  return users.map((user) => user.id).filter((id) => id !== excludeUserId)
}
