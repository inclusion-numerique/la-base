'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import ToggleSwitch from '@codegouvfr/react-dsfr/ToggleSwitch'
import { createToast } from '@app/ui/toast/createToast'
import { trpc } from '@app/web/trpc'
import { Resource } from '@app/web/server/resources/getResource'
import { withTrpc } from '@app/web/components/trpc/withTrpc'

const ResourceFeedback = ({ resource }: { resource: Resource }) => {
  const router = useRouter()
  const mutate = trpc.resource.mutate.useMutation()

  const onConfigureFeedback = async (publicFeedback: boolean) => {
    try {
      await mutate.mutateAsync({
        name: 'ChangePublicFeedback',
        payload: {
          resourceId: resource.id,
          publicFeedback,
        },
      })
      router.refresh()
      createToast({
        priority: 'success',
        message: (
          <>
            Les avis sont{' '}
            <strong>{publicFeedback ? 'activés' : 'désactivés'}</strong> pour la
            ressource <strong>{resource.title}</strong>
          </>
        ),
      })
    } catch {
      createToast({
        priority: 'error',
        message: 'Une erreur est survenue lors de la configuration des avis',
      })
    }
  }

  return (
    <ToggleSwitch
      inputTitle="Configurer les avis"
      checked={resource.publicFeedback}
      disabled={mutate.isPending}
      label={
        resource.publicFeedback
          ? 'Les avis & les commentaires sont visibles par tous.'
          : 'Les commentaires ne sont plus visibles par les visiteurs, mais uniquement par vous et les contributeurs de votre ressource.'
      }
      labelPosition="left"
      showCheckedHint
      onChange={onConfigureFeedback}
    />
  )
}

export default withTrpc(ResourceFeedback)
