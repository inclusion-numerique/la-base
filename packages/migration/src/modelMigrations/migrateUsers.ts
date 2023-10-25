import { chunk } from 'lodash'
import { v4 } from 'uuid'
import { output } from '@app/cli/output'
import { prismaClient } from '@app/web/prismaClient'
import { migrationPrismaClient } from '@app/migration/migrationPrismaClient'
import { UpsertCreateType } from '@app/migration/utils/UpsertCreateType'
import { FindManyItemType } from '@app/migration/utils/findManyItemType'
import { LegacyIdMap } from '@app/migration/utils/legacyIdMap'

export const getLegacyUsers = () => migrationPrismaClient.main_user.findMany()

export type LegacyUser = FindManyItemType<typeof getLegacyUsers>

export const getExistingUsers = async () => {
  const users = await prismaClient.user.findMany({
    select: {
      legacyId: true,
      id: true,
      email: true,
      collections: {
        select: {
          id: true,
        },
        where: {
          isFavorites: true,
        },
      },
    },
  })

  const idMap = new Map<number, string>(
    users
      .filter(
        (user): user is (typeof users)[0] & { legacyId: number } =>
          !!user.legacyId,
      )
      .map(({ id, legacyId }) => [legacyId, id]),
  ) satisfies LegacyIdMap

  const emailMap = new Map<string, string>(
    users.map(({ id, email }) => [email, id]),
  )

  return { idMap, emailMap, users }
}

type ExistingUsers = Awaited<ReturnType<typeof getExistingUsers>>

export const transformUser = ({
  legacyUser,
  emailMap,
  existingUser,
}: {
  legacyUser: LegacyUser
  emailMap: Map<string, string>
  existingUser: ExistingUsers['users'][number] | undefined
}) => {
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
    collections: existingUser?.collections.length
      ? undefined
      : {
          create: {
            title: 'Mes favoris',
            isFavorites: true,
          },
        },
  } satisfies UpsertCreateType<typeof prismaClient.user.upsert>

  return data
}

export const migrateUsers = async () => {
  const legacyUsers = await getLegacyUsers()
  output(`- Found ${legacyUsers.length} users to migrate`)

  const existingUsers = await getExistingUsers()
  output(`- Found ${existingUsers.idMap.size} already migrated users`)

  const existingUsersById = new Map(
    existingUsers.users.map((user) => [user.id, user]),
  )

  const usersData = legacyUsers.map((legacyUser) => {
    const existingUserId = existingUsers.idMap.get(Number(legacyUser.id))
    return transformUser({
      legacyUser,
      emailMap: existingUsers.emailMap,
      existingUser: existingUserId
        ? existingUsersById.get(existingUserId)
        : undefined,
    })
  })

  const chunkSize = 200
  let migratedUserCount = 0

  const upserted = await Promise.all(
    chunk(usersData, chunkSize).map((userChunk) =>
      prismaClient
        .$transaction(
          userChunk.map((user) => {
            const existingIdFromEmail = existingUsers.emailMap.get(user.email)

            return prismaClient.user.upsert({
              where: existingIdFromEmail
                ? { id: existingIdFromEmail }
                : { legacyId: user.legacyId },
              create: user,
              update: user,
              select: { id: true, legacyId: true },
            })
          }),
        )
        .then((users) => {
          migratedUserCount += users.length
          output(
            `-- ${migratedUserCount} ${(
              (migratedUserCount * 100) /
              legacyUsers.length
            ).toFixed(0)}%`,
          )
          return users
        }),
    ),
  )

  return upserted.flat()
}
