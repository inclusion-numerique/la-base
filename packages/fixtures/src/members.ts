import { Prisma } from '@prisma/client'
import { prismaClient } from '@app/web/prismaClient'

export const randomMembers: (
  transaction: Prisma.TransactionClient,
) => Promise<
  Exclude<
    Parameters<typeof prismaClient.baseMembers.createMany>[0],
    undefined
  >['data']
> = async (transaction) => {
  const bases = await transaction.base.findMany({ select: { id: true } })
  const users = await transaction.user.findMany({ select: { id: true } })

  return bases.flatMap((base) => {
    const modulo = Math.floor(Math.random() * (users.length - 1))
    return users
      .filter((user, index) => index % modulo === 0)
      .map((user) => ({
        memberId: user.id,
        baseId: base.id,
        isAdmin: Math.random() < 0.2,
      }))
  })
}
