import classNames from 'classnames'
import { User } from 'next-auth'
import Link from 'next/link'
import React from 'react'
import { Resource } from '@app/web/server/resources/getResource'
import PublishedInInformation from '../PublishedInInformation'
import ResourceContents from './ResourceContents'
import ResourceInformations from './ResourceInformations'
import ResourceNavigation from './ResourceNavigation'
import ResourcePublicStateBadge from './ResourcePublicStateBadge'
import styles from './View.module.css'

const View = ({
  resource,
  user,
}: {
  resource: Resource
  user: User | null
}) => (
  <div className={styles.container}>
    <div className="fr-grid-row">
      <div className={classNames(styles.leftColumn)}>
        <PublishedInInformation resource={resource} />
      </div>
      <div className={styles.headerSeparator}>
        <hr />
      </div>
      <div className={classNames(styles.rightColumn)}>
        {user ? (
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

    <div className={classNames('fr-grid-row', styles.separatorRow)}>
      <div className={classNames(styles.leftColumn)}>
        <hr />
      </div>
      <div
        className={classNames('fr-hidden fr-unhidden-lg', styles.rightColumn)}
      >
        <hr />
      </div>
    </div>

    <div className="fr-grid-row" style={{ flexDirection: 'row-reverse' }}>
      <div className={classNames(styles.rightColumn)}>
        <ResourceNavigation resource={resource} user={user} />
      </div>
      <div className={classNames(styles.leftColumn)} id="contents-container">
        <div id="contenu">
          <ResourceContents resource={resource} />
        </div>
        <ResourceInformations />
      </div>
    </div>
  </div>
)

export default View
