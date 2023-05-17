import { faker } from '@faker-js/faker'
import { prismaClient } from '@app/web/prismaClient'
import {
  ResourceCreated,
  ResourceCreatedDataV1,
} from '@app/web/server/resources/feature/CreateResource'
import { MutationHistoryResourceEvent } from '@app/web/server/resources/feature/features'
import { createSlug } from '@app/web/utils/createSlug'
import { ContentTypeValues } from '@app/web/utils/prismaEnums'
import { Prisma } from '@prisma/client'

const BASE_NUMBER = 10
const managedTypes = [ContentTypeValues.SectionTitle, ContentTypeValues.Text]

export const resources: Exclude<
  Parameters<typeof prismaClient.resource.upsert>[0]['create'],
  undefined
>[] = [
  {
    id: 'cb08cddb-1657-49ac-a2f9-d9212b428690',
    title:
      'Titre d’une ressource sur deux ligne très longues comme comme sur deux lignes',
    slug: 'titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
    titleDuplicationCheckSlug:
      'titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
    description:
      'Lorem Ipsul Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum quam mauris sit lacinia turpis sed vitae vel. Venenatis in in neque interdum nec facilisi mauris nunc vitae...',
    createdById: '99afd613-9d54-4110-9062-065c627eda8a',
    baseId: 'cb08cddb-1657-49ac-a2f9-d9212b428690',
    events: {
      connectOrCreate: {
        where: {
          id: '7f7f637b-ca0e-4dce-b190-121e7ed579c3',
        },
        create: {
          id: '7f7f637b-ca0e-4dce-b190-121e7ed579c3',
          byId: '99afd613-9d54-4110-9062-065c627eda8a',
          type: 'Created',
          timestamp: new Date('2021-01-01T00:00:00.000Z'),
          data: {
            __version: 1,
            byId: 'cb08cddb-1657-49ac-a2f9-d9212b428690',
            title:
              'Titre d’une ressource sur deux ligne très longues comme comme sur deux lignes',
            description:
              'Lorem Ipsul Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum quam mauris sit lacinia turpis sed vitae vel. Venenatis in in neque interdum nec facilisi mauris nunc vitae...',
            slug: 'titre-d-une-ressource-sur-deux-ligne-tres-longues-comme-comme-sur-deux-lignes',
            baseId: 'cb08cddb-1657-49ac-a2f9-d9212b428690',
            id: 'cb08cddb-1657-49ac-a2f9-d9212b428690',
          } satisfies ResourceCreatedDataV1,
        },
      },
    },
  },
  {
    id: 'ebb35a9a-e3f9-4622-ad60-d71f81d95ebd',
    title:
      '10 raisons de venir sur la base, la deuxième va vous laisser sans voix !',
    slug: '10-raisons-de-venir-sur-la-base-la-deuxième-va-vous-laisser-sans-voix',
    titleDuplicationCheckSlug:
      '10-raisons-de-venir-sur-la-base-la-deuxième-va-vous-laisser-sans-voix',
    description: 'TODO...',
    createdById: 'eecac657-f415-47e1-8087-c4508ea16191',
    events: {
      connectOrCreate: {
        where: {
          id: '0e4fefb6-baef-4b34-a95b-af93375d3179',
        },
        create: {
          id: '0e4fefb6-baef-4b34-a95b-af93375d3179',
          byId: 'eecac657-f415-47e1-8087-c4508ea16191',
          type: 'Created',
          timestamp: new Date('2021-01-01T00:00:00.000Z'),
          data: {
            __version: 1,
            id: 'ebb35a9a-e3f9-4622-ad60-d71f81d95ebd',
            byId: 'cb08cddb-1657-49ac-a2f9-d9212b428690',
            title:
              '10 raisons de venir sur la base, la deuxième va vous laisser sans voix !',
            description: 'TODO...',
            slug: '10-raisons-de-venir-sur-la-base-la-deuxième-va-vous-laisser-sans-voix',
            baseId: null,
          } satisfies ResourceCreatedDataV1,
        },
      },
    },
  },
  {
    id: '35eef26e-cc63-4adb-a761-eb44cef48361',
    title: "Tester c'est pour les devs qui écrivent des bugs...",
    slug: 'tester-c-est-pour-les-devs-qui-écrivent-des-bugs',
    titleDuplicationCheckSlug:
      'tester-c-est-pour-les-devs-qui-écrivent-des-bugs',
    description: 'TODO...',
    createdById: 'eecac657-f415-47e1-8087-c4508ea16191',
    events: {
      connectOrCreate: {
        where: {
          id: 'ad6f2e35-1269-4887-88e2-37ad29800a18',
        },
        create: {
          id: 'ad6f2e35-1269-4887-88e2-37ad29800a18',
          byId: 'eecac657-f415-47e1-8087-c4508ea16191',
          type: 'Created',
          timestamp: new Date('2021-01-01T00:00:00.000Z'),
          data: {
            __version: 1,
            id: '35eef26e-cc63-4adb-a761-eb44cef48361',
            byId: 'cb08cddb-1657-49ac-a2f9-d9212b428690',
            title:
              '10 raisons de venir sur la base, la deuxième va vous laisser sans voix !',
            description: 'TODO...',
            slug: '10-raisons-de-venir-sur-la-base-la-deuxième-va-vous-laisser-sans-voix',
            baseId: null,
          } satisfies ResourceCreatedDataV1,
        },
      },
    },
  },
]

const getRandomResourceContentEvent = (id: string, type: ContentTypeValues) => {
  switch (type) {
    case 'SectionTitle': {
      return {
        id,
        __version: 1 as const,
        title: faker.lorem.words({ min: 2, max: 10 }),
      }
    }
    case 'Text': {
      return {
        id,
        __version: 1 as const,
        text: faker.lorem.words({ min: 2, max: 10 }),
      }
    }
    default: {
      throw new Error('Type not managed yet')
    }
  }
}

export const randomResourcesEvents: (
  transaction: Prisma.TransactionClient,
  random: number,
) => Promise<
  [
    ResourceCreated & { resourceId: string },
    ...(MutationHistoryResourceEvent & { resourceId: string })[],
  ][]
> = async (transaction, random) => {
  const user = await transaction.user.findFirst()
  if (!user) {
    return []
  }

  const bases = await transaction.base.findMany({
    select: { id: true },
  })

  return Array.from({ length: random * BASE_NUMBER }).map(() => {
    const creationDate = faker.date.past()
    const title = faker.lorem.words({ min: 2, max: 10 })
    const description = faker.lorem.paragraph()
    const slug = createSlug(title)
    const resourceId = faker.string.uuid()

    const baseChangedEvents = Array.from({
      length: random * Math.random() * 5,
    }).map(() => ({
      id: faker.string.uuid(),
      resourceId,
      byId: user.id,
      type: 'BaseChanged' as const,
      timestamp: faker.date.between({ from: creationDate, to: new Date() }),
      data: {
        __version: 1 as const,
        baseId: faker.helpers.arrayElement(bases).id,
      },
    }))

    const titleAndDescriptionEditedEvents = Array.from({
      length: random * Math.random() * 5,
    }).map(() => ({
      id: faker.string.uuid(),
      resourceId,
      byId: user.id,
      type: 'TitleAndDescriptionEdited' as const,
      timestamp: faker.date.between({ from: creationDate, to: new Date() }),
      data: {
        __version: 1 as const,
        title: faker.lorem.words({ min: 2, max: 10 }),
        description: faker.lorem.paragraph(),
      },
    }))

    const contentsEvents = Array.from(
      { length: Math.random() * 10 * random },
      () => {
        const type = faker.helpers.arrayElement(managedTypes)
        const contentId = faker.string.uuid()
        const contentCreationDate = faker.date.between({
          from: creationDate,
          to: new Date(),
        })

        const editionEvents = Array.from(
          { length: Math.random() * 2 * random },
          () => ({
            id: faker.string.uuid(),
            resourceId,
            byId: user.id,
            type: 'ContentEdited' as const,
            timestamp: faker.date.between({
              from: contentCreationDate,
              to: new Date(),
            }),
            data: getRandomResourceContentEvent(contentId, type),
          }),
        )

        return [
          {
            id: faker.string.uuid(),
            resourceId,
            byId: user.id,
            type: 'ContentAdded' as const,
            timestamp: contentCreationDate,
            data: { ...getRandomResourceContentEvent(contentId, type), type },
          },
          ...editionEvents,
        ]
      },
    )

    return [
      {
        id: faker.string.uuid(),
        resourceId,
        byId: user.id,
        type: 'Created' as const,
        timestamp: creationDate,
        data: {
          __version: 1 as const,
          id: resourceId,
          byId: user.id,
          title,
          description,
          slug,
          baseId: null,
        } satisfies ResourceCreatedDataV1,
      },
      ...baseChangedEvents,
      ...titleAndDescriptionEditedEvents,
      ...contentsEvents.flat(),
    ]
  })
}
