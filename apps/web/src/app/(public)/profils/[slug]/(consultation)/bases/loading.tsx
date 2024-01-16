import React from 'react'
import BaseCardSkeleton from '@app/web/components/Base/Card/BaseCardSkeleton'

const LoadingProfileBasesPage = () => (
  <div data-testid="base-resources">
    <div className="fr-mb-6w fr-flex fr-justify-content-space-between">
      <h3 className="fr-mb-0">Bases</h3>
    </div>
    {Array.from({ length: 8 }).map((_, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <BaseCardSkeleton key={index} />
    ))}
  </div>
)

export default LoadingProfileBasesPage
