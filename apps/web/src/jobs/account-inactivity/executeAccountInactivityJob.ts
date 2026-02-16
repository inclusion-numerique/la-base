import { output } from '@app/cli/output'
import { prismaClient } from '@app/web/prismaClient'
import { deleteInactiveProfile } from '@app/web/server/rpc/profile/deleteProfile'
import {
  sendAccountDeletedEmail,
  sendAccountDeletionSoonEmail,
  sendAccountInactiveEmail,
} from '@app/web/server/users/emails/sendAccountInactivityEmail'
import { getServerUrl } from '@app/web/utils/baseUrl'
import { AccountInactivity } from '@prisma/client'

const BATCH_SIZE = 50

const daysSince = (from: Date, to: Date) =>
  Math.floor((to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24))

type UserToProcess = {
  id: string
  email: string
  firstName: string | null
  name: string | null
  lastLogin: Date | null
  signedUpAt: Date | null
  created: Date
  accountInactivity: AccountInactivity | null
}

type ProcessResult = {
  type: '305' | '335' | '350' | '365' | 'skipped'
  error?: string
}

const processUser = async (
  user: UserToProcess,
  now: Date,
  urls: {
    loginUrl305: string
    loginUrl335: string
    loginUrl350: string
    loginUrl365: string
  },
): Promise<ProcessResult> => {
  const lastActiveAt = user.lastLogin

  if (!lastActiveAt) return { type: 'skipped' }
  const inactiveDays = daysSince(lastActiveAt, now)
  const firstname = user.firstName || user.name || ''

  if (inactiveDays >= 365) {
    if (user.accountInactivity === AccountInactivity.AccountDeleted) {
      return { type: 'skipped' }
    }
    await sendAccountDeletedEmail({ email: user.email, url: urls.loginUrl365 })
    await prismaClient.user.update({
      where: { id: user.id },
      data: { accountInactivity: AccountInactivity.AccountDeleted },
    })
    await deleteInactiveProfile({ id: user.id })
    return { type: '365' }
  }

  if (inactiveDays >= 350 && inactiveDays < 365) {
    if (user.accountInactivity === AccountInactivity.AccountDeletionSoon350d) {
      return { type: 'skipped' }
    }
    await sendAccountDeletionSoonEmail({
      email: user.email,
      firstname,
      url: urls.loginUrl350,
      title: 'Votre compte va être supprimé',
    })
    await prismaClient.user.update({
      where: { id: user.id },
      data: { accountInactivity: AccountInactivity.AccountDeletionSoon350d },
    })
    return { type: '350' }
  }

  if (inactiveDays >= 335 && inactiveDays < 350) {
    if (user.accountInactivity === AccountInactivity.AccountDeletionSoon335d) {
      return { type: 'skipped' }
    }
    await sendAccountDeletionSoonEmail({
      email: user.email,
      firstname,
      url: urls.loginUrl335,
      title: 'Votre compte va bientôt être supprimé',
    })
    await prismaClient.user.update({
      where: { id: user.id },
      data: { accountInactivity: AccountInactivity.AccountDeletionSoon335d },
    })
    return { type: '335' }
  }

  if (inactiveDays >= 305 && inactiveDays < 335) {
    if (user.accountInactivity === AccountInactivity.AccountInactive) {
      return { type: 'skipped' }
    }
    await sendAccountInactiveEmail({
      email: user.email,
      firstname,
      url: urls.loginUrl305,
    })
    await prismaClient.user.update({
      where: { id: user.id },
      data: { accountInactivity: AccountInactivity.AccountInactive },
    })
    return { type: '305' }
  }

  return { type: 'skipped' }
}

export const executeAccountInactivityJob = async () => {
  const now = new Date()
  const loginUrl = getServerUrl('/connexion', { absolutePath: true })
  const urls = {
    loginUrl305: `${loginUrl}?mtm_campaign=compte_inactif_j305`,
    loginUrl335: `${loginUrl}?mtm_campaign=compte_inactif_j335`,
    loginUrl350: `${loginUrl}?mtm_campaign=compte_inactif_j350`,
    loginUrl365: `${loginUrl}?mtm_campaign=reinscription`,
  }

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
      accountInactivity: true,
    },
  })

  output(`${users.length} user(s) to inspect`)

  let sent305 = 0
  let sent335 = 0
  let sent350 = 0
  let sent365 = 0
  let failures = 0

  for (let i = 0; i < users.length; i += BATCH_SIZE) {
    const batch = users.slice(i, i + BATCH_SIZE)
    const results = await Promise.allSettled(
      batch.map((user) => processUser(user, now, urls)),
    )

    for (const [index, result] of results.entries()) {
      if (result.status === 'rejected') {
        failures += 1
        const user = batch[index]
        output(
          `Failed to process ${user.email} (${user.id}): ${String(
            result.reason,
          )}`,
        )
      } else {
        switch (result.value.type) {
          case '305':
            sent305 += 1
            break
          case '335':
            sent335 += 1
            break
          case '350':
            sent350 += 1
            break
          case '365':
            sent365 += 1
            break
          default:
            break
        }
      }
    }

    if (i + BATCH_SIZE < users.length) {
      output(
        `Processed ${Math.min(i + BATCH_SIZE, users.length)}/${
          users.length
        } users...`,
      )
    }
  }

  output(
    `Account inactivity emails sent: 305d=${sent305}, 335d=${sent335}, 350d=${sent350}, 365d=${sent365}, failures=${failures}`,
  )
}
