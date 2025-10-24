import { output } from '@app/cli/output'
import { sendNewsFeedNewsletterEmail } from '@app/web/features/fil-d-actualite/components/emails/sendNewsFeedNewsletterEmail'
import {
  defaultNewsFeedPaginationParams,
  getNewsFeedResourcesServer,
} from '@app/web/server/newsFeed/getNewsFeedResources'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const executeMonthlyNewsletterNewsFeed = async () => {
  output('Starting sending news feed newsletter ...')

  const newsFeedUsers = await prisma.user.findMany({
    select: { firstName: true, lastName: true, email: true, id: true },
    where: {
      role: 'User',
      deleted: null,
      newsFeed: { monthlyNewsletter: true },
    },
  })

  output(`${newsFeedUsers.length} newsletter to send`)

  const now = new Date()
  const firstDayPreviousMonth = new Date(
    now.getFullYear(),
    now.getMonth() - 1,
    1,
  )
  const newsFeedResourcesUser = await Promise.all(
    newsFeedUsers.map(async (user) => ({
      user,
      resources: (
        await getNewsFeedResourcesServer(
          user.id,
          { themes: [], professionalSectors: [] },
          defaultNewsFeedPaginationParams,
          firstDayPreviousMonth,
        )
      ).resources,
    })),
  )

  const results = await Promise.allSettled(
    newsFeedResourcesUser.map(({ user, resources }) =>
      sendNewsFeedNewsletterEmail(user.email, resources.slice(0, 6)),
    ),
  )

  const failures = results.filter((result) => result.status === 'rejected')

  if (failures.length > 0) {
    output(`Newsletter sent with ${failures.length} errors:`)
    for (const [index, failure] of failures.entries()) {
      if (failure.status === 'rejected') {
        output(`Error ${index + 1}: ${String(failure.reason)}`)
      }
    }
  } else {
    output('Successfully sent newsletter to all subscribed users')
  }
}
