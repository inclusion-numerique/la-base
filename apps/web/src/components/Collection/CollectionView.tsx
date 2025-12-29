import type { SessionUser } from '@app/web/auth/sessionUser'
import {
  ResourceRoles,
  resourceAuthorization,
} from '@app/web/authorization/models/resourceAuthorization'
import EmptyBaseCollections from '@app/web/components/Base/EmptyBaseCollections'
import CollectionActions from '@app/web/components/Collection/CollectionActions'
import CollectionMetaData from '@app/web/components/Collection/CollectionMetaData'
import CollectionViewHeader from '@app/web/components/Collection/CollectionViewHeader'
import DeleteCollectionModal from '@app/web/components/Collection/DeleteCollection/DeleteCollectionModal'
import DeleteResourceModal from '@app/web/components/Resource/DeleteResource/DeleteResourceModal'
import ResourceCard from '@app/web/components/Resource/ResourceCard'
import SaveResourceInCollectionModal from '@app/web/components/Resource/SaveResourceInCollectionModal'
import ShareLinkModal from '@app/web/features/shareableLink/components/ShareLinkModal'
import type { CollectionPageData } from '@app/web/server/collections/getCollection'
import type { WithMinimalImageData } from '@app/web/server/image/imageTypes'
import Button from '@codegouvfr/react-dsfr/Button'

const CollectionView = ({
  collection,
  user,
  isOwner = false,
  canWrite = false,
  shareToken,
}: {
  collection: Omit<CollectionPageData, 'image'> & WithMinimalImageData
  user: SessionUser | null
  isOwner?: boolean
  canWrite?: boolean
  shareToken?: string
}) => (
  <>
    <CollectionViewHeader collection={collection} />
    <div className="fr-mb-50v">
      <div className="fr-border-bottom fr-border--grey">
        <div className="fr-container fr-container--medium fr-my-5v">
          {collection.slug && (
            <div className="fr-flex fr-justify-content-space-between fr-align-items-center fr-my-2v">
              <CollectionMetaData
                className="fr-my-2v"
                collection={{
                  title: collection.title,
                  id: collection.id,
                  slug: collection.slug,
                  isFavorites: collection.isFavorites,
                  isPublic: collection.isPublic,
                  created: collection.created,
                  updated: collection.updated,
                }}
                count={collection.resources.length}
                context="view"
                withPrivacyTag={!collection.isPublic}
              />
              <div className="fr-hidden fr-unhidden-md">
                {collection.isFavorites ? (
                  collection.resources.length > 0 && (
                    <Button
                      priority="secondary"
                      linkProps={{
                        href: `/collections/${collection.slug}/gerer`,
                      }}
                    >
                      <span className="ri-folder-open-line fr-mr-1w" />
                      Gérer les ressources
                    </Button>
                  )
                ) : (
                  <CollectionActions
                    collection={collection}
                    canWrite={isOwner || canWrite}
                    context="view"
                    resourcesCount={collection.resources.length}
                  />
                )}
              </div>
              {!collection.isFavorites && (
                <div className="fr-hidden-sm">
                  <CollectionActions
                    resourcesCount={collection.resources.length}
                    collection={collection}
                    canWrite={isOwner || canWrite}
                    context="view"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      <div className="fr-container fr-container--medium fr-pt-12v">
        {collection.resources.length > 0 ? (
          collection.resources.map(({ resource }, index) => (
            <ResourceCard
              key={resource.id}
              resource={resource}
              user={user}
              isContributor={resourceAuthorization(resource, user).hasRole(
                ResourceRoles.ResourceContributor,
              )}
              className={index === 0 ? 'fr-pt-12v' : undefined}
              shareToken={shareToken}
            />
          ))
        ) : (
          <EmptyBaseCollections isOwner={isOwner} />
        )}
      </div>
    </div>
    {!!user && <SaveResourceInCollectionModal user={user} />}
    <DeleteResourceModal />
    <ShareLinkModal />
    {!!user && (
      <DeleteCollectionModal redirectTo={`/profils/${user.slug}/collections`} />
    )}
  </>
)

export default CollectionView
