import { faker } from '@faker-js/faker'
import { Prisma } from '@prisma/client'

const BASE_NUMBER = 20

export const randomCollections: (
  transaction: Prisma.TransactionClient,
  random: number,
) => Promise<Prisma.CollectionCreateManyInput[]> = async (
  transaction,
  random,
) => {
  const users = await transaction.user.findMany()
  const bases = await transaction.base.findMany()

  return [
    ...users.map((user) => ({
      title: 'Mes favoris',
      ownerId: user.id,
      isPublic: false,
      isFavorites: true,
    })),
    ...Array.from({ length: random * BASE_NUMBER }, () => ({
      title: faker.lorem.words({ min: 2, max: 5 }),
      ownerId: faker.helpers.arrayElement(users).id,
      baseId:
        Math.random() < 0.5 ? faker.helpers.arrayElement(bases).id : undefined,
      isPublic: faker.datatype.boolean(),
      description: Math.random() > 0.75 ? faker.lorem.paragraph() : undefined,
      deleted: Math.random() < 0.05 ? faker.date.past() : undefined,
    })),
  ]
}

export const randomResourcesInCollections: (
  transaction: Prisma.TransactionClient,
) => Promise<{ resourceId: string; collectionId: string }[]> = async (
  transaction,
) => {
  const [resources, collections] = await Promise.all([
    transaction.resource.findMany({
      select: { id: true },
    }),
    transaction.collection.findMany({ select: { id: true } }),
  ])

  return collections.flatMap((collection) =>
    faker.helpers
      .arrayElements(resources, { min: 2, max: 20 })
      .map((resource) => ({
        resourceId: resource.id,
        collectionId: collection.id,
      })),
  )
}
