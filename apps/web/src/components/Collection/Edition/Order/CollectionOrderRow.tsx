import Link from 'next/link'
import CollectionMetaData from '@app/web/components/Collection/CollectionMetaData'
import { CollectionListItem } from '@app/web/server/collections/getCollectionsList'
import styles from '@app/web/components/Collection/Edition/Order/CollectionOrder.module.css'

const CollectionOrderRow = ({
  collection,
}: {
  collection: CollectionListItem
}) => (
  <div className={styles.container}>
    <span className="fr-text--bold">{collection.title}</span>
    <CollectionMetaData
      collection={collection}
      count={collection._count.resources}
      context="view"
      className="fr-justify-content-unset"
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
