'use client'

import { withTrpc } from '@app/web/components/trpc/withTrpc'
import {
  NewsFeedSkipOnboardingCommand,
  NewsFeedSkipOnboardingValidation,
} from '@app/web/features/fil-d-actualite/onboarding/onboarding'
import { trpc } from '@app/web/trpc'
import Button from '@codegouvfr/react-dsfr/Button'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Sentry from '@sentry/nextjs'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

const NewsFeedOnboardingSkipButton = () => {
  const mutate = trpc.newsFeed.skip.useMutation()
  const router = useRouter()
  const form = useForm<NewsFeedSkipOnboardingCommand>({
    resolver: zodResolver(NewsFeedSkipOnboardingValidation),
    defaultValues: { hasCompleteOnboarding: false },
  })

  const onSkip = async () => {
    try {
      await mutate.mutateAsync({ hasCompleteOnboarding: false })
      router.refresh()
      router.push('/')
    } catch (error) {
      Sentry.captureException(error)
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSkip)}>
      <Button
        className={classNames('fr-link fr-text--underline fr-flex')}
        priority="tertiary no outline"
      >
        Revenir plus tard
      </Button>
    </form>
  )
}

export default withTrpc(NewsFeedOnboardingSkipButton)
