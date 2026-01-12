import { prismaClient } from '@app/web/prismaClient'
import { protectedProcedure, router } from '@app/web/server/rpc/createRouter'

export const notificationsRouter = router({
  getNotifications: protectedProcedure.query(async ({ ctx: { user } }) => {
    return prismaClient.notification.findMany({
      include: {
        resource: { select: { id: true, title: true, slug: true } },
        base: { select: { id: true, title: true, slug: true } },
        initiator: {
          select: {
            id: true,
            name: true,
            slug: true,
            image: true,
            firstName: true,
            lastName: true,
          },
        },
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
    return prismaClient.notification.count({
      where: {
        userId: user.id,
        lastSeenAt: null,
      },
    })
  }),
  updateUnseenNotifications: protectedProcedure.mutation(
    async ({ ctx: { user } }) => {
      return prismaClient.notification.updateMany({
        data: { lastSeenAt: new Date() },
        where: { userId: user.id, lastSeenAt: null },
      })
    },
  ),
})
