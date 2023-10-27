'use client'

import React, { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import classNames from 'classnames'
import { createDynamicModal } from '@app/ui/components/Modal/createDynamicModal'
import { SessionUser } from '@app/web/auth/sessionUser'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import SaveInCollection from './SaveInCollection'
import SaveInBase from './SaveInBase'
import styles from './SaveInBase.module.css'

export const SaveResourceInCollectionDynamicModal = createDynamicModal({
  id: 'save-resource-in-collection',
  isOpenedByDefault: false,
  initialState: {
    resourceId: null as string | null,
  },
})

const SaveResourceInCollectionModal = ({ user }: { user: SessionUser }) => {
  const { resourceId } = SaveResourceInCollectionDynamicModal.useState()

  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)
  const [selected, setSelected] = useState('')
  const selectedBase = useMemo<
    SessionUser['bases'][number]['base'] | null | undefined
  >(
    () =>
      selected
        ? user.bases.find(({ base }) => base.id === selected)?.base
        : null,
    [user, selected],
  )

  const mutation = trpc.resource.addToCollection.useMutation()
  const onSave = async (collectionId: string) => {
    if (!resourceId) {
      return
    }
    setIsLoading(true)
    try {
      await mutation.mutateAsync({
        resourceId,
        collectionId,
      })
      setIsLoading(false)
      router.refresh()
    } catch (error) {
      // TODO Sentry + toast ?
      console.error(error)
      throw error
    }
  }

  return (
    <SaveResourceInCollectionDynamicModal.Component title="Ajouter à la collection">
      {selected && (
        <button
          type="button"
          className={styles.clickableContainer}
          onClick={() => setSelected('')}
          data-testid="back-to-bases-button"
        >
          <div>
            <span
              className={classNames(
                'fr-icon-arrow-left-s-line',
                'fr-icon--sm',
                'fr-mr-1w',
                styles.arrow,
              )}
            />
            <b>
              {selectedBase
                ? selectedBase.title
                : `${user.name} - Mes collections`}
            </b>
          </div>
        </button>
      )}
      {mutation.error && (
        <p
          className="fr-error-text"
          data-testid="save-resource-in-collection-error"
        >
          {mutation.error.message}
        </p>
      )}
      {!!resourceId &&
        (selected === 'profil' || (!selected && user.bases.length === 0) ? (
        <>
          {user.collections
            .map((collection) => (
              <SaveInCollection
                isLoading={isLoading}
                key={collection.id}
                collection={collection}
                resourceId={resourceId}
                onClick={() => onSave(collection.id)}
              />
            ))}
        </>
      ) : selectedBase ? (
        selectedBase.collections.length > 0 ? (
          selectedBase.collections
            .map((collection) => (
              <SaveInCollection
                isLoading={isLoading}
                key={collection.id}
                collection={collection}
                resourceId={resourceId}
                onClick={() => onSave(collection.id)}
              />
            ))
        ) : (
          <div
            className={styles.emptyBase}
              data-testid="base-without-collection"
          >
            Vous n&lsquo;avez pas de collection dans votre base
          </div>
        )
      ) : (
        <>
          <SaveInBase user={user} onClick={() => setSelected('profil')} />
          {user.bases
            .sort(
              (a, b) => b.base.collections.length - a.base.collections.length,
            )
            .map(({ base }) => (
              <SaveInBase
                key={base.id}
                user={user}
                base={base}
                onClick={() => setSelected(base.id)}
              />
            ))}
        </>
      ))}
    </SaveResourceInCollectionDynamicModal.Component>
  )
}

export default withTrpc(SaveResourceInCollectionModal)
