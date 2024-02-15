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
  'id' | 'isPublic' | 'title' | 'slug'
> & {
  resources: Pick<CollectionResource, 'resourceId'>[]
}

export type SessionUserBase = Pick<
  Base,
  'slug' | 'title' | 'id' | 'isPublic'
> & {
  collections: SessionUserCollectionFragment[]
  savedCollections: SessionUserSavedCollectionFragment[]
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
  | 'email'
  | 'isPublic'
  | 'legacyId'
  | 'role'
> & {
  image: {
    id: string
    altText: string | null
  } | null
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
