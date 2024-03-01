import type { Prisma } from '@prisma/client'

export const baseAuthorizationTargetSelect = {
  id: true,
  isPublic: true,
  emailIsPublic: true,
  createdById: true,
  deleted: true,
} satisfies Prisma.BaseSelect
