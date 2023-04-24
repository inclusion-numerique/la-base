import { executeMigration } from '@app/migration/executeMigration'
import { prismaClient } from '@app/web/prismaClient'
import { migrationPrismaClient } from '@app/migration/migrationPrismaClient'

const disconnect = () =>
  Promise.all([prismaClient.$disconnect(), migrationPrismaClient.$disconnect()])

executeMigration()
  // eslint-disable-next-line promise/always-return
  .then(async (result) => {
    await disconnect()
    console.log('Migration successful')
    console.log(`- duration : ${(result.time / 1000).toFixed(2)}s`)
    console.log('Migrated models :')
    console.log(`- ${result.result.migratedUsers.length} users`)
    console.log(`- ${result.result.migratedBases.length} bases`)
    console.log(`- ${result.result.migratedResources.length} resources`)
  })
  // eslint-disable-next-line unicorn/prefer-top-level-await
  .catch(async (error) => {
    console.error(error)
    await disconnect()
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1)
  })
