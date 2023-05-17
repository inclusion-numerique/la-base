import Link from 'next/link'
import React from 'react'
import { Resource } from '@app/web/server/resources/getResource'
import { ResourceListItem } from '@app/web/server/resources/getResourcesList'
import styles from './PublishedInInformation.module.css'

const PublishedInInformation = ({
  resource: { createdBy, base },
}: {
  resource: Pick<ResourceListItem | Resource, 'createdBy' | 'base'>
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
