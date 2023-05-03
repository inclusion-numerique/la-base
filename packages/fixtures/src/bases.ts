import { faker } from '@faker-js/faker'
import { prismaClient } from '@app/web/prismaClient'

const BASE_NUMBER = 10

export const bases: (
  random?: number,
) => Promise<
  Exclude<Parameters<typeof prismaClient.base.upsert>[0]['create'], undefined>[]
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
        ownerId: user?.id,
      }
    })
  }
  return [
    {
      id: 'cb08cddb-1657-49ac-a2f9-d9212b428690',
      title: 'Conseiller numérique France Services - contributions',
      slug: 'conseiller-numérique-france-services-contributions',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas cursus ante non laoreet dictum. Sed tempus ultrices arcu ut auctor. Phasellus porta sapien varius dapibus porttitor. Fusce porttitor molestie nisi, a maximus augue tempus a. Praesent ut dictum risus. Mauris hendrerit luctus massa. Aenean felis turpis, facilisis eget porttitor at, tempor ut quam.',
      ownerId: 'eecac657-f415-47e1-8087-c4508ea16191',
    },
  ]
}
