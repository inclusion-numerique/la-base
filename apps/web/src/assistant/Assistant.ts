import z from 'zod'
// import MistralClient from '@mistralai/mistralai'
// import { ServerWebAppConfig } from '@app/web/ServerWebAppConfig'

// const { apiKey } = ServerWebAppConfig.Mistral

// const client = new MistralClient(apiKey)

// export const generateEmbeddings = async (texts: []) => {
//   const input = []
//   for (let index = 0; index < 1; index++) {
//     input.push('What is the best French cheese?')
//   }
//
//   const embeddingsBatchResponse = await client.embeddings({
//     model: 'mistral-embed',
//     input,
//   })
//
//   console.log('Embeddings Batch:', embeddingsBatchResponse.data)
// }

export const AssistantValidation = z.object({
  prompt: z.string().trim(),
})

export type AssistantData = z.infer<typeof AssistantValidation>
