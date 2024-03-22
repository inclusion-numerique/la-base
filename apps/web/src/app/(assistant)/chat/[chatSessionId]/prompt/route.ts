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
        Les seules ressources que tu peux recommander sont celles dans le contexte Ressources similaires en dessous. Elles sont au format JSON.
        Les seules bases que tu peux recommander sont celles dans le contexte Bases similaires en dessous. Elles sont au format JSON. 
 
        ######
        Ressources similaires:
        \`\`\`json
        ${JSON.stringify(similarResources, null, 2)}
        \`\`\`
        
        ######
        Bases similaires:
        \`\`\`json
        ${JSON.stringify(similarBases, null, 2)}
        \`\`\`
        
        Lorsque tu recommandes une ressource ou une base, tu dois la présenter en quelques mots pour expliquer pourquoi elle est pertinente, puis donner un lien au format markdown vers la ressource.
        Ordonne les recommendations de ressources ensemble, puis les recommendations de bases ensemble.
        
       

      <<<<<>>>>>
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
      `Propose des solutions pas à pas pour répondre aux questions`,
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
