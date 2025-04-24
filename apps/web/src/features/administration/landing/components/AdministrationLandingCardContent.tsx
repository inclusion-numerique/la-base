import Notice from '@codegouvfr/react-dsfr/Notice'
import FeaturedBlockRow from '@app/web/features/administration/landing/components/FeaturedBlockRow'
import { FeaturedBlock } from '@app/web/features/administration/landing/db/getFeaturedBlocksListPageData'

const AdministrationLandingCardContent = ({
  blocks,
  onDelete,
}: {
  blocks: FeaturedBlock[]
  onDelete: (id: string) => void
}) => {
  if (blocks.length === 0) {
    return (
      <Notice
        className="fr-notice--warning fr-mb-4w"
        title={
          <span className="fr-text--regular fr-text-default--grey fr-text--bold">
            Vous devez ajouter au moins un bloc à la une
          </span>
        }
      />
    )
  }

  return blocks.map((block) => (
    <FeaturedBlockRow
      key={block.id}
      title={block.title ?? block.name ?? ''}
      id={block.id}
      onDelete={onDelete}
    />
  ))
}
export default AdministrationLandingCardContent
