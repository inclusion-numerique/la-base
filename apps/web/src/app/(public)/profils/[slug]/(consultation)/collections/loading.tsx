import CollectionCardSkeleton from '@app/web/components/Collection/Cards/CollectionCardSkeleton'

const LoadingProfileCollectionsPage = () => (
  <div data-testid="collections-resources">
    <div className="fr-grid-row fr-grid-row--gutters">
      {Array.from({ length: 4 }).map((_, index) => (
        <div className="fr-col-md-6 fr-col-12" key={index}>
          <CollectionCardSkeleton />
        </div>
      ))}
    </div>
  </div>
)

export default LoadingProfileCollectionsPage
