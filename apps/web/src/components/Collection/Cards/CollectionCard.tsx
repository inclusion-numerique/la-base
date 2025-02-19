import classNames from 'classnames'
import React from 'react'
import Link from 'next/link'
import { CollectionListItem } from '@app/web/server/collections/getCollectionsList'
import { SessionUser } from '@app/web/auth/sessionUser'
import CollectionMetaData from '../CollectionMetaData'
import Images from '../Images'
import styles from './CollectionCard.module.css'

const CollectionCard = ({
  collection,
  user,
  isOwner,
}: {
  collection: CollectionListItem
  user: SessionUser | null
  isOwner: boolean
}) => {
  // eslint-disable-next-line no-underscore-dangle
  const resourcesCount = collection._count.resources

  const href = `/collections/${collection.slug}`

  return (
    <article
      className={classNames(styles.card, 'fr-border', 'fr-border-radius--8')}
      data-testid="collection-card"
    >
      <Link href={href}>
        <Images
          image={collection.image}
          isFavoriteCollection={collection.isFavorites}
          resources={collection.resources.map(({ resource }) => resource)}
        />
      </Link>
      <div className={styles.content}>
        <div>
          <Link href={href} data-testid="collection-card-link">
            <h3 className={classNames(styles.title, 'fr-h6')}>
              {collection.title}
            </h3>
            {collection.description && (
              <div
                className="fr-text--sm fr-mb-3v fr-text-mention--grey"
                dangerouslySetInnerHTML={{
                  __html: collection.description,
                }}
              />
            )}
          </Link>
        </div>
        {!collection.isFavorites && (
          <span className="fr-text--xs fr-mb-0">
            Par&nbsp;
            {collection.isPublic ? (
              <Link
                href={`/profils/${collection.createdBy.slug}`}
                className="fr-link fr-position-relative fr-link--xs"
              >
                {collection.createdBy.name}
              </Link>
            ) : (
              collection.createdBy.name
            )}
          </span>
        )}
        {collection.slug && (
          <CollectionMetaData
            user={user}
            isOwner={isOwner}
            collection={{
              title: collection.title,
              id: collection.id,
              slug: collection.slug,
              isPublic: collection.isPublic,
              isFavorites: collection.isFavorites,
            }}
            count={resourcesCount}
            context="card"
            hideRessourceLabelOnSmallDevices
          />
        )}
      </div>
    </article>
  )
}

export default CollectionCard
