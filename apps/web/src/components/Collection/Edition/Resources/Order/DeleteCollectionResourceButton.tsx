'use client'

import { createToast } from '@app/ui/toast/createToast'
import Button from '@codegouvfr/react-dsfr/Button'
import { useRouter } from 'next/navigation'
import * as Sentry from '@sentry/nextjs'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'

const DeleteCollectionResourceButton = ({
  resourceId,
  collectionId,
}: {
  resourceId: string
  collectionId: string
}) => {
  const router = useRouter()
  const removeFromCollectionMutation =
    trpc.resource.removeFromCollection.useMutation()

  const onRemoveFromCollection = async () => {
    try {
      const result = await removeFromCollectionMutation.mutateAsync({
        resourceId,
        collectionId,
      })
      createToast({
        priority: 'success',
        message: (
          <>
            Ressource supprimée de la collection&nbsp;
            <strong>{result.collection.title}</strong>
          </>
        ),
      })
      router.refresh()
    } catch (error) {
      createToast({
        priority: 'error',
        message:
          'Une erreur est survenue lors du retrait de la ressource de la collection',
      })
      Sentry.captureException(error)
      throw error
    }
  }
  return (
    <Button
      className="fr-mr-1w"
      priority="tertiary no outline"
      nativeButtonProps={{ onClick: onRemoveFromCollection }}
    >
      Retirer
      <span className="ri-close-circle-line fr-ml-1w" aria-hidden="true" />
    </Button>
  )
}

export default withTrpc(DeleteCollectionResourceButton)
