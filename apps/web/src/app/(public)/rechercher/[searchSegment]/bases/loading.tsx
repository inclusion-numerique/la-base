import React from 'react'
import type { Metadata } from 'next'
import { defaultPaginationParams } from '@app/web/server/search/searchQueryParams'
import BaseCardSkeleton from '@app/web/components/Base/Card/BaseCardSkeleton'
import { metadataTitle } from '@app/web/app/metadataTitle'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const skeletons = defaultPaginationParams.perPage

export const metadata: Metadata = {
  title: metadataTitle('Rechercher des bases'),
}

const ResultContentLoading = () => (
  <>
    <div className="fr-pt-2v fr-pb-1v fr-width-full fr-flex fr-justify-content-space-between">
      <div className="skeleton-rectangle skeleton-rectangle--120" />
      <div className="skeleton-rectangle skeleton-rectangle--200" />
    </div>
    {Array.from({ length: skeletons }).map((_, index) => (
      // eslint-disable-next-line react/no-array-index-key
      <BaseCardSkeleton key={index} />
    ))}
  </>
)

export default ResultContentLoading
