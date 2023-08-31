import React from 'react'
import classNames from 'classnames'
import { BasePageData } from '@app/web/server/bases/getBase'
import { BaseListItem } from '@app/web/server/bases/getBasesList'
import { BasePrivacyTag } from '@app/web/components/PrivacyTags'
import styles from './ViewsAndMetadata.module.css'

const ViewsAndMetadata = ({
  base,
  className,
}: {
  base: BasePageData | BaseListItem
  className?: string
}) => (
  <div className={classNames(styles.container, 'fr-text--sm', className)}>
    <span className="fr-icon-eye-line fr-icon--sm" />
    <div>
      <b>45</b>
      <span className={styles.spanMdDisplay}> Vues</span>
    </div>
    <div>·</div>
    <span className="fr-icon-file-text-line fr-icon--sm" />
    <div>
      <b>{(base as BasePageData).resources?.length || 45}</b>
      <span className={styles.spanMdDisplay}> Ressources</span>
    </div>
    <div>·</div>
    <span className="fr-icon-user-heart-line fr-icon--sm" />
    <div>
      <b>45</b>
      <span className={styles.spanMdDisplay}> Favoris</span>
    </div>
    <div>·</div>
    <BasePrivacyTag isPublic={base.isPublic} />
  </div>
)
export default ViewsAndMetadata
