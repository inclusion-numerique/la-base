import React from 'react'
import ProfileCardSkeleton from '@app/web/components/Profile/Card/ProfileCardSkeleton'

const LoadingProfileSuivisPage = () => (
  <div data-testid="base-resources">
    <div className="fr-mb-6w fr-flex fr-justify-content-space-between">
      <h2 className="fr-mb-0 fr-h3">Mes suivi</h2>
    </div>
    {Array.from({ length: 8 }).map((_, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <ProfileCardSkeleton key={index} />
    ))}
  </div>
)

export default LoadingProfileSuivisPage
