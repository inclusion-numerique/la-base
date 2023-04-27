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
}> => {
  const users = await prismaClient.user.findMany({
    select: { legacyId: true, id: true },
    where: {
      legacyId: { not: null },
    },
  })

  const idMap = new Map<number, string>(
    users
      .filter(
        (user): user is (typeof users)[0] & { legacyId: number } =>
          !!user.legacyId,
      )
      .map(({ id, legacyId }) => [legacyId, id]),
  )

  return { idMap }
}

export type MigrateUserInput = {
  legacyUser: LegacyUser
  transaction: Prisma.TransactionClient
}

export const migrateUser = async ({
  legacyUser,
  transaction,
}: MigrateUserInput) => {
  const legacyId = Number(legacyUser.id)

  const data = {
    email: legacyUser.email,
    firstName: legacyUser.first_name,
    lastName: legacyUser.last_name,
    name: `${legacyUser.first_name} ${legacyUser.last_name}`.trim(),
    created: legacyUser.created,
    updated: legacyUser.modified,
  }

  return transaction.user.upsert({
    where: { legacyId },
    create: { id: v4(), legacyId, ...data },
    update: data,
    select: { id: true, legacyId: true },
  })
}
