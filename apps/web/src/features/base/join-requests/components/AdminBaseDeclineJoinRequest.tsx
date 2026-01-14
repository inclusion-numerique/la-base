'use client'

import { createToast } from '@app/ui/toast/createToast'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import Button from '@codegouvfr/react-dsfr/Button'
import { useRouter } from 'next/navigation'

const AdminBaseDeclineJoinRequest = ({
  request,
}: {
  request: {
    id: string
    applicant: {
      email: string
      name?: string | null
      firstName?: string | null
      lastName?: string | null
    }
  }
}) => {
  const router = useRouter()
  const declineJoinRequestMutation = trpc.baseJoinRequest.decline.useMutation()

  const handleDeclineRequest = async () => {
    try {
      await declineJoinRequestMutation.mutateAsync({ requestId: request.id })
      router.refresh()
      createToast({
        priority: 'success',
        message: `La demande de ${
          request.applicant.firstName ||
          request.applicant.name ||
          request.applicant.email
        } a été refusée`,
      })
    } catch {
      createToast({
        priority: 'error',
        message: 'Une erreur est survenue lors du refus de la demande',
      })
    }
  }

  return (
    <Button
      size="small"
      priority="secondary"
      onClick={handleDeclineRequest}
      disabled={declineJoinRequestMutation.isPending}
    >
      {declineJoinRequestMutation.isPending ? 'Refus...' : 'Refuser'}
      <span className="ri-close-line fr-ml-1w" aria-hidden />
    </Button>
  )
}

export default withTrpc(AdminBaseDeclineJoinRequest)
