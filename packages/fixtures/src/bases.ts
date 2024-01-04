import type { Prisma } from '@prisma/client'

export const baseConseillerNumerique = {
  id: 'cb08cddb-1657-49ac-a2f9-d9212b428690',
  title: 'Conseiller numérique France Services - contributions',
  slug: 'conseiller-numérique-france-services-contributions',
  titleDuplicationCheckSlug:
    'conseiller-numérique-france-services-contributions',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas cursus ante non laoreet dictum. Sed tempus ultrices arcu ut auctor. Phasellus porta sapien varius dapibus porttitor. Fusce porttitor molestie nisi, a maximus augue tempus a. Praesent ut dictum risus. Mauris hendrerit luctus massa. Aenean felis turpis, facilisis eget porttitor at, tempor ut quam.',
  ownerId: 'eecac657-f415-47e1-8087-c4508ea16191',
  email: 'contact@la-base.fr',
  emailIsPublic: true,
} satisfies Prisma.BaseCreateManyInput

export const baseChansonFrancaise = {
  id: '1e6679e3-64e5-4ae8-a34c-8f43af7eb999',
  title: 'Chanson française',
  slug: 'chanson-francaise',
  titleDuplicationCheckSlug: 'chanson-francaise',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas cursus ante non laoreet dictum. Sed tempus ultrices arcu ut auctor. Phasellus porta sapien varius dapibus porttitor. Fusce porttitor molestie nisi, a maximus augue tempus a. Praesent ut dictum risus. Mauris hendrerit luctus massa. Aenean felis turpis, facilisis eget porttitor at, tempor ut quam.',
  ownerId: 'f1826416-af31-402c-9d92-379d4ea7509e',
  isPublic: true,
  email: 'contact@la-base.fr',
  emailIsPublic: false,
} satisfies Prisma.BaseCreateManyInput

export const baseMesFutursHits = {
  id: '1bf8c6f3-4628-407d-adce-408de1cda60f',
  title: 'Mes futurs hits',
  slug: 'mes-futurs-hits',
  titleDuplicationCheckSlug: 'mes-futurs-hits',
  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas cursus ante non laoreet dictum. Sed tempus ultrices arcu ut auctor. Phasellus porta sapien varius dapibus porttitor. Fusce porttitor molestie nisi, a maximus augue tempus a. Praesent ut dictum risus. Mauris hendrerit luctus massa. Aenean felis turpis, facilisis eget porttitor at, tempor ut quam.',
  ownerId: 'f1826416-af31-402c-9d92-379d4ea7509e',
  isPublic: false,
  email: 'contact@la-base.fr',
  emailIsPublic: true,
} satisfies Prisma.BaseCreateManyInput

export const bases = [
  baseConseillerNumerique,
  baseChansonFrancaise,
  baseMesFutursHits,
]
