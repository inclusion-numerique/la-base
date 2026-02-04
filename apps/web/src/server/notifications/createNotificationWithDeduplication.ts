import { prismaClient } from '@app/web/prismaClient'
import type { NotificationType } from '@prisma/client'

export type CreateNotificationData = {
  userId: string
  type: NotificationType
  resourceId?: string | null
  baseId?: string | null
  initiatorId?: string | null
  isBaseNewRoleAdmin?: boolean | null
}

export async function createNotification(
  data: CreateNotificationData,
): Promise<void> {
  const twentyFourHoursAgo = new Date()
  twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24)

  const existingNotification = await prismaClient.notification.findFirst({
    where: {
      userId: data.userId,
      type: data.type,
      resourceId: data.resourceId ?? null,
      baseId: data.baseId ?? null,
      initiatorId: data.initiatorId ?? null,
      created: { gte: twentyFourHoursAgo },
    },
  })

  if (existingNotification) {
    return // Skip duplicate
  }

  await prismaClient.notification.create({ data })
}

export async function createNotifications(
  dataList: CreateNotificationData[],
): Promise<void> {
  await Promise.all(dataList.map(createNotification))
}
