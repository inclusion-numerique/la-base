import React, { ReactNode } from 'react'
import Button, { type ButtonProps } from '@codegouvfr/react-dsfr/Button'
import type {
  FrIconClassName,
  RiIconClassName,
} from '@codegouvfr/react-dsfr/src/fr/generatedFromCss/classNames'
import type { SessionUser } from '@app/web/auth/sessionUser'
import OpenSaveResourceInCollectionModalButton from '@app/web/components/Resource/OpenSaveResourceInCollectionModalButton'
import { loginUrl } from '@app/web/security/login'

const defaultIconId: FrIconClassName | RiIconClassName = 'fr-icon-bookmark-line'
const alreadySavedIconId: FrIconClassName | RiIconClassName =
  'fr-icon-bookmark-fill'

const secondaryButtonProps = {
  iconId: defaultIconId,
  priority: 'secondary',
  children: 'Enregistrer',
} as const

const alreadySavedSecondaryButtonProps = {
  ...secondaryButtonProps,
  iconId: alreadySavedIconId,
  children: 'Enregistrée',
}

const cardButtonProps = {
  iconId: defaultIconId,
  iconPosition: 'right',
  children: 'Enregistrer',
  priority: 'tertiary no outline',
} as const

const alreadySavedCardButtonProps = {
  ...cardButtonProps,
  iconId: alreadySavedIconId,
  children: 'Enregistrée',
}

const buttonIconOnlyProps = {
  iconId: defaultIconId,
  title: secondaryButtonProps.children,
  priority: 'secondary',
} as const

const alreadySavedButtonIconOnlyProps = {
  ...buttonIconOnlyProps,
  iconId: alreadySavedIconId,
}

const getButtonProps = (
  alreadySaved?: boolean,
  variant?: 'icon-only' | 'card',
) => {
  if (variant === 'icon-only') {
    return alreadySaved ? alreadySavedButtonIconOnlyProps : buttonIconOnlyProps
  }

  if (variant === 'card') {
    return alreadySaved ? alreadySavedCardButtonProps : cardButtonProps
  }

  return alreadySaved ? alreadySavedSecondaryButtonProps : secondaryButtonProps
}

const SaveResourceInCollectionButton = ({
  className,
  user,
  resource,
  variant,
  'data-testid': dataTestid,
  priority,
  size,
  children,
  iconPosition = 'right',
}: {
  className?: string
  user: SessionUser | null
  resource: { id: string; slug: string; title: string }
  iconOnly?: boolean
  'data-testid'?: string
  variant?: 'card' | 'icon-only'
  priority?: ButtonProps['priority']
  size?: 'small'
  children?: ReactNode
  iconPosition?: 'right' | 'left'
}) => {
  const alreadySaved = user?.collections.some((collection) =>
    collection.resources.some(({ resourceId }) => resourceId === resource.id),
  )
  const buttonProps = {
    ...getButtonProps(alreadySaved, variant),
    children,
    priority,
    iconPosition,
  }

  if (user) {
    const accessibilityTitle = `Enregistrer "${resource.title}" dans une collection`
    return (
      <OpenSaveResourceInCollectionModalButton
        size={size}
        {...buttonProps}
        nativeButtonProps={{
          'data-testid': dataTestid,
          title: accessibilityTitle,
        }}
        className={className}
        resourceId={resource.id}
      />
    )
  }
  return (
    <Button
      {...buttonProps}
      size="small"
      className={className}
      data-testid={dataTestid}
      linkProps={{
        href: loginUrl({
          intent: 'enregistrer-ressource-dans-collection',
          next: `/ressources/${resource.slug}`,
        }),
        title: `Se connecter pour enregistrer "${resource.title}" dans une collection`,
      }}
    />
  )
}

export default SaveResourceInCollectionButton
