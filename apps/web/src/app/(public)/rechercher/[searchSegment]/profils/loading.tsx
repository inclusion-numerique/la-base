import React from 'react'
import { defaultPaginationParams } from '@app/web/server/search/searchQueryParams'
import ProfileCardSkeleton from '@app/web/components/Profile/Card/ProfileCardSkeleton'

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
      // eslint-disable-next-line react/no-array-index-key
      <ProfileCardSkeleton key={index} />
    ))}
  </>
)

export default ResultContentLoading
