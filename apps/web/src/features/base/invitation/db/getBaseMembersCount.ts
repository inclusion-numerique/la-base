import { prismaClient } from '@app/web/prismaClient'

export const getBaseMembersCount = (baseId: string) =>
  prismaClient.baseMembers.count({
    where: { baseId, accepted: { not: null } },
  })
