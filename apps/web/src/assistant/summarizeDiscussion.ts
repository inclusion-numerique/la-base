import { ChatSessionData } from '@app/web/app/(assistant)/chat/getChatSession'
import { executeMistralChat } from '@app/web/assistant/mistralChat'

export const summarizeDiscussion = async (
  messages: ChatSessionData['messages'],
) => {
  if (messages.length === 0) {
    return ''
  }
  const messagesAsText = messages
    .map(
      (message) =>
        `${message.role === 'User' ? 'Utilisateur' : 'Assistant'}: ${message.content}`,
    )
    .join('\n___\n')

  const summary = await executeMistralChat({
    messages: [
      {
        role: 'system',
        content: `Tu es un expert avec le modèle LLM Mixtral. Tu dois résumer la discussion passée entre l'utilisateur et l’assistant pour garder un maximum d'information sur le dialogue, qui à dit quoi, et le but de la discussion. Répond UNIQUEMENT AVEC LE résumé.`,
      },
      {
        role: 'user',
        content: messagesAsText,
      },
    ],
  })

  return summary
}
