import BaseCardSkeleton from '@app/web/components/Base/Card/BaseCardSkeleton'
import React from 'react'

const ProfileBasesPageLoading = () => (
  <div data-testid="base-profiles">
    {Array.from({ length: 8 }).map((_, index) => (
      <BaseCardSkeleton key={index} />
    ))}
  </div>
)

export default ProfileBasesPageLoading
