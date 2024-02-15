import React from 'react'
import Link from 'next/link'
import { CollectionListItem } from '@app/web/server/collections/getCollectionsList'
import OwnershipInformation from '@app/web/components/OwnershipInformation'
import { SessionUser } from '@app/web/auth/sessionUser'
import styles from './CollectionCard.module.css'
import Images from './Images'
import CollectionMetaData from './CollectionMetaData'

const CollectionCard = ({
  collection,
  user,
}: {
  collection: CollectionListItem
  user: SessionUser | null
}) => {
  // eslint-disable-next-line no-underscore-dangle
  const resourcesCount = collection._count.resources

  const href = `/collections/${collection.slug}`

  return (
    <article className={styles.card} data-testid="collection-card">
      <Link href={href}>
        <Images
          image={collection.image}
          resources={collection.resources.map(({ resource }) => resource)}
        />
      </Link>
      <div className={styles.content}>
        <div>
          <OwnershipInformation
            className="fr-mb-4v"
            base={collection.base}
            user={collection.createdBy}
            attributionWording="none"
          />
          <Link href={href} data-testid="collection-card-link">
            <h6 className={styles.title}>{collection.title}</h6>
            {collection.description && (
              <div
                className="fr-text--sm fr-mb-0"
                dangerouslySetInnerHTML={{
                  __html: collection.description,
                }}
              />
            )}
          </Link>
        </div>
        {collection.slug && (
          <CollectionMetaData
            user={user}
            collection={{
              id: collection.id,
              slug: collection.slug,
              isPublic: collection.isPublic,
            }}
            count={resourcesCount}
            priority="tertiary no outline"
            context="card"
          />
        )}
      </div>
    </article>
  )
}

export default CollectionCard
