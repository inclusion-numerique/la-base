const CollectionCardSkeleton = () => (
  <div className="fr-border fr-flex fr-direction-column fr-mb-1v">
    <div className="skeleton-rectangle skeleton-image--230" />
    <div className="fr-p-3w">
      <div className="fr-flex fr-align-items-center fr-mb-2w">
        <div className="skeleton-round skeleton--32 fr-mr-3v" />
        <div className="skeleton-rectangle skeleton-rectangle--120" />
      </div>
      <div className="skeleton-rectangle skeleton-rectangle--120" />
      <div className="fr-mb-2w">
        <span className="skeleton-rectangle skeleton-rectangle--120 fr-ml-1w" />
        <div className="fr-mb-3v skeleton-rectangle skeleton-rectangle--480" />
        <div className="fr-mb-3v skeleton-rectangle skeleton-rectangle--400" />
      </div>
      <div className="skeleton-rectangle skeleton-rectangle--180" />
    </div>
  </div>
)

export default CollectionCardSkeleton
