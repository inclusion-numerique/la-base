import type { SessionUser } from '@app/web/auth/sessionUser'
import CollectionActions from '@app/web/components/Collection/CollectionActions'
import type { CollectionListItem } from '@app/web/server/collections/getCollectionsList'
import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'
import CollectionMetaData from '../CollectionMetaData'
import Images from '../Images'
import styles from './CollectionCard.module.css'

const CollectionCard = ({
  collection,
  user,
  canWrite,
}: {
  collection: CollectionListItem
  user: SessionUser | null
  canWrite: boolean
}) => {
  const resourcesCount = collection._count.resources

  const href = `/collections/${collection.slug}`
  const createdByLink = (
    <Link
      href={
        collection.base
          ? `/bases/${collection.base.slug}`
          : `/profils/${collection.createdBy.slug}`
      }
      className="fr-link fr-position-relative fr-link--xs"
    >
      {collection.base ? collection.base.title : collection.createdBy.name}
    </Link>
  )

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
          <span className="fr-text--xs fr-mb-0">Par&nbsp; {createdByLink}</span>
        )}
        {collection.slug && (
          <div className="fr-flex fr-justify-content-space-between fr-align-items-center fr-mt-4v">
            <CollectionMetaData
              className="fr-my-2v"
              collection={{
                title: collection.title,
                id: collection.id,
                slug: collection.slug,
                isPublic: collection.isPublic,
                isFavorites: collection.isFavorites,
                created: collection.created,
                updated: collection.updated,
              }}
              count={resourcesCount}
              context="card"
              hideRessourceLabelOnSmallDevices
              withPrivacyTag={!collection.isPublic}
            />
            {!collection.isFavorites && (
              <CollectionActions
                collection={collection}
                canWrite={canWrite}
                user={user}
                context="card"
                resourcesCount={resourcesCount}
              />
            )}
          </div>
        )}
      </div>
    </article>
  )
}

export default CollectionCard
