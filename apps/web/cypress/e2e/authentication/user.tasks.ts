import { v4 } from 'uuid'
import { prismaClient } from '@app/web/prismaClient'
import { ResourceCreated } from '@app/web/server/resources/feature/CreateResource'

export type CreateUserInput = Parameters<
  typeof prismaClient.user.create
>[0]['data']
export const createUser = async (user: CreateUserInput) =>
  prismaClient.user.create({ data: user })

export type CreateBaseInput = Parameters<
  typeof prismaClient.base.create
>[0]['data']
export const createBase = async (base: CreateBaseInput) =>
  prismaClient.base.create({ data: base })

export type CreateResourceInput = Parameters<
  typeof prismaClient.resource.create
>[0]['data'] & { createdById: string }
export const createResource = async ({
  createdById,
  id,
  ...resourceData
}: CreateResourceInput) => {
  const resourceId = id || v4()
  const createdEvent: ResourceCreated = {
    type: 'Created',
    timestamp: resourceData.created
      ? new Date(resourceData.created)
      : new Date(),
    data: {
      __version: 1,
      id: resourceId,
      ...resourceData,
      byId: createdById,
      baseId: resourceData.baseId || null,
    },
  }
  return prismaClient.resource.create({
    data: {
      id: resourceId,
      ...resourceData,
      createdById,
      events: {
        create: {
          ...createdEvent,
        },
      },
    },
  })
}

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
