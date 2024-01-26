'use client'

import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useModalVisibility } from '@app/ui/hooks/useModalVisibility'
import { createToast } from '@app/ui/toast/createToast'
import * as Sentry from '@sentry/nextjs'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import RedAsterisk from '@app/ui/components/Form/RedAsterisk'
import InputFormField from '@app/ui/components/Form/InputFormField'
import React, { useEffect } from 'react'
import RatingButtonsFormField from '@app/ui/components/Form/RatingButtonsFormField'
import RadioFormField from '@app/ui/components/Form/RadioFormField'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import { trpc } from '@app/web/trpc'
import {
  difficultyAreasOptions,
  SendFeedbackData,
  SendFeedbackValidation,
} from '@app/web/feedback/SendFeedback'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { feedbackModalId } from '@app/web/components/Feedback/feedbackModalProps'
import {
  yesNoBooleanOptions,
  yesNoToBoolean,
} from '@app/web/utils/yesNoBooleanOptions'

export const feedbackModal = createModal({
  isOpenedByDefault: false,
  id: feedbackModalId,
})

const FeedbackModal = () => {
  const { handleSubmit, control, watch, setValue, reset, setError } =
    useForm<SendFeedbackData>({
      defaultValues: {},
      resolver: zodResolver(SendFeedbackValidation),
    })

  const mutation = trpc.feedback.send.useMutation()

  useModalVisibility(feedbackModal.id, {
    onClosed: () => {
      reset({})
      mutation.reset()
    },
  })

  const onSubmit = async (data: SendFeedbackData) => {
    try {
      await mutation.mutateAsync(data)
      createToast({
        priority: 'success',
        message: 'Questionnaire de satisfaction envoyé.',
      })
      feedbackModal.close()
    } catch (error) {
      if (applyZodValidationMutationErrorsToForm(error, setError)) {
        return
      }

      mutation.reset()
      reset(data)
      createToast({
        priority: 'error',
        message: 'Une erreur est survenue lors de l’envoi du questionnaire.',
      })
      Sentry.captureException(error)
    }
  }

  const isLoading = mutation.isPending || mutation.isSuccess

  const hadDifficulty = yesNoToBoolean(watch('hadDifficulty'))
  const comment = watch('comment')
  const hasComment = comment && comment.length > 0

  useEffect(() => {
    if (!hadDifficulty) {
      // eslint-disable-next-line unicorn/no-useless-undefined
      setValue('difficultyArea', undefined)
      // eslint-disable-next-line unicorn/no-useless-undefined
      setValue('difficultyComment', undefined)
    }
  }, [hadDifficulty, setValue])

  useEffect(() => {
    if (!hasComment) {
      // eslint-disable-next-line unicorn/no-useless-undefined
      setValue('wantsToBeContacted', undefined)
    }
  }, [hasComment, setValue])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <feedbackModal.Component
        size="large"
        title="Je donne mon avis"
        buttons={[
          {
            priority: 'secondary',
            doClosesModal: true,
            children: 'Annuler',
            type: 'button',
            disabled: isLoading,
          },
          {
            priority: 'primary',
            doClosesModal: false,
            children: 'Envoyer',
            type: 'submit',
            ...buttonLoadingClassname(isLoading),
          },
        ]}
      >
        <p className="fr-text--sm fr-hint-text fr-mb-8v">
          Les champs avec <RedAsterisk /> sont obligatoires.
        </p>

        <RatingButtonsFormField
          control={control}
          path="rating"
          label="Dans quelle mesure êtes-vous satisfait de la qualité globale de la plateforme ?"
          asterisk
          disabled={isLoading}
          min={0}
          max={10}
        />

        <RadioFormField
          control={control}
          path="hadDifficulty"
          options={yesNoBooleanOptions}
          asterisk
          disabled={isLoading}
          label="Avez-vous rencontré des difficultés ?"
        />

        {hadDifficulty && (
          <>
            <RadioFormField
              control={control}
              path="difficultyArea"
              options={difficultyAreasOptions}
              disabled={isLoading}
              label="Où avez-vous rencontré ces difficultés ?"
            />

            <InputFormField
              control={control}
              path="difficultyComment"
              label="Précisez le problème que vous avez rencontré"
              disabled={isLoading}
              type="textarea"
              rows={4}
            />
          </>
        )}

        <InputFormField
          control={control}
          path="comment"
          label="Souhaitez-vous nous en dire davantage ?"
          hint="Exemple : propositions d'améliorations, besoin d'une nouvelle fonctionnalité, besoins d'informations..."
          disabled={isLoading}
          type="textarea"
          rows={4}
          className="fr-mb-4v"
        />

        {hasComment && (
          <InputFormField
            control={control}
            path="wantsToBeContacted"
            disabled={isLoading}
            label="Si vous souhaitez être recontacté pour discuter de votre besoin ou d'un problème rencontré sur la plateforme, nous vous invitons à renseigner votre email ici :"
            className="fr-mb-4v"
          />
        )}
        {/* Spacer */}
        <div className="fr-pb-6v" />
      </feedbackModal.Component>
    </form>
  )
}

export default withTrpc(FeedbackModal)
