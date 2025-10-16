'use client'

import { createToast } from '@app/ui/toast/createToast'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { UserNewsFeed } from '@app/web/features/fil-d-actualite/db/getNewsFeed'
import { UpdateNewsFeedSectorsProfessionnalsCommand } from '@app/web/features/fil-d-actualite/onboarding/professionals-sectors/newsFeedProfessionnalsSectors'
import { trpc } from '@app/web/trpc'
import Button from '@codegouvfr/react-dsfr/Button'
import { ProfessionalSector } from '@prisma/client'
import * as Sentry from '@sentry/nextjs'
import { useRouter } from 'next/navigation'

const NewsFeedUnfollowProfessionalSector = ({
  professionalSector,
  userNewsFeed,
}: {
  professionalSector: ProfessionalSector
  userNewsFeed: UserNewsFeed | null
}) => {
  const router = useRouter()
  const mutate = trpc.newsFeed.updateProfessionalSectors.useMutation()

  const onSubmit = async () => {
    if (!userNewsFeed) return

    const updatedSectors = userNewsFeed.professionalSectors.filter(
      (ps) => ps !== professionalSector,
    )
    const data: UpdateNewsFeedSectorsProfessionnalsCommand = {
      professionalSectors: updatedSectors,
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

export default withTrpc(NewsFeedUnfollowProfessionalSector)
