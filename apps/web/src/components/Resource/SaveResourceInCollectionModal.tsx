'use client'

import React, { useMemo, useState } from 'react'
import { useRouter } from 'next/navigation'
import classNames from 'classnames'
import { SessionUser } from '@app/web/auth/sessionUser'
import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { trpc } from '@app/web/trpc'
import SaveInCollection from './SaveInCollection'
import SaveInBase from './SaveInBase'
import styles from './SaveInBase.module.css'

const SaveResourceInCollectionModal = ({
  user,
  resourceId,
}: {
  user: SessionUser
  resourceId: string
}) => {
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

  const saveMutation = trpc.resource.addToCollection.useMutation()
  const onSave = async (collectionId: string) => {
    setIsLoading(true)
    await saveMutation.mutateAsync({
      resourceId,
      collectionId,
    })
    setIsLoading(false)
    router.refresh()
  }

  return (
    <>
      {selected && (
        <button
          type="button"
          className={styles.clickableContainer}
          onClick={() => setSelected('')}
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
      {selected === 'profil' || (!selected && user.bases.length === 0) ? (
        <>
          {user.collections.map((collection) => (
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
          selectedBase.collections.map((collection) => (
            <SaveInCollection
              isLoading={isLoading}
              key={collection.id}
              collection={collection}
              resourceId={resourceId}
              onClick={() => onSave(collection.id)}
            />
          ))
        ) : (
          <div className={styles.emptyBase}>
            Vous n&lsquo;avez pas de collection dans votre base
          </div>
        )
      ) : (
        <>
          <SaveInBase user={user} onClick={() => setSelected('profil')} />
          {user.bases.map(({ base }) => (
            <SaveInBase
              key={base.id}
              user={user}
              base={base}
              onClick={() => setSelected(base.id)}
            />
          ))}
        </>
      )}
    </>
  )
}

export default withTrpc(SaveResourceInCollectionModal)
