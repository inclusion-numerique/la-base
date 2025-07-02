import CollectionMetaData from '@app/web/components/Collection/CollectionMetaData'
import styles from '@app/web/components/Collection/Edition/Order/CollectionOrder.module.css'
import type { CollectionListItem } from '@app/web/server/collections/getCollectionsList'
import classNames from 'classnames'
import Link from 'next/link'

const CollectionOrderRow = ({
  collection,
}: {
  collection: CollectionListItem
}) => (
  <div className={styles.container}>
    <span className={classNames('fr-text--bold', styles.title)}>
      {collection.title}
    </span>
    <CollectionMetaData
      collection={collection}
      count={collection._count.resources}
      context="view"
      className="fr-justify-content-unset fr-my-2v"
      withPrivacyTag={!collection.isPublic}
    />
    <span className="fr-text--xs fr-mb-0">
      Par&nbsp;
      <Link
        href={`/profils/${collection.createdBy.slug}`}
        className="fr-link fr-position-relative fr-link--xs"
      >
        {collection.createdBy.name}
      </Link>
    </span>
  </div>
)

export default CollectionOrderRow
