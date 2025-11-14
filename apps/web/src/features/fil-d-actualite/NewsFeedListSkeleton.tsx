import ResourceCardSkeleton from '@app/web/components/Resource/ResourceCardSkeleton'

const NewsFeedListSkeleton = () => (
  <div className="fr-flex fr-direction-column fr-flex-gap-4v">
    {Array.from({ length: 3 }).map((_, index) => (
      <ResourceCardSkeleton key={index} />
    ))}
  </div>
)

export default NewsFeedListSkeleton
