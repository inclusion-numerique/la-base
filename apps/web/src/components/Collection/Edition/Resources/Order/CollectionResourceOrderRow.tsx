import styles from '@app/web/components/Collection/Edition/Resources/Order/CollectionResourceOrder.module.css'
import ResourcesViewsAndMetadata from '@app/web/components/Resource/ResourcesViewsAndMetadata'
import { ResourceListItem } from '@app/web/server/resources/getResourcesList'

const CollectionResourceOrderRow = ({
  resource,
}: {
  resource: ResourceListItem
}) => (
  <div className={styles.container}>
    <div className="fr-flex fr-direction-column fr-flex-gap-2v">
      <span className="fr-text--bold">{resource.title}</span>
      <div className="fr-flex fr-flex-gap-2v">
        <ResourcesViewsAndMetadata resource={resource} />
      </div>
    </div>
  </div>
)

export default CollectionResourceOrderRow
