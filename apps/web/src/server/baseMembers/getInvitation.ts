import { SessionUser } from '@app/web/auth/sessionUser'
import { prismaClient } from '@app/web/prismaClient'

export const getInvitation = (slug: string, token: string, user: SessionUser) =>
  prismaClient.baseMembers.findFirst({
    select: { id: true },
    where: {
      acceptationToken: token,
      memberId: user.id,
      base: { slug },
    },
  })
