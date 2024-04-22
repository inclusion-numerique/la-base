import Link from 'next/link'
import React from 'react'
import classNames from 'classnames'
import { CollectionPageData } from '@app/web/server/collections/getCollection'
import { SessionUser } from '@app/web/auth/sessionUser'
import { WithMinimalImageData } from '@app/web/server/image/imageTypes'
import SaveResourceInCollectionModal from '@app/web/components/Resource/SaveResourceInCollectionModal'
import DeleteResource from '@app/web/components/Resource/DeleteResource/DeleteResource'
import Images from '@app/web/components/Collection/Images'
import OwnershipInformation from '@app/web/components/OwnershipInformation'
import SaveCollectionModal from '@app/web/components/Collection/SaveCollectionModal'
import CollectionMetaData from '@app/web/components/Collection/CollectionMetaData'
import ResourceCard from '@app/web/components/Resource/ResourceCard'
import {
  resourceAuthorization,
  ResourceRoles,
} from '@app/web/authorization/models/resourceAuthorization'
import { getServerUrl } from '@app/web/utils/baseUrl'
import CopyLinkButton from '../CopyLinkButton'
import styles from './CollectionView.module.css'
import SaveCollectionButton from './SaveCollectionButton'

const CollectionView = ({
  collection,
  user,
  canWrite,
}: {
  collection: Omit<CollectionPageData, 'image'> & WithMinimalImageData
  user: SessionUser | null
  canWrite: boolean
}) => (
  <div className="fr-width-full">
    <OwnershipInformation
      user={collection.createdBy}
      base={collection.base}
      attributionWording="collection"
    />
    <hr className="fr-separator-4v fr-separator-md-8v" />
    <div className="fr-flex fr-flex-gap-2v fr-mb-2w fr-hidden-md">
      {canWrite && (
        <Link
          href={`./${collection.slug}/modifier`}
          className={classNames(
            'fr-btn',
            'fr-btn--sm',
            `fr-btn--secondary`,
            'fr-icon-edit-line',
            'fr-btn--icon-right',
          )}
        >
          Modifier
        </Link>
      )}

      <SaveCollectionButton
        priority="tertiary"
        user={user}
        collection={collection}
        context="view"
      />
      <CopyLinkButton
        size="small"
        priority="tertiary"
        url={getServerUrl(`/collections/${collection.slug}`, true)}
      />
    </div>
    <div className="fr-flex fr-justify-content-space-between fr-flex-gap-4v fr-direction-column fr-direction-md-row-reverse">
      <div className={classNames(styles.imageContainer)}>
        <Images
          resources={collection.resources.map(({ resource }) => resource)}
          image={collection.image}
        />
      </div>
      <div>
        <h1 className="fr-mb-4v fr-h3">{collection.title}</h1>
        {collection.description && (
          <div
            className="fr-text--lg fr-mb-0"
            dangerouslySetInnerHTML={{
              __html: collection.description,
            }}
          />
        )}
      </div>
    </div>
    <hr className="fr-mt-4v fr-mt-md-8v fr-pb-1v" />
    {collection.slug && (
      <CollectionMetaData
        user={user}
        collection={{
          id: collection.id,
          slug: collection.slug,
          isPublic: collection.isPublic,
        }}
        count={collection.resources.length}
        canWrite={canWrite}
        priority="secondary"
        context="view"
        actionsClassName="fr-hidden fr-unhidden-md"
      />
    )}
    {collection.resources.map(({ resource }, index) => (
      <ResourceCard
        key={resource.id}
        resource={resource}
        user={user}
        isContributor={resourceAuthorization(resource, user).hasRole(
          ResourceRoles.ResourceContributor,
        )}
        className={index === 0 ? 'fr-pt-12v' : undefined}
      />
    ))}
    {!!user && <SaveResourceInCollectionModal user={user} />}
    {!!user && <SaveCollectionModal user={user} />}
    {!!user && <DeleteResource />}
  </div>
)

export default CollectionView
