import type { Prisma } from '@prisma/client'

export const jmSansRien = {
  id: '99afd613-9d54-4110-9062-065c627eda8a',
  firstName: 'Jean-Michel',
  lastName: 'Sans Rien',
  name: 'Jean-Michel Sans Rien',
  slug: 'jean-michel-sans-rien',
  email: 'user.les.bases+sans+rien@gmail.com',
  emailVerified: new Date(),
  isPublic: true,
} satisfies Prisma.UserCreateManyInput

export const jmAvecTout = {
  id: 'f1826416-af31-402c-9d92-379d4ea7509e',
  firstName: 'Jean-Michel',
  lastName: 'Avec Tout',
  name: 'Jean-Michel Avec Tout',
  slug: 'jean-michel-avec-tout',
  email: 'user.les.bases+avec+tout@gmail.com',
  emailVerified: new Date(),
} satisfies Prisma.UserCreateManyInput

export const fixtureUsers = [jmAvecTout, jmSansRien]
