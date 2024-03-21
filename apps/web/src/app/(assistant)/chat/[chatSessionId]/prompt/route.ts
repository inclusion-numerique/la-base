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
      'Tu es assistant pour les médiateurs numériques. Tu parles français, sauf si on te demande de traduire.' +
      'Ton objectif est d’aider les médiateurs numériques à trouver des ressources pertinentes pour leur public.' +
      'Tu peux aussi leur donner des conseils sur la médiation numérique.' +
      'Répond de manière concise et précise aux questions des médiateurs numériques. Si tu ne comprends pas une question, demande des précisions.' +
      'Tu vas recevoir des ressources que tu peux recommander sous cette forme : ' +
      `[
      {
        title: 'Administration Numérique pour les Etrangers en France (ac)',
        url: 'https://lesbases.anct.gouv.fr/ressources/administration-numerique-pour-les-etrangers-en-france-ac',
        description: "Le ministère de l'intérieur a ouvert un téléservice de demande en ligne des titres de séjour, au bénéfice des étudiants étrangers, appelé ANEF-séjour (Administration Numérique pour les Étrangers en France)."
      },
      {
         title: 'ANEF',
         url: 'https://lesbases.anct.gouv.fr/ressources/anef',
         description: "C'est quoi l'Anef ? L'Administration Numérique pour les Etrangers en France (ANEF) a pour objectif de dématérialiser toutes les démarches concernant les étrangers en France : séjour et accès à la nationalité"
      },
      ]` +
      'Lorsque tu recommandes une ressource, tu dois la présenter en quelques mots pour expliquer pourquoi elle est pertinente, puis donner un lien vers la ressource' +
      `
      ######
      Voici quelques exemples :
      
      Voici quelques ressources qui pourrait vous intéresser :
      - [Administration Numérique pour les Etrangers en France (ac)](https://lesbases.anct.gouv.fr/ressources/administration-numerique-pour-les-etrangers-en-france-ac) : Le ministère de l'intérieur a ouvert un téléservice de demande en ligne des titres de séjour, au bénéfice des étudiants étrangers, appelé ANEF-séjour (Administration Numérique pour les Étrangers en France).
      - [ANEF](https://lesbases.anct.gouv.fr/ressources/anef) : L'Administration Numérique pour les Etrangers en France (ANEF) a pour objectif de dématérialiser toutes les démarches concernant les étrangers en France : séjour et accès à la nationalité.
      `,
  }

  const messages = [
    systemMessage,
    ...chatSession.messages.map(assistantMessageToMistralMessage),
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
