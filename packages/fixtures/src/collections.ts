import type { Prisma } from '@prisma/client'
import { fixtureUsers } from '@app/fixtures/users'

const favoritesCollections = fixtureUsers.map(
  (user) =>
    ({
      id: user.id,
      title: 'Mes favoris',
      slug: `${user.slug}-favoris`,
      createdById: user.id,
      isPublic: false,
      isFavorites: true,
    }) satisfies Prisma.CollectionCreateManyInput,
)

export const collections = [...favoritesCollections]
