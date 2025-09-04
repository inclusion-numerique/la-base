import { currentCguVersion } from '@app/web/features/cgu/currentCguVersion'
import { generateResourceExcerpt } from '@app/web/resources/resourceExcerpt'
import type { ProfilePageData } from '@app/web/server/profiles/getProfile'
import type { Resource } from '@app/web/server/resources/getResource'
import { ResourceLicence } from '@prisma/client'
import { v4 } from 'uuid'
import type { SessionUser } from '../auth/sessionUser'
import type { BasePageData } from '../server/bases/getBase'

export const createTestUser = (publicProfile?: boolean) =>
  ({
    id: v4(),
    legacyId: null,
    email: `test-${v4()}@example.com`,
    firstName: 'Jean',
    lastName: 'Biche',
    slug: 'jean-biche',
    name: 'Jean Biche',
    role: 'User',
    image: null,
    emailVerified: '2023-04-01',
    isPublic: publicProfile || false,
    created: '2023-04-01',
    updated: '2023-04-01',
    hasSeenV2Onboarding: null,
    ownedBases: [],
    bases: [],
    createdResources: [],
    resources: [],
    collections: [],
    lastCguAcceptedAt: new Date('2023-01-01').toISOString(),
    cguVersion: currentCguVersion,
  }) satisfies SessionUser

export const createTestProfile = (publicProfile?: boolean) =>
  ({
    id: v4(),
    email: `test-${v4()}@example.com`,
    emailIsPublic: true,
    firstName: 'Jean',
    lastName: 'Biche',
    department: '10',
    description: "C'est Jean Biche",
    website: 'https://jean.biche.com',
    facebook: 'https://www.facebook.com/jean.biche',
    twitter: 'https://twitter.com/JBiche',
    linkedin: 'https://www.linkedin.com/in/jean-biche',
    name: 'Jean Biche',
    slug: 'jean-biche',
    image: null,
    isPublic: publicProfile || false,
    followedBy: [],
    followedByData: {
      counts: {
        total: 0,
        public: 0,
        private: 0,
      },
      followedBy: [],
    },
    _count: {
      followedBy: 0,
    },
    deleted: null,
  }) satisfies ProfilePageData

export const testResourceDescription =
  "A Love Supreme est un album-concept de John Coltrane enregistré en 1964. Il est considéré comme un album majeur du jazz, l'un de ses plus grands chefs-d’œuvre, l'un des plus connus et des plus accessibles.\n" +
  ' ' +
  "Il s'agit d'une composition en quatre mouvements enregistrée en une seule séance le 9 décembre 19641 au studio de Rudy Van Gelder (Englewood Cliffs, New Jersey, USA) et produit par Bob Thiele pour le label Impulse!. L'album fait suite à Crescent, enregistré la même année, plus contemplatif mais qui déjà amorçait un virage dans la carrière de Coltrane." +
  ' ' +
  "Le quartet mythique de Coltrane, alors en pleine maturité, était sur le chemin d'une inéluctable séparation2. Deux autres versions de Acknowledgement ont été enregistrées le lendemain (le 10 décembre 1964) avec le saxophoniste ténor Archie Shepp et le bassiste Art Davis. L'unique version enregistrée en direct de la suite A Love Supreme date du 26 juillet 1965 lors du festival d'Antibes, et a été publiée officiellement par Impulse! avec l'album original3."

export const createTestResource = (
  createdBy: SessionUser,
  isPublic?: boolean,
  base?: BasePageData,
  contributor?: SessionUser,
) =>
  ({
    id: v4(),
    legacyId: 123,
    title:
      'Titre d’une ressource sur deux ligne très longues comme comme sur deux lignes',
    slug: 'titre-d-une-ressource-sur-deux-ligne-très-longues-comme-comme-sur-deux-lignes',
    licence: ResourceLicence.ETALAB_2_0,
    created: new Date('2023-09-14'),
    updated: new Date('2023-09-14'),
    published: new Date('2023-09-14'),
    deleted: null,
    lastPublished: new Date('2023-09-14'),
    description: testResourceDescription,
    excerpt: generateResourceExcerpt(testResourceDescription),
    isPublic: isPublic || false,
    imageId: null,
    image: null,
    createdBy: {
      email: createdBy.email,
      isPublic: createdBy.isPublic,
      name: createdBy.name,
      id: createdBy.id,
      slug: createdBy.slug,
      lastName: createdBy.lastName,
      firstName: createdBy.firstName,
      image: null,
    },
    createdById: createdBy.id,
    baseId: base ? base.id : null,
    collections: [],
    collectionsData: {
      counts: {
        total: 0,
        public: 0,
        private: 0,
        visible: 0,
      },
      visible: [],
    },
    base: base
      ? {
          id: base.id,
          title: base.title,
          slug: base.slug,
          isPublic: base.isPublic,
          members: base.members,
          image: null,
        }
      : null,
    themes: ['Accessibilite'],
    resourceTypes: ['Article'],
    beneficiaries: [],
    professionalSectors: ['ActeursPublics'],
    contents: [],
    contributors: contributor
      ? [
          {
            contributorId: contributor.id,
          },
        ]
      : [],
    viewsCount: 4,
    _count: {
      collections: 2,
      resourceFeedback: 0,
    },
    resourceFeedback: [],
    feedbackAverage: 0,
    feedbackCount: {
      notRecommended: 0,
      moderatelyRecommended: 0,
      recommended: 0,
      highlyRecommended: 0,
    },
    publicFeedback: true,
  }) satisfies Resource | BasePageData['resources'][number]

export const createTestBase = (
  createdBy: SessionUser,
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
    deleted: null,
    createdById: createdBy.id,
    createdBy: { id: createdBy.id, slug: createdBy.slug },
    isPublic: isPublic || false,
    email: 'test@mail.fr',
    emailIsPublic: true,
    department: null,
    website: null,
    linkedin: null,
    facebook: null,
    twitter: null,
    resources: [],
    image: null,
    coverImage: null,
    collections: [],
    followedBy: [],
    followedByData: {
      counts: {
        total: 0,
        public: 0,
        private: 0,
        visible: 0,
      },
      visible: [],
    },
    members: [
      ...admins.map((admin) => ({
        baseId: id,
        memberId: admin.id,
        member: {
          email: admin.email,
          id: admin.id,
          slug: admin.slug,
          name: admin.name,
          firstName: admin.firstName,
          lastName: admin.lastName,
          image: null,
          followedBy: [],
          _count: {
            followedBy: 0,
          },
          resourceEvent: [],
          createdResources: [],
          resources: [],
        },
        accepted: new Date(),
        isAdmin: true,
      })),
      ...members.map((member) => ({
        baseId: id,
        memberId: member.id,
        member: {
          id: member.id,
          slug: member.slug,
          name: member.name,
          firstName: member.firstName,
          lastName: member.lastName,
          email: member.email,
          image: null,
          followedBy: [],
          _count: {
            followedBy: 0,
          },
          resourceEvent: [],
          createdResources: [],
          resources: [],
        },
        accepted: new Date(),
        isAdmin: false,
      })),
    ],
    _count: {
      followedBy: 0,
      resources: 2,
      resourcesViews: 2,
    },
  } satisfies BasePageData
  return {
    ...base,
    resources: [
      createTestResource(createdBy, true, base),
      createTestResource(createdBy, true, base),
    ],
  } satisfies BasePageData
}
