import { Command } from '@commander-js/extra-typings'
import { prismaClient } from '@app/web/prismaClient'
import { htmlToText } from '@app/web/utils/htmlToText'
import axios from 'axios'
import Bottleneck from 'bottleneck'
import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'
import { output } from '@app/cli/output'

interface EmbeddingResponse {
  id: string
  object: string
  data: EmbeddingObject[]
  model: string
}

interface EmbeddingObject {
  object: string
  embedding: number[]
  index: number
}

// Initialize a new bottleneck limiter
const limiter = new Bottleneck({
  maxConcurrent: 1, // Maximum number of concurrent requests
  minTime: 500, // Minimum time between requests (in milliseconds)
})

// Wrap your function with the limiter.schedule method
const generateEmbeddings = limiter.wrap(
  async (texts: string[]): Promise<EmbeddingResponse> => {
    const response = await axios.post<EmbeddingResponse>(
      'https://api.mistral.ai/v1/embeddings',
      {
        model: 'mistral-embed',
        input: texts,
        encoding_format: 'float',
      },
      {
        headers: {
          Authorization: `Bearer ${ServerWebAppConfig.Mistral.apiKey}`,
          'Content-Type': 'application/json',
        },
      },
    )

    return response.data
  },
)

export const convertResourcesToTxt = new Command()
  .command('ia:convert-resources')
  .description(
    'convert title and description on resources to txt and store in vector db',
  )
  .action(async () => {
    // get all resources
    const resources = await prismaClient.resource.findMany({
      where: {
        isPublic: true,
        deleted: null,
      },
      select: {
        id: true,
        title: true,
        description: true,
      },
    })

    const conversionPromises = resources.map(async (resource) => {
      const resourceText: string[] = [
        htmlToText(`${resource.title}\n${resource.description}\n\n`),
      ]
      output('Embedding for ', resource.title)
      const embeddingResponse = await generateEmbeddings(resourceText)

      output('Response : ', embeddingResponse)

      const { embedding } = embeddingResponse.data[0]

      output('Inserting embedding id', embeddingResponse.id)
      output('Embeddings : ', embedding)

      await prismaClient.$executeRaw`UPDATE "resources" SET embedding = ${embedding}::real[] WHERE id = ${resource.id}::uuid`

      return `${resource.title}\n`
    })

    await Promise.all(conversionPromises)
    console.log('Conversion terminée')
  })
