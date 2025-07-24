import type { SessionUser } from '@app/web/auth/sessionUser'
import {
  ResourcePermissions,
  resourceAuthorization,
} from '@app/web/authorization/models/resourceAuthorization'
import ResourceCard from '@app/web/components/Resource/ResourceCard'
import type { BaseResource } from '@app/web/server/bases/getBase'
import styles from './ResourceTab.module.css'

const ResourceTab = ({
  resources,
  user,
  emptyText,
  'data-testid': dataTestId,
  isDraft = false,
}: {
  resources: BaseResource[]
  user: SessionUser | null
  emptyText: string
  'data-testid': string
  isDraft?: boolean
}) => (
  <div data-testid={dataTestId}>
    {resources.length === 0 ? (
      <div className={styles.emptyBox}>{emptyText}</div>
    ) : (
      resources.map((resource) => (
        <ResourceCard
          titleAs="h3"
          key={resource.slug}
          isContributor={resourceAuthorization(resource, user).hasPermission(
            ResourcePermissions.WriteResource,
          )}
          resource={resource}
          user={user}
          isDraft={isDraft}
        />
      ))
    )}
  </div>
)

export default ResourceTab
