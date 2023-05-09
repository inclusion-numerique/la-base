import { migrationPrismaClient } from '@app/migration/migrationPrismaClient'
import { FindManyItemType } from '@app/migration/utils/findManyItemType'
import { v4 } from 'uuid'
import type { Prisma } from '@prisma/client'
import { LegacyIdMap } from '@app/migration/utils/legacyIdMap'
import { prismaClient } from '@app/web/prismaClient'
import { CreateManyDataType } from '@app/migration/utils/createManyDataType'
import { output } from '@app/cli/output'
import { split } from '@app/migration/utils/split'

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
  emailMap: Map<string, string>
}

export const migrateUser = ({ legacyUser, emailMap }: MigrateUserInput) => {
  const legacyId = Number(legacyUser.id)

  // We manage the edge case of a new user created in new app with same email as not yet migrated legacy user
  const existingIdFromEmail = emailMap.get(legacyUser.email)

  const data = {
    id: existingIdFromEmail ?? v4(),
    email: legacyUser.email,
    firstName: legacyUser.first_name,
    lastName: legacyUser.last_name,
    name: `${legacyUser.first_name} ${legacyUser.last_name}`.trim(),
    created: legacyUser.created,
    updated: legacyUser.modified,
    emailVerified: legacyUser.is_active ? legacyUser.created : null,
    legacyId,
  } satisfies CreateManyDataType<typeof prismaClient.user.createMany>

  return data
}

export const migrateUsers = async ({
  transaction,
}: {
  transaction: Prisma.TransactionClient
}) => {
  const legacyUsers = await getLegacyUsers()
  output(`- Found ${legacyUsers.length} users to migrate`)
  const existingUsers = await getExistingUsers()
  output(`- Found ${existingUsers.idMap.size} already migrated users`)
  const usersData = legacyUsers.map((legacyUser) =>
    migrateUser({
      legacyUser,
      emailMap: existingUsers.emailMap,
    }),
  )

  const [usersToCreate, usersToUpdate] = split(
    usersData,
    ({ legacyId, email }) =>
      !existingUsers.idMap.has(legacyId) && !existingUsers.emailMap.has(email),
  )

  const created = await Promise.all(
    usersToCreate.map((user) =>
      transaction.user.create({
        data: user,
        select: { id: true, legacyId: true },
      }),
    ),
  )
  const updated = await Promise.all(
    usersToUpdate.map((user) =>
      transaction.user.update({
        data: user,
        where: { legacyId: user.legacyId },
        select: { id: true, legacyId: true },
      }),
    ),
  )
  return [...created, ...updated]
}
