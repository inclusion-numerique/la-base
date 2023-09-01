import classNames from 'classnames'
import React from 'react'
import { BasePageData } from '@app/web/server/bases/getBase'
import { BasePrivacyTag } from '../PrivacyTags'
import styles from './ViewsAndMetadata.module.css'

const ViewsAndMetadata = ({
  base,
  className,
}: {
  base: BasePageData
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
      <b>{base.resources.length}</b>
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
