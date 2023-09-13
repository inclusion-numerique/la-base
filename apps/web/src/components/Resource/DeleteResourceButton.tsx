'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import Button from '@codegouvfr/react-dsfr/Button'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import { deleteResourceModalProps } from './Edition/DeleteResourceModalContent'

const DeleteResourceButton = ({ resourceId }: { resourceId: string }) => {
  const { Component: DeleteResourceModal, open: openDeleteResourceModal } =
    createModal({
      id: `deleteResource-${resourceId}`,
      isOpenedByDefault: false,
    })

  const router = useRouter()
  const mutate = trpc.resource.mutate.useMutation()

  const onDelete = async () => {
    try {
      await mutate.mutateAsync({
        name: 'Delete',
        payload: {
          resourceId,
        },
      })

      router.refresh()
    } catch (error) {
      console.error('Could not delete resource', error)
      // TODO Have a nice error and handle edge cases server side
      // TODO for example a linked base or file or resource has been deleted since last publication
      throw error
    }
  }
  return (
    <>
      <DeleteResourceModal {...deleteResourceModalProps(onDelete)} />
      <Button
        title="Supprimer la ressource"
        iconId="fr-icon-delete-line"
        size="small"
        priority="tertiary no outline"
        onClick={openDeleteResourceModal}
      />
    </>
  )
}

export default withTrpc(DeleteResourceButton)
