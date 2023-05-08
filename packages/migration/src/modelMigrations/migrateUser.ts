import { migrationPrismaClient } from '@app/migration/migrationPrismaClient'
import { FindManyItemType } from '@app/migration/utils/findManyItemType'
import { v4 } from 'uuid'
import type { Prisma } from '@prisma/client'
import { LegacyIdMap } from '@app/migration/utils/legacyIdMap'
import { prismaClient } from '@app/web/prismaClient'

export const getLegacyUsers = () => migrationPrismaClient.main_user.findMany()

export type LegacyUser = FindManyItemType<typeof getLegacyUsers>

export const getExistingUsers = async (): Promise<{
  idMap: LegacyIdMap
  emailMap: Map<string, string>
}> => {
  const users = await prismaClient.user.findMany({
    select: { legacyId: true, id: true, email: true },
  })

  const idMap = new Map<number, string>(
    users
      .filter(
        (user): user is (typeof users)[0] & { legacyId: number } =>
          !!user.legacyId,
      )
      .map(({ id, legacyId }) => [legacyId, id]),
  )

  const emailMap = new Map<string, string>(
    users.map(({ id, email }) => [email, id]),
  )

  return { idMap, emailMap }
}

export type MigrateUserInput = {
  legacyUser: LegacyUser
  transaction: Prisma.TransactionClient
  emailMap: Map<string, string>
}

export const migrateUser = async ({
  legacyUser,
  transaction,
  emailMap,
}: MigrateUserInput) => {
  const legacyId = Number(legacyUser.id)

  // We manage the edge case of a new user created in new app with same email as not yet migrated legacy user
  const existingIdFromEmail = emailMap.get(legacyUser.email)

  const data = {
    email: legacyUser.email,
    firstName: legacyUser.first_name,
    lastName: legacyUser.last_name,
    name: `${legacyUser.first_name} ${legacyUser.last_name}`.trim(),
    created: legacyUser.created,
    updated: legacyUser.modified,
    emailVerified: legacyUser.is_active ? legacyUser.created : null,
    legacyId,
  } satisfies Parameters<typeof transaction.user.upsert>[0]['update']

  return transaction.user.upsert({
    where: existingIdFromEmail ? { id: existingIdFromEmail } : { legacyId },
    create: { id: v4(), ...data },
    update: data,
    select: { id: true, legacyId: true },
  })
}
