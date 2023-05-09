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
    console.log(`- Total duration : ${(result.time / 1000).toFixed(2)}s`)
  })
  // eslint-disable-next-line unicorn/prefer-top-level-await
  .catch(async (error) => {
    console.error(error)
    await disconnect()
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1)
  })
