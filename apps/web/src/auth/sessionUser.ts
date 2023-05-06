import { Base, User } from '@prisma/client'

// Serializable user interface
export type SessionUser = Pick<
  User,
  'id' | 'firstName' | 'lastName' | 'name' | 'email' | 'isPublic' | 'legacyId'
> & {
  emailVerified: string | null
  created: string | null
  updated: string | null
  ownedBases: Pick<Base, 'slug' | 'title' | 'id' | 'isPublic'>[]
}
