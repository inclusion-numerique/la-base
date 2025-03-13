import Button from '@codegouvfr/react-dsfr/Button'
import IconInSquare from '@app/web/components/IconInSquare'

const CollectionOrderHeader = ({
  redirectProps: { href, title },
}: {
  redirectProps: { href: string; title: string }
}) => (
  <div className="fr-col-sm-auto fr-col-12">
    <div className="fr-flex fr-direction-column fr-flex-gap-4v">
      <Button linkProps={{ href }} priority="tertiary no outline">
        <span className="ri-arrow-left-line fr-mr-2w" />
        {title}
      </Button>
      <div className="fr-flex fr-align-items-center fr-justify-content-space-between fr-flex-gap-5v">
        <div className="fr-flex fr-align-items-center fr-flex-gap-5v">
          <IconInSquare iconId="ri-folder-2-line" />
          <h2 className="fr-mb-0 fr-h3 fr-text-label--blue-france">
            Gérer mes collections
          </h2>
        </div>
      </div>
    </div>
  </div>
)

export default CollectionOrderHeader
