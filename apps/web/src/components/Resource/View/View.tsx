import React from 'react'
import classNames from 'classnames'
import { Resource } from '@app/web/server/resources/getResource'
import ResourceContents from './ResourceContents'
import ResourceInformations from './ResourceInformations'
import ResourceNavigation from './ResourceNavigation'
import ViewHeader from './ViewHeader'
import styles from './View.module.css'
import ViewSeparators from './ViewSeparators'

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
        <ResourceInformations resource={resource} />
      </div>
    </div>
  </div>
)

export default View
