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
    <div className={classNames(styles.container, 'fr-text--sm', className)}>
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
      {!!base.department && context === 'base' && (
        <>
          <div>·</div>
          <span className="fr-icon-eye-line fr-icon--sm" />
          <div>
            <span className={styles.spanMdDisplay}>
              &nbsp;{getDepartmentName(base.department)}
            </span>
          </div>
        </>
      )}
      {withBadge && (
        <>
          <div>·</div>
          <BasePrivacyTag small={smallBadge} isPublic={base.isPublic} />
        </>
      )}
    </div>
  )
}

export default BaseMetadata
