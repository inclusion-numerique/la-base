import { Base, Resource } from '@prisma/client'
import { EmbeddingResponse } from '@mistralai/mistralai'
import { prismaClient } from '@app/web/prismaClient'
import { mistralEmbedding } from '@app/web/assistant/mistralEmbedding'

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

export const getSimilarities = async (
  prompt: string,
): Promise<{
  similarResources: AssistantResource[]
  similarBases: AssistantBase[]
}> => {
  const embeddedPrompt = await mistralEmbedding(prompt)

  const resources = await getSimilarResources(embeddedPrompt)
  const bases = await getSimilarBases(embeddedPrompt)

  return { similarResources: resources, similarBases: bases }
}
