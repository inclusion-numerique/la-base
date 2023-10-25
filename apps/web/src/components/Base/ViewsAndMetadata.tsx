import React from 'react'
import classNames from 'classnames'
import { BasePageData } from '@app/web/server/bases/getBase'
import { BaseListItem } from '@app/web/server/bases/getBasesList'
import { BasePrivacyTag } from '@app/web/components/PrivacyTags'
import { FilteredBase } from '@app/web/server/bases/authorization'
import styles from './ViewsAndMetadata.module.css'

const ViewsAndMetadata = ({
  base,
  className,
  withBadge,
}: {
  base: BasePageData | BaseListItem | FilteredBase
  className?: string
  withBadge?: boolean
}) => (
  // TODO Plural
  <div className={classNames(styles.container, 'fr-text--sm', className)}>
    <span className="fr-icon-eye-line fr-icon--sm" />
    <div>
      <b className="wip">45</b>
      <span className={styles.spanMdDisplay}> Vues</span>
    </div>
    <div>·</div>
    <span className="fr-icon-file-text-line fr-icon--sm" />
    <div>
      <b>
        {(base as BasePageData).resources
          ? (base as BasePageData).resources.length
          : // eslint-disable-next-line no-underscore-dangle
            (base as BaseListItem | FilteredBase)._count.resources}
      </b>
      <span className={styles.spanMdDisplay}> Ressources</span>
    </div>
    <div>·</div>
    <span className="fr-icon-user-heart-line fr-icon--sm" />
    <div>
      <b className="wip">45</b>
      <span className={styles.spanMdDisplay}> Suivis</span>
    </div>
    {withBadge && (
      <>
        <div>·</div>
        <BasePrivacyTag isPublic={base.isPublic} />
      </>
    )}
  </div>
)

export default ViewsAndMetadata
