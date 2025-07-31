const ProfileCardSkeleton = () => (
  <article className="fr-border-top" data-testid="profile-skeleton">
    <div className="fr-flex fr-flex-gap-2v fr-align-items-center fr-width-full fr-py-3w">
      <div className="skeleton-quarter skeleton--48 fr-mr-1w" />
      <div className="fr-width-full">
        <div className="skeleton-rectangle skeleton-rectangle--120" />
        <div className="fr-mt-2v skeleton-rectangle skeleton-rectangle--240" />
      </div>
    </div>
  </article>
)

export default ProfileCardSkeleton
