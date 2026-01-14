import { SessionUser } from '@app/web/auth/sessionUser'
import { prismaClient } from '@app/web/prismaClient'
import { getBaseResourcesViewsCount } from '@app/web/server/bases/baseResources'
import {
  baseSelect,
  computeBasesListResourcesWhereForUser,
} from '@app/web/server/bases/getBasesList'

export const getUserBasesJoinRequestsContext = async ({
  user,
}: {
  user: SessionUser
}) => {
  const where = {
    applicantId: user.id,
    accepted: null,
    declined: null,
  }

  const [data, count] = await Promise.all([
    prismaClient.baseJoinRequest.findMany({
      where,
      select: {
        base: {
          select: {
            ...baseSelect(user),
            resources: {
              where: computeBasesListResourcesWhereForUser(user),
              include: {
                contributors: {
                  select: {
                    contributorId: true,
                  },
                },
              },
            },
            members: {
              select: {
                baseId: true,
                isAdmin: true,
                memberId: true,
                accepted: true,
                member: true,
              },
              where: {
                isAdmin: true,
              },
            },
          },
        },
      },
    }),
    prismaClient.baseJoinRequest.count({ where }),
  ])

  const bases = data.map(({ base }) => base)
  const baseIds = bases.map(({ id }) => id)

  const baseResourcesViewsCounts = await getBaseResourcesViewsCount(
    baseIds,
    computeBasesListResourcesWhereForUser(user),
  )

  const dataWithResourcesViews = data.map((item) => ({
    ...item,
    base: {
      ...item.base,
      _count: {
        ...item.base._count,
        resourcesViews:
          baseResourcesViewsCounts.find(({ baseId }) => baseId === item.base.id)
            ?._sum.viewsCount ?? 0,
      },
    },
  }))

  return { data: dataWithResourcesViews, count }
}

export type UserBasesJoinRequestsBaseData = Awaited<
  ReturnType<typeof getUserBasesJoinRequestsContext>
>
