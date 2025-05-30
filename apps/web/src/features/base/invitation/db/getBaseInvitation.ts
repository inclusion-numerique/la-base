import { SessionUser } from '@app/web/auth/sessionUser'
import { prismaClient } from '@app/web/prismaClient'
import { Prisma } from '@prisma/client'

export const getBaseInvitation = (token: string, user: SessionUser | null) => {
  const where: Prisma.BaseMembersWhereInput = {
    acceptationToken: token,
  }
  if (user) {
    where.memberId = user.id
  }
  return prismaClient.baseMembers.findFirst({
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
          isPublic: true,
          image: true,
        },
      },
    },
    where,
  })
}

export type BaseInvitation = NonNullable<
  Awaited<ReturnType<typeof getBaseInvitation>>
>
