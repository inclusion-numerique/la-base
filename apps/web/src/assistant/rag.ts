import { Resource } from '@prisma/client'
import { prismaClient } from '@app/web/prismaClient'
import { mistralEmbedding } from '@app/web/assistant/mistralEmbedding'

type AssistantResource = {
  title: string
  url: string
  description: string
  similarity?: number
}

export const getSimilarResources = async (prompt: string): Promise<string> => {
  const resources: AssistantResource[] = []

  const embeddedPrompt = await mistralEmbedding(prompt)

  const rows = await prismaClient.$queryRaw<
    Resource[]
  >`SELECT title, slug, description, 1 - (embedding <=> ${embeddedPrompt.data[0].embedding}::vector) as similarity  
        FROM "resources" WHERE 1 - (embedding <=> ${embeddedPrompt.data[0].embedding}::vector) >= 0.7 
                         ORDER BY similarity 
                                         DESC LIMIT 5;`

  for (const row of rows) {
    resources.push({
      title: row.title,
      url: `https://lesbases.anct.gouv.fr/ressources/${row.slug}`,
      description: row.description,
    })
  }

  const resourcesString = resources
    .map(
      (resource) =>
        `Title: ${resource.title}, URL: ${resource.url}, Description: ${resource.description}`,
    )
    .join('')

  console.log('matching ressources', resourcesString)

  return resourcesString
}
