import { NextRequest } from 'next/server'
import cookie from 'cookie'
import { getSessionUserFromSessionToken } from '@app/web/auth/getSessionUserFromSessionToken'
import { getSessionTokenFromCookies } from '@app/web/auth/getSessionTokenFromCookies'
import { getChatSession } from '@app/web/app/(assistant)/chat/getChatSession'

const notFoundResponse = () =>
  new Response('', {
    status: 404,
  })

export const POST = async (
  request: NextRequest,
  context: { params: { chatSessionId: string } },
) => {
  const { chatSessionId } = context.params

  const chatSession = await getChatSession(chatSessionId)
  if (!chatSession) {
    return notFoundResponse()
  }

  const cookies = cookie.parse(request.headers.get('cookie') || '')
  const sessionToken = getSessionTokenFromCookies(cookies)
  const user = sessionToken
    ? await getSessionUserFromSessionToken(sessionToken)
    : null

  const stream = new ReadableStream({
    start(controller) {
      // Function to enqueue fake message every x second
      const pushMessage = () => {
        controller.enqueue('blah ')
      }

      // Call pushMessage every 1 second for 8 seconds
      const intervalId = setInterval(pushMessage, 75)

      // Stop the stream and clear the interval after 8 seconds
      setTimeout(() => {
        clearInterval(intervalId) // Stop the interval
        controller.close() // Close the stream, completing the response
      }, 3500)
    },
    cancel() {
      console.log('Stream cancelled by the client.')
    },
  })

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream', // Set the appropriate header for SSE
      'Cache-Control': 'no-cache', // Prevent caching of this response
      Connection: 'keep-alive', // Keep the connection open for streaming
    },
    status: 200,
  })
}
