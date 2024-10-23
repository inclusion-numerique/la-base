import { prismaClient } from '@app/web/prismaClient'

export const createEmailReconciliation = async ({
  expectedNewEmail,
  oldEmail,
}: {
  expectedNewEmail: string
  oldEmail: string
}) =>
  prismaClient.userEmailReconciliation.create({
    data: {
      expectedNewEmail: expectedNewEmail.toLowerCase(),
      oldEmail: oldEmail.toLowerCase(),
    },
  })
