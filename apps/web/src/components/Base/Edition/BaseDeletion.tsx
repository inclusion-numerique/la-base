'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import Button from '@codegouvfr/react-dsfr/Button'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import { createToast } from '@app/ui/toast/createToast'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import { BasePageData } from '@app/web/server/bases/getBase'
import { ConfirmDeleteModal } from '../../ConfirmDeleteModal'

const {
  Component: DeleteModal,
  close: closeDeleteModal,
  buttonProps: deleteModalNativeButtonProps,
} = createModal({
  id: 'delete-base',
  isOpenedByDefault: false,
})

const BaseEdition = ({ base }: { base: BasePageData }) => {
  const router = useRouter()
  const mutate = trpc.base.delete.useMutation()

  const handleDeleteBase = async () => {
    closeDeleteModal()
    try {
      await mutate.mutateAsync({ id: base.id })
      router.refresh()
      router.push(`/profils/${base.createdBy.slug}/bases`)
      createToast({
        priority: 'success',
        message: (
          <>
            Votre base <strong>{base.title}</strong> a bien été supprimée
          </>
        ),
      })
    } catch {
      createToast({
        priority: 'error',
        message: 'Une erreur est survenue lors de la suppression de la base',
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
        Supprimer la base
      </Button>
      <ConfirmDeleteModal
        title="Supprimer la base"
        message="Êtes-vous sûr de vouloir supprimer votre base ?"
        description="Cette action est irréversible et entraîne la suppression définitive de
          toutes les ressources de la Base."
        confirmText={base.title}
        Component={DeleteModal}
        onClose={closeDeleteModal}
        onDelete={handleDeleteBase}
      />
    </>
  )
}

export default withTrpc(BaseEdition)
