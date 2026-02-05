import CollectionActions from '@app/web/components/Collection/CollectionActions'
import { appendShareToken } from '@app/web/features/shareableLink/utils/shareTokenUtils'
import type { CollectionListItem } from '@app/web/server/collections/getCollectionsList'
import classNames from 'classnames'
import Link from 'next/link'
import CollectionMetaData from '../CollectionMetaData'
import Images from '../Images'
import styles from './CollectionCard.module.css'

const CollectionCard = ({
  orientation,
  collection,
  canWrite,
  context = undefined,
  highlightCount = undefined,
  token,
}: {
  orientation?: 'row' | 'column'
  collection: CollectionListItem
  canWrite: boolean
  context?: string
  highlightCount?: number
  token?: string
}) => {
  const resourcesCount = collection._count.resources

  const href = appendShareToken(`/collections/${collection.slug}`, token)

  return (
    <article
      className={classNames(
        'fr-flex fr-direction-column fr-width-full fr-border fr-border-radius--8',
        styles.card,
        orientation === 'row' && styles.row,
      )}
      data-testid="collection-card"
    >
      <div className={classNames(orientation === 'row' && styles.link)}>
        <Images
          className={classNames(
            orientation === 'row' && styles.imagesRowContainerRadius,
            orientation === 'row' && 'fr-height-full',
          )}
          image={collection.image}
          isFavoriteCollection={collection.isFavorites}
          resources={collection.resources.map(({ resource }) => resource)}
        />
      </div>
      <div
        className={classNames(
          styles.content,
          context === 'highlight' &&
            highlightCount === 3 &&
            styles.highlightContentPadding,

          (context !== 'highlight' || highlightCount !== 3) &&
            styles.contentPadding,
        )}
      >
        <div>
          <Link
            href={href}
            className={styles.titleLink}
            data-testid="collection-card-link"
          >
            <h3 className={classNames(styles.title, 'fr-text--lg')}>
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
        {collection.slug && (
          <div
            className={classNames(
              'fr-flex fr-justify-content-space-between fr-align-items-center fr-mt-4v',
              styles.footer,
            )}
          >
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
                context="card"
                resourcesCount={resourcesCount}
                token={token}
              />
            )}
          </div>
        )}
      </div>
    </article>
  )
}

export default CollectionCard
