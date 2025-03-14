import CollectionMetaData from '@app/web/components/Collection/CollectionMetaData'
import CollectionViewHeader from '@app/web/components/Collection/CollectionViewHeader'
import CollectionResourcesListEdition from '@app/web/components/Collection/Edition/Resources/Order/CollectionResourcesListEdition'
import { CollectionPageData } from '@app/web/server/collections/getCollection'

const CollectionResourcesOrderEdition = ({
  collection,
}: {
  collection: CollectionPageData
}) => (
  <>
    <CollectionViewHeader collection={collection} />
    <div>
      <div className="fr-border-bottom fr-border--grey">
        <div className="fr-container fr-container--medium fr-my-5v">
          {collection.slug && (
            <div className="fr-flex fr-justify-content-space-between fr-align-items-center fr-my-2v">
              <CollectionMetaData
                withCollectionDates={false}
                collection={{
                  title: collection.title,
                  id: collection.id,
                  slug: collection.slug,
                  isFavorites: collection.isFavorites,
                  isPublic: collection.isPublic,
                  created: collection.created,
                  updated: collection.updated,
                }}
                count={collection.resources.length}
                context="view"
              />
            </div>
          )}
        </div>
      </div>
    </div>
    <div className="fr-container fr-container--medium">
      <CollectionResourcesListEdition
        collectionId={collection.id}
        resources={collection.resources.map(
          ({ collectionResourceId, resource }) => ({
            ...resource,
            collectionResourceId,
          }),
        )}
      />
    </div>
  </>
)

export default CollectionResourcesOrderEdition
