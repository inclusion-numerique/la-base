'use client'

import { useForm } from 'react-hook-form'
import React, { useEffect, useRef, useState } from 'react'
import InputFormField from '@app/ui/components/Form/InputFormField'
import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import { ChatSessionData } from '@app/web/app/(assistant)/chat/getChatSession'
import ChatMessage from '@app/web/app/(assistant)/chat/ChatMessage'
import styles from './ChatSession.module.css'

const ChatSession = ({ chatSession }: { chatSession: ChatSessionData }) => {
  const form = useForm<{ prompt: string }>()
  const [isStreamingResponse, setIsStreamingResponse] = useState(false)
  const [isSendingPrompt, setIsSendingPrompt] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [messages, setMessages] = useState(chatSession.messages)

  const controllerRef = useRef<AbortController | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const messagesContainerRef = useRef<HTMLDivElement>(null)

  const scrollToBottomOfMessages = () => {
    if (
      !isStreamingResponse &&
      messagesContainerRef.current &&
      messagesEndRef.current
    ) {
      // Check if the user has scrolled up
      const { scrollTop, scrollHeight, clientHeight } =
        messagesContainerRef.current
      const isScrolledToBottom = scrollTop + clientHeight >= scrollHeight

      if (isScrolledToBottom) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  useEffect(scrollToBottomOfMessages, [messages, isStreamingResponse]) // Dependency array includes messages and isStreamingResponse

  const onAbort = () => {
    if (controllerRef.current) {
      controllerRef.current.abort()
    }
  }

  const streamingResponseMessageRef = useRef<HTMLDivElement>(null)

  const onSubmit = form.handleSubmit((data) => {
    if (!data.prompt?.trim()) return

    setError(null)
    const controller = new AbortController() // To be able to cancel the fetch request
    controllerRef.current = controller

    setIsSendingPrompt(true)

    fetch(`/chat/${chatSession.id}/prompt`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'text/event-stream',
      },
      body: JSON.stringify({ prompt: data.prompt }),
      signal: controller.signal,
    })
      .then(async (response) => {
        setIsSendingPrompt(false)
        form.reset({ prompt: '' })

        setMessages((previousMessages) => [
          ...previousMessages,
          {
            id: new Date().toISOString(),
            content: data.prompt,
            role: 'User',
            sessionId: chatSession.id,
            created,
          },
        ])

        setIsStreamingResponse(true)

        const created = new Date()

        const reader = response.body?.getReader()
        let streamContent = '' // To accumulate streaming response content

        // eslint-disable-next-line no-constant-condition
        while (true) {
          if (!reader) break
          // eslint-disable-next-line no-await-in-loop
          const { done, value } = await reader.read()
          if (done) break

          const text = new TextDecoder().decode(value)
          streamContent += text

          if (streamingResponseMessageRef.current) {
            const htmlWithLineBreaks = (
              streamingResponseMessageRef.current.innerHTML + text
            ).replaceAll('\n', '<br>')
            streamingResponseMessageRef.current.innerHTML = htmlWithLineBreaks
          }

          scrollToBottomOfMessages()
        }

        setIsStreamingResponse(false)
        streamingResponseMessageRef.current &&
          (streamingResponseMessageRef.current.textContent = '')

        setMessages((previousMessages) => [
          ...previousMessages,
          {
            id: new Date().toISOString(),
            content: streamContent,
            role: 'Assistant',
            sessionId: chatSession.id,
            created,
          },
        ])
      })
      .catch((error) => {
        console.error('Fetch error:', error)
        setError('Une erreur est survenue')
        setIsStreamingResponse(false)
        setIsSendingPrompt(false)
        streamingResponseMessageRef.current &&
          (streamingResponseMessageRef.current.textContent = '')
      })

    // Cleanup function to abort fetch on unmount
    return () => controller.abort()
  })

  return (
    <div className={styles.sessionContainer}>
      <div className={styles.messages} ref={messagesContainerRef}>
        {messages.length === 0 && (
          <div className="fr-flex fr-width-full fr-direction-column fr-align-items-center fr-justify-content-center fr-height-full">
            <h2>Comment puis-je vous aider ?</h2>
          </div>
        )}
        {messages.map((message) => (
          <ChatMessage key={message.id} message={message} />
        ))}
        <ChatMessage
          contentRef={streamingResponseMessageRef}
          style={{ display: isStreamingResponse ? 'block' : 'none' }}
          message={{
            role: 'Assistant',
            content: '',
          }}
        />
        {!!error && <p className="fr-error-text">{error}</p>}

        {/* This div is used as a marker for scrolling to the bottom */}
        <div ref={messagesEndRef} />
      </div>
      <div className={styles.inputContainer}>
        <form onSubmit={onSubmit}>
          <div
            className={classNames(
              'fr-flex fr-flex-gap-4v fr-align-items-center fr-width-full',
              styles.input,
            )}
          >
            <InputFormField
              className="fr-flex-grow-1"
              control={form.control}
              path="prompt"
              placeholder="Votre message..."
            />
            {isStreamingResponse ? (
              <Button
                priority="secondary"
                iconId="fr-icon-stop-circle-line"
                type="button"
                onClick={onAbort}
                size="small"
              >
                Stop
              </Button>
            ) : (
              <Button
                priority="primary"
                iconId="fr-icon-check-line"
                type="submit"
                size="small"
                {...buttonLoadingClassname(isSendingPrompt)}
              >
                Envoyer
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  )
}

export default ChatSession
