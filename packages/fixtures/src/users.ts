import { givenUser } from '@app/fixtures/givenUser'
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

export const teamAdministrateurs = [
  givenUser({
    id: 'a5f96926-2d58-47c1-8bdd-1cffc9cd5fc7',
    slug: 'hugues-maignol',
    firstName: 'Hugues',
    lastName: 'Maignol',
    email: 'hugues.maignol@beta.gouv.fr',
    role: 'Admin',
  }),
  givenUser({
    id: '0e202fb4-3810-4137-a987-7ef336462633',
    slug: 'marc-gavanier',
    firstName: 'Marc',
    lastName: 'Gavanier',
    email: 'marc.gavanier@beta.gouv.fr',
    role: 'Admin',
  }),
  givenUser({
    id: 'b4fb9d07-7ff2-4ad5-93f1-23ef4437b4e6',
    slug: 'thibault-rouveyrol',
    firstName: 'Thibault',
    lastName: 'Rouveyrol',
    email: 'thibault.rouveyrol@beta.gouv.fr',
    role: 'Admin',
  }),
  givenUser({
    id: 'acce6659-30a8-4f28-b4c6-1f82578843ae',
    slug: 'manon-galle',
    firstName: 'Manon',
    lastName: 'Galle',
    email: 'manon.galle@anct.gouv.fr',
    role: 'Admin',
  }),
  givenUser({
    id: 'b194a4ca-6762-4e33-84d9-c5122ed9ecc3',
    slug: 'sylvain-aubry',
    email: 'sylvain.aubry@beta.gouv.fr',
    firstName: 'Sylvain',
    lastName: 'Aubry',
    role: 'Admin',
  }),
  givenUser({
    id: '268a8a1f-cf26-40e0-899d-854ec47df169',
    slug: 'kevin-gallet-1',
    firstName: 'Kévin',
    lastName: 'Gallet',
    email: 'kevin.gallet@ext.anct.gouv.fr',
    role: 'Admin',
  }),
] satisfies Prisma.UserCreateInput[]
