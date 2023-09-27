import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'
import { Resource } from '@app/web/server/resources/getResource'
import { FilteredResource } from '@app/web/server/resources/authorization'
import PublishedInInformation from '../PublishedInInformation'
import ResourcePublicStateBadge from './ResourcePublicStateBadge'
import styles from './View.module.css'

const ViewHeader = ({
  resource,
  isAdmin,
}: {
  resource: Resource | FilteredResource
  isAdmin?: boolean
}) => (
  <div className="fr-grid-row">
    <div className={classNames(styles.leftColumn)}>
      <PublishedInInformation resource={resource} />
    </div>
    <div className={styles.headerSeparator}>
      <hr />
    </div>
    <div
      className={classNames(styles.rightColumn)}
      data-testid="resource-public-state-badge"
    >
      {isAdmin ? (
        <ResourcePublicStateBadge isPublic={resource.isPublic} />
      ) : (
        <p className={classNames('fr-text--xs', 'fr-mb-0', styles.user)}>
          Créé par{' '}
          <Link href="/" className="fr-text--xs fr-link">
            {resource.createdBy.name}
          </Link>
        </p>
      )}
    </div>
  </div>
)

export default ViewHeader
