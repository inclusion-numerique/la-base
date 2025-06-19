import { baseFixtureAvecTout, baseFixtureVide } from '@app/fixtures/bases'
import { jmAvecTout } from '@app/fixtures/users'
import type { Prisma } from '@prisma/client'

export const baseMembers = [
  {
    id: 'e9a5c703-3e1a-4dbb-af8c-6c3a8b9a2f7d',
    memberId: jmAvecTout.id,
    baseId: baseFixtureAvecTout.id,
    isAdmin: true,
    accepted: new Date(),
  },
  {
    id: 'd6f8a2e7-9c3b-4a45-bd82-1e6d0f7c84a9',
    memberId: jmAvecTout.id,
    baseId: baseFixtureVide.id,
    isAdmin: true,
    accepted: new Date(),
  },
] satisfies Prisma.BaseMembersCreateManyInput[]
