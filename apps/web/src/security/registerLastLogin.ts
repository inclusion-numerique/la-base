import { prismaClient } from '@app/web/prismaClient'

export const registerLastLogin = async ({ userId }: { userId: string }) => {
  await prismaClient.user.update({
    data: {
      lastLogin: new Date(),
    },
    where: {
      id: userId,
    },
  })
}
