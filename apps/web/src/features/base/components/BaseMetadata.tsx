import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import { BasePrivacyTag } from '@app/web/components/PrivacyTags'
import { BaseMetadataData } from '@app/web/features/base/types/BaseMetadataType'
import { getDepartmentName } from '@app/web/utils/departments'
import { numberToString } from '@app/web/utils/formatNumber'
import classNames from 'classnames'
import React from 'react'
import styles from './BaseMetadata.module.css'

const BaseMetadata = ({
  base,
  className,
  withBadge,
  smallBadge,
  context,
}: {
  base: BaseMetadataData
  className?: string
  withBadge?: boolean
  smallBadge?: boolean
  context: 'base' | 'profile' | 'card'
}) => {
  const resourcesCount = base._count.resources
  const resourcesViews = base._count.resourcesViews
  const followedBy = base._count.followedBy

  const viewsLabel =
    context === 'base'
      ? `Vue${sPluriel(resourcesViews)} sur les ressources`
      : `Vue${sPluriel(resourcesViews)}`
  return (
    <div
      className={classNames(
        'fr-flex fr-direction-column fr-direction-sm-row fr-align-items-center fr-flex-gap-4v fr-flex-gap-md-2v',
        className,
      )}
    >
      <div className="fr-flex fr-align-items-center fr-flex-gap-2v fr-mb-0 fr-text--sm">
        <span className="fr-icon-file-text-line fr-icon--sm" />
        <div>
          <b>{numberToString(resourcesCount)}</b>
          <span className={styles.spanMdDisplay}>
            {' '}
            Ressource{sPluriel(resourcesCount)}
          </span>
        </div>
        <div>·</div>
        <span className="fr-icon-user-heart-line fr-icon--sm" />
        <div>
          <b>{numberToString(followedBy)}</b>
          <span className={styles.spanMdDisplay}>
            {' '}
            Suivi{sPluriel(followedBy)}
          </span>
        </div>
        <div>·</div>
        <span className="fr-icon-eye-line fr-icon--sm" />
        <div>
          <b>{numberToString(resourcesViews)}</b>
          <span className={styles.spanMdDisplay}> {viewsLabel}</span>
        </div>
      </div>
      {!!base.department && context === 'base' && (
        <>
          <div className="fr-hidden fr-unhidden-sm">·</div>
          <span className="fr-text--sm fr-mb-0">
            <span className="fr-icon-map-pin-2-line fr-mr-2v fr-icon--sm" />
            {getDepartmentName(base.department)}
          </span>
        </>
      )}
      {withBadge && (
        <>
          <div className="fr-hidden fr-unhidden-sm">·</div>
          <BasePrivacyTag small={smallBadge} isPublic={base.isPublic} />
        </>
      )}
    </div>
  )
}

export default BaseMetadata
