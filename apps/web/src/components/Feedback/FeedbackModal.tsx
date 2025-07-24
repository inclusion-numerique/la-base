'use client'

import InputFormField from '@app/ui/components/Form/InputFormField'
import RadioFormField from '@app/ui/components/Form/RadioFormField'
import RatingButtonsFormField from '@app/ui/components/Form/RatingButtonsFormField'
import RedAsterisk from '@app/ui/components/Form/RedAsterisk'
import { useModalVisibility } from '@app/ui/hooks/useModalVisibility'
import { createToast } from '@app/ui/toast/createToast'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import { feedbackModalId } from '@app/web/components/Feedback/feedbackModalProps'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import {
  type SendFeedbackData,
  SendFeedbackValidation,
  difficultyAreasOptions,
} from '@app/web/feedback/SendFeedback'
import { trpc } from '@app/web/trpc'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import {
  yesNoBooleanOptions,
  yesNoToBoolean,
} from '@app/web/utils/yesNoBooleanOptions'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Sentry from '@sentry/nextjs'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

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
  const hasComment = watch('comment') || watch('difficultyComment')

  useEffect(() => {
    if (!hadDifficulty) {
      setValue('difficultyArea', undefined)

      setValue('difficultyComment', undefined)
    }
  }, [hadDifficulty, setValue])

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <feedbackModal.Component
        size="medium"
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
          min={1}
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
              asterisk
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
            label="Adresse email de contact"
            placeholder="Entrez votre email"
            hint="Afin de bien comprendre & résoudre votre problème, veuillez renseigner une adresse email sur laquelle nous pouvons vous contacter."
            className="fr-mb-4v"
            asterisk
          />
        )}
        <div className="fr-pb-6v" />
      </feedbackModal.Component>
    </form>
  )
}

export default withTrpc(FeedbackModal)
