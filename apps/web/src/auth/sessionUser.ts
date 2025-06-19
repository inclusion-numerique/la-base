import type {
  Base,
  BaseMembers,
  Collection,
  CollectionResource,
  Resource,
  ResourceContributors,
  SavedCollection,
  User,
} from '@prisma/client'

export type SessionUserCollectionFragment = Pick<
  Collection,
  'id' | 'isPublic' | 'title' | 'slug' | 'isFavorites'
> & {
  resources: Pick<CollectionResource, 'resourceId'>[]
  created: Date
  updated: Date
}

export type SessionUserBase = Pick<
  Base,
  'slug' | 'title' | 'id' | 'isPublic'
> & {
  collections: SessionUserCollectionFragment[]
  savedCollections: SessionUserSavedCollectionFragment[]
  image: {
    id: string
    altText: string | null
  } | null
}

export type SessionUserSavedCollectionFragment = Pick<
  SavedCollection,
  'id' | 'baseId' | 'collectionId'
>

// Serializable user interface
export type SessionUser = Pick<
  User,
  | 'id'
  | 'slug'
  | 'firstName'
  | 'lastName'
  | 'name'
  | 'isPublic'
  | 'legacyId'
  | 'role'
> & {
  image: {
    id: string
    altText: string | null
  } | null
  email: string
  emailVerified: string | null
  created: string | null
  updated: string | null
  hasSeenV2Onboarding: string | null
  ownedBases: SessionUserBase[]
  bases: (Pick<BaseMembers, 'isAdmin'> & {
    base: SessionUserBase
  })[]
  collections: SessionUserCollectionFragment[]
  savedCollections: SessionUserSavedCollectionFragment[]
  resources: Pick<ResourceContributors, 'resourceId'>[]
  createdResources: Pick<Resource, 'id' | 'slug'>[]
}
