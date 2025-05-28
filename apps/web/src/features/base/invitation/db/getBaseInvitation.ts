import { SessionUser } from '@app/web/auth/sessionUser'
import { prismaClient } from '@app/web/prismaClient'
import { computeResourcesListWhereForUser } from '@app/web/server/resources/getResourcesList'
import { Prisma } from '@prisma/client'

export const getBaseInvitation = async (token: string, user: SessionUser | null) => {
  const where: Prisma.BaseMembersWhereInput = {
    acceptationToken: token,
  }
  if (user) {
    where.memberId = user.id
  }
  const baseMemberInvitation = await prismaClient.baseMembers.findFirst({
    select: {
      id: true,
      member: {
        select: {
          signedUpAt: true,
          email: true,
        },
      },
      acceptationToken: true,
      invitedBy: {
        select: {
          name: true,
        },
      },
      base: {
        select: {
          _count: {
            select: { followedBy: true, resources: true },
          },
          slug: true,
          description: true,
          id: true,
          title: true,
          department: true,
          isPublic: true,
          image: true,
        },
      },
    },
    where,
  })
  if (!baseMemberInvitation) {
    return null
  }

  const resourceViews = await prismaClient.resource.aggregate({
    where: {
      ...computeResourcesListWhereForUser(user),
      baseId: baseMemberInvitation.base.id,
    },
    _sum: {
      viewsCount: true,
    },
  })

  return {
    ...baseMemberInvitation,
    base: {
      ...baseMemberInvitation.base,
      _count: {
        ...baseMemberInvitation.base._count,
        resourcesViews: resourceViews._sum.viewsCount ?? 0,
      },
    },
  }
}

export type BaseInvitation = NonNullable<
  Awaited<ReturnType<typeof getBaseInvitation>>
>
