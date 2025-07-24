import type { CollectionPageData } from '@app/web/server/collections/getCollection'
import CollectionDeletionCard from './CollectionDeletionCard'
import CollectionEditionSideMenu from './CollectionEditionSideMenu'
import CollectionImageEdition from './CollectionImageEdition'
import CollectionInformationsEdition from './CollectionInformationsEdition'
import CollectionVisibilityEdition from './CollectionVisibilityEdition'

const CollectionEdition = ({
  collection,
}: {
  collection: CollectionPageData
}) => (
  <div className="fr-grid-row">
    <CollectionEditionSideMenu />
    <div className="fr-col-12 fr-col-lg-6">
      <h1 className="fr-mb-6w fr-text-label--blue-france">
        {collection.title}
      </h1>
      <div className="fr-grid-row fr-grid-row--gutters fr-mb-1w">
        <div className="fr-col-12">
          <CollectionInformationsEdition collection={collection} />
        </div>
        <div className="fr-col-12">
          <CollectionImageEdition collection={collection} />
        </div>
        <div className="fr-col-12">
          <CollectionVisibilityEdition collection={collection} />
        </div>
        <div className="fr-col-12">
          <CollectionDeletionCard collection={collection} />
        </div>
      </div>
    </div>
  </div>
)

export default CollectionEdition
