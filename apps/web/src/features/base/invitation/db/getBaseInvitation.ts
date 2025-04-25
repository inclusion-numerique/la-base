import { SessionUser } from '@app/web/auth/sessionUser'
import { prismaClient } from '@app/web/prismaClient'

export const getBaseInvitation = (token: string, user: SessionUser) =>
  prismaClient.baseMembers.findFirst({
    select: {
      id: true,
      acceptationToken: true,
      base: {
        select: {
          slug: true,
          id: true,
          title: true,
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
