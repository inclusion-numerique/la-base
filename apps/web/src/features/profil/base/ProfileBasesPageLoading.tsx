import BaseCardSkeleton from '@app/web/components/Base/Card/BaseCardSkeleton'
import IconInSquare from '@app/web/components/IconInSquare'
import React from 'react'

const ProfileBasesPageLoading = () => (
  <div data-testid="base-resources">
    <div className="fr-mb-6w fr-flex fr-justify-content-space-between">
      <div className="fr-flex fr-align-items-center fr-flex-gap-5v">
        <IconInSquare iconId="ri-folder-2-line" />
        <h2 className="fr-mb-0 fr-h3 fr-text-label--blue-france">Bases</h2>
      </div>
    </div>
    {Array.from({ length: 8 }).map((_, index) => (
      <BaseCardSkeleton key={index} />
    ))}
  </div>
)

export default ProfileBasesPageLoading
