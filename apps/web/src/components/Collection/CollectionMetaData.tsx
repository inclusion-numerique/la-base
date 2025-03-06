import React from 'react'
import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import classNames from 'classnames'
import CollectionDates from '@app/web/components/Collection/CollectionDates'
import { PrivacyTag } from '../PrivacyTags'

const CollectionMetaData = ({
  collection,
  count,
  context,
  className,
  hideRessourceLabelOnSmallDevices = false,
  withPrivacyTag = true,
}: {
  collection: {
    isPublic: boolean
    isFavorites: boolean
    id: string
    slug: string
    title: string
    created: Date
    updated: Date
  }
  count: number
  context: 'card' | 'view' | 'contextModal'
  hideRessourceLabelOnSmallDevices?: boolean
  className?: string
}) => (
  <div
    className={classNames(
      'fr-flex fr-my-2v fr-text--sm fr-mb-0 fr-text-mention--grey',
      context === 'view' &&
        'fr-justify-content-start fr-direction-column fr-justify-content-md-space-between fr-direction-md-row',
      ['card', 'contextModal'].includes(context) && 'fr-flex-gap-2v',
      className,
    )}
  >
    <div className="fr-flex fr-flex-gap-2v">
      <span className="fr-icon-file-text-line fr-icon--sm" />
      <span>{count}</span>
      <span
        className={
          hideRessourceLabelOnSmallDevices ? 'fr-hidden fr-unhidden-sm' : ''
        }
      >
        Ressource{sPluriel(count)}
      </span>
    </div>
    <div className="fr-flex fr-flex-gap-2v">
      {context === 'view' && (
        <div className="fr-flex fr-flex-gap-2v fr-ml-md-2v">
          <span className="fr-hidden fr-unhidden-md">•</span>
          <CollectionDates collection={collection} />
        </div>
      )}
      {!!withPrivacyTag && (
        <div className="fr-flex fr-flex-gap-2v">
          <span>•</span>
          <PrivacyTag
            isPublic={collection.isPublic}
            small
            label={collection.isPublic ? 'Publique' : 'Privée'}
          />
        </div>
      )}
    </div>
  </div>
)

export default CollectionMetaData
