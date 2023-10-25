import React from 'react'
import sanitizeHtml from 'sanitize-html'
import Image from 'next/image'
import { CollectionPageData } from '@app/web/server/collections/getCollection'
import { SessionUser } from '@app/web/auth/sessionUser'
import { WithMinimalImageData } from '@app/web/server/image/imageTypes'
import PublishedInInformation from '../Resource/PublishedInInformation'
import ResourceCard from '../Resource/Card'
import styles from './View.module.css'
import CollectionMetaData from './CollectionMetaData'

const View = ({
  collection,
  user,
  isOwner,
}: {
  collection: Omit<CollectionPageData, 'image'> & WithMinimalImageData
  user: SessionUser | null
  isOwner: boolean
}) => (
  <div className={styles.container}>
    <div className="fr-mb-4w">
      <PublishedInInformation user={collection.owner} base={collection.base} />
    </div>
    <hr className="fr-mt-4w fr-pb-4w" />
    <div className={styles.collection}>
      <div>
        <h3>{collection.title}</h3>
        {collection.description && (
          <div
            className="fr-text--lg fr-mb-0"
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(collection.description),
            }}
          />
        )}
      </div>
      {collection.image && (
        <Image
          src={`/images/${collection.image.id}.webp`}
          alt={collection.image.altText || ''}
          width={240}
          height={170}
        />
      )}
    </div>
    <hr className="fr-mt-4w fr-pb-1v" />
    <CollectionMetaData
      collection={collection}
      count={collection.resources.length}
      isOwner={isOwner}
      priority="secondary"
    />
    {collection.resources.map((resource) => (
      <ResourceCard key={resource.id} resource={resource} user={user} />
    ))}
  </div>
)

export default View
