import { prismaClient } from '@app/web/prismaClient'

export const getBasePendingJoinRequestsContext = async ({
  baseId,
}: {
  baseId: string
}) => {
  const where = {
    baseId,
    accepted: null,
    declined: null,
  }

  const [data, count] = await Promise.all([
    prismaClient.baseJoinRequest.findMany({
      where,
      select: {
        id: true,
        created: true,
        applicant: {
          select: {
            slug: true,
            id: true,
            email: true,
            name: true,
            firstName: true,
            lastName: true,
            image: {
              select: {
                id: true,
              },
            },
          },
        },
      },
      orderBy: {
        created: 'desc',
      },
    }),
    prismaClient.baseJoinRequest.count({ where }),
  ])

  return { data, count }
}

export type BasePendingJoinRequestsData = Awaited<
  ReturnType<typeof getBasePendingJoinRequestsContext>
>
