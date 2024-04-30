import { NextRequest } from 'next/server'
import { v4 } from 'uuid'
import type { MistralChatMessage } from '@app/web/assistant/mistralChat'
import { executeMistralChatStream } from '@app/web/assistant/mistralChat'

import { getChatSession } from '@app/web/app/(assistant)/chat/getChatSession'
import { getSimilarities } from '@app/web/assistant/rag'
import { prismaClient } from '@app/web/prismaClient'
import { summarizeDiscussion } from '@app/web/assistant/summarizeDiscussion'
import { assistantMessageToMistralMessage } from '@app/web/assistant/assistantMessageToMistralMessage'

const notFoundResponse = () =>
  new Response('', {
    status: 404,
  })

export const POST = async (
  request: NextRequest,
  context: { params: { chatSessionId: string } },
) => {
  const { chatSessionId } = context.params

  const chatSession = await getChatSession(chatSessionId)
  if (!chatSession) {
    return notFoundResponse()
  }

  // Get prompt from request json body
  const body = (await request.json()) as { prompt?: string }
  const { prompt: userPrompt } = body

  if (!userPrompt) {
    return new Response('Prompt is required', {
      status: 400,
    })
  }

  const [summarizedDiscussion, ragResults] = await Promise.all([
    summarizeDiscussion(chatSession.messages.slice(0, -2)),
    getSimilarities(userPrompt),
  ])

  const userPromptMessage = {
    role: 'user',
    content: userPrompt,
  }

  console.log('------- SUMMARIZED DISCUSSION', summarizedDiscussion)

  console.log('--------RAG TOOL MESSAGE', ragResults.toolMessages)

  console.log('--------USER PROMPT MESSAGE', userPromptMessage)

  await prismaClient.assistantChatMessage.create({
    data: {
      id: v4(),
      sessionId: chatSession.id,
      role: 'User',
      content: userPrompt,
    },
  })

  const systemMessage = {
    role: 'system',
    content: `Tu es un assistant qui répond à des questions autour du numérique d'intérêt général, intégré à la plateforme [Les Bases du Numérique d'intérêt général](https://lesbases.anct.gouv.fr) 
N'utilise jamais d'hyperliens, sauf s'ils sont en résultat de tools.
Répond TOUJOURS au format markdown.
Sois toujours de bonne humeur, cherchant à aider l’utilisateur au mieux.
Parle uniquement français, sauf si on te demande de traduire.
Si tu ne connais pas la réponse, dis-le, n'essaie pas d'inventer une réponse.`,
  }

  const messages: MistralChatMessage[] = [systemMessage]

  // Include summary of older than 2 messages
  if (summarizedDiscussion) {
    messages.push({
      role: 'assistant',
      content: `Voici un résumé de notre discussion jusqu’à présent : \n\n ${summarizedDiscussion}`,
    })
  }

  messages.push(
    // Include always 2 last history messages
    ...chatSession.messages.slice(-2).map(assistantMessageToMistralMessage),
    // Include new user prompt message
    userPromptMessage,
    // include rag results (they will be empty if no matches in rag)
    ...ragResults.toolMessages,
  )

  const stream = new ReadableStream({
    start(controller) {
      executeMistralChatStream({
        messages,
        onChunk: (chunk) => controller.enqueue(chunk),
      })
        .then((response) => {
          controller.close()
          return prismaClient.assistantChatMessage.create({
            data: {
              id: v4(),
              sessionId: chatSession.id,
              role: 'Assistant',
              content: response,
            },
          })
        })
        .catch((error) => {
          console.error(error)
          controller.error(error)
        })
    },
    cancel() {
      console.log('Stream cancelled by the client.')
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream', // Set the appropriate header for SSE
      'Cache-Control': 'no-cache', // Prevent caching of this response
      Connection: 'keep-alive', // Keep the connection open for streaming
    },
    status: 200,
  })
}
