import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import classNames from 'classnames'
import React from 'react'
import { PrivacyTag } from '../PrivacyTags'

const CollectionMetaData = ({
  collection,
  count,
  context,
  className,
  hideRessourceLabelOnSmallDevices = false,
  withPrivacyTag = true,
  withCollectionDates = true,
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
  withPrivacyTag?: boolean
  withCollectionDates?: boolean
}) => (
  <div
    className={classNames(
      'fr-flex fr-text--sm fr-mb-0 fr-text-mention--grey',
      context === 'view' &&
        'fr-justify-content-start fr-flex-gap-2v fr-flex-gap-md-0 fr-direction-row fr-direction-sm-column fr-justify-content-md-space-between fr-direction-md-row',
      ['card', 'contextModal'].includes(context) && 'fr-flex-gap-2v',
      className,
    )}
  >
    <div
      className={classNames(
        'fr-flex fr-flex-gap-2v',
        !withCollectionDates && 'fr-mr-2v',
      )}
    >
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
      {!!withPrivacyTag && (
        <div className="fr-flex fr-flex-gap-2v fr-ml-md-2v">
          <span>•</span>
          <div className="fr-hidden fr-unhidden-sm">
            <PrivacyTag
              isPublic={collection.isPublic}
              small
              label={collection.isPublic ? 'Publique' : 'Privée'}
            />
          </div>
          <div className="fr-hidden-sm">
            <PrivacyTag isPublic={collection.isPublic} small />
          </div>
        </div>
      )}
    </div>
  </div>
)

export default CollectionMetaData
