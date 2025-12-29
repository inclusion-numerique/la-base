'use client'

import { ShareLinkDynamicModal } from '@app/web/features/shareableLink/components/ShareLinkModal'
import type { BasePageData, BaseResource } from '@app/web/server/bases/getBase'
import type { Resource } from '@app/web/server/resources/getResource'
import Button from '@codegouvfr/react-dsfr/Button'
import { ReactNode } from 'react'
import styles from './ShareLinkModal.module.css'

type OpenShareLinkModalButtonProps =
  | { type: 'base'; base: BasePageData; resource?: never; children: ReactNode }
  | {
      type: 'resource'
      resource: Resource | BaseResource
      base?: never
      children: ReactNode
    }

const OpenShareLinkModalButton = ({
  type,
  base,
  resource,
  children,
}: OpenShareLinkModalButtonProps) => {
  const open = ShareLinkDynamicModal.useOpen()

  return (
    <Button
      className={styles.dropdownButton}
      type="button"
      nativeButtonProps={{
        'data-testid': 'open-share-link-resource-modal-button',
      }}
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

export default OpenShareLinkModalButton
