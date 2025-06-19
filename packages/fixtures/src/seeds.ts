import { baseMembers } from '@app/fixtures/baseMembers'
import { collections } from '@app/fixtures/collections'
import { resourceContributors } from '@app/fixtures/resourceContributors'
import { fixtureUsers, teamAdministrateurs } from '@app/fixtures/users'
import type { Prisma } from '@prisma/client'
import { bases } from './bases'
import { resources } from './resources'

export const deleteAll = async (transaction: Prisma.TransactionClient) => {
  const tables = await transaction.$queryRaw<
    { table_name: string }[]
  >`SELECT table_name
    FROM information_schema.tables
    WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE'
      AND table_name != '_prisma_migrations'
      AND table_name != '_prisma_migrations_lock'`

  await transaction.$queryRawUnsafe(
    `TRUNCATE TABLE "${tables
      .map(({ table_name }) => table_name)
      .join('", "')}" CASCADE`,
  )

  return tables.map(({ table_name }) => table_name)
}

export const seed = async (transaction: Prisma.TransactionClient) => {
  await Promise.all(
    fixtureUsers.map((user) =>
      transaction.user.upsert({
        where: { id: user.id },
        create: { ...user, isFixture: true },
        update: { ...user, isFixture: true },
      }),
    ),
  )

  await Promise.all(
    teamAdministrateurs.map((user) =>
      transaction.user.upsert({
        where: { id: user.id },
        create: user,
        update: user,
      }),
    ),
  )

  await Promise.all(
    bases.map((base) =>
      transaction.base.upsert({
        where: { id: base.id },
        create: base,
        update: base,
      }),
    ),
  )

  await Promise.all(
    baseMembers.map((baseMember) =>
      transaction.baseMembers.upsert({
        where: { id: baseMember.id },
        create: baseMember,
        update: baseMember,
      }),
    ),
  )

  await Promise.all(
    resources.map((resource) =>
      transaction.resource.upsert({
        where: { id: resource.id },
        create: resource,
        update: resource,
      }),
    ),
  )

  await Promise.all(
    resourceContributors.map((resourceContributor) =>
      transaction.resourceContributors.upsert({
        where: { id: resourceContributor.id },
        create: resourceContributor,
        update: resourceContributor,
      }),
    ),
  )

  await Promise.all(
    collections.map((collection) =>
      transaction.collection.upsert({
        where: { id: collection.id },
        create: collection,
        update: collection,
      }),
    ),
  )
}
