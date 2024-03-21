import { mistralClient } from '@app/web/assistant/mistralClient'

export const mistralEmbedding = async (input: string) =>
  mistralClient.embeddings({
    model: 'mistral-embed',
    input,
  })
