'use client'

import { useDsfrModalIsBound } from '@app/ui/hooks/useDsfrModalIsBound'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { UserNewsFeed } from '@app/web/features/fil-d-actualite/db/getNewsFeed'
import {
  NewsFeedSkipOnboardingCommand,
  NewsFeedSkipOnboardingValidation,
} from '@app/web/features/fil-d-actualite/onboarding/onboarding'
import { trpc } from '@app/web/trpc'
import Button from '@codegouvfr/react-dsfr/Button'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import Notice from '@codegouvfr/react-dsfr/Notice'
import { zodResolver } from '@hookform/resolvers/zod'
import * as Sentry from '@sentry/nextjs'
import classNames from 'classnames'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'

export const NewsFeedOnboardingSkipModal = createModal({
  id: `news-feed-onboarding-modal`,
  isOpenedByDefault: false,
})

const NewsFeedOnboardingSkipButton = ({
  userNewsFeed,
}: {
  userNewsFeed: UserNewsFeed | null
}) => {
  const modal = useDsfrModalIsBound('news-feed-onboarding-modal')
  const mutate = trpc.newsFeed.skip.useMutation()
  const router = useRouter()
  const form = useForm<NewsFeedSkipOnboardingCommand>({
    resolver: zodResolver(NewsFeedSkipOnboardingValidation),
    defaultValues: { hasCompleteOnboarding: false },
  })

  const shouldRedirect =
    !userNewsFeed ||
    (userNewsFeed &&
      userNewsFeed.monthlyNewsletter === false &&
      userNewsFeed.themes.length === 0 &&
      userNewsFeed.professionalSectors.length === 0)

  const onSkip = async () => {
    try {
      await mutate.mutateAsync({ hasCompleteOnboarding: false })
      router.push('/')
      router.refresh()
    } catch (error) {
      Sentry.captureException(error)
    }
  }

  if (shouldRedirect) {
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

  const handleModal = () => {
    if (modal) {
      NewsFeedOnboardingSkipModal.open()
    }
  }

  return (
    <>
      <Button
        className={classNames('fr-link fr-text--underline fr-flex')}
        priority="tertiary no outline"
        type="button"
        onClick={handleModal}
      >
        Revenir plus tard
      </Button>
      <form onSubmit={form.handleSubmit(onSkip)}>
        <NewsFeedOnboardingSkipModal.Component
          title="Êtes-vous sûr de vouloir quitter le choix de vos préférences ?"
          buttons={[
            {
              title: 'Annuler',
              priority: 'secondary',
              doClosesModal: true,
              children: 'Annuler',
              type: 'button',
            },
            {
              title: 'Quitter',
              doClosesModal: true,
              children: 'Quitter',
              type: 'submit',
            },
          ]}
        >
          <p className="fr-my-4w">
            <span className="fr-text--bold">À savoir :</span> Vous ne pourrez
            pas profiter du fil d’actualité sans avoir choisis vos préférences.
          </p>
          <Notice
            title="Vous pourrez reprendre ce choix à tout moment en cliquant sur
                l’icône du fil d’actualité dans la barre de navigation."
          />
        </NewsFeedOnboardingSkipModal.Component>
      </form>
    </>
  )
}

export default withTrpc(NewsFeedOnboardingSkipButton)
