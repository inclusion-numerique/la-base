import { Base, User } from '@prisma/client'

// Serializable user interface
export type SessionUser = Omit<
  User,
  'created' | 'updated' | 'emailVerified'
> & {
  emailVerified: string | null
  created: string | null
  updated: string | null
  ownedBases: Pick<Base, 'slug' | 'title' | 'id'>[]
}
