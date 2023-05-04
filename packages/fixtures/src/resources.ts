import { faker } from '@faker-js/faker'
import { prismaClient } from '@app/web/prismaClient'
import { createSlug } from '@app/web/utils/createSlug'

const BASE_NUMBER = 10

export const resources: (
  random?: number,
) => Promise<
  Exclude<
    Parameters<typeof prismaClient.resource.upsert>[0]['create'],
    undefined
  >[]
> = async (random) => {
  if (random) {
    const user = await prismaClient.user.findFirst()
    if (!user) {
      return []
    }

    return Array.from({ length: random * BASE_NUMBER }, () => {
      const text = faker.lorem.text()
      const slug = createSlug(text)
      return {
        title: text,
        slug,
        titleDuplicationCheckSlug: slug,
        description: faker.lorem.paragraph(),
        createdById: user?.id,
      }
    })
  }
  return [
    {
      id: 'cb08cddb-1657-49ac-a2f9-d9212b428690',
      title:
        'Titre d’une ressource sur deux ligne très longues comme comme sur deux lignes',
      slug: 'titre-d-une-ressource-sur-deux-ligne-très-longues-comme-comme-sur-deux-lignes',
      description:
        'Lorem Ipsul Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum quam mauris sit lacinia turpis sed vitae vel. Venenatis in in neque interdum nec facilisi mauris nunc vitae...',
      createdById: '99afd613-9d54-4110-9062-065c627eda8a',
      baseId: 'cb08cddb-1657-49ac-a2f9-d9212b428690',
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
    },
    {
      id: '35eef26e-cc63-4adb-a761-eb44cef48361',
      title: "Tester c'est pour les devs qui écrivent des bugs...",
      slug: 'tester-c-est-pour-les-devs-qui-écrivent-des-bugs',
      titleDuplicationCheckSlug:
        'tester-c-est-pour-les-devs-qui-écrivent-des-bugs',
      description: 'TODO...',
      createdById: 'eecac657-f415-47e1-8087-c4508ea16191',
    },
  ]
}
