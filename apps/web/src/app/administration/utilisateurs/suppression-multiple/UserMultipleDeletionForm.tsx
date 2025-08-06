'use client'

import InputFormField from '@app/ui/components/Form/InputFormField'
import { createToast } from '@app/ui/toast/createToast'
import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import Button from '@codegouvfr/react-dsfr/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const userIdsToArray = (userIds: string) =>
  userIds
    .split('\n')
    .flatMap((line) => line.split(','))
    .map((id) => id.trim())
    .filter(Boolean)

const UserMultipleDeletionForm = () => {
  const form = useForm<{ userIds: string }>({
    resolver: zodResolver(
      z.object({
        userIds: z.string().min(10),
      }),
    ),
    defaultValues: { userIds: '' },
  })
  const mutation = trpc.profile.deleteMultiple.useMutation()
  const router = useRouter()

  const userIdsArray = userIdsToArray(form.watch('userIds'))

  const onSubmit = async ({ userIds }: { userIds: string }) => {
    const inputUserIds = userIdsToArray(userIds)

    try {
      await mutation.mutateAsync({
        userIds: inputUserIds,
      })

      createToast({
        priority: 'success',
        message: `${inputUserIds.length} profils supprimés`,
      })
      router.push('/administration/utilisateurs')
      router.refresh()
    } catch {
      createToast({
        priority: 'error',
        message: 'Erreur lors de la suppression des profils',
      })
    }
  }

  const isLoading = mutation.isPending || mutation.isSuccess
  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <InputFormField
        control={form.control}
        path="userIds"
        label="Liste des ids a supprimer"
        hint="Les ids doivent être séparés par une virgule ou un retour à la ligne"
        info={`${userIdsArray.length} ids de profils détécté${sPluriel(
          userIdsArray.length,
        )}`}
        asterisk
        disabled={isLoading}
        type="textarea"
        rows={12}
      />
      <Button
        type="submit"
        iconId="fr-icon-delete-line"
        className="fr-btn--danger"
        disabled={isLoading}
        size="small"
      >
        Supprimer {userIdsArray.length} profils
      </Button>
    </form>
  )
}

export default withTrpc(UserMultipleDeletionForm)
