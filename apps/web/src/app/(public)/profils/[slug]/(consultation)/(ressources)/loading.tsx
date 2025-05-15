import ResourceCardSkeleton from '@app/web/components/Resource/ResourceCardSkeleton'
import React from 'react'

const LoadingProfilePage = () => (
  <div data-testid="base-resources">
    <div className="fr-mb-6w fr-flex fr-justify-content-space-between">
      <h2 className="fr-mb-0 fr-h3">Ressources</h2>
    </div>
    {Array.from({ length: 8 }).map((_, index) => (
      <ResourceCardSkeleton key={index} />
    ))}
  </div>
)

export default LoadingProfilePage
