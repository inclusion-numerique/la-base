import { v4 } from 'uuid'
import { SessionUser } from '../auth/sessionUser'
import { BasePageData } from '../server/bases/getBase'
import { ResourceListItem } from '../server/resources/getResourcesList'

export const createTestUser = (publicProfile?: boolean) =>
  ({
    id: v4(),
    legacyId: null,
    email: `test-${v4()}@example.com`,
    firstName: 'Jean',
    lastName: 'Biche',
    name: 'Jean Biche',
    emailVerified: '2023-04-01',
    isPublic: publicProfile || false,
    created: '2023-04-01',
    updated: '2023-04-01',
    ownedBases: [],
  } satisfies SessionUser)

export const createTestResource = (owner: SessionUser, base: BasePageData) =>
  ({
    id: v4(),
    title:
      'Titre d’une ressource sur deux ligne très longues comme comme sur deux lignes',
    slug: 'titre-d-une-ressource-sur-deux-ligne-très-longues-comme-comme-sur-deux-lignes',
    created: new Date('2023-09-14'),
    updated: new Date('2023-09-14'),
    published: new Date('2023-09-14'),
    description:
      'Lorem Ipsul Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum quam mauris sit lacinia turpis sed vitae vel. Venenatis in in neque interdum nec facilisi mauris nunc vitae...',
    isPublic: true,
    image: null,
    createdBy: {
      name: owner.name,
      id: owner.id,
    },
    base: {
      title: base.title,
      slug: base.slug,
      isPublic: base.isPublic,
    },
  } satisfies ResourceListItem)

export const createTestBase = (owner: SessionUser, isPublic?: boolean) => {
  const id = v4()
  const base = {
    id,
    title: 'Conseiller numérique France Services - contributions',
    slug: 'conseiller-numérique-france-services-contributions',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas cursus ante non laoreet dictum. Sed tempus ultrices arcu ut auctor. Phasellus porta sapien varius dapibus porttitor. Fusce porttitor molestie nisi, a maximus augue tempus a. Praesent ut dictum risus. Mauris hendrerit luctus massa. Aenean felis turpis, facilisis eget porttitor at, tempor ut quam.',
    ownerId: owner.id,
    isPublic: isPublic || false,
    email: 'test@mail.fr',
    emailIsPublic: true,
    department: null,
    website: null,
    linkedin: null,
    facebook: null,
    twitter: null,
    resources: [],
  } satisfies BasePageData
  return {
    ...base,
    resources: [
      createTestResource(owner, base),
      createTestResource(owner, base),
    ],
  }
}
