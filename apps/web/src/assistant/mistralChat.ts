import { ToolCalls, type ToolChoice } from '@mistralai/mistralai'
import { mistralClient } from '@app/web/assistant/mistralClient'
import { mistralModels } from '@app/web/assistant/mistralModels'

export type MistralChatMessage = {
  role: string
  name?: string
  content: string | string[]
  tool_calls?: ToolCalls[]
}

export const executeMistralChatStream = async ({
  onChunk,
  messages,
}: {
  messages: MistralChatMessage[]
  onChunk: (chunk: string) => void
}) => {
  const chatStreamResponse = mistralClient.chatStream({
    model: mistralModels.MistralSmall.name,
    messages,
    temperature: 0,
    safePrompt: false,
    toolChoice: 'none' as ToolChoice,
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

export const executeMistralChat = async ({
  messages,
}: {
  messages: MistralChatMessage[]
}) => {
  const chatStreamResponse = await mistralClient.chat({
    model: mistralModels.MistralSmall.name,
    messages,
    temperature: 0,
  })

  return chatStreamResponse.choices[0].message.content
}
