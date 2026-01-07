'use client'

import InputFormField from '@app/ui/components/Form/InputFormField'
import { createToast } from '@app/ui/toast/createToast'
import type { SessionUser } from '@app/web/auth/sessionUser'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import {
  type UpdateResourceFeedbackCommentClientData,
  UpdateResourceFeedbackCommentClientValidation,
} from '@app/web/server/resourceFeedbackComment/updateResourceFeedbackComment'
import type { ResourceProjection } from '@app/web/server/resources/feature/createResourceProjection'
import { trpc } from '@app/web/trpc'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import Button from '@codegouvfr/react-dsfr/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

interface ResourceFeedbackEditFormProps {
  commentId: string
  currentCommentContent: string
  user: SessionUser | null
  resource: ResourceProjection
  onCancel: () => void
}

const ResourceFeedbackEditFormComponent = ({
  commentId,
  currentCommentContent,
  user,
  resource,
  onCancel,
}: ResourceFeedbackEditFormProps) => {
  const router = useRouter()

  const editForm = useForm<UpdateResourceFeedbackCommentClientData>({
    resolver: zodResolver(UpdateResourceFeedbackCommentClientValidation),
    defaultValues: {
      commentId,
      content: currentCommentContent,
    },
  })

  const updateMutate = trpc.resource.updateFeedbackComment.useMutation()
  const isLoading = editForm.formState.isSubmitting || updateMutate.isPending

  const requestLogin = () => {
    if (!user) {
      router.push(`/connexion?suivant=/ressources/${resource.slug}/avis`)
    }
  }

  const handleEdit = async (data: UpdateResourceFeedbackCommentClientData) => {
    if (!user) {
      requestLogin()
      return
    }

    try {
      await updateMutate.mutateAsync(data)
      createToast({
        priority: 'success',
        message: 'Votre commentaire a été modifié avec succès',
      })
      onCancel()
      router.refresh()
    } catch (mutationError) {
      if (
        applyZodValidationMutationErrorsToForm(mutationError, editForm.setError)
      ) {
        return
      }
      createToast({
        priority: 'error',
        message:
          'Une erreur est survenue lors de la modification de votre commentaire',
      })
    }
  }

  return (
    <form onSubmit={editForm.handleSubmit(handleEdit)}>
      <InputFormField
        className="fr-mt-2w"
        control={editForm.control}
        path="content"
        type="textarea"
        rows={4}
        disabled={isLoading}
      />
      <div className="fr-flex fr-justify-content-end fr-align-items-center">
        <Button
          type="button"
          priority="tertiary no outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Annuler
        </Button>
        <Button type="submit" priority="primary" disabled={isLoading}>
          Sauvegarder
        </Button>
      </div>
    </form>
  )
}

export const ResourceFeedbackEditForm = withTrpc(
  ResourceFeedbackEditFormComponent,
)
