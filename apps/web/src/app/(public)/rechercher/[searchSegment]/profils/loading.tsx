import ProfileCardSkeleton from '@app/web/components/Profile/Card/ProfileCardSkeleton'
import { defaultPaginationParams } from '@app/web/server/search/searchQueryParams'
import React from 'react'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const skeletons = defaultPaginationParams.perPage

const ResultContentLoading = () => (
  <>
    <div className="fr-pt-2v fr-pb-5v fr-width-full fr-flex fr-justify-content-space-between">
      <div className="skeleton-rectangle skeleton-rectangle--120" />
      <div className="skeleton-rectangle skeleton-rectangle--200" />
    </div>
    {Array.from({ length: skeletons }).map((_, index) => (
      <ProfileCardSkeleton key={index} />
    ))}
  </>
)

export default ResultContentLoading
