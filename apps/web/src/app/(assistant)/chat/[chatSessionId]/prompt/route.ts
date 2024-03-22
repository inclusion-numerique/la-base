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

  const promptMessage = similarResources
    ? {
        role: 'user',
        content: `
        
        Les informations de contexte sont en dessous.
    Les seules ressources que tu peux recommander sont celles dans le contexte Ressources similaires en dessous. Elles sont au format JSON.
    Lorsque tu recommandes une ressource, tu dois la présenter en quelques mots pour expliquer pourquoi elle est pertinente, puis donner une url vers la ressource' 
 
 
        \`\`\`json
        ${JSON.stringify(similarResources, null, 2)}
        \`\`\`
        
        Lorsque tu recommandes une ressource, tu dois la présenter en quelques mots pour expliquer pourquoi elle est pertinente, puis donner un lien au format markdown vers la ressource.
        ######
      Exemples :
      
      Question: Comment puis-je obtenir un titre de séjour en France ?
      Réponse: Pour obtenir un titre de séjour en France, vous devez d'abord vous rendre sur le site de l'administration numérique pour les étrangers en France (ANEF) et suivre les instructions pour demander un titre de séjour en ligne.
      
      Voici quelques ressources qui pourrait vous intéresser :
      - [Administration Numérique pour les Etrangers en France (ac)](https://lesbases.anct.gouv.fr/ressources/administration-numerique-pour-les-etrangers-en-france-ac) : Le ministère de l'intérieur a ouvert un téléservice de demande en ligne des titres de séjour, au bénéfice des étudiants étrangers, appelé ANEF-séjour (Administration Numérique pour les Étrangers en France).
      - [ANEF](https://lesbases.anct.gouv.fr/ressources/anef) : L'Administration Numérique pour les Etrangers en France (ANEF) a pour objectif de dématérialiser toutes les démarches concernant les étrangers en France : séjour et accès à la nationalité.

      ######
      Question: ${prompt}
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
