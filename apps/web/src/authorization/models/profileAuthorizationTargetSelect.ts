import type { Prisma } from '@prisma/client'

export const profileAuthorizationTargetSelect = {
  id: true,
  isPublic: true,
  deleted: true,
  emailIsPublic: true,
} satisfies Prisma.UserSelect
