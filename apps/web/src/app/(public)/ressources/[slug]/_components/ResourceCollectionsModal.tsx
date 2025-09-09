'use client'

import { sPluriel } from '@app/ui/utils/pluriel/sPluriel'
import CollectionMetaData from '@app/web/components/Collection/CollectionMetaData'
import IconInSquare from '@app/web/components/IconInSquare'
import OwnershipInformation from '@app/web/components/OwnershipInformation'
import { CollectionPrivacyTag } from '@app/web/components/PrivacyTags'
import type { Resource } from '@app/web/server/resources/getResource'
import Button from '@codegouvfr/react-dsfr/Button'
import { createModal } from '@codegouvfr/react-dsfr/Modal'
import classNames from 'classnames'
import { ReactNode } from 'react'
import styles from './ResourceCollectionsModal.module.css'

export const CollectionsResourceModal = createModal({
  id: `resource-collections-modal`,
  isOpenedByDefault: false,
})

const ResourceCollectionsModal = ({
  resource,
  children,
}: {
  resource: Resource
  children: ReactNode
}) => {
  const { collectionsData } = resource

  const title = `Ressource enregistrée dans ${
    collectionsData.counts.total
  } collection${sPluriel(collectionsData.counts.total)}`

  return (
    <>
      {children}
      <CollectionsResourceModal.Component title={title}>
        <>
          <div className="fr-flex fr-direction-column fr-direction-sm-row fr-flex-gap-2v fr-align-items-md-center fr-mb-4w">
            {collectionsData.counts.public > 0 && (
              <div className="fr-flex fr-flex-gap-2v fr-align-items-center">
                <CollectionPrivacyTag
                  isPublic
                  small
                  className={classNames('fr-tag--icon-left', styles.privacyTag)}
                />
                <span className="fr-text--sm fr-text--medium fr-text-mention--grey fr-mb-0">
                  {collectionsData.counts.public} collection
                  {sPluriel(collectionsData.counts.public)}
                  &nbsp;publique{sPluriel(collectionsData.counts.public)}
                </span>
              </div>
            )}
            {collectionsData.counts.public > 0 &&
              collectionsData.counts.private > 0 && (
                <span className="fr-hidden fr-unhidden-sm fr-text--sm fr-text--medium fr-text-mention--grey fr-mb-0">
                  ·
                </span>
              )}
            {collectionsData.counts.private > 0 && (
              <div className="fr-flex fr-flex-gap-2v fr-align-items-center">
                <CollectionPrivacyTag
                  isPublic={false}
                  small
                  className={classNames('fr-tag--icon-left', styles.privacyTag)}
                />
                <span className="fr-text--sm fr-text--medium fr-text-mention--grey fr-mb-0">
                  {collectionsData.counts.private} collection
                  {sPluriel(collectionsData.counts.private)}
                  &nbsp;privée{sPluriel(collectionsData.counts.private)}
                </span>
              </div>
            )}
          </div>
          {collectionsData.counts.visible === 0 && (
            <span className="fr-text--sm fr-text--medium fr-text-mention--grey fr-mb-0">
              Aucune collection publique
            </span>
          )}
          {collectionsData.visible.map((collection) => (
            <div
              key={collection.id}
              className="fr-flex fr-py-2w fr-justify-content-space-between fr-align-items-center"
            >
              <div className="fr-flex fr-flex-gap-6v fr-align-items-center">
                <IconInSquare iconId="ri-folder-2-line" size="medium" />
                <div className="fr-flex fr-direction-column fr-flex-gap-1v">
                  <span className="fr-text--bold">{collection.title}</span>
                  <OwnershipInformation
                    withImage={false}
                    user={collection.createdBy}
                    base={collection.base}
                    attributionWording="collection"
                  />
                  <CollectionMetaData
                    collection={collection}
                    count={collection.resources.length}
                    context="contextModal"
                    withPrivacyTag={!collection.isPublic}
                  />
                </div>
              </div>
              <div>
                <Button
                  priority="secondary"
                  linkProps={{
                    href: `/collections/${collection.slug}`,
                  }}
                >
                  Voir
                </Button>
              </div>
            </div>
          ))}
        </>
      </CollectionsResourceModal.Component>
    </>
  )
}

export default ResourceCollectionsModal
