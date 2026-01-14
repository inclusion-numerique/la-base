'use client'

import { createToast } from '@app/ui/toast/createToast'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import Button from '@codegouvfr/react-dsfr/Button'
import { useRouter } from 'next/navigation'

const BaseCancelJoinRequest = ({
  base,
}: {
  base: { id: string; title: string }
}) => {
  const router = useRouter()
  const cancelJoinRequestMutation = trpc.baseJoinRequest.remove.useMutation()

  const handleCancelRequest = async () => {
    try {
      await cancelJoinRequestMutation.mutateAsync({ baseId: base.id })
      router.refresh()
      createToast({
        priority: 'success',
        message: `Votre demande pour rejoindre la base ${base.title} a été annulée`,
      })
    } catch {
      createToast({
        priority: 'error',
        message:
          "Une erreur est survenue lors de l'annulation de votre demande",
      })
    }
  }

  return (
    <Button
      priority="tertiary no outline"
      size="small"
      onClick={handleCancelRequest}
      disabled={cancelJoinRequestMutation.isPending}
    >
      {cancelJoinRequestMutation.isPending ? 'Annulation...' : 'Annuler'}
      <span className="ri-close-circle-line fr-ml-1w" aria-hidden />
    </Button>
  )
}

export default withTrpc(BaseCancelJoinRequest)
