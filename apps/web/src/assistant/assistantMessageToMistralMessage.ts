import type { AssistantChatMessage } from '@prisma/client'
import { MistralChatMessage } from '@app/web/assistant/mistralChat'

export const assistantMessageToMistralMessage = ({
  role,
  content,
}: Pick<AssistantChatMessage, 'content' | 'role'>) =>
  ({
    content,
    role: role === 'User' ? 'user' : 'assistant',
  }) satisfies MistralChatMessage
