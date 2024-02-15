import type { Prisma } from '@prisma/client'

export const baseFixtureVide = {
  id: 'cb08cddb-1657-49ac-a2f9-d9212b428690',
  title: 'Base fixture vide',
  slug: 'base-fixture-vide',
  titleDuplicationCheckSlug: 'base-fixture-vide',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas cursus ante non laoreet dictum. Sed tempus ultrices arcu ut auctor. Phasellus porta sapien varius dapibus porttitor. Fusce porttitor molestie nisi, a maximus augue tempus a. Praesent ut dictum risus. Mauris hendrerit luctus massa. Aenean felis turpis, facilisis eget porttitor at, tempor ut quam.',
  createdById: 'f1826416-af31-402c-9d92-379d4ea7509e',
  email: 'user.les.bases+avec+tout@gmail.com',
  emailIsPublic: true,
  isPublic: true,
} satisfies Prisma.BaseCreateManyInput

export const baseFixtureAvecTout = {
  id: '1bf8c6f3-4628-407d-adce-408de1cda60f',
  title: 'Base fixture avec tout',
  slug: 'base-fixture-avec-tout',
  titleDuplicationCheckSlug: 'base-fixture-avec-tout',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas cursus ante non laoreet dictum. Sed tempus ultrices arcu ut auctor. Phasellus porta sapien varius dapibus porttitor. Fusce porttitor molestie nisi, a maximus augue tempus a. Praesent ut dictum risus. Mauris hendrerit luctus massa. Aenean felis turpis, facilisis eget porttitor at, tempor ut quam.',
  createdById: 'f1826416-af31-402c-9d92-379d4ea7509e',
  isPublic: true,
  email: 'user.les.bases+avec+tout@gmail.com',
  emailIsPublic: true,
} satisfies Prisma.BaseCreateManyInput

export const bases = [baseFixtureVide, baseFixtureAvecTout]
