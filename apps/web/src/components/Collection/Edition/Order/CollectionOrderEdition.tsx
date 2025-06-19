import CollectionListEdition from '@app/web/components/Collection/Edition/Order/CollectionListEdition'
import CollectionOrderHeader from '@app/web/components/Collection/Edition/Order/CollectionOrderHeader'
import type { CollectionListItem } from '@app/web/server/collections/getCollectionsList'

const CollectionOrderEdition = ({
  redirectProps,
  collections,
}: {
  redirectProps: { href: string; title: string }
  collections: CollectionListItem[]
}) => (
  <div className="fr-container fr-container--medium">
    <CollectionOrderHeader redirectProps={redirectProps} />
    <CollectionListEdition collections={collections} />
  </div>
)

export default CollectionOrderEdition
