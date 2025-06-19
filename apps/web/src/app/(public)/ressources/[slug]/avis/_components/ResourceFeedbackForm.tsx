'use client'

import InputFormField from '@app/ui/components/Form/InputFormField'
import RadioFormField from '@app/ui/components/Form/RadioFormField'
import { createToast } from '@app/ui/toast/createToast'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import type { SessionUser } from '@app/web/auth/sessionUser'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import type { ResourceProjection } from '@app/web/server/resources/feature/createResourceProjection'
import {
  type SendResourceFeedbackClientData,
  SendResourceFeedbackClientValidation,
} from '@app/web/server/resources/sendResourceFeedback'
import { trpc } from '@app/web/trpc'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import ButtonsGroup from '@codegouvfr/react-dsfr/ButtonsGroup'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useForm } from 'react-hook-form'

const toastMessage = ({
  isPublic,
  isUpdated,
}: {
  isPublic: boolean
  isUpdated: boolean
}) => {
  if (isUpdated) return 'Avis mis à jour'
  if (isPublic) return 'Avis partagé'
  return 'Avis partagé au créateur et contributeurs de la ressource'
}

const ResourceFeedbackForm = ({
  user,
  feedback,
  resource,
  onDismiss,
  isEditing = false,
}: {
  user: SessionUser | null
  resource: ResourceProjection
  feedback?: {
    comment: string | null
    rating: number
  }
  onDismiss?: () => void
  isEditing?: boolean
}) => {
  const router = useRouter()

  const form = useForm<SendResourceFeedbackClientData>({
    resolver: zodResolver(SendResourceFeedbackClientValidation),
    defaultValues: {
      rating: feedback?.rating ? `${feedback.rating}` : undefined,
      comment: feedback?.comment,
      resourceId: resource.id,
    },
  })

  const mutate = trpc.resource.feedback.useMutation()

  const isLoading = form.formState.isSubmitting || mutate.isPending

  const handleSave = async (data: SendResourceFeedbackClientData) => {
    await mutate
      .mutateAsync(data)
      .then((newFeedback) => {
        onDismiss?.()
        router.refresh()
        return createToast({
          priority: 'success',
          message: toastMessage({
            isPublic: resource.publicFeedback,
            isUpdated:
              newFeedback.created.getTime() !== newFeedback.updated.getTime(),
          }),
        })
      })
      .catch((error: unknown) => {
        createToast({
          priority: 'error',
          message: 'Une erreur est survenue, merci de réessayer ultérieurement',
        })
        applyZodValidationMutationErrorsToForm(error, form.setError)
      })
  }

  const requestLogin = () => {
    if (user == null)
      router.push(`/connexion?suivant=/ressources/${resource.slug}/avis`)
  }

  return (
    <form onSubmit={form.handleSubmit(handleSave)} onChange={requestLogin}>
      <RadioFormField
        className="fr-radio--card"
        control={form.control}
        path="rating"
        options={[
          {
            label: (
              <div className="fr-flex fr-flex-gap-1v fr-text--center fr-align-self-sm-center fr-direction-row fr-direction-sm-column">
                <div
                  className="ri-emotion-unhappy-fill ri-2x fr-text-default--error fr-width-full fr-mr-1w"
                  aria-hidden
                />
                Non
              </div>
            ) as unknown as string,
            value: '1',
          },
          {
            label: (
              <div className="fr-flex fr-flex-gap-1v fr-text--center fr-align-self-sm-center fr-direction-row fr-direction-sm-column">
                <div
                  className="ri-emotion-normal-fill ri-2x fr-text-default--warning fr-width-full fr-mr-1w"
                  aria-hidden
                />
                Moyen
              </div>
            ) as unknown as string,
            value: '2',
          },
          {
            label: (
              <div className="fr-flex fr-flex-gap-1v fr-text--center fr-align-self-sm-center fr-direction-row fr-direction-sm-column">
                <div
                  className="ri-emotion-happy-fill ri-2x fr-text-default--success fr-width-full fr-mr-1w"
                  aria-hidden
                />
                Oui
              </div>
            ) as unknown as string,
            value: '3',
          },
          {
            label: (
              <div className="fr-flex fr-flex-gap-1v fr-text--center fr-align-self-sm-center fr-direction-row fr-direction-sm-column">
                <div
                  className="ri-emotion-fill ri-2x fr-quote--green-emeraude fr-width-full fr-mr-1w"
                  aria-hidden
                />
                Beaucoup
              </div>
            ) as unknown as string,
            value: '4',
          },
        ]}
        disabled={isLoading}
        label="Recommandez-vous cette ressource ?"
      />
      <InputFormField
        control={form.control}
        path="comment"
        type="textarea"
        rows={4}
        disabled={isLoading}
        label={
          resource.publicFeedback
            ? 'Laissez un avis (optionnel)'
            : 'Partagez un commentaire privé au créateur de la ressource'
        }
        hint="Partagez un retour d’expérience sur la ressource, une suggestion d’amélioration...."
        onClick={requestLogin}
      />
      <ButtonsGroup
        inlineLayoutWhen="always"
        className="fr-mt-5w fr-direction-sm-row-reverse fr-direction-column"
        buttons={[
          {
            type: 'submit',
            children: 'Partager mon avis',
            ...buttonLoadingClassname(isLoading, 'fr-width-full'),
            disabled: isLoading,
          },
          {
            type: 'button',
            children: 'Annuler',
            priority: 'secondary',
            className: 'fr-width-full',
            disabled: isLoading || (!form.formState.isDirty && !isEditing),
            onClick: () => {
              form.reset()
              onDismiss?.()
            },
          },
        ]}
      />
    </form>
  )
}

export default withTrpc(ResourceFeedbackForm)
