import classNames from 'classnames'
import React from 'react'
import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import { ResourceListItem } from '@app/web/server/resources/getResourcesList'
import styles from './ResourcesViewsAndMetadata.module.css'

const ResourcesViewsAndMetadata = ({
  className,
  resource,
}: {
  className?: string
  resource: Pick<ResourceListItem, '_count'>
}) => (
  <div
    className={classNames(
      styles.container,
      'fr-text--sm fr-text--medium fr-text-mention--grey',
      className,
    )}
  >
    <span className="fr-icon-eye-line fr-icon--sm" />
    <div>
      <span data-testid="resource-views-count">{resource._count.views}</span>
      <span className={styles.spanMdDisplay}>
        {' '}
        Vue{sPluriel(resource._count.views)}
      </span>
    </div>
    <div>·</div>
    <span className="fr-icon-bookmark-line fr-icon--sm" />
    <div className={styles.lastLeft}>
      <span data-testid="resource-collections-count">
        {resource._count.collections}
      </span>
      <span className={styles.spanMdDisplay}>
        {' '}
        Enregistrement{sPluriel(resource._count.collections)}
      </span>
    </div>
  </div>
)
export default ResourcesViewsAndMetadata
