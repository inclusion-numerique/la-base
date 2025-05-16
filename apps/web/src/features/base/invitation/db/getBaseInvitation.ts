import { SessionUser } from '@app/web/auth/sessionUser'
import { prismaClient } from '@app/web/prismaClient'

export const getBaseInvitation = (token: string, user: SessionUser) =>
  prismaClient.baseMembers.findFirst({
    select: {
      id: true,
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
    where: {
      acceptationToken: token,
      memberId: user.id,
    },
  })

export type BaseInvitation = NonNullable<
  Awaited<ReturnType<typeof getBaseInvitation>>
>
