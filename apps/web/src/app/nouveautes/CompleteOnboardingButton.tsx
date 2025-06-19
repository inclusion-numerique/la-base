'use client'

import { buttonLoadingClassname } from '@app/ui/utils/buttonLoadingClassname'
import { hasSeenOnboardingV2Cookie } from '@app/web/app/nouveautes/onboardingV2Cookie'
import type { SessionUser } from '@app/web/auth/sessionUser'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import Button from '@codegouvfr/react-dsfr/Button'
import * as Sentry from '@sentry/nextjs'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

const CompleteOnboardingButton = ({ user }: { user?: SessionUser | null }) => {
  const router = useRouter()
  const mutation = trpc.user.markOnboardingV2AsSeen.useMutation()

  const onClick = async () => {
    if (!user) {
      // Set the cookie so that the user doesn't see the onboarding again when he logs in
      Cookies.set(hasSeenOnboardingV2Cookie, new Date().toISOString(), {
        sameSite: 'strict',
        expires: 7,
      })

      router.push('/')
      router.refresh()
      return
    }

    // Send the mutation to register the user as having seen the onboarding
    try {
      await mutation.mutateAsync()
    } catch (error) {
      Sentry.captureException(error)
    }
    router.push('/')
    router.refresh()
  }

  return (
    <Button onClick={onClick} {...buttonLoadingClassname(!mutation.isIdle)}>
      J’ai compris
    </Button>
  )
}

export default withTrpc(CompleteOnboardingButton)
