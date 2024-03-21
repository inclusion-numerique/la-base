import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { metadataTitle } from '@app/web/app/metadataTitle'
import { getChatSession } from '@app/web/app/(assistant)/chat/getChatSession'
import ChatSession from '@app/web/app/(assistant)/chat/ChatSession'

export const generateMetadata = (): Metadata => ({
  title: metadataTitle('Assistant'),
})

const Page = async ({
  params: { chatSessionId },
}: {
  params: { chatSessionId: string }
}) => {
  const chatSession = await getChatSession(chatSessionId)
  if (!chatSession) {
    notFound()
  }

  return (
    <div className="fr-container fr-container--narrow">
      <ChatSession chatSession={chatSession} />
    </div>
  )
}

export default Page
