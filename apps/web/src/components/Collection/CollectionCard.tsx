import React from 'react'
import Link from 'next/link'
import sanitizeHtml from 'sanitize-html'
import { CollectionListItem } from '@app/web/server/collections/getCollectionsList'
import RoundProfileImage from '../RoundProfileImage'
import styles from './CollectionCard.module.css'
import Images from './Images'
import CollectionMetaData from './CollectionMetaData'

const CollectionCard = ({ collection }: { collection: CollectionListItem }) => {
  // eslint-disable-next-line no-underscore-dangle
  const resourcesCount = collection._count.resources

  const href = `/collections/${collection.id}`

  return (
    <div className={styles.card} data-testid="collection-card">
      <Link href={href}>
        <Images image={collection.image} resources={collection.resources} />
      </Link>
      <div className={styles.content}>
        <div>
          <div className={styles.owner}>
            <RoundProfileImage user={collection.owner} />
            <Link
              className="fr-text--xs fr-link"
              href={`/profiles/${collection.owner.id}`}
            >
              {collection.owner.name}
            </Link>
          </div>
          <Link
            href={href}
            data-testid="collection-card-link"
          >
            <h6 className={styles.title}>{collection.title}</h6>
            {collection.description && (
              <div
                className="fr-text--sm fr-mb-0"
                dangerouslySetInnerHTML={{
                  __html: sanitizeHtml(collection.description),
                }}
              />
            )}
          </Link>
        </div>
        <CollectionMetaData
          collection={collection}
          count={resourcesCount}
          priority="tertiary no outline"
          withButtons
        />
      </div>
    </div>
  )
}

export default CollectionCard
