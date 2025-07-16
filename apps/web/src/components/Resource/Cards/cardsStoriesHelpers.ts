import { generateResourceExcerpt } from '@app/web/resources/resourceExcerpt'
import type { ResourceListItem } from '@app/web/server/resources/getResourcesList'
import { testResourceDescription } from '@app/web/test/helpers'
import { testSessionUser } from '@app/web/test/testSessionUser'

export const date = new Date('2023-01-31')

export const updated = new Date('2023-02-03')

export const resource = {
  id: '7a7a8e12-3fdb-4485-8f9d-112bce55d302',
  title:
    'Titre d’une ressource sur deux ligne très longues comme comme sur deux ligne très longues',
  slug: 'titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-ligne-tres-longues',
  excerpt: generateResourceExcerpt(testResourceDescription),
  created: date,
  updated: date,
  published: date,
  lastPublished: date,
  deleted: null,
  createdById: '1',
  baseId: 'base-id',
  base: {
    id: 'base-id',
    title:
      'Titre de la base particulièrement long au point de revenir à la ligne',
    slug: 'titre-de-la-base',
    isPublic: true,
    image: null,
    members: [],
  },
  isPublic: true,
  createdBy: {
    id: '1',
    email: 'jean.biche@example.com',
    slug: 'jean-biche',
    name: 'Jean Biche',
    firstName: 'Jean',
    lastName: 'Biche',
    image: { id: 'portrait', altText: 'Texte alternatif' },
    isPublic: true,
  },
  feedbackAverage: 4,
  collections: [],
  contributors: [],
  viewsCount: 45,
  _count: {
    resourceFeedback: 4,
    collections: 45,
  },
  image: { id: 'portrait', altText: 'Texte alternatif' },
} satisfies ResourceListItem

export const creatorUser = { ...testSessionUser, id: resource.createdBy.id }
