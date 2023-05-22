import { v4 } from 'uuid'
import { SessionUser } from '@app/web/auth/sessionUser'
import { prismaClient } from '@app/web/prismaClient'
import {
  ResourceCreationCommand,
  ResourceMutationCommand,
} from '@app/web/server/resources/feature/features'
import { handleResourceCreationCommand } from '@app/web/server/resources/feature/handleResourceCreationCommand'
import { handleResourceMutationCommand } from '@app/web/server/resources/feature/handleResourceMutationCommand'
import {
  Serialized,
  deserialize,
  serialize,
} from '@app/web/utils/serialization'

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

export type SendResourceCommandsInput = {
  user: Pick<SessionUser, 'id'>
  commands: [ResourceCreationCommand, ...ResourceMutationCommand[]]
}
export const sendResourceCommands = async (
  input: Serialized<SendResourceCommandsInput>,
) => {
  const {
    user,
    commands: [createCommand, ...mutateCommands],
  } = deserialize(input)
  const { resource } = await handleResourceCreationCommand(createCommand, {
    user,
  })

  if (mutateCommands.length === 0) {
    return serialize(resource)
  }

  let mutatedResource = resource
  for (const command of mutateCommands) {
    const result = await handleResourceMutationCommand(command, { user })
    mutatedResource = result.resource
  }

  return serialize(mutatedResource)
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
