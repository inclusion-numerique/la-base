import * as Sentry from '@sentry/nextjs'

/**
 * For handling external systems that changed or invalidate user emails,
 * we need a way to reconcile the user email with the one in the system.
 * For this we keep a mapping of new email -> old email in the database.
 * And do not re-create the user in the system if the old email is found.
 * Instead, we update the user email in the system.
 */
import { prismaClient } from '@app/web/prismaClient'

export const getUserEmailReconciliation = async (expectedNewEmail: string) => {
  const emailReconcilation =
    await prismaClient.userEmailReconciliation.findUnique({
      where: { expectedNewEmail: expectedNewEmail.toLowerCase() },
    })

  if (!emailReconcilation) {
    return null
  }
  const existingUser = await prismaClient.user.findUnique({
    where: { email: emailReconcilation.oldEmail },
  })
  if (!existingUser) {
    return null
  }

  const conflictingUser = await prismaClient.user.findUnique({
    where: { email: expectedNewEmail.toLowerCase() },
  })

  if (conflictingUser) {
    Sentry.captureException(
      new Error(`Conflicting user found for email reconciliation`),
      {
        extra: {
          expectedNewEmail: emailReconcilation.expectedNewEmail,
          oldEmail: emailReconcilation.oldEmail,
          existingUserId: existingUser.id,
          conflictingUserId: conflictingUser.id,
        },
      },
    )
    return null
  }

  return {
    emailReconcilation,
    existingUser,
  }
}

export type UserEmailReconciliationResult = Exclude<
  Awaited<ReturnType<typeof getUserEmailReconciliation>>,
  null
>

export const applyUserEmailReconciliation = async ({
  emailReconcilation,
  existingUser,
}: UserEmailReconciliationResult) => {
  const updated = await prismaClient.user.update({
    where: { id: existingUser.id },
    data: {
      email: emailReconcilation.expectedNewEmail.toLowerCase(),
    },
  })

  if (!updated) {
    throw new Error('User email reconciliation failed, user not found')
  }

  return updated
}

export type ApplyUserEmailReconciliationResult = Awaited<
  ReturnType<typeof applyUserEmailReconciliation>
>
