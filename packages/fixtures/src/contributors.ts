import { Prisma } from '@prisma/client'
import { prismaClient } from '@app/web/prismaClient'

export const randomContributors: (
  transaction: Prisma.TransactionClient,
) => Promise<
  Exclude<
    Parameters<typeof prismaClient.resourceContributors.createMany>[0],
    undefined
  >['data']
> = async (transaction) => {
  const resources = await transaction.resource.findMany({
    select: { id: true },
  })
  const users = await transaction.user.findMany({ select: { id: true } })

  return resources.flatMap((resource) =>
    users
      .filter(() => Math.random() < 0.05)
      .map((user) => ({
        contributorId: user.id,
        resourceId: resource.id,
      })),
  )
}
