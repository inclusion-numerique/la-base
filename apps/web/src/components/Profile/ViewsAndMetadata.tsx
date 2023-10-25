import classNames from 'classnames'
import React from 'react'
import styles from './ViewsAndMetadata.module.css'

const ViewsAndMetadata = ({ resourcesCount }: { resourcesCount: number }) => (
  // TODO Plural

  <div className={classNames(styles.container, 'fr-text--sm')}>
    <span className="fr-icon-file-text-line fr-icon--sm" />
    <div>
      <b>{resourcesCount}</b>
      <span className={styles.spanMdDisplay}> Ressources</span>
    </div>
    <div>·</div>
    <span className="fr-icon-user-heart-line fr-icon--sm" />
    <div>
      <b className="wip">45</b>
      <span className={styles.spanMdDisplay}> Suivis</span>
    </div>
  </div>
)
export default ViewsAndMetadata
