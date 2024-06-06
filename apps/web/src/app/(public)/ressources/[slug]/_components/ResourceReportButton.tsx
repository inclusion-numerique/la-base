'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import Button, { ButtonProps } from '@codegouvfr/react-dsfr/Button'
import { SessionUser } from '@app/web/auth/sessionUser'
import { ResourceListItem } from '@app/web/server/resources/getResourcesList'
import { ResourceReportModal } from './ResourceReportModal'

const ResourceReportButton = ({
  resource,
  user,
  variant = 'tertiary',
  priority = 'secondary',
  size,
  className,
  children,
}: {
  resource: ResourceListItem
  user?: SessionUser | null
  variant?: 'icon-only' | 'tertiary'
  priority?: ButtonProps['priority']
  size?: ButtonProps['size']
  className?: string
  children?: ReactNode
}) => {
  if (user == null) {
    return variant === 'icon-only' ? (
      <Link
        className={classNames('fr-btn fr-btn--sm', className)}
        title="Signaler la ressource"
        href={`/connexion?suivant=/ressources/${resource.slug}`}
      >
        <span className="ri-alert-line" aria-hidden />
      </Link>
    ) : (
      <Link
        className={classNames('fr-btn fr-btn--sm', className)}
        title="Signaler la ressource"
        href="/connexion?suivant=/ressources/arnaques-a-la-location-immobiliere-definition-et-prevention"
      >
        {children || (
          <>
            <span className="ri-alert-line fr-mr-1w" aria-hidden />
            Signaler
          </>
        )}
      </Link>
    )
  }

  return variant === 'icon-only' ? (
    <Button
      className={className}
      size={size}
      title="Signaler la ressource"
      iconId="fr-icon-warning-line"
      priority={priority}
      onClick={ResourceReportModal.open}
    />
  ) : (
    <Button
      className={className}
      size={size}
      title="Signaler la ressource"
      priority={priority}
      onClick={ResourceReportModal.open}
    >
      {children || (
        <>
          <span className="ri-alert-line fr-mr-1w" aria-hidden />
          Signaler
        </>
      )}
    </Button>
  )
}

export default ResourceReportButton
