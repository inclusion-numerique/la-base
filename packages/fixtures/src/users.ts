import { faker } from '@faker-js/faker'
import { Prisma } from '@prisma/client'
import { prismaClient } from '@app/web/prismaClient'

const BASE_NUMBER = 100

export const users: Prisma.UserCreateManyInput[] = [
  {
    id: '99afd613-9d54-4110-9062-065c627eda8a',
    firstName: 'Edith',
    lastName: 'Piaf',
    name: 'Edith Piaf',
    email: 'edith@piaf.com',
    emailVerified: new Date(),
    isPublic: true,
  },
  {
    id: 'f1826416-af31-402c-9d92-379d4ea7509e',
    firstName: 'Joe',
    lastName: 'Dassin',
    name: 'Joe Dassin',
    email: 'joe@dassin.com',
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

export const randomUsers: (
  random: number,
) => Exclude<
  Parameters<typeof prismaClient.user.create>[0]['data'],
  undefined
>[] = (random) =>
  Array.from({ length: random * BASE_NUMBER }, (_, index) => {
    const firstName = faker.person.firstName()
    const lastName = faker.person.lastName()

    return {
      firstName,
      lastName,
      name: `${firstName} ${lastName}`,
      email: faker.internet.email().toLowerCase(),
      emailVerified: index % 3 ? null : new Date(),
      isPublic: Math.random() > 0.1,
    }
  })
