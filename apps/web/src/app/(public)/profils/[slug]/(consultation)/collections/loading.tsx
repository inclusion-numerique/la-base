import CollectionCardSkeleton from '@app/web/components/Collection/Cards/CollectionCardSkeleton'
import IconInSquare from '@app/web/components/IconInSquare'
import React from 'react'

const LoadingProfileCollectionsPage = () => (
  <div data-testid="collections-resources">
    <div className="fr-mb-6w fr-flex fr-justify-content-space-between">
      <div className="fr-flex fr-align-items-center fr-flex-gap-5v">
        <IconInSquare iconId="ri-folder-2-line" />
        <h2 className="fr-mb-0 fr-h3 fr-text-label--blue-france">
          Mes collections
        </h2>
      </div>
    </div>
    <div className="fr-grid-row fr-grid-row--gutters">
      {Array.from({ length: 4 }).map((_, index) => (
        <div className="fr-col-md-6 fr-col-12" key={index}>
          <CollectionCardSkeleton />
        </div>
      ))}
    </div>
  </div>
)

export default LoadingProfileCollectionsPage
