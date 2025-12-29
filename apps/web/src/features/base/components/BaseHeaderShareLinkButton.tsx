'use client'

import { withTrpc } from '@app/web/components/trpc/withTrpc'
import { ShareLinkDynamicModal } from '@app/web/features/shareableLink/components/ShareLinkModal'
import { BasePageData } from '@app/web/server/bases/getBase'
import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import styles from './BaseHeaderShareLinkButton.module.css'

const BaseHeaderShareLinkButton = ({
  base,
  enabled,
}: {
  base: BasePageData
  enabled: boolean
}) => {
  const openShareModal = ShareLinkDynamicModal.useOpen()
  return (
    <div className="fr-position-relative">
      <Button
        type="button"
        priority="secondary"
        className="fr-width-full fr-flex fr-justify-content-center"
        onClick={() => openShareModal({ type: 'base', base, resource: null })}
      >
        <span className="ri-link fr-mr-1w" aria-hidden />
        Partager
      </Button>
      {enabled && (
        <div
          className={classNames(
            'fr-position-absolute fr-background-flat--success fr-flex fr-justify-content-center fr-align-items-center',
            styles.enabledBadge,
          )}
        >
          <span
            className={classNames(
              'ri-check-line fr-text--sm fr-mb-0',
              styles.enabledBadgeIcon,
            )}
            aria-hidden
          />
        </div>
      )}
    </div>
  )
}

export default withTrpc(BaseHeaderShareLinkButton)
