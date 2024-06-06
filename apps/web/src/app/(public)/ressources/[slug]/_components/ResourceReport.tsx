'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import SelectFormField from '@app/ui/components/Form/SelectFormField'
import InputFormField from '@app/ui/components/Form/InputFormField'
import { zodResolver } from '@hookform/resolvers/zod'
import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import { createToast } from '@app/ui/toast/createToast'
import RedAsterisk from '@app/ui/components/Form/RedAsterisk'
import { useModalVisibility } from '@app/ui/hooks/useModalVisibility'
import * as Sentry from '@sentry/nextjs'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import {
  ResourceReportData,
  resourceReportReasonOptions,
  ResourceReportValidation,
} from '@app/web/resources/resourceReport'
import { trpc } from '@app/web/trpc'
import { applyZodValidationMutationErrorsToForm } from '@app/web/utils/applyZodValidationMutationErrorsToForm'
import { ResourceReportModal } from './ResourceReportModal'

const ResourceReport = ({ resourceId }: { resourceId: string }) => {
  const { handleSubmit, control, reset, setError } =
    useForm<ResourceReportData>({
      defaultValues: {
        resourceId,
      },
      resolver: zodResolver(ResourceReportValidation),
    })

  const mutation = trpc.report.resource.useMutation()

  useModalVisibility(ResourceReportModal.id, {
    onClosed: () => {
      reset({
        resourceId,
      })
      mutation.reset()
    },
  })

  const onSubmit = async (data: ResourceReportData) => {
    try {
      await mutation.mutateAsync(data)
      createToast({ priority: 'success', message: 'Signalement envoyé.' })
      ResourceReportModal.close()
    } catch (error) {
      if (applyZodValidationMutationErrorsToForm(error, setError)) {
        return
      }

      mutation.reset()
      reset(data)
      createToast({
        priority: 'error',
        message: 'Une erreur est survenue lors de l’envoi du signalement.',
      })
      Sentry.captureException(error)
    }
  }

  const isLoading = mutation.isPending || mutation.isSuccess

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ResourceReportModal.Component
        title="Signaler la ressource"
        buttons={[
          {
            title: 'Annuler',
            priority: 'secondary',
            doClosesModal: true,
            children: 'Annuler',
            type: 'button',
            disabled: isLoading,
          },
          {
            title: 'Signaler',
            priority: 'primary',
            doClosesModal: false,
            children: 'Signaler',
            type: 'submit',
            ...buttonLoadingClassname(isLoading),
          },
        ]}
      >
        <p>
          Veuillez indiquez le motif de signalement et le préciser dans votre
          message. Nous prendrons en compte votre signalement au plus vite.
        </p>
        <p className="fr-text--sm fr-hint-text fr-mb-8v">
          Les champs avec <RedAsterisk /> sont obligatoires.
        </p>
        <SelectFormField
          control={control}
          disabled={isLoading}
          path="reason"
          label="Motif du signalement"
          asterisk
          options={[
            { value: '', name: 'Sélectionnez un motif' },
            ...resourceReportReasonOptions,
          ]}
          className="fr-mb-8v"
        />
        <InputFormField
          control={control}
          path="comment"
          label="Description du signalement"
          asterisk
          disabled={isLoading}
          type="textarea"
          rows={4}
        />
      </ResourceReportModal.Component>
    </form>
  )
}

export default withTrpc(ResourceReport)
