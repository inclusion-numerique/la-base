import { faker } from '@faker-js/faker'
import { prismaClient } from '@app/web/prismaClient'

const BASE_NUMBER = 10

export const ressources: (
  random?: number,
) => Exclude<
  Parameters<typeof prismaClient.ressource.createMany>[0],
  undefined
>['data'] = (random) => {
  if (random) {
    return Array.from({ length: random * BASE_NUMBER }, () => {
      const text = faker.lorem.text()
      return {
        title: text,
        slug: text.replaceAll(' ', '-').toLowerCase(),
      }
    })
  }
  return [
    {
      id: 'ebb35a9a-e3f9-4622-ad60-d71f81d95ebd',
      title:
        '10 raisons de venir sur la base, la deuxième va vous laisser sans voix !',
      slug: '10-raisons-de-venir-sur-la-base-la-deuxième-va-vous-laisser-sans-voix',
    },
    {
      id: '35eef26e-cc63-4adb-a761-eb44cef48361',
      title: "Tester c'est pour les devs qui écrivent des bugs...",
      slug: 'tester-c-est-pour-les-devs-qui-écrivent-des-bugs',
    },
  ]
}

export const cleanRessources = async () => {
  await prismaClient.ressource.deleteMany()
  await prismaClient.ressource.createMany({ data: ressources() })
}
