'use client'

import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import SignoutButton from '@app/web/app/(public)/(authentication)/deconnexion/SignoutButton'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import Button from '@codegouvfr/react-dsfr/Button'
import { useRouter } from 'next/navigation'

const UpdateCguButtons = ({
  suivant,
  proConnectIdTokenHint,
}: {
  suivant: string
  proConnectIdTokenHint: string | null
}) => {
  const router = useRouter()
  const mutation = trpc.user.acceptCurrentCgu.useMutation()

  const onAccept = async () => {
    await mutation.mutateAsync()
    router.push(suivant)
  }

  const isLoading = mutation.isPending || mutation.isSuccess

  return (
    <div className="fr-width-full fr-flex fr-flex-gap-6v fr-justify-content-end">
      <SignoutButton
        proConnectIdTokenHint={proConnectIdTokenHint}
        className=""
        priority="secondary"
        disabled={isLoading}
        callbackUrl={suivant}
      >
        Je refuse
      </SignoutButton>

      <Button
        priority="primary"
        type="button"
        onClick={onAccept}
        data-testid="accept-cgu-button"
        {...buttonLoadingClassname(isLoading, '')}
      >
        J’accepte
      </Button>
    </div>
  )
}

export default withTrpc(UpdateCguButtons)
