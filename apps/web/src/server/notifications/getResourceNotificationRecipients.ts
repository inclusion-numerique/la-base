import { prismaClient } from '@app/web/prismaClient'

export type ResourceNotificationRecipients = {
  userIds: string[]
  excludeUserId?: string
}

/**
 * Récupère tous les utilisateurs qui doivent recevoir une notification pour une ressource
 * Cela inclut :
 * - Le créateur de la ressource
 * - Tous les contributeurs de la ressource
 * - Si la ressource appartient à une base : tous les membres de cette base
 */
export async function getResourceNotificationRecipients(
  resourceId: string,
  excludeUserId?: string,
): Promise<string[]> {
  const resource = await prismaClient.resource.findUnique({
    where: { id: resourceId },
    select: {
      createdById: true,
      baseId: true,
    },
  })

  if (!resource) {
    return []
  }

  const userIds = new Set<string>()

  if (resource.createdById && resource.createdById !== excludeUserId) {
    userIds.add(resource.createdById)
  }

  const contributors = await prismaClient.resourceContributors.findMany({
    where: { resourceId },
    select: { contributorId: true },
  })

  for (const contributor of contributors) {
    if (contributor.contributorId !== excludeUserId) {
      userIds.add(contributor.contributorId)
    }
  }

  if (resource.baseId) {
    const baseMembers = await prismaClient.baseMembers.findMany({
      where: {
        baseId: resource.baseId,
        accepted: { not: null },
      },
      select: { memberId: true },
    })

    for (const member of baseMembers) {
      if (member.memberId !== excludeUserId) {
        userIds.add(member.memberId)
      }
    }
  }

  return Array.from(userIds)
}
