import IconInSquare from '@app/web/components/IconInSquare'
import ResourceCardSkeleton from '@app/web/components/Resource/ResourceCardSkeleton'
import React from 'react'

const LoadingProfilePage = () => (
  <div data-testid="base-resources">
    <div className="fr-mb-6w fr-flex fr-justify-content-space-between">
      <div className="fr-flex fr-align-items-center fr-flex-gap-5v">
        <IconInSquare iconId="ri-file-text-line" />
        <h2 className="fr-mb-0 fr-h3 fr-text-label--blue-france">
          Mes ressources
        </h2>
      </div>
    </div>
    {Array.from({ length: 8 }).map((_, index) => (
      <ResourceCardSkeleton key={index} />
    ))}
  </div>
)

export default LoadingProfilePage
