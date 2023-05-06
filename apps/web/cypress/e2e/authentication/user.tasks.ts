import { prismaClient } from '@app/web/prismaClient'
import * as uuid from 'uuid'

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
>[0]['data']
export const createResource = async (resource: CreateResourceInput) =>
  prismaClient.resource.create({ data: resource })

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
      id: uuid.v4(),
      sessionToken: uuid.v4(),
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
