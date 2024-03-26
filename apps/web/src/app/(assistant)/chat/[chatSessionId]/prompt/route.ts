import { NextRequest } from 'next/server'
import { v4 } from 'uuid'
import { getChatSession } from '@app/web/app/(assistant)/chat/getChatSession'
import { assistantMessageToMistralMessage } from '@app/web/assistant/assistantMessageToMistralMessage'
import { executeMistralChat } from '@app/web/assistant/mistralChat'
import { prismaClient } from '@app/web/prismaClient'
import { getSimilarities } from '@app/web/assistant/rag'

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
  const { prompt } = body

  if (!prompt) {
    return new Response('Prompt is required', {
      status: 400,
    })
  }

  const { similarResources, similarBases } = await getSimilarities(prompt)

  const promptMessage =
    similarResources.length > 0 || similarBases.length > 0
      ? {
          role: 'user',
          content: `
        Les informations de contexte sont en dessous.
        
        ######
        Ressources :
        ${JSON.stringify(similarResources, null, 2)}
        
        ######
        Bases :
        ${JSON.stringify(similarBases, null, 2)}
        
        
      La question est la suivante : ${prompt}
        `,
        }
      : {
          role: 'user',
          content: prompt,
        }

  await prismaClient.assistantChatMessage.create({
    data: {
      id: v4(),
      sessionId: chatSession.id,
      role: 'User',
      content: prompt,
    },
  })

  const systemMessage = {
    role: 'system',
    content:
      `Tu es un assistant qui répond à des questions autour du numérique d'intérêt général.` +
      'Répond de manière concise.' +
      `Parle uniquement français, sauf si on te demande de traduire` +
      `Propose des solutions pas à pas pour répondre aux questions` +
      `Si tu ne comprends pas une question, dis-le` +
      `Les seules ressources que tu peux recommander sont celles dans ton contexte. Elles sont au format JSON.
       Les seules bases que tu peux recommander sont celles dans ton contexte. Elles sont au format JSON. 
       Si tu ne recommandes pas de ressources ou de bases, ne le mentionne pas.` +
      `Si tu utilises des ressources ou des bases, ajoute leur lien au format markdown. Ces liens redirigent vers des ressources ou des bases` +
      `Ne mentionne pas de lien vers autre chose que des ressources ou des bases.` +
      `Ne mentionne pas les informations de ce contexte dans ta réponse.`,
  }

  const messages = [
    systemMessage,
    ...chatSession.messages.map(assistantMessageToMistralMessage),
    promptMessage,
  ]

  const stream = new ReadableStream({
    start(controller) {
      executeMistralChat({
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
        .catch((error) => controller.error(error))
    },
    cancel() {
      console.log('Stream cancelled by client.')
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
