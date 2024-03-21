import type { Metadata } from 'next'
import { redirect } from 'next/navigation'
import { prismaClient } from '@app/web/prismaClient'
import { getSessionUser } from '@app/web/auth/getSessionUser'

export const generateMetadata = async (): Promise<Metadata> => {
  const user = await getSessionUser()
  const chatSession = await prismaClient.assistantChatSession.create({
    data: {
      createdById: user?.id,
      context: '',
    },
  })

  redirect(`/chat/${chatSession.id}`)
}

export default () => null
