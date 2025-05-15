'use client'

import RawModal from '@app/ui/components/Modal/RawModal'
import { createDynamicModal } from '@app/ui/components/Modal/createDynamicModal'
import { createToast } from '@app/ui/toast/createToast'
import type { SessionUser } from '@app/web/auth/sessionUser'
import { getBasesFromSessionUser } from '@app/web/bases/getBasesFromSessionUser'
import SaveCollection from '@app/web/components/Collection/SaveCollection'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import styles from './SaveCollectionModal.module.css'

export const SaveCollectionDynamicModal = createDynamicModal({
  id: 'save-collection',
  isOpenedByDefault: false,
  initialState: {
    collectionId: null as string | null,
  },
})

/**
 * This modal is used to save a resource in a collection
 * and to quickly create a collection.
 *
 * The title and buttons of the modal must be top level, component is too complex
 * and could be broken down in multiple hooks and components for the different "steps" of the modal.
 */
const SaveCollectionModal = ({ user }: { user: SessionUser }) => {
  const { collectionId } = SaveCollectionDynamicModal.useState()

  const router = useRouter()

  const bases = getBasesFromSessionUser(user)

  // User can create a collection in a base or in his profile from this modal
  const saveCollectionMutation = trpc.collection.save.useMutation()
  const unsaveCollectionMutation = trpc.collection.unsave.useMutation()

  // If the user has no base, collections are limited to the profile
  const hasNoBases = bases.length === 0
  const collectionOwnedByUser = user.collections.some(
    ({ id }) => id === collectionId,
  )

  // Used to display which base or profile is in "loading" state when adding or removing to/from a collection
  // Id or "profile" string
  const [pendingMutationItemId, setPendingMutationItemId] = useState<
    string | null
  >(null)

  // targetItem is baseId or "profile"
  const onSave = async (targetItem: 'profile' | string) => {
    if (!collectionId) {
      return
    }
    setPendingMutationItemId(targetItem)
    try {
      const result = await saveCollectionMutation.mutateAsync({
        collectionId,
        savedById: user.id,
        baseId: targetItem === 'profile' ? undefined : targetItem,
      })
      setPendingMutationItemId(null)
      router.refresh()
      createToast({
        priority: 'success',
        message:
          targetItem === 'profile' ? (
            <>Enregistrée dans votre profil</>
          ) : (
            <>
              Enregistrée dans la base <strong>{result.base?.title}</strong>
            </>
          ),
      })
      SaveCollectionDynamicModal.close()
    } catch {
      createToast({
        priority: 'error',
        message: 'Une erreur est survenue',
      })
      saveCollectionMutation.reset()
    }
  }

  const onUnsave = async (targetItem: 'profile' | string) => {
    if (!collectionId) {
      return
    }
    setPendingMutationItemId(targetItem)
    try {
      await unsaveCollectionMutation.mutateAsync({
        collectionId,
        savedById: user.id,
        baseId: targetItem === 'profile' ? undefined : targetItem,
      })
      setPendingMutationItemId(null)
      router.refresh()
      createToast({
        priority: 'success',
        message: (
          <>La collection a bien été retirée des collections enregistrées</>
        ),
      })

      SaveCollectionDynamicModal.close()
    } catch {
      createToast({
        priority: 'error',
        message: 'Une erreur est survenue',
      })
      unsaveCollectionMutation.reset()
    }
  }

  return (
    <RawModal
      className={styles.modal}
      title="Enregistrer la collection"
      id={SaveCollectionDynamicModal.id}
    >
      {/* Add/remove mutation error */}
      {(saveCollectionMutation.error || unsaveCollectionMutation.error) && (
        <p
          className="fr-error-text"
          data-testid="save-resource-in-collection-error"
        >
          {saveCollectionMutation.error?.message ??
            unsaveCollectionMutation.error?.message}
        </p>
      )}

      {!!collectionId && !collectionOwnedByUser && (
        <SaveCollection
          collectionId={collectionId}
          loading={pendingMutationItemId === 'profile'}
          key="profile"
          user={user}
          onAdd={onSave}
          onRemove={onUnsave}
        />
      )}
      {!!collectionId &&
        bases
          // Cannot save a collection from a base in the same base
          .filter(
            (base) => !base.collections.some(({ id }) => id === collectionId),
          )
          .map((base) => (
            <SaveCollection
              collectionId={collectionId}
              key={base.id}
              user={user}
              loading={pendingMutationItemId === base.id}
              base={base}
              onAdd={onSave}
              onRemove={onUnsave}
            />
          ))}
      {collectionOwnedByUser && hasNoBases && (
        <div className="fr-border fr-border-radius--8 fr-text-mention--grey fr-p-8v fr-mt-8v fr-width-full fr-text--center fr-width-full">
          <p className="fr-text--md fr-text--bold fr-mb-2v">
            Actuellement, vous n’êtes pas membre d’une base.
          </p>
          <p className="fr-text--sm fr-mb-0">
            Vous pourrez enregistrer vos collections dans une base lorsque vous
            aurez créé ou serez membre d’une base.
          </p>
        </div>
      )}
    </RawModal>
  )
}

export default withTrpc(SaveCollectionModal)
