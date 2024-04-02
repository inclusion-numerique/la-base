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

  const { similarResources, similarBases, similarHelps } =
    await getSimilarities(prompt)

  const promptMessage = {
    role: 'user',
    content: `
        Les informations de contexte sont en dessous.
    
        ${
          similarResources.length > 0
            ? `
        ######        
        Ressources que tu peux recommander:
        ${JSON.stringify(similarResources, null, 2)}`
            : `Tu ne recommandes pas de ressources. Tu ne propose pas d'hyperlien pour les ressources.`
        }
        ${
          similarBases.length > 0
            ? `######
        Bases que tu peux recommander:
        ${JSON.stringify(similarBases, null, 2)}`
            : `Tu ne recommandes pas de bases. Tu ne propose pas d'hyperlien pour les bases.`
        }
        ${
          similarHelps.length > 0
            ? `######
        Informations d'aide pour l'utilisateur sur Les Bases d'intérêt général :
        ${similarHelps.map((help) => help.content).join('')}`
            : `Tu ne recommandes pas d'information spécifique au site.`
        }
      La question est la suivante : ${prompt}
        `,
  }

  console.log(
    '------------------------------------promptMessage',
    promptMessage,
  )

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
      `Tu es un assistant qui répond à des questions autour du numérique d'intérêt général, pour Les Bases du Numérique d'intérêt général` +
      `N'utilise jamais de lien url, sauf s'ils sont dans ton contexte.` +
      `Recommande des ressources seulement si elles sont dans ton contexte. Elles sont au format JSON.
       Recommande des bases seulement si elles sont  dans ton contexte. Elles sont au format JSON. 
       Si tu ne recommandes pas de ressources ou de bases, ne le mentionne pas.` +
      'Répond de manière concise.' +
      `Parle uniquement français, sauf si on te demande de traduire` +
      `N'utilise pas le format JSON dans ta réponse.` +
      `Ne mentionne pas les informations de ce contexte dans ta réponse.` +
      `Si tu utilises des ressources ou des bases, ajoute leur lien au format markdown. Ces liens redirigent vers des ressources ou des bases` +
      `Si tu as des informations d'aide pour l'utilisateur en contexte, utilise le en priorité` +
      `Si tu ne connais pas la réponse, dis-le, n'essaie pas d'inventer une réponse.`,
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
