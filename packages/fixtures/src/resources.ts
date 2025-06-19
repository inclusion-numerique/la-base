import { baseFixtureAvecTout } from '@app/fixtures/bases'
import { jmAvecTout } from '@app/fixtures/users'
import { generateResourceExcerpt } from '@app/web/resources/resourceExcerpt'
import { ResourceCreatedDataV1 } from '@app/web/server/resources/feature/CreateResource'
import type { Prisma } from '@prisma/client'

const resourcePubliqueDansBaseConstant = {
  id: 'd4c3a9c8-01e4-4e46-a3f4-8dab0a3723b2',
  title:
    'Ressource publique dans une base avec un titre sur deux ligne très longues comme comme sur deux lignes',
  slug: 'ressource-publique-dans-une-base-avec-un-titre-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
  titleDuplicationCheckSlug:
    'ressource-publique-dans-une-base-avec-un-titre-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
  description:
    'Lorem Ipsul Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum quam mauris sit lacinia turpis sed vitae vel. Venenatis in in neque interdum nec facilisi mauris nunc vitae...',
}

const resourcePriveeDansBaseConstant = {
  id: 'ebb35a9a-e3f9-4622-ad60-d71f81d95ebd',
  title:
    'Ressource privée dans une base avec un titre sur deux ligne très longues comme comme sur deux lignes',
  slug: 'ressource-privee-dans-une-base-avec-un-titre-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
  titleDuplicationCheckSlug:
    'ressource-privee-dans-une-base-avec-un-titre-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
  description:
    'Lorem Ipsul Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum quam mauris sit lacinia turpis sed vitae vel. Venenatis in in neque interdum nec facilisi mauris nunc vitae...',
}

const resourceBrouillonDansBaseConstant = {
  id: '35eef26e-cc63-4adb-a761-eb44cef48361',
  title:
    'Ressource brouillon dans une base avec un titre sur deux ligne très longues comme comme sur deux lignes',
  slug: 'ressource-brouillon-dans-une-base-avec-un-titre-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
  titleDuplicationCheckSlug:
    'ressource-brouillon-dans-une-base-avec-un-titre-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
  description:
    'Lorem Ipsul Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum quam mauris sit lacinia turpis sed vitae vel. Venenatis in in neque interdum nec facilisi mauris nunc vitae...',
}

const resourcePubliqueDansProfilConstant = {
  id: 'ff179fd3-1686-4361-adc8-85074b4fbaa2',
  title:
    'Ressource publique dans un profil avec un titre sur deux ligne très longues comme comme sur deux lignes',
  slug: 'ressource-publique-dans-un-profil-avec-un-titre-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
  titleDuplicationCheckSlug:
    'ressource-publique-dans-un-profil-avec-un-titre-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
  description:
    'Lorem Ipsul Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum quam mauris sit lacinia turpis sed vitae vel. Venenatis in in neque interdum nec facilisi mauris nunc vitae...',
}

const resourcePriveeDansProfilConstant = {
  id: '8c9e35d2-72d4-4f2f-89b8-d4482e02a42a',
  title:
    'Ressource privée dans un profil avec un titre sur deux ligne très longues comme comme sur deux lignes',
  slug: 'ressource-privee-dans-un-profil-avec-un-titre-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
  titleDuplicationCheckSlug:
    'ressource-privee-dans-un-profil-avec-un-titre-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
  description:
    'Lorem Ipsul Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum quam mauris sit lacinia turpis sed vitae vel. Venenatis in in neque interdum nec facilisi mauris nunc vitae...',
}

// same for resourceBrouillonDansProfilConstant
const resourceBrouillonDansProfilConstant = {
  id: '3f90aecd-7e43-4ac8-9b36-2e4fd71cb6d7',
  title:
    'Ressource brouillon dans un profil avec un titre sur deux ligne très longues comme comme sur deux lignes',
  slug: 'ressource-brouillon-dans-un-profil-avec-un-titre-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
  titleDuplicationCheckSlug:
    'ressource-brouillon-dans-un-profil-avec-un-titre-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
  description:
    'Lorem Ipsul Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum quam mauris sit lacinia turpis sed vitae vel. Venenatis in in neque interdum nec facilisi mauris nunc vitae...',
}

export const resourcePubliqueDansBase = {
  id: resourcePubliqueDansBaseConstant.id,
  title: resourcePubliqueDansBaseConstant.title,
  slug: resourcePubliqueDansBaseConstant.slug,
  titleDuplicationCheckSlug:
    resourcePubliqueDansBaseConstant.titleDuplicationCheckSlug,
  description: resourcePubliqueDansBaseConstant.description,
  excerpt: generateResourceExcerpt(
    resourcePubliqueDansBaseConstant.description,
  ),
  createdBy: {
    connect: {
      id: jmAvecTout.id,
    },
  },
  base: {
    connect: {
      id: baseFixtureAvecTout.id,
    },
  },
  isPublic: true,
  events: {
    connectOrCreate: {
      where: {
        id: 'cf501b49-6581-49a2-be24-fa3d59b88a6e',
      },
      create: {
        id: 'cf501b49-6581-49a2-be24-fa3d59b88a6e',
        byId: jmAvecTout.id,
        type: 'Created',
        timestamp: new Date('2021-01-01T00:00:00.000Z'),
        data: {
          __version: 1,
          byId: jmAvecTout.id,
          title: resourcePubliqueDansBaseConstant.title,
          description: resourcePubliqueDansBaseConstant.description,
          slug: resourcePubliqueDansBaseConstant.slug,
          titleDuplicationCheckSlug:
            resourcePubliqueDansBaseConstant.titleDuplicationCheckSlug,
          baseId: baseFixtureAvecTout.id,
          id: resourcePubliqueDansBaseConstant.id,
        } satisfies ResourceCreatedDataV1,
      },
    },
  },
} satisfies Prisma.ResourceCreateInput

export const resourcePriveeDansBase = {
  id: resourcePriveeDansBaseConstant.id,
  title: resourcePriveeDansBaseConstant.title,
  slug: resourcePriveeDansBaseConstant.slug,
  titleDuplicationCheckSlug:
    resourcePriveeDansBaseConstant.titleDuplicationCheckSlug,
  description: resourcePriveeDansBaseConstant.description,
  excerpt: generateResourceExcerpt(resourcePriveeDansBaseConstant.description),
  createdBy: {
    connect: {
      id: jmAvecTout.id,
    },
  },
  base: {
    connect: {
      id: baseFixtureAvecTout.id,
    },
  },
  isPublic: false,

  events: {
    connectOrCreate: {
      where: {
        id: '0e4fefb6-baef-4b34-a95b-af93375d3179',
      },
      create: {
        id: '0e4fefb6-baef-4b34-a95b-af93375d3179',
        byId: jmAvecTout.id,
        type: 'Created',
        timestamp: new Date('2021-01-01T00:00:00.000Z'),
        data: {
          __version: 1,
          byId: jmAvecTout.id,
          title: resourcePriveeDansBaseConstant.title,
          description: resourcePriveeDansBaseConstant.description,
          slug: resourcePriveeDansBaseConstant.slug,
          titleDuplicationCheckSlug:
            resourcePriveeDansBaseConstant.titleDuplicationCheckSlug,
          baseId: baseFixtureAvecTout.id,
          id: resourcePriveeDansBaseConstant.id,
        } satisfies ResourceCreatedDataV1,
      },
    },
  },
} satisfies Prisma.ResourceCreateInput

export const resourceBrouillonDansBase = {
  id: resourceBrouillonDansBaseConstant.id,
  title: resourceBrouillonDansBaseConstant.title,
  slug: resourceBrouillonDansBaseConstant.slug,
  titleDuplicationCheckSlug:
    resourceBrouillonDansBaseConstant.titleDuplicationCheckSlug,
  description: resourceBrouillonDansBaseConstant.description,
  excerpt: generateResourceExcerpt(
    resourceBrouillonDansBaseConstant.description,
  ),
  createdBy: {
    connect: {
      id: jmAvecTout.id,
    },
  },
  base: {
    connect: {
      id: baseFixtureAvecTout.id,
    },
  },
  events: {
    connectOrCreate: {
      where: {
        id: 'ad6f2e35-1269-4887-88e2-37ad29800a18',
      },
      create: {
        id: 'ad6f2e35-1269-4887-88e2-37ad29800a18',
        byId: jmAvecTout.id,
        type: 'Created',
        timestamp: new Date('2021-01-01T00:00:00.000Z'),
        data: {
          __version: 1,
          byId: jmAvecTout.id,
          title: resourceBrouillonDansBaseConstant.title,
          description: resourceBrouillonDansBaseConstant.description,
          slug: resourceBrouillonDansBaseConstant.slug,
          titleDuplicationCheckSlug:
            resourceBrouillonDansBaseConstant.titleDuplicationCheckSlug,
          baseId: baseFixtureAvecTout.id,
          id: resourceBrouillonDansBaseConstant.id,
        } satisfies ResourceCreatedDataV1,
      },
    },
  },
} satisfies Prisma.ResourceCreateInput

export const resourcePubliqueDansProfil = {
  id: resourcePubliqueDansProfilConstant.id,
  title: resourcePubliqueDansProfilConstant.title,
  slug: resourcePubliqueDansProfilConstant.slug,
  titleDuplicationCheckSlug:
    resourcePubliqueDansProfilConstant.titleDuplicationCheckSlug,
  description: resourcePubliqueDansProfilConstant.description,
  excerpt: generateResourceExcerpt(
    resourcePubliqueDansProfilConstant.description,
  ),
  createdBy: {
    connect: {
      id: jmAvecTout.id,
    },
  },
  isPublic: true,

  events: {
    connectOrCreate: {
      where: {
        id: '4f67a21d-8e6a-4fc3-b947-3156e321f23b',
      },
      create: {
        id: '4f67a21d-8e6a-4fc3-b947-3156e321f23b',
        byId: jmAvecTout.id,
        type: 'Created',
        timestamp: new Date('2021-01-01T00:00:00.000Z'),
        data: {
          __version: 1,
          byId: jmAvecTout.id,
          title: resourcePubliqueDansProfilConstant.title,
          description: resourcePubliqueDansProfilConstant.description,
          slug: resourcePubliqueDansProfilConstant.slug,
          titleDuplicationCheckSlug:
            resourcePubliqueDansProfilConstant.titleDuplicationCheckSlug,
          baseId: null,
          id: resourcePubliqueDansProfilConstant.id,
        } satisfies ResourceCreatedDataV1,
      },
    },
  },
} satisfies Prisma.ResourceCreateInput

export const resourcePriveeDansProfil = {
  id: resourcePriveeDansProfilConstant.id,
  title: resourcePriveeDansProfilConstant.title,
  slug: resourcePriveeDansProfilConstant.slug,
  titleDuplicationCheckSlug:
    resourcePriveeDansProfilConstant.titleDuplicationCheckSlug,
  description: resourcePriveeDansProfilConstant.description,
  excerpt: generateResourceExcerpt(
    resourcePriveeDansProfilConstant.description,
  ),
  createdBy: {
    connect: {
      id: jmAvecTout.id,
    },
  },
  isPublic: true,
  events: {
    connectOrCreate: {
      where: {
        id: '6a7b8c9d-1e2f-4a8c-bb12-3d8f9a0e5c81',
      },
      create: {
        id: '6a7b8c9d-1e2f-4a8c-bb12-3d8f9a0e5c81',
        byId: jmAvecTout.id,
        type: 'Created',
        timestamp: new Date('2021-01-01T00:00:00.000Z'),
        data: {
          __version: 1,
          byId: jmAvecTout.id,
          title: resourcePriveeDansProfilConstant.title,
          description: resourcePriveeDansProfilConstant.description,
          slug: resourcePriveeDansProfilConstant.slug,
          titleDuplicationCheckSlug:
            resourcePriveeDansProfilConstant.titleDuplicationCheckSlug,
          baseId: null,
          id: resourcePriveeDansProfilConstant.id,
        } satisfies ResourceCreatedDataV1,
      },
    },
  },
} satisfies Prisma.ResourceCreateInput

export const resourceBrouillonDansProfil = {
  id: resourceBrouillonDansProfilConstant.id,
  title: resourceBrouillonDansProfilConstant.title,
  slug: resourceBrouillonDansProfilConstant.slug,
  titleDuplicationCheckSlug:
    resourceBrouillonDansProfilConstant.titleDuplicationCheckSlug,
  description: resourceBrouillonDansProfilConstant.description,
  excerpt: generateResourceExcerpt(
    resourceBrouillonDansProfilConstant.description,
  ),
  createdBy: {
    connect: {
      id: jmAvecTout.id,
    },
  },
  events: {
    connectOrCreate: {
      where: {
        id: '7b165f63-4e5b-4c1c-9e7c-3d2df9d73564',
      },
      create: {
        id: '7b165f63-4e5b-4c1c-9e7c-3d2df9d73564',
        byId: jmAvecTout.id,
        type: 'Created',
        timestamp: new Date('2021-01-01T00:00:00.000Z'),
        data: {
          __version: 1,
          byId: jmAvecTout.id,
          title: resourceBrouillonDansProfilConstant.title,
          description: resourceBrouillonDansProfilConstant.description,
          slug: resourceBrouillonDansProfilConstant.slug,
          titleDuplicationCheckSlug:
            resourceBrouillonDansProfilConstant.titleDuplicationCheckSlug,
          baseId: null,
          id: resourceBrouillonDansProfilConstant.id,
        } satisfies ResourceCreatedDataV1,
      },
    },
  },
} satisfies Prisma.ResourceCreateInput

export const resources = [
  resourcePubliqueDansBase,
  resourcePriveeDansBase,
  resourceBrouillonDansBase,
  resourcePubliqueDansProfil,
  resourcePriveeDansProfil,
  resourceBrouillonDansProfil,
]
