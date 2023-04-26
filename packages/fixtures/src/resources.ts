import { faker } from '@faker-js/faker'
import { prismaClient } from '@app/web/prismaClient'

const BASE_NUMBER = 10

export const resources: (
  random?: number,
) => Promise<
  Exclude<
    Parameters<typeof prismaClient.resource.createMany>[0],
    undefined
  >['data']
> = async (random) => {
  if (random) {
    const user = await prismaClient.user.findFirst()
    if (!user) {
      return []
    }

    return Array.from({ length: random * BASE_NUMBER }, () => {
      const text = faker.lorem.text()
      return {
        title: text,
        slug: text.replaceAll(' ', '-').toLowerCase(),
        description: faker.lorem.paragraph(),
        createdById: user?.id,
      }
    })
  }
  return [
    {
      id: 'ebb35a9a-e3f9-4622-ad60-d71f81d95ebd',
      title:
        '10 raisons de venir sur la base, la deuxième va vous laisser sans voix !',
      slug: '10-raisons-de-venir-sur-la-base-la-deuxième-va-vous-laisser-sans-voix',
      description: 'TODO...',
      createdById: '99afd613-9d54-4110-9062-065c627eda8a',
    },
    {
      id: '35eef26e-cc63-4adb-a761-eb44cef48361',
      title: "Tester c'est pour les devs qui écrivent des bugs...",
      slug: 'tester-c-est-pour-les-devs-qui-écrivent-des-bugs',
      description: 'TODO...',
      createdById: '99afd613-9d54-4110-9062-065c627eda8a',
    },
  ]
}
