import { testSessionUser } from '@app/web/test/testSessionUser'
import { CollectionListItem } from '@app/web/server/collections/getCollectionsList'

export const date = new Date('2023-01-31')

export const updated = new Date('2023-02-03')

export const creatorUser = { ...testSessionUser, id: '1' }

export const collectionInProfile = {
  id: 'bfb435ea-35e9-4fc4-a2b0-93a31d35c793',
  image: { id: 'portrait', altText: 'Texte alternatif' },
  isPublic: true,
  createdBy: creatorUser,
  base: null,
  title:
    'Titre d’une collection sur deux ligne très longues comme comme sur deux ligne très longues',
  slug: 'titre-d-une-collection-sur-deux-ligne-tres-longues-comme-comme-sur-deux-ligne-tres-longues',
  description: 'Super description de collection, qui parle de trucs',
  resources: [],
  _count: { resources: 0 },
} satisfies CollectionListItem

export const collectionInBase = {
  id: 'bfb435ea-35e9-4fc4-a2b0-93a31d35c793',
  base: {
    id: 'base-id',
    title: 'Titre de la base',
    slug: 'titre-de-la-base',
    image: null,
  },
  image: { id: 'portrait', altText: 'Texte alternatif' },
  isPublic: true,
  createdBy: creatorUser,
  title:
    'Titre d’une collection sur deux ligne très longues comme comme sur deux ligne très longues',
  slug: 'titre-d-une-collection-sur-deux-ligne-tres-longues-comme-comme-sur-deux-ligne-tres-longues',
  description: 'Super description de collection, qui parle de trucs',
  resources: [],
  _count: { resources: 0 },
} satisfies CollectionListItem
