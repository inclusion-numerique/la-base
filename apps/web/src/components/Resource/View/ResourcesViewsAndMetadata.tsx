import classNames from 'classnames'
import React from 'react'
import Badge from '@codegouvfr/react-dsfr/Badge'
import styles from './ResourcesViewsAndMetadata.module.css'

const ResourcesViewsAndMetadata = ({ className }: { className?: string }) => (
  <div className={classNames(styles.container, 'fr-text--sm', className)}>
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
    <Badge className="fr-hidden fr-unhidden-md" small noIcon severity="success">
      Très recommandée
    </Badge>
  </div>
)
export default ResourcesViewsAndMetadata
