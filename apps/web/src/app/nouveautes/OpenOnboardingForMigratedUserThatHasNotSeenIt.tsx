'use client'

import {
  hasOpenedOnboardingV2Cookie,
  hasSeenOnboardingV2Cookie,
} from '@app/web/app/nouveautes/onboardingV2Cookie'
import type { SessionUser } from '@app/web/auth/sessionUser'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const OpenOnboardingForMigratedUserThatHasNotSeenIt = ({
  user,
}: {
  user: SessionUser
}) => {
  const { mutate, isSuccess } = trpc.user.markOnboardingV2AsSeen.useMutation()
  const router = useRouter()

  useEffect(() => {
    if (user.hasSeenV2Onboarding || !user.legacyId) {
      // No-op, already seen or new user (not migrated)
      return
    }

    const hasOpenedItRecently = Cookies.get(hasOpenedOnboardingV2Cookie)
    if (hasOpenedItRecently) {
      // User has not seen the onboarding, but has opened it recently, we do not redirect them
      return
    }

    const hasSeenWhileSignedOut = Cookies.get(hasSeenOnboardingV2Cookie)
    if (hasSeenWhileSignedOut) {
      // To prevent the user from seeing the onboarding again when he logs in, we mark has seen if cookie exists
      mutate()
      return
    }

    // User has not seen the onboarding, we redirect him to the onboarding if he has not closed it yet
    router.push('/nouveautes')
  }, [user.hasSeenV2Onboarding, mutate, user.legacyId, router.push])

  useEffect(() => {
    // User has been marked as having seen the onboarding, refresh to have the new state
    if (isSuccess) {
      router.refresh()
    }
  }, [router.refresh, isSuccess])

  return null
}

export default withTrpc(OpenOnboardingForMigratedUserThatHasNotSeenIt)
