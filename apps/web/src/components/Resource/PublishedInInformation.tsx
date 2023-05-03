import React from 'react'
import Link from 'next/link'
import { Resource, ResourceListItem } from '@app/web/server/resources'
import styles from './PublishedInInformation.module.css'

const PublishedInInformation = ({
  resource: { createdBy, base },
}: {
  resource: ResourceListItem | Resource
}) => (
  <div className="fr-grid-row fr-grid-row--middle">
    <div className={styles.circle} />
    {base ? (
      <span className="fr-text--xs fr-mb-0">
        Publié dans la base{' '}
        <Link href={`/bases/${base.slug}`} className="fr-link fr-text--xs">
          {base.title}
        </Link>
      </span>
    ) : (
      <span className="fr-text--xs fr-mb-0">Publié par {createdBy.name}</span>
    )}
  </div>
)

export default PublishedInInformation
