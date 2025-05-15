import { output } from '@app/fixtures/output'
import { deleteAll, seed } from '@app/fixtures/seeds'
import { prismaClient } from '@app/web/prismaClient'
import { Command } from '@commander-js/extra-typings'

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
  .then(() => prismaClient.$disconnect())
  .catch(async (error) => {
    output.error(error)
    await prismaClient.$disconnect()
    process.exit(1)
  })
