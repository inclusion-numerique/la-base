'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import ButtonsGroup from '@codegouvfr/react-dsfr/ButtonsGroup'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import { createToast } from '@app/ui/toast/createToast'
import InputFormField from '@app/ui/components/Form/InputFormField'
import RadioFormField from '@app/ui/components/Form/RadioFormField'
import { trpc } from '@app/web/trpc'
import { withTrpc } from '@app/web/components/trpc/withTrpc'

import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import {
  SendResourceFeedbackFormData,
  SendResourceFeedbackValidation,
} from '@app/web/server/resources/sendResourceFeedback'
import { ResourceProjection } from '@app/web/server/resources/feature/createResourceProjection'

const ResourceFeedbackForm = ({
  feedback,
  resource,
  onDismiss,
}: {
  resource: ResourceProjection
  feedback?: {
    comment: string | null
    rating: number
  }
  onDismiss?: () => void
}) => {
  const router = useRouter()

  const form = useForm<SendResourceFeedbackFormData>({
    resolver: zodResolver(SendResourceFeedbackValidation),
    defaultValues: {
      rating: feedback?.rating ? `${feedback.rating}` : undefined,
      comment: feedback?.comment,
      resourceId: resource.id,
    },
  })

  const mutate = trpc.resource.feedback.useMutation()

  const isLoading = form.formState.isSubmitting || mutate.isPending

  const handleSave = async (data: SendResourceFeedbackFormData) => {
    await mutate
      .mutateAsync(data)
      .then(() => {
        onDismiss?.()
        router.refresh()
        return createToast({
          priority: 'success',
          message: 'Avis partagé',
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

  return (
    <form onSubmit={form.handleSubmit(handleSave)}>
      <RadioFormField
        className="fr-radio--card"
        control={form.control}
        path="rating"
        options={[
          {
            name: (
              <div className="fr-text--center fr-align-self-center">
                <div
                  className="ri-emotion-unhappy-fill ri-2x fr-text-default--error fr-mb-1v fr-width-full"
                  aria-hidden
                />
                Non
              </div>
            ) as unknown as string,
            value: '1',
          },
          {
            name: (
              <div className="fr-text--center fr-align-self-center">
                <div
                  className="ri-emotion-normal-fill ri-2x fr-text-default--warning fr-mb-1v fr-width-full"
                  aria-hidden
                />
                Moyen
              </div>
            ) as unknown as string,
            value: '2',
          },
          {
            name: (
              <div className="fr-text--center fr-align-self-center">
                <div
                  className="ri-emotion-happy-fill ri-2x fr-text-default--success fr-mb-1v fr-width-full"
                  aria-hidden
                />
                Oui
              </div>
            ) as unknown as string,
            value: '3',
          },
          {
            name: (
              <div className="fr-text--center fr-align-self-center">
                <div
                  className="ri-emotion-fill ri-2x fr-quote--green-emeraude fr-mb-1v fr-width-full"
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
        label="Laissez un avis (optionnel)"
        hint="Partagez un retour d’expérience sur la ressource, une suggestion d’amélioration...."
      />
      <ButtonsGroup
        inlineLayoutWhen="always"
        className="fr-mt-5w fr-direction-row-reverse"
        buttons={[
          {
            type: 'submit',
            children: 'Partager mon avis',
            ...buttonLoadingClassname(isLoading),
            disabled: isLoading,
          },
          {
            type: 'button',
            children: 'Annuler',
            priority: 'secondary',
            disabled: isLoading,
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