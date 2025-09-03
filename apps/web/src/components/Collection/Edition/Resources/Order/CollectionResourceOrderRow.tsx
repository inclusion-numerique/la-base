import styles from '@app/web/components/Collection/Edition/Resources/Order/CollectionResourceOrder.module.css'
import DeleteCollectionResourceButton from '@app/web/components/Collection/Edition/Resources/Order/DeleteCollectionResourceButton'
import ResourcesViewsAndMetadata from '@app/web/components/Resource/ResourcesViewsAndMetadata'
import { BaseResource } from '@app/web/server/bases/getBase'
import { Resource } from '@app/web/server/resources/getResource'

const CollectionResourceOrderRow = ({
  resource,
  onDelete,
}: {
  resource: Resource | BaseResource
  onDelete: () => void
}) => (
  <div className={styles.container}>
    <div className="fr-flex fr-flex-gap-2v fr-justify-content-space-between fr-align-items-center">
      <div className="fr-flex fr-direction-column fr-flex-gap-2v">
        <span className="fr-text--bold">{resource.title}</span>
        <div className="fr-flex fr-flex-gap-2v">
          <ResourcesViewsAndMetadata resource={resource} context="collection" />
        </div>
      </div>
      <DeleteCollectionResourceButton onDelete={onDelete} />
    </div>
  </div>
)

export default CollectionResourceOrderRow
