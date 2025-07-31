import ResourceCardSkeleton from '@app/web/components/Resource/ResourceCardSkeleton'
import { defaultPaginationParams } from '@app/web/server/search/searchQueryParams'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const skeletons = defaultPaginationParams.perPage

const ResultContentLoading = () => (
  <>
    <div className="fr-pt-2v fr-pb-1v fr-width-full fr-flex fr-justify-content-space-between">
      <div className="skeleton-rectangle skeleton-rectangle--120" />
      <div className="skeleton-rectangle skeleton-rectangle--200" />
    </div>
    {Array.from({ length: skeletons }).map((_, index) => (
      <ResourceCardSkeleton key={index} />
    ))}
  </>
)

export default ResultContentLoading
