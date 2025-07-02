import type { SessionUser } from '@app/web/auth/sessionUser'
import OpenSaveCollectionModalButton from '@app/web/components/Collection/OpenSaveCollectionModalButton'
import { loginUrl } from '@app/web/security/login'
import Button from '@codegouvfr/react-dsfr/Button'
import Tooltip from '@codegouvfr/react-dsfr/Tooltip'
import type {
  FrIconClassName,
  RiIconClassName,
} from '@codegouvfr/react-dsfr/src/fr/generatedFromCss/classNames'
import classNames from 'classnames'
import React from 'react'

const viewButtonProps = {
  title: 'Enregistrer la collection',
  size: 'small',
  priority: 'secondary',
} as const

const cardButtonProps = {
  ...viewButtonProps,
  priority: 'tertiary no outline',
} as const
const defaultIconId: FrIconClassName | RiIconClassName = 'ri-bookmark-line'
const alreadySavedIconId: FrIconClassName | RiIconClassName = 'ri-bookmark-fill'

const SaveCollectionButton = ({
  className,
  user,
  collection,
  'data-testid': dataTestid,
  context,
  priority,
  buttonTitle,
}: {
  className?: string
  user: SessionUser | null
  collection: { id: string; slug: string }
  'data-testid'?: string
  context: 'card' | 'view' | 'contextModal'
  priority: 'primary' | 'secondary' | 'tertiary' | 'tertiary no outline'
  buttonTitle?: string
}) => {
  const alreadySavedInProfile = !!user?.savedCollections.some(
    (savedCollection) => savedCollection.collectionId === collection.id,
  )

  const userBases = user ? user.bases.map(({ base }) => base) : null

  const alreadySavedInBases = !!userBases?.some((base) =>
    base.savedCollections.some(
      (savedCollection) => savedCollection.collectionId === collection.id,
    ),
  )

  const alreadySaved = alreadySavedInProfile || alreadySavedInBases

  const buttonProps = context === 'card' ? cardButtonProps : viewButtonProps

  const icon = alreadySaved ? alreadySavedIconId : defaultIconId

  if (user) {
    return (
      <Tooltip title="Enregistrer la collection">
        <OpenSaveCollectionModalButton
          {...buttonProps}
          iconId={icon}
          context={context}
          nativeButtonProps={{
            'data-testid': dataTestid,
          }}
          className={className}
          collectionId={collection.id}
          priority={priority}
          buttonTitle={buttonTitle}
        />
      </Tooltip>
    )
  }
  return (
    <Tooltip title="Enregistrer la collection">
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
      >
        <span className={classNames(context === 'view' && 'fr-mr-1w', icon)} />
        {buttonTitle}
      </Button>
    </Tooltip>
  )
}

export default SaveCollectionButton
