import { prismaClient } from '@app/web/prismaClient'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'

export const notificationsRouter = router({
  getNotifications: protectedProcedure.query(async ({ ctx: { user } }) => {
    return prismaClient.notifications.findMany({
      include: {
        resource: true,
        base: true,
        initiator: true,
      },
      where: {
        userId: user.id,
      },
      orderBy: {
        created: 'desc',
      },
    })
  }),

  count: protectedProcedure.query(async ({ ctx: { user } }) => {
    return prismaClient.notifications.count({
      where: {
        userId: user.id,
        lastSeenAt: null,
      },
    })
  }),
  updateUnseenNotifications: protectedProcedure.mutation(
    async ({ ctx: { user } }) => {
      return prismaClient.notifications.updateMany({
        data: { lastSeenAt: new Date() },
        where: { userId: user.id, lastSeenAt: null },
      })
    },
  ),
})
