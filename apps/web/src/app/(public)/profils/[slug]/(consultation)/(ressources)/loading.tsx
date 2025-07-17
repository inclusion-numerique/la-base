import IconInSquare from '@app/web/components/IconInSquare'
import ResourceCardSkeleton from '@app/web/components/Resource/ResourceCardSkeleton'
import React from 'react'

const LoadingProfilePage = () => (
  <div data-testid="profile-resources-page">
    {Array.from({ length: 8 }).map((_, index) => (
      <ResourceCardSkeleton key={index} />
    ))}
  </div>
)

export default LoadingProfilePage
