import { SessionUser } from '@app/web/auth/sessionUser'
import { prismaClient } from '@app/web/prismaClient'

export const getBaseInvitation = (token: string, user: SessionUser) =>
  prismaClient.baseMembers.findFirst({
    select: {
      id: true,
      base: {
        select: {
          slug: true,
        },
      },
    },
    where: {
      acceptationToken: token,
      memberId: user.id,
    },
  })
