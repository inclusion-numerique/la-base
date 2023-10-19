import { Command, InvalidArgumentError } from '@commander-js/extra-typings'
import { prismaClient } from '@app/web/prismaClient'
import { createResourceProjection } from '@app/web/server/resources/feature/createResourceProjection'
import { Prisma } from '@prisma/client'
import { faker } from '@faker-js/faker'
import { bases, randomBases } from './bases'
import { randomResourcesEvents, resources } from './resources'
import { randomUsers, users } from './users'
import { randomMembers } from './members'
import { randomContributors } from './contributors'

import { randomCollections } from './collections'
import TransactionClient = Prisma.TransactionClient

function myParseInt(value: string) {
  const parsedValue = Number.parseInt(value, 10)
  if (Number.isNaN(parsedValue)) {
    throw new InvalidArgumentError('Not a number.')
  }
  return parsedValue
}

const deleteAll = async (transaction: TransactionClient) => {
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

const seed = async (transaction: TransactionClient, random?: number) => {
  if (random) {
    await transaction.user.createMany({ data: randomUsers(random) })
    const newBases = await randomBases(transaction, random)
    await transaction.base.createMany({ data: newBases })
    const members = await randomMembers(transaction)
    await transaction.baseMembers.createMany({ data: members })
    const collections = await randomCollections(transaction, random)
    await transaction.collection.createMany({ data: collections })

    const newResourcesEvents = await randomResourcesEvents(transaction, random)
    const projections = newResourcesEvents.map(createResourceProjection)
    await transaction.resource.createMany({
      data: projections.map((projection) => ({
        ...projection,
        isPublic: true,
        titleDuplicationCheckSlug: projection.slug,
        contents: undefined,
        contributors: undefined,
      })),
    })

    await transaction.content.createMany({
      data: projections.flatMap((projection) =>
        projection.contents.map((content, index) => ({
          ...content,
          order: index,
          resourceId: projection.id,
          __version: undefined,
        })),
      ),
    })

    await transaction.resourceEvent.createMany({
      data: newResourcesEvents.flat(),
    })

    const contributors = await randomContributors(transaction)
    await transaction.resourceContributors.createMany({ data: contributors })
  } else {
    await Promise.all(
      users.map((user) =>
        transaction.user.upsert({
          where: { id: user.id },
          create: user,
          update: user,
        }),
      ),
    )
    await Promise.all(
      users.map((user) =>
        transaction.collection.create({
          data: {
            id: faker.string.uuid(),
            title: 'Mes favoris',
            ownerId: user.id as string,
            isPublic: false,
          },
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
      resources.map((resource) =>
        transaction.resource.upsert({
          where: { id: resource.id },
          create: resource,
          update: resource,
        }),
      ),
    )
  }
}

const main = async (eraseAllData: boolean, random?: number) => {
  await prismaClient.$transaction(
    async (transaction) => {
      if (eraseAllData) {
        console.log('Erasing all data...')
        await deleteAll(transaction)
      }

      console.log(
        `Generating ${
          random ? `${random} set of random` : 'non-random fixtures'
        } data`,
      )
      await seed(transaction, random)
    },
    { maxWait: 60_000 },
  )
  console.log(`Fixtures loaded successfully`)
}

const program = new Command()
  .option('-e, --erase-all-data', 'Erase all data', false)
  .option(
    '-r, --random [number]',
    'Number of random items to seed',
    myParseInt,
    0,
  )

program.parse()

const { eraseAllData, random } = program.opts()

main(eraseAllData, random === true ? 1 : random)
  // eslint-disable-next-line promise/always-return
  .then(() => prismaClient.$disconnect())
  // eslint-disable-next-line unicorn/prefer-top-level-await
  .catch(async (error) => {
    console.error(error)
    await prismaClient.$disconnect()
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1)
  })
