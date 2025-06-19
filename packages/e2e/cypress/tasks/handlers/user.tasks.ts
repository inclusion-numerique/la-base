import { prismaClient } from '@app/web/prismaClient'
import { v4 } from 'uuid'

export type CreateUserInput = Parameters<
  typeof prismaClient.user.create
>[0]['data']
export const createUser = async (user: CreateUserInput) =>
  prismaClient.user.create({ data: user })

export type CreateCollectionInput = Parameters<
  typeof prismaClient.collection.create
>[0]['data']
export const createCollection = async (collection: CreateCollectionInput) =>
  prismaClient.collection.create({ data: collection })

export type CreateBaseInput = Parameters<
  typeof prismaClient.base.create
>[0]['data']
export const createBase = async (base: CreateBaseInput) =>
  prismaClient.base.create({ data: base })

export const deleteUser = async (user: { email: string }) => {
  const exists = await prismaClient.user.findUnique({
    where: user,
    select: { id: true },
  })
  if (!exists) {
    return null
  }
  await prismaClient.user.delete({ where: user })

  return null
}

export const createSession = async ({ email }: { email: string }) => {
  const expires = new Date()
  expires.setFullYear(expires.getFullYear() + 1)

  const created = await prismaClient.session.create({
    data: {
      id: v4(),
      sessionToken: v4(),
      expires,
      user: {
        connect: { email },
      },
    },
  })

  return created
}
export const deleteSession = async (sessionToken: string) => {
  const exists = await prismaClient.session.findUnique({
    where: { sessionToken },
  })
  if (!exists) {
    return null
  }
  await prismaClient.session.delete({ where: { sessionToken } })
  return null
}

export const inviteUserToBase = async ({
  user,
  slug,
}: {
  user: string
  slug: string
}) => {
  const base = await prismaClient.base.findFirst({
    select: { id: true },
    where: { slug },
  })
  if (base === null) {
    throw new Error(`Base ${slug} not found`)
  }
  return prismaClient.baseMembers.create({
    data: {
      baseId: base.id,
      memberId: user,
      isAdmin: false,
      accepted: new Date(),
    },
  })
}

export const inviteUserToResource = async ({
  user,
  slug,
}: {
  user: string
  slug: string
}) => {
  const resource = await prismaClient.resource.findFirst({
    select: { id: true },
    where: { slug },
  })
  if (resource === null) {
    throw new Error(`Resource ${slug} not found`)
  }
  return prismaClient.resourceContributors.create({
    data: {
      resourceId: resource.id,
      contributorId: user,
      added: new Date(),
    },
  })
}
