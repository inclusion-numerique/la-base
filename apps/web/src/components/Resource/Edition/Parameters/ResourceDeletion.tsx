'use client'

import { createToast } from '@app/ui/toast/createToast'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import type { Resource } from '@app/web/server/resources/getResource'
import { trpc } from '@app/web/trpc'
import Button from '@codegouvfr/react-dsfr/Button'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { useRouter } from 'next/navigation'
import React from 'react'
import { deleteResourceModalProps } from '../DeleteResourceModalContent'

const {
  Component: DeleteModal,
  close: closeDeleteModal,
  buttonProps: deleteModalNativeButtonProps,
} = createModal({
  id: 'delete-resource',
  isOpenedByDefault: false,
})

const ResourceDeletion = ({ resource }: { resource: Resource }) => {
  const router = useRouter()
  const mutate = trpc.resource.mutate.useMutation()

  const onDelete = async () => {
    try {
      await mutate.mutateAsync({
        name: 'Delete',
        payload: {
          resourceId: resource.id,
        },
      })
      closeDeleteModal()
      router.refresh()
      router.push(
        resource.base
          ? `/bases/${resource.base.slug}`
          : `/profils/${resource.createdBy.slug}`,
      )
      createToast({
        priority: 'success',
        message: (
          <>
            La ressource <strong>{resource.title}</strong> a bien été supprimée
          </>
        ),
      })
    } catch {
      createToast({
        priority: 'error',
        message:
          'Une erreur est survenue lors de la suppression de la ressource',
      })
      mutate.reset()
    }
  }

  return (
    <>
      <Button
        className="fr-btn--danger"
        data-testid="delete-base-button"
        {...deleteModalNativeButtonProps}
      >
        Supprimer la ressource
      </Button>
      <DeleteModal {...deleteResourceModalProps(onDelete)} />
    </>
  )
}

export default withTrpc(ResourceDeletion)
