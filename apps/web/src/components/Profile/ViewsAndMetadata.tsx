import classNames from 'classnames'
import React from 'react'
import { sPluriel } from '@app/web/utils/sPluriel'
import styles from './ViewsAndMetadata.module.css'

const ViewsAndMetadata = ({ resourcesCount }: { resourcesCount: number }) => (
  <div className={classNames(styles.container, 'fr-text--sm')}>
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
      <b className="wip">45</b>
      <span className={styles.spanMdDisplay}> Suivi{sPluriel(45)}</span>
    </div>
  </div>
)
export default ViewsAndMetadata
