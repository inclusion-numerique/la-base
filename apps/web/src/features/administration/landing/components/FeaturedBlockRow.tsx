import DeleteFeaturedBlockButton from '@app/web/features/administration/landing/components/DeleteFeaturedBlockButton'

const FeaturedBlockRow = ({
  title,
  id,
  onDelete,
}: {
  title: string
  id: string
  onDelete: (id: string) => void
}) => (
  <div className="fr-flex fr-direction-column fr-flex-gap-2v">
    <div className="fr-flex fr-flex-gap-2v fr-justify-content-space-between fr-align-items-center">
      <div className="fr-flex fr-direction-column fr-flex-gap-2v">
        <span className="fr-text--bold">{title}</span>
      </div>
      <DeleteFeaturedBlockButton onDelete={() => onDelete(id)} />
    </div>
  </div>
)

export default FeaturedBlockRow
