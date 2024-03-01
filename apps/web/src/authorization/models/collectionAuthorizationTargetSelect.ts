import type { Prisma } from '@prisma/client'

export const collectionAuthorizationTargetSelect = {
  id: true,
  isPublic: true,
  createdById: true,
  deleted: true,
  baseId: true,
} satisfies Prisma.CollectionSelect
