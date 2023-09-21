import { Prisma } from '@prisma/client'
import { faker } from '@faker-js/faker'
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

  return bases.flatMap((base) =>
    users
      .filter(() => Math.random() < 0.2)
      .map((user) => ({
        memberId: user.id,
        baseId: base.id,
        isAdmin: Math.random() < 0.2,
        accepted: Math.random() < 0.9 ? faker.date.past() : null,
      })),
  )
}
