import { prismaClient } from '@app/web/prismaClient'
import * as uuid from 'uuid'

export type CreateUserInput = Parameters<
  typeof prismaClient.user.create
>[0]['data']
export const createUser = async (user: CreateUserInput) => {
  const created = await prismaClient.user.create({ data: user })

  return created
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
