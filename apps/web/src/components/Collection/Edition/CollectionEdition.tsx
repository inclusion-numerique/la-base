import React from 'react'
import { CollectionPageData } from '@app/web/server/collections/getCollection'
import CollectionDeletionCard from './CollectionDeletionCard'
import CollectionEditionSideMenu from './CollectionEditionSideMenu'
import CollectionInformationsEdition from './CollectionInformationsEdition'
import CollectionImageEdition from './CollectionImageEdition'
import CollectionVisibilityEdition from './CollectionVisibilityEdition'

const CollectionEdition = ({
  collection,
}: {
  collection: CollectionPageData
}) => (
  <div className="fr-grid-row">
    <CollectionEditionSideMenu />
    <div className="fr-col-12 fr-col-lg-6">
      <h1 className="fr-mb-6w">{collection.title}</h1>
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
