import classNames from 'classnames'
import Badge from '@codegouvfr/react-dsfr/Badge'
import React from 'react'
import styles from './ResourcesViewsAndMetadata.module.css'

const ResourcesViewsAndMetadata = () => (
  <div className={classNames(styles.container, 'fr-text--sm', 'fr-mb-0')}>
    <span className="fr-icon-eye-line fr-icon--sm" />
    <div>
      <b>45</b>
      <span className={styles.spanMdDisplay}> Vues</span>
    </div>
    <div>·</div>
    <span className="fr-icon-bookmark-line fr-icon--sm" />
    <div className={styles.lastLeft}>
      <b>45</b>
      <span className={styles.spanMdDisplay}> Enregistrements</span>
    </div>
    <Badge className="fr-hidden fr-unhidden-md" noIcon severity="success">
      Très recommandée
    </Badge>
  </div>
)
export default ResourcesViewsAndMetadata
