'use client'

import InputFormField from '@app/ui/components/Form/InputFormField'
import { createToast } from '@app/ui/toast/createToast'
import { Comment } from '@app/web/app/(public)/ressources/[slug]/avis/_components/ResourceFeedbackComment'
import { ResourceFeedbackThreadActions } from '@app/web/app/(public)/ressources/[slug]/avis/_components/ResourceFeedbackThreadActions'
import type { SessionUser } from '@app/web/auth/sessionUser'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import {
  type SendResourceFeedbackCommentClientData,
  SendResourceFeedbackCommentClientValidation,
} from '@app/web/server/resourceFeedbackComment/sendResourceFeedbackComment'
import { ResourceProjection } from '@app/web/server/resources/feature/createResourceProjection'
import { formatName } from '@app/web/server/rpc/user/formatName'
import { trpc } from '@app/web/trpc'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import Button from '@codegouvfr/react-dsfr/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface ResourceFeedbackThreadProps {
  user: SessionUser | null
  isFeedbackOwner: boolean
  isCommentOwner?: boolean
  isCommentThread?: boolean
  comment?: Comment
  feedback: {
    comment: string | null
    rating: number
    sentById: string
    resourceId: string
    sentBy: {
      name: string | null
      slug: string | null
    }
  }
  resource: ResourceProjection
}

const ResourceFeedbackThread = ({
  isFeedbackOwner,
  isCommentOwner = false,
  isCommentThread = false,
  comment,
  user,
  feedback,
  resource,
}: ResourceFeedbackThreadProps) => {
  const router = useRouter()

  const form = useForm<SendResourceFeedbackCommentClientData>({
    resolver: zodResolver(SendResourceFeedbackCommentClientValidation),
    defaultValues: {
      content: '',
      feedbackSentById: feedback.sentById,
      feedbackResourceId: feedback.resourceId,
      parentCommentId: comment?.id ?? null,
    },
  })

  const mutate = trpc.resource.addFeedbackComment.useMutation()
  const [textAreaVisible, setTextAreaVisible] = useState(false)

  const isLoading = form.formState.isSubmitting || mutate.isPending

  const requestLogin = () => {
    if (!user) {
      router.push(`/connexion?suivant=/ressources/${resource.slug}/avis`)
    }
  }

  const handleSave = async (data: SendResourceFeedbackCommentClientData) => {
    if (!user) {
      requestLogin()
      return
    }

    try {
      await mutate.mutateAsync(data)
      createToast({
        priority: 'success',
        message: 'Votre commentaire a été envoyé avec succès',
      })
      form.reset()
      setTextAreaVisible(false)
      router.refresh()
    } catch (mutationError) {
      if (
        applyZodValidationMutationErrorsToForm(mutationError, form.setError)
      ) {
        return
      }
      createToast({
        priority: 'error',
        message: "Une erreur est survenue lors de l'envoi de votre commentaire",
      })
    }
  }

  const toggleTextArea = () => {
    if (!user) {
      requestLogin()
      return
    }

    if (!textAreaVisible) {
      const mentionName = !comment
        ? feedback.sentBy.name
          ? formatName(feedback.sentBy.name)
          : feedback.sentBy.slug
        : comment.author.name
          ? formatName(comment.author.name)
          : comment.author.slug
      form.setValue('content', `@${mentionName} : `)
    }

    setTextAreaVisible(!textAreaVisible)
  }

  return (
    <div className="fr-mt-2w">
      {(isCommentThread ? !isCommentOwner : !isFeedbackOwner) && (
        <Button
          type="button"
          onClick={toggleTextArea}
          priority="tertiary no outline"
        >
          <span className="ri-chat-3-line fr-mr-1w" />
          Répondre
        </Button>
      )}

      {isCommentThread && isCommentOwner && comment && (
        <ResourceFeedbackThreadActions
          className="fr-mt-2w"
          isOwner={true}
          commentId={comment.id}
          currentCommentContent={comment.content}
          user={user}
          resource={resource}
        />
      )}

      {textAreaVisible && (
        <form onSubmit={form.handleSubmit(handleSave)}>
          <InputFormField
            className="fr-mt-2w"
            control={form.control}
            path="content"
            type="textarea"
            rows={4}
            disabled={isLoading}
          />
          <div className="fr-flex fr-justify-content-end fr-align-items-center">
            <Button
              type="button"
              priority="tertiary no outline"
              onClick={() => setTextAreaVisible(false)}
            >
              Annuler
            </Button>
            <Button type="submit" priority="primary" disabled={isLoading}>
              Répondre
            </Button>
          </div>
        </form>
      )}
    </div>
  )
}

export const ResourceFeedbackActionsThread = withTrpc(ResourceFeedbackThread)
