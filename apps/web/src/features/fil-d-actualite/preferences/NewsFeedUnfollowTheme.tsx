'use client'

import { createToast } from '@app/ui/toast/createToast'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { UserNewsFeed } from '@app/web/features/fil-d-actualite/db/getNewsFeed'
import { UpdateNewsFeedThemesCommand } from '@app/web/features/fil-d-actualite/onboarding/themes/newsFeedThemes'
import { trpc } from '@app/web/trpc'
import Button from '@codegouvfr/react-dsfr/Button'
import { Theme } from '@prisma/client'
import * as Sentry from '@sentry/nextjs'
import { useRouter } from 'next/navigation'

const NewsFeedUnfollowTheme = ({
  theme,
  userNewsFeed,
}: {
  theme: Theme
  userNewsFeed: UserNewsFeed | null
}) => {
  const router = useRouter()
  const mutate = trpc.newsFeed.updateThemes.useMutation()

  const onSubmit = async () => {
    if (!userNewsFeed) return

    const updatedThemes = userNewsFeed.themes.filter((t) => t !== theme)
    const data: UpdateNewsFeedThemesCommand = {
      themes: updatedThemes,
    }

    try {
      await mutate.mutateAsync(data, {
        onSuccess: () => {
          router.refresh()
          createToast({
            priority: 'success',
            message: 'Vos préférences ont été mises à jour.',
          })
        },
      })
    } catch (error) {
      Sentry.captureException(error)
    }
  }

  return (
    <Button
      priority="tertiary"
      size="small"
      onClick={onSubmit}
      disabled={mutate.isPending}
    >
      Ne plus suivre
    </Button>
  )
}

export default withTrpc(NewsFeedUnfollowTheme)
