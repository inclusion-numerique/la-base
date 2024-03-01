import React from 'react'
import classNames from 'classnames'
import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import { BasePageData } from '@app/web/server/bases/getBase'
import { BaseListItem } from '@app/web/server/bases/getBasesList'
import { BasePrivacyTag } from '@app/web/components/PrivacyTags'
import styles from './BaseMetadata.module.css'

const BaseMetadata = ({
  base,
  className,
  withBadge,
  smallBadge,
}: {
  base: BasePageData | BaseListItem
  className?: string
  withBadge?: boolean
  smallBadge?: boolean
}) => {
  // TODO clean count method from separated query ?
  const resourcesCount =
    'resources' in base
      ? base.resources.length
      : // eslint-disable-next-line no-underscore-dangle
        base._count.resources

  return (
    <div className={classNames(styles.container, 'fr-text--sm', className)}>
      <span className="fr-icon-file-text-line fr-icon--sm" />
      <div>
        <b>{resourcesCount}</b>
        <span className={styles.spanMdDisplay}>
          {' '}
          Ressource{sPluriel(resourcesCount)}
        </span>
      </div>
      <div>·</div>
      <span className="fr-icon-user-heart-line fr-icon--sm" />
      <div>
        <b>{base._count.followedBy}</b>
        <span className={styles.spanMdDisplay}>
          {' '}
          Suivi{sPluriel(base._count.followedBy)}
        </span>
      </div>
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
