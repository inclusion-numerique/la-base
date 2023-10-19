import { faker } from '@faker-js/faker'
import { Prisma } from '@prisma/client'

const BASE_NUMBER = 100

export const randomCollections: (
  transaction: Prisma.TransactionClient,
  random: number,
) => Promise<Prisma.CollectionCreateManyInput[]> = async (
  transaction,
  random,
) => {
  const users = await transaction.user.findMany()

  return [
    ...users.map((user) => ({
      title: 'Mes favoris',
      ownerId: user.id,
      isPublic: false,
    })),
    ...Array.from({ length: random * BASE_NUMBER }, () => ({
      title: faker.lorem.words({ min: 2, max: 5 }),
      ownerId: faker.helpers.arrayElement(users).id,
      isPublic: faker.datatype.boolean(),
      description: Math.random() > 0.75 ? faker.lorem.paragraph() : undefined,
      deleted: Math.random() < 0.05 ? faker.date.past() : undefined,
    })),
  ]
}
