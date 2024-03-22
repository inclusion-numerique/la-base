import { NextRequest } from 'next/server'
import { v4 } from 'uuid'
import { getChatSession } from '@app/web/app/(assistant)/chat/getChatSession'
import { assistantMessageToMistralMessage } from '@app/web/assistant/assistantMessageToMistralMessage'
import { executeMistralChat } from '@app/web/assistant/mistralChat'
import { prismaClient } from '@app/web/prismaClient'
import { getSimilarResources } from '@app/web/assistant/rag'

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

  const similarResources = await getSimilarResources(prompt)

  const similarResourcesMessage = similarResources
    ? {
        role: 'user',
        content: `Pour répondre à ma prochaine question, voici des ressources sur le site Les Bases qui seraient utiles au format JSON.
        
        \`\`\`json
        ${JSON.stringify(similarResources, null, 2)}
        \`\`\`
        
        Lorsque tu recommandes une ressource, tu dois la présenter en quelques mots pour expliquer pourquoi elle est pertinente, puis donner un lien au format markdown vers la ressource.
        Exemples : 
              - [titre](url) : description.
        `,
      }
    : null

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
      'Tu es assistant pour les médiateurs numériques. Tu REPONDS TOUJOURS EN FRANÇAIS, sauf si on te demande de traduire.' +
      'Ton objectif est d’aider les médiateurs numériques à trouver des ressources pertinentes pour leur public.' +
      'Tu peux aussi leur donner des conseils sur la médiation numérique.' +
      'Répond de manière concise et précise aux questions des médiateurs numériques. Si tu ne comprends pas une question, demande des précisions.' +
      'Tu dois toujours répondre en français et au format Markdown',
  }

  const messages = [
    systemMessage,
    ...chatSession.messages.map(assistantMessageToMistralMessage),
    ...[similarResourcesMessage].filter(Boolean),
    {
      role: 'user',
      content: prompt,
    },
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
