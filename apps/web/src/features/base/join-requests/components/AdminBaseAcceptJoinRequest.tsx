'use client'

import { createToast } from '@app/ui/toast/createToast'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import Button from '@codegouvfr/react-dsfr/Button'
import { useRouter } from 'next/navigation'

const AdminBaseAcceptJoinRequest = ({
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
  const acceptJoinRequestMutation = trpc.baseJoinRequest.accept.useMutation()

  const handleAcceptRequest = async () => {
    try {
      await acceptJoinRequestMutation.mutateAsync({ requestId: request.id })
      router.refresh()
      createToast({
        priority: 'success',
        message: `${request.applicant.name} a bien rejoint votre base en tant que contributeur`,
      })
    } catch {
      createToast({
        priority: 'error',
        message: "Une erreur est survenue lors de l'acceptation de la demande",
      })
    }
  }

  return (
    <Button
      size="small"
      priority="primary"
      onClick={handleAcceptRequest}
      disabled={acceptJoinRequestMutation.isPending}
    >
      {acceptJoinRequestMutation.isPending ? 'Acceptation...' : 'Accepter'}
      <span className="ri-check-line fr-ml-1w" aria-hidden />
    </Button>
  )
}

export default withTrpc(AdminBaseAcceptJoinRequest)
