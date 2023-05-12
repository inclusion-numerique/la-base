import { Command, InvalidArgumentError } from '@commander-js/extra-typings'
import { prismaClient } from '@app/web/prismaClient'
import { Prisma } from '@prisma/client'
import { bases } from './bases'
import { resources } from './resources'
import { randomUsers, users } from './users'

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
  await (random
    ? transaction.user.createMany({ data: randomUsers(random) })
    : Promise.all(
      users.map((user) =>
        transaction.user.upsert({
          where: { id: user.id },
          create: user,
          update: user,
          select: { id: true },
        }),
      ),
    ))

  const newBases = await bases(random)
  await Promise.all(
    newBases.map((base) =>
      transaction.base.upsert({
        where: { id: base.id },
        create: base,
        update: base,
        select: { id: true },
      }),
    ),
  )

  const newResources = await resources(random)
  await Promise.all(
    newResources.map((resource) =>
      transaction.resource.upsert({
        where: { id: resource.id },
        create: resource,
        update: resource,
        select: { id: true },
      }),
    ),
  )
}

const main = async (eraseAllData: boolean, random?: number) => {
  await prismaClient.$transaction(async (transaction) => {
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
  })
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
