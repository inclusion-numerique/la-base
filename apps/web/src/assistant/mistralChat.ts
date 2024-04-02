import type { ToolCalls } from '@mistralai/mistralai'
import { mistralClient } from '@app/web/assistant/mistralClient'

export type MistralChatMessage = {
  role: string
  name?: string
  content: string | string[]
  tool_calls?: ToolCalls[]
}

export const executeMistralChat = async ({
  onChunk,
  messages,
}: {
  messages: MistralChatMessage[]
  onChunk: (chunk: string) => void
}) => {
  const chatStreamResponse = mistralClient.chatStream({
    model: 'mistral-small-latest',
    messages,
    temperature: 0.1,
  })

  let reponse = ''

  for await (const chunk of chatStreamResponse) {
    if (chunk.choices[0].delta.content !== undefined) {
      const streamText = chunk.choices[0].delta.content
      onChunk(streamText)
      reponse += streamText
    }
  }
  return reponse
}
