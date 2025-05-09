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
import SaveCollectionModal from '@app/web/components/Collection/SaveCollectionModal'
import DeleteResourceModal from '@app/web/components/Resource/DeleteResource/DeleteResourceModal'
import ResourceCard from '@app/web/components/Resource/ResourceCard'
import SaveResourceInCollectionModal from '@app/web/components/Resource/SaveResourceInCollectionModal'
import type { CollectionPageData } from '@app/web/server/collections/getCollection'
import type { WithMinimalImageData } from '@app/web/server/image/imageTypes'
import Button from '@codegouvfr/react-dsfr/Button'
import React from 'react'

const CollectionView = ({
  collection,
  user,
  isOwner = false,
  canWrite = false,
}: {
  collection: Omit<CollectionPageData, 'image'> & WithMinimalImageData
  user: SessionUser | null
  isOwner?: boolean
  canWrite?: boolean
}) => (
  <>
    <CollectionViewHeader collection={collection} />
    <div>
      <div className="fr-border-bottom fr-border--grey">
        <div className="fr-container fr-container--medium fr-my-5v">
          {collection.slug && (
            <div className="fr-flex fr-justify-content-space-between fr-align-items-center fr-my-2v">
              <CollectionMetaData
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
                    user={user}
                    context="view"
                    resourcesCount={collection.resources.length}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {!collection.isFavorites && (
        <div className="fr-hidden-sm fr-border-bottom fr-border--grey">
          <div className="fr-container fr-container--medium fr-my-5v">
            <CollectionActions
              resourcesCount={collection.resources.length}
              className="fr-justify-content-space-between"
              collection={collection}
              canWrite={isOwner || canWrite}
              user={user}
              context="view"
            />
          </div>
        </div>
      )}
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
            />
          ))
        ) : (
          <EmptyBaseCollections isOwner={isOwner} />
        )}
      </div>
    </div>
    {!!user && <SaveResourceInCollectionModal user={user} />}
    {!!user && <SaveCollectionModal user={user} />}
    <DeleteResourceModal />
    {!!user && (
      <DeleteCollectionModal redirectTo={`/profile/${user.slug}/collections`} />
    )}
  </>
)

export default CollectionView
