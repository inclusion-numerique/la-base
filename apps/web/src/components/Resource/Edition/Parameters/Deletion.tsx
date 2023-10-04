'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Button from '@codegouvfr/react-dsfr/Button'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import { Resource } from '@app/web/server/resources/getResource'
import { deleteResourceModalProps } from '../DeleteResourceModalContent'

const {
  Component: DeleteModal,
  close: closeDeleteModal,
  buttonProps: deleteModalNativeButtonProps,
} = createModal({
  id: 'delete',
  isOpenedByDefault: false,
})

const Deletion = ({ resource }: { resource: Resource }) => {
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
      router.push('/')
    } catch (error) {
      console.error('Could not delete resource', error)
      // TODO Have a nice error and handle edge cases server side
      // TODO for example a linked base or file or resource has been deleted since last publication
      throw error
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

export default withTrpc(Deletion)
