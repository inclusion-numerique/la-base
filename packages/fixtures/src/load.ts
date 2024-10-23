import { prismaClient } from '@app/web/prismaClient'
import { Command } from '@commander-js/extra-typings'
import { output } from '@app/fixtures/output'
import { deleteAll, seed } from '@app/fixtures/seeds'

const main = async (eraseAllData: boolean) => {
  if (eraseAllData) {
    output.log('Erasing all data...')
    await deleteAll(prismaClient)
  }

  output.log(`Generating fixtures data`)
  await seed(prismaClient)
  output.log(`Fixtures loaded successfully`)
}

const program = new Command().option(
  '-e, --erase-all-data',
  'Erase all data from the database before seeding',
  false,
)

program.parse()

const { eraseAllData } = program.opts()

main(eraseAllData)
  // eslint-disable-next-line promise/always-return
  .then(() => prismaClient.$disconnect())
  // eslint-disable-next-line unicorn/prefer-top-level-await
  .catch(async (error) => {
    output.error(error)
    await prismaClient.$disconnect()
    // eslint-disable-next-line unicorn/no-process-exit
    process.exit(1)
  })
