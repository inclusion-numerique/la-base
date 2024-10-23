import React from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import type {
  FrIconClassName,
  RiIconClassName,
} from '@codegouvfr/react-dsfr/src/fr/generatedFromCss/classNames'
import type { SessionUser } from '@app/web/auth/sessionUser'
import { loginUrl } from '@app/web/security/login'
import OpenSaveCollectionModalButton from '@app/web/components/Collection/OpenSaveCollectionModalButton'
import { getBasesFromSessionUser } from '@app/web/bases/getBasesFromSessionUser'

const viewButtonProps = {
  title: 'Enregistrer la collection',
  size: 'small',
  priority: 'secondary',
} as const

const cardButtonProps = {
  ...viewButtonProps,
  priority: 'tertiary no outline',
} as const
const defaultIconId: FrIconClassName | RiIconClassName = 'ri-bookmark-3-line'
const alreadySavedIconId: FrIconClassName | RiIconClassName =
  'ri-bookmark-3-fill'

const SaveCollectionButton = ({
  className,
  user,
  collection,
  'data-testid': dataTestid,
  context,
  priority,
}: {
  className?: string
  user: SessionUser | null
  collection: { id: string; slug: string }
  'data-testid'?: string
  context: 'card' | 'view'
  priority: 'primary' | 'secondary' | 'tertiary' | 'tertiary no outline'
}) => {
  const alreadySavedInProfile = !!user?.savedCollections.some(
    (savedCollection) => savedCollection.collectionId === collection.id,
  )

  const userBases = user ? getBasesFromSessionUser(user) : null

  const alreadySavedInBases = !!userBases?.some((base) =>
    base.savedCollections.some(
      (savedCollection) => savedCollection.collectionId === collection.id,
    ),
  )

  const alreadySaved = alreadySavedInProfile || alreadySavedInBases

  const buttonProps = {
    ...(context === 'card' ? cardButtonProps : viewButtonProps),
    iconId: alreadySaved ? alreadySavedIconId : defaultIconId,
  }

  if (user) {
    return (
      <OpenSaveCollectionModalButton
        {...buttonProps}
        nativeButtonProps={{
          'data-testid': dataTestid,
        }}
        className={className}
        collectionId={collection.id}
        priority={priority}
      />
    )
  }
  return (
    <Button
      {...buttonProps}
      className={className}
      data-testid={dataTestid}
      priority={priority}
      linkProps={{
        href: loginUrl({
          intent: 'enregistrer-collection',
          next: `/collections/${collection.slug}`,
        }),
      }}
    />
  )
}

export default SaveCollectionButton
