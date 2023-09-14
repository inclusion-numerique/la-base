import { v4 } from 'uuid'
import { SessionUser } from '../auth/sessionUser'
import { BasePageData } from '../server/bases/getBase'
import { Resource } from '../server/resources/getResource'

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

export const createTestResource = (
  owner: SessionUser,
  isPublic?: boolean,
  base?: BasePageData,
) =>
  ({
    id: v4(),
    legacyId: 123,
    title:
      'Titre d’une ressource sur deux ligne très longues comme comme sur deux lignes',
    slug: 'titre-d-une-ressource-sur-deux-ligne-très-longues-comme-comme-sur-deux-lignes',
    created: new Date('2023-09-14'),
    updated: new Date('2023-09-14'),
    published: new Date('2023-09-14'),
    description:
      'Lorem Ipsul Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum quam mauris sit lacinia turpis sed vitae vel. Venenatis in in neque interdum nec facilisi mauris nunc vitae...',
    isPublic: isPublic || false,
    imageId: null,
    image: null,
    createdBy: {
      name: owner.name,
      id: owner.id,
    },
    createdById: owner.id,
    baseId: base ? base.id : null,
    base: base
      ? {
          id: base.id,
          title: base.title,
          slug: base.slug,
          isPublic: base.isPublic,
        }
      : null,
    themes: ['theme-1'],
    supportTypes: ['support-1'],
    targetAudiences: ['target-1'],
    contents: [],
  } satisfies Resource)

export const createTestBase = (
  owner: SessionUser,
  isPublic: boolean,
  admins: SessionUser[],
  members: SessionUser[],
) => {
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
    members: [
      ...admins.map((admin) => ({
        baseId: id,
        member: { id: admin.id, name: admin.name },
        isAdmin: true,
      })),
      ...members.map((member) => ({
        baseId: id,
        member: { id: member.id, name: member.name },
        isAdmin: false,
      })),
    ],
  } satisfies BasePageData
  return {
    ...base,
    resources: [
      createTestResource(owner, true, base),
      createTestResource(owner, true, base),
    ],
  }
}
