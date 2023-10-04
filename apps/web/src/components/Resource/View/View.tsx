import React from 'react'
import classNames from 'classnames'
import { Resource } from '@app/web/server/resources/getResource'
import { hasIndexation } from '@app/web/utils/indexation'
import ResourceContents from './ResourceContents'
import ResourceInformations from './ResourceInformations'
import ResourceNavigation from './ResourceNavigation'
import ViewHeader from './ViewHeader'
import ViewSeparators from './ViewSeparators'
import styles from './View.module.css'

const View = ({
  resource,
  isAdmin,
}: {
  resource: Resource
  isAdmin: boolean
}) => (
  <div className={styles.container} data-testid="resource-view">
    <ViewHeader resource={resource} isAdmin={isAdmin} />
    <ViewSeparators />

    <div className="fr-grid-row" style={{ flexDirection: 'row-reverse' }}>
      <div className={classNames(styles.rightColumn)}>
        <ResourceNavigation resource={resource} isAdmin={isAdmin} />
      </div>
      <div className={classNames(styles.leftColumn)} id="contents-container">
        <ResourceContents resource={resource} />
        {(resource.isPublic || hasIndexation(resource)) && (
          <ResourceInformations resource={resource} />
        )}
      </div>
    </div>
  </div>
)

export default View
