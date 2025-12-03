'use client'

import { createToast } from '@app/ui/toast/createToast'
import type { SessionUser } from '@app/web/auth/sessionUser'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import type { ResourceProjection } from '@app/web/server/resources/feature/createResourceProjection'
import { trpc } from '@app/web/trpc'
import ButtonsGroup from '@codegouvfr/react-dsfr/ButtonsGroup'
import * as Sentry from '@sentry/nextjs'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ResourceFeedbackEditForm } from './ResourceFeedbackEditForm'

interface ResourceFeedbackThreadActionsProps {
  isOwner: boolean
  commentId: string
  currentCommentContent: string
  user: SessionUser | null
  resource: ResourceProjection
  className?: string
}

const ResourceFeedbackThreadActionsComponent = ({
  isOwner,
  commentId,
  currentCommentContent,
  user,
  resource,
  className,
}: ResourceFeedbackThreadActionsProps) => {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const deleteMutation = trpc.resource.deleteFeedbackComment.useMutation()

  const handleDelete = async () => {
    if (isDeleting) return

    setIsDeleting(true)
    try {
      await deleteMutation.mutateAsync({ commentId })
      createToast({
        priority: 'success',
        message: 'Votre commentaire a été supprimé avec succès',
      })
      router.refresh()
    } catch (error) {
      createToast({
        priority: 'error',
        message:
          'Une erreur est survenue lors de la suppression du commentaire',
      })
      Sentry.captureException(error)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleCancelEdit = () => {
    setIsEditing(false)
  }

  if (!isOwner) return null

  return (
    <div className={className}>
      {!isEditing ? (
        <ButtonsGroup
          inlineLayoutWhen="always"
          buttons={[
            {
              type: 'button',
              size: 'small',
              priority: 'tertiary no outline',
              className: 'fr-pl-1w fr-my-0 fr-py-0',
              iconId: 'fr-icon-edit-line',
              children: 'Modifier',
              onClick: handleEdit,
              nativeButtonProps: {
                'data-testid': 'edit-feedback-comment',
              },
            },
            {
              type: 'button',
              size: 'small',
              priority: 'tertiary no outline',
              className: 'fr-pl-1w fr-my-0 fr-py-0',
              disabled: isDeleting,
              nativeButtonProps: {
                'data-testid': 'delete-feedback-comment',
              },
              iconId: 'fr-icon-delete-bin-line',
              children: isDeleting ? 'Suppression...' : 'Supprimer',
              onClick: handleDelete,
            },
          ]}
        />
      ) : (
        <ResourceFeedbackEditForm
          commentId={commentId}
          currentCommentContent={currentCommentContent}
          user={user}
          resource={resource}
          onCancel={handleCancelEdit}
        />
      )}
    </div>
  )
}

export const ResourceFeedbackThreadActions = withTrpc(
  ResourceFeedbackThreadActionsComponent,
)
