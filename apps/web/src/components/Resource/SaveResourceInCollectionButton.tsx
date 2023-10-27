import React from 'react'
import Button from '@codegouvfr/react-dsfr/Button'
import { SessionUser } from '@app/web/auth/sessionUser'
import OpenSaveResourceInCollectionModalButton from '@app/web/components/Resource/OpenSaveResourceInCollectionModalButton'
import { loginUrl } from '@app/web/security/login'

const buttonProps = {
  priority: 'secondary',
  iconId: 'fr-icon-bookmark-line',
  children: 'Enregistrer',
} as const

const buttonIconOnlyProps = {
  title: buttonProps.children,
  iconId: buttonProps.iconId,
  size: 'small',
  priority: 'tertiary no outline',
} as const

const SaveResourceInCollectionButton = ({
  className,
  user,
  resource,
  iconOnly,
                                          'data-testid': dataTestid,
}: {
  className?: string
  user: SessionUser | null
  resource: { id: string; slug: string }
  iconOnly?: boolean
  'data-testid'?: string
}) =>
  user ? (
    <OpenSaveResourceInCollectionModalButton
      {...(iconOnly ? buttonIconOnlyProps : buttonProps)}
      nativeButtonProps={{
        'data-testid': dataTestid,
      }}
      className={className}
      resourceId={resource.id}
    />
  ) : (
    <Button
      {...(iconOnly ? buttonIconOnlyProps : buttonProps)}
      className={className}
      nativeButtonProps={{
        'data-testid': dataTestid,
      }}
      linkProps={{
        href: loginUrl({
          intent: 'enregistrer-ressource-dans-collection',
          next: `/ressources/${resource.slug}`,
        }),
      }}
    />
  )

export default SaveResourceInCollectionButton
