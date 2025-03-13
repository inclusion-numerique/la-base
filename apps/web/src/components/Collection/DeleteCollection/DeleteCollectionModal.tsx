'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import classNames from 'classnames'
import { createDynamicModal } from '@app/ui/components/Modal/createDynamicModal'
import { createToast } from '@app/ui/toast/createToast'
import Input from '@codegouvfr/react-dsfr/Input'
import { trpc } from '@app/web/trpc'
import { withTrpc } from '@app/web/components/trpc/withTrpc'

export const DeleteCollectionDynamicModal = createDynamicModal({
  id: 'delete-collection-modal',
  isOpenedByDefault: false,
  initialState: {
    collectionId: null as string | null,
    collectionTitle: null as string | null,
  },
})

const DeleteCollectionModal = ({ redirectTo }: { redirectTo?: string }) => {
  const [validationInput, setValidationInput] = useState('')
  const { collectionId, collectionTitle } =
    DeleteCollectionDynamicModal.useState()

  const router = useRouter()
  const mutation = trpc.collection.delete.useMutation()

  const onDelete = async () => {
    if (!collectionId) {
      return
    }
    try {
      await mutation.mutateAsync({
        id: collectionId,
      })
      if (redirectTo) {
        router.push(redirectTo)
      }
      router.refresh()
      createToast({
        priority: 'success',
        message: <>La collection a bien été supprimée</>,
      })
    } catch {
      createToast({
        priority: 'error',
        message:
          'Une erreur est survenue lors de la suppression de la collection',
      })
      mutation.reset()
    }
  }

  return (
    <DeleteCollectionDynamicModal.Component
      title="Supprimer la collection"
      buttons={[
        {
          title: 'Annuler',
          priority: 'secondary',
          doClosesModal: true,
          children: 'Annuler',
          type: 'button',
        },
        {
          title: 'Supprimer',
          doClosesModal: true,
          children: 'Supprimer',
          type: 'button',
          disabled: validationInput !== collectionTitle,
          onClick: onDelete,
          nativeButtonProps: {
            className: classNames(
              'fr-btn--danger',
              mutation.isPending && 'fr-btn--loading',
            ),
            'data-testid': 'delete-collection-modal-submit',
          },
        },
      ]}
    >
      <p className="fr-mb-2w">
        Êtes-vous sûr de vouloir supprimer votre collection ?
      </p>
      <p className="fr-text--bold">
        Cette action est irréversible et entraîne la suppression définitive de
        toutes les ressources de la Collection.
      </p>
      <Input
        label={`Écrivez “${collectionTitle}” dans le champ ci-dessous`}
        nativeInputProps={{
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore: wrong dsfr type
          'data-testid': 'modal-input',
          onChange: (event) => {
            setValidationInput(event.target.value)
          },
        }}
      />
      {mutation.error && (
        <p className="fr-error-text" data-testid="delete-collection-error">
          {mutation.error.message}
        </p>
      )}
    </DeleteCollectionDynamicModal.Component>
  )
}

export default withTrpc(DeleteCollectionModal)
