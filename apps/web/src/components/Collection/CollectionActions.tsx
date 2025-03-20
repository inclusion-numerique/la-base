import classNames from 'classnames'
import { SessionUser } from '@app/web/auth/sessionUser'
import { CollectionMoreActionsDropdown } from '@app/web/components/Collection/CollectionMoreActionsDropdown'
import SaveCollectionButton from '@app/web/components/Collection/SaveCollectionButton'
import CopyLinkButton from '@app/web/components/CopyLinkButton'
import { getServerUrl } from '@app/web/utils/baseUrl'

const CollectionActions = ({
  collection,
  canWrite,
  user,
  className,
  context,
  resourcesCount,
}: {
  collection: {
    isPublic: boolean
    isFavorites: boolean
    id: string
    slug: string
    title: string
    created?: Date
    updated?: Date
  }
  canWrite: boolean
  user: SessionUser | null
  context: 'view' | 'card' | 'contextModal'
  className?: string
  resourcesCount: number
}) => (
  <div className={classNames('fr-flex fr-flex-gap-2v', className)}>
    {canWrite ? (
      <CollectionMoreActionsDropdown
        resourcesCount={resourcesCount}
        priority={context === 'view' ? 'secondary' : 'tertiary no outline'}
        modalPriority={context === 'view' ? 'secondary' : 'tertiary no outline'}
        collection={collection}
        buttonTitle={context === 'view' ? 'Options' : undefined}
      />
    ) : (
      <SaveCollectionButton
        priority={context === 'view' ? 'secondary' : 'tertiary no outline'}
        user={user}
        collection={collection}
        context={context}
        buttonTitle={context === 'view' ? 'Enregistrer' : undefined}
      />
    )}
    <CopyLinkButton
      size="small"
      priority={context === 'view' ? 'secondary' : 'tertiary no outline'}
      url={getServerUrl(`/collections/${collection.slug}`, {
        absolutePath: true,
      })}
    />
  </div>
)

export default CollectionActions
