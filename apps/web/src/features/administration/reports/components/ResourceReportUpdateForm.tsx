'use client'

import InputFormField from '@app/ui/components/Form/InputFormField'
import { createToast } from '@app/ui/toast/createToast'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { ReportedResource } from '@app/web/features/administration/reports/db/getReportedResourcesList'
import {
  type UpdateResourceReportData,
  UpdateResourceReportValidation,
} from '@app/web/resources/resourceReport'
import { trpc } from '@app/web/trpc'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Sentry from '@sentry/nextjs'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDebounceValue } from 'usehooks-ts'

const modal = createModal({
  id: 'resource-report-update-modal',
  isOpenedByDefault: false,
})

const ResourceReportUpdateForm = ({
  reportedResource,
}: {
  reportedResource: ReportedResource
}) => {
  const [inputHasChanged, setInputHasChanged] = useState(false)

  const form = useForm<UpdateResourceReportData>({
    resolver: zodResolver(UpdateResourceReportValidation),
    defaultValues: {
      reportId: reportedResource.id,
      privateComment: reportedResource.privateComment || '',
    },
  })

  const updateMutation = trpc.report.updatePrivateComment.useMutation()

  const onSubmit = async (data: UpdateResourceReportData) => {
    try {
      await updateMutation.mutateAsync(data)
      createToast({
        priority: 'success',
        message: 'La note interne du signalement a bien été mise à jour',
      })

      modal.close()
    } catch (error) {
      Sentry.captureException(error)
    }
  }

  const privateComment = form.watch('privateComment')
  const [debouncedComment] = useDebounceValue(privateComment, 500)

  useEffect(() => {
    const subscription = form.watch((value, { name }) => {
      if (
        name === 'privateComment' &&
        value.privateComment !== reportedResource.privateComment
      ) {
        setInputHasChanged(true)
      }
    })
    return () => subscription.unsubscribe()
  }, [form, reportedResource.privateComment])

  // biome-ignore lint/correctness/useExhaustiveDependencies: dont want onSubmit on the deps list
  useEffect(() => {
    const shouldAutoSubmit =
      inputHasChanged &&
      debouncedComment !== reportedResource.privateComment &&
      ((!!debouncedComment && debouncedComment.length >= 3) || // 3+ characters
        !debouncedComment ||
        debouncedComment.trim() === '') // -- clear completely

    if (shouldAutoSubmit) {
      const data = form.getValues()
      onSubmit(data)
    }
  }, [debouncedComment, inputHasChanged, reportedResource.privateComment])

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <InputFormField
          control={form.control}
          path="privateComment"
          label="Commentaire privé"
          hint="Ce commentaire ne sera visible que par les administrateurs"
          type="textarea"
          rows={4}
          placeholder="Ajouter des notes internes sur le traitement de ce signalement..."
        />
      </form>
    </>
  )
}

export default withTrpc(ResourceReportUpdateForm)
