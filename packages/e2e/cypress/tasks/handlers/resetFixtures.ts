import { prismaClient } from '@app/web/prismaClient'
import { deleteAll, seed } from '@app/fixtures/seeds'

export const resetFixtures = async (
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _emptyParametersNeededForTypesafety: Record<string, string>,
) => {
  await deleteAll(prismaClient)
  await seed(prismaClient)

  return {
    done: true,
  }
}
