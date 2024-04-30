import { Base, DocumentHelp, Resource } from '@prisma/client'
import { EmbeddingResponse, ToolType } from '@mistralai/mistralai'
import { prismaClient } from '@app/web/prismaClient'
import { mistralEmbedding } from '@app/web/assistant/mistralEmbedding'
import { ragTool } from '@app/web/assistant/assistantTools'
import type { MistralChatMessage } from '@app/web/assistant/mistralChat'

type AssistantResource = {
  titre: string
  url: string
  description: string
  similarity?: number
}

type AssistantBase = {
  titre: string
  url: string
  description: string | null
  similarity?: number
}

type AssistantHelp = {
  titre: string
  url: string
  content: string
  similarity?: number
}

const getSimilarResources = async (embeddedPrompt: EmbeddingResponse) => {
  const resources: AssistantResource[] = []

  const rows = await prismaClient.$queryRaw<
    Resource[]
  >`SELECT title, slug, description, 1 - (embedding <=> ${embeddedPrompt.data[0].embedding}::vector) as similarity
    FROM "resources"
    WHERE 1 - (embedding <=> ${embeddedPrompt.data[0].embedding}::vector) >= 0.7
    ORDER BY similarity
            DESC
    LIMIT 3;`

  for (const row of rows) {
    resources.push({
      titre: row.title,
      url: `https://lesbases.anct.gouv.fr/ressources/${row.slug}`,
      description: row.description,
    })
  }

  return resources
}

const getSimilarBases = async (embeddedPrompt: EmbeddingResponse) => {
  const bases: AssistantBase[] = []

  const rows = await prismaClient.$queryRaw<
    Base[]
  >`SELECT title, slug, description, 1 - (embedding_base <=> ${embeddedPrompt.data[0].embedding}::vector) as similarity
    FROM "bases"
    WHERE 1 - (embedding_base <=> ${embeddedPrompt.data[0].embedding}::vector) >= 0.7
    ORDER BY similarity
            DESC
    LIMIT 3;`

  for (const row of rows) {
    bases.push({
      titre: row.title,
      url: `https://lesbases.anct.gouv.fr/bases/${row.slug}`,
      description: row.description,
    })
  }

  return bases
}

const getSimilarHelps = async (embeddedPrompt: EmbeddingResponse) => {
  const helps: AssistantHelp[] = []

  const rows = await prismaClient.$queryRaw<
    DocumentHelp[]
  >`SELECT content, source, 1 - (help_center.vector <=> ${embeddedPrompt.data[0].embedding}::vector) as similarity
    FROM "help_center"
    WHERE 1 - ("help_center".vector <=> ${embeddedPrompt.data[0].embedding}::vector) >= 0.7
    ORDER BY similarity
            DESC
    LIMIT 3;`

  for (const row of rows) {
    helps.push({
      titre: row.source,
      url: ``,
      content: row.content,
    })
  }

  return helps
}

export const getSimilarities = async (
  prompt: string,
): Promise<{
  similarResources: AssistantResource[]
  similarBases: AssistantBase[]
  similarHelps: AssistantHelp[]
  toolMessages: MistralChatMessage[]
}> => {
  const embeddedPrompt = await mistralEmbedding(prompt)

  const [ressources, bases, aides] = await Promise.all([
    getSimilarResources(embeddedPrompt),
    getSimilarBases(embeddedPrompt),
    getSimilarHelps(embeddedPrompt),
  ])

  console.log('resources', ressources)
  console.log('bases', bases)
  console.log('helps', aides)

  if (ressources.length === 0 && bases.length === 0 && aides.length === 0) {
    return {
      similarResources: [],
      similarBases: [],
      similarHelps: [],
      toolMessages: [],
    }
  }

  const toolCallMessage = {
    role: 'assistant' as const,
    content: '',
    tool_calls: [
      {
        id: 'null',
        type: 'function' as ToolType,
        function: {
          name: ragTool.function.name,
          arguments: JSON.stringify({
            recherche: prompt,
          }),
        },
      },
    ],
  } satisfies MistralChatMessage

  const toolResultMessage = {
    role: 'tool' as const,
    name: ragTool.function.name,
    content: JSON.stringify({
      ressources: ressources.map(({ titre, url, description }) => ({
        titre,
        url,
        description,
      })),
      bases: bases.map(({ titre, url, description }) => ({
        titre,
        url,
        description,
      })),
      aides: aides.map(({ titre, url, content }) => ({ titre, url, content })),
    }),
  } satisfies MistralChatMessage

  return {
    similarResources: ressources,
    similarBases: bases,
    similarHelps: aides,
    toolMessages: [toolCallMessage, toolResultMessage],
  }
}
