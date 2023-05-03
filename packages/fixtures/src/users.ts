import { faker } from '@faker-js/faker'
import { prismaClient } from '@app/web/prismaClient'

const BASE_NUMBER = 10

export const users: (
  random?: number,
) => Exclude<
  Parameters<typeof prismaClient.user.upsert>[0]['create'],
  undefined
>[] = (random) => {
  if (random) {
    return Array.from({ length: random * BASE_NUMBER }, (_, index) => ({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      name: `${faker.name.firstName()} ${faker.name.lastName()}`,
      email: faker.internet.email(),
      emailVerified: index % 3 ? null : new Date(),
    }))
  }
  return [
    {
      id: '99afd613-9d54-4110-9062-065c627eda8a',
      firstName: 'Edith',
      lastName: 'Piaf',
      name: 'Edith Piaf',
      email: 'edith@piaf.com',
      emailVerified: new Date(),
    },
    {
      id: 'eecac657-f415-47e1-8087-c4508ea16191',
      firstName: 'Georges',
      lastName: 'Moustaki',
      name: 'Georges Moustaki',
      email: 'georges@moustaki.com',
    },
  ]
}
