'use client'

import ToggleFormField from '@app/ui/components/Form/ToggleFormField'
import { createToast } from '@app/ui/toast/createToast'
import Card from '@app/web/components/Card'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import {
  type UpdateProfileReportEmailNotificationsCommand,
  UpdateProfileReportEmailNotificationsCommandValidation,
} from '@app/web/server/profiles/updateProfile'
import { trpc } from '@app/web/trpc'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const ProfileNotificationsEdition = ({
  reportEmailNotifications,
}: {
  reportEmailNotifications: boolean
}) => {
  const [savedValue, setSavedValue] = useState(reportEmailNotifications)

  const { control, watch } =
    useForm<UpdateProfileReportEmailNotificationsCommand>({
      defaultValues: { reportEmailNotifications },
      resolver: zodResolver(
        UpdateProfileReportEmailNotificationsCommandValidation,
      ),
    })

  const mutation = trpc.profile.updateReportEmailNotifications.useMutation()

  const onSubmit = async (
    data: UpdateProfileReportEmailNotificationsCommand,
  ) => {
    try {
      const result = await mutation.mutateAsync(data)
      setSavedValue(result.reportEmailNotifications)
      createToast({
        priority: 'success',
        message: result.reportEmailNotifications
          ? 'Mails de signalement activés'
          : 'Mails de signalement désactivés',
      })
    } catch {
      createToast({
        priority: 'error',
        message: 'Erreur lors de la modification des notifications',
      })
    }
  }

  const enabledValue = watch('reportEmailNotifications')

  // biome-ignore lint/correctness/useExhaustiveDependencies: onSubmit not wanted in deps array
  useEffect(() => {
    if (enabledValue !== savedValue) {
      onSubmit({ reportEmailNotifications: enabledValue })
    }
  }, [enabledValue, savedValue])

  return (
    <Card
      noBorder
      id="notifications"
      className="fr-border-radius--8 fr-border"
      titleAs="h2"
      title={<span className="fr-text-label--blue-france">Notifications</span>}
    >
      <ToggleFormField
        classes={{ fieldsetElement: 'fr-mb-0' }}
        className="fr-mb-0"
        control={control}
        path="reportEmailNotifications"
        label="Recevoir un mail à chaque ressource signalée"
        hint="En tant que modérateur ou administrateur, vous êtes prévenu par mail lorsqu’un utilisateur signale une ressource."
        labelPosition="left"
        disabled={mutation.isPending}
      />
    </Card>
  )
}

export default withTrpc(ProfileNotificationsEdition)
