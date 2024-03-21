import { Resource } from '@prisma/client'
import { prismaClient } from '@app/web/prismaClient'
import { mistralEmbedding } from '@app/web/assistant/mistralEmbedding'

export const getSimilarResources = async (
  prompt: string,
): Promise<Resource[]> => {
  const resources: Resource[] = []

  const embeddedPrompt = await mistralEmbedding(prompt)

  const rows =
    await prismaClient.$queryRaw`SELECT title, slug, description, 1 - (embedding <=> ${embeddedPrompt.data[0].embedding}::vector) as similarity  
        FROM "resources" WHERE 1 - (embedding <=> ${embeddedPrompt.data[0].embedding}::vector) >= 0.7 
                         ORDER BY similarity 
                                         DESC LIMIT 5;`

  console.log('matching ressources', rows)

  return resources
}
