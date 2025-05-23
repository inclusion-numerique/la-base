import ProfileCardSkeleton from '@app/web/components/Profile/Card/ProfileCardSkeleton'
import React from 'react'

const LoadingProfileSuivisPage = () => (
  <div data-testid="base-resources">
    <div className="fr-mb-6w fr-flex fr-justify-content-space-between">
      <h2 className="fr-mb-0 fr-h3">Mes suivi</h2>
    </div>
    {Array.from({ length: 8 }).map((_, index) => (
      <ProfileCardSkeleton key={index} />
    ))}
  </div>
)

export default LoadingProfileSuivisPage
