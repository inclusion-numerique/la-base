import { output } from '@app/cli/output'
import { prismaClient } from '@app/web/prismaClient'
import { deleteProfile } from '@app/web/server/rpc/profile/deleteProfile'
import {
  sendAccountDeletedEmail,
  sendAccountDeletionSoonEmail,
  sendAccountInactiveEmail,
} from '@app/web/server/users/emails/sendAccountInactivityEmail'
import { getServerUrl } from '@app/web/utils/baseUrl'

const daysSince = (from: Date, to: Date) =>
  Math.floor((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24))

const getLastActiveAt = (user: {
  lastLogin: Date | null
  signedUpAt: Date | null
  created: Date
}) => user.lastLogin ?? user.signedUpAt ?? user.created

export const executeAccountInactivityJob = async () => {
  const now = new Date()
  const loginUrl = getServerUrl('/connexion', { absolutePath: true })
  const loginUrl305 = `${loginUrl}?mtm_campaign=compte_inactif_j305`
  const loginUrl335 = `${loginUrl}?mtm_campaign=compte_inactif_j335`
  const loginUrl350 = `${loginUrl}?mtm_campaign=compte_inactif_j350`
  const loginUrl365 = `${loginUrl}?mtm_campaign=reinscription`

  output('Starting account inactivity job...')

  const users = await prismaClient.user.findMany({
    where: {
      role: 'User',
      deleted: null,
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      name: true,
      lastLogin: true,
      signedUpAt: true,
      created: true,
    },
  })

  output(`${users.length} user(s) to inspect`)

  let sent305 = 0
  let sent335 = 0
  let sent350 = 0
  let sent365 = 0
  let failures = 0

  for (const user of users) {
    const lastActiveAt = getLastActiveAt(user)
    const inactiveDays = daysSince(lastActiveAt, now)

    const firstname = user.firstName || user.name || ''

    try {
      if (inactiveDays === 365) {
        await sendAccountDeletedEmail({ email: user.email, url: loginUrl365 })
        await deleteProfile({ id: user.id })
        sent365 += 1
        continue
      }

      if (inactiveDays === 350) {
        await sendAccountDeletionSoonEmail({
          email: user.email,
          firstname,
          url: loginUrl350,
          title: 'Votre compte va être supprimé',
        })
        sent350 += 1
        continue
      }

      if (inactiveDays === 335) {
        await sendAccountDeletionSoonEmail({
          email: user.email,
          firstname,
          url: loginUrl335,
          title: 'Votre compte va bientôt être supprimé',
        })
        sent335 += 1
        continue
      }

      if (inactiveDays === 305) {
        await sendAccountInactiveEmail({
          email: user.email,
          firstname,
          url: loginUrl305,
        })
        sent305 += 1
      }
    } catch (error) {
      failures += 1
      output(
        `Failed to send inactivity email to ${user.email} (${
          user.id
        }): ${String(error)}`,
      )
    }
  }

  output(
    `Account inactivity emails sent: 305d=${sent305}, 335d=${sent335}, 350d=${sent350}, 365d=${sent365}, failures=${failures}`,
  )
}
