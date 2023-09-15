import { prismaClient } from '@app/web/prismaClient'

export const acceptInvitation = (id: string) =>
  prismaClient.baseMembers.update({
    data: { acceptationToken: null, accepted: new Date() },
    where: {
      id,
    },
  })
