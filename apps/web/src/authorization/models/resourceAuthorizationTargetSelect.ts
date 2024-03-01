import type { Prisma } from '@prisma/client'

export const resourceAuthorizationTargetSelect = {
  id: true,
  isPublic: true,
  createdById: true,
  deleted: true,
  published: true,
  baseId: true,
} satisfies Prisma.ResourceSelect
