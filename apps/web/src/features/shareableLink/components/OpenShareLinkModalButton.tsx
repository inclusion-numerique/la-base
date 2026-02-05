'use client'

import { ShareLinkDynamicModal } from '@app/web/features/shareableLink/components/ShareLinkModal'
import type { BasePageData, BaseResource } from '@app/web/server/bases/getBase'
import type { Resource } from '@app/web/server/resources/getResource'
import Button from '@codegouvfr/react-dsfr/Button'
import { ReactNode } from 'react'

type OpenShareLinkModalButtonProps =
  | {
      type: 'base'
      base: BasePageData
      resource?: never
      className?: string
      children?: ReactNode
    }
  | {
      type: 'resource'
      resource: Resource | BaseResource
      base?: never
      className?: string
      children?: ReactNode
    }

const OpenShareLinkModalButton = ({
  type,
  base,
  resource,
  className,
  children,
}: OpenShareLinkModalButtonProps) => {
  const open = ShareLinkDynamicModal.useOpen()

  if (children) {
    return (
      <Button
        className={className}
        type="button"
        nativeButtonProps={{
          'data-testid': 'open-share-link-resource-modal-button',
        }}
        priority="tertiary no outline"
        size="small"
        onClick={() =>
          open({
            type,
            base: type === 'base' ? base : null,
            resource: type === 'resource' ? resource : null,
          })
        }
      >
        {children}
      </Button>
    )
  }

  return (
    <Button
      className={className}
      iconId="fr-icon-link"
      type="button"
      nativeButtonProps={{
        'data-testid': 'open-share-link-resource-modal-button',
      }}
      title="Partager via un lien"
      priority="secondary"
      size="small"
      onClick={() =>
        open({
          type,
          base: type === 'base' ? base : null,
          resource: type === 'resource' ? resource : null,
        })
      }
    />
  )
}

export default OpenShareLinkModalButton
