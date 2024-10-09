import { prismaClient } from '@app/web/prismaClient'

export const getChatSession = async (chatSessionId: string) => {
  const chatSession = await prismaClient.assistantChatSession.findUnique({
    where: { id: chatSessionId },
    include: {
      messages: {
        orderBy: { created: 'asc' },
      },
    },
  })

  // TODO add logic stuff to have better representation ?

  return chatSession
}

export type ChatSessionData = Exclude<
  Awaited<ReturnType<typeof getChatSession>>,
  null
>
