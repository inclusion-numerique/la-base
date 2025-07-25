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
import styles from './ResourceCollectionsModal.module.css'

const { Component: CollectionsResourceModal, open } = createModal({
  id: `resource-collections-modal`,
  isOpenedByDefault: false,
})

const ResourceCollectionsModal = ({ resource }: { resource: Resource }) => {
  const title = `Ressources enregistrées dans ${
    resource._count.collections
  } collection${sPluriel(resource._count.collections)}`
  const publicCollections = resource.collections.filter(
    (collection) => collection.collection.isPublic,
  ).length
  const privateCollections = resource.collections.filter(
    (collection) => !collection.collection.isPublic,
  ).length
  return (
    <>
      <Button
        className="fr-link fr-text--sm fr-hidden fr-unhidden-sm"
        priority="tertiary no outline"
        onClick={open}
      >
        Voir les collections
      </Button>

      <div className="fr-hidden-sm fr-width-full">
        <Button
          className="fr-hidden-sm fr-flex fr-justify-content-center fr-width-full"
          priority="secondary"
          onClick={open}
        >
          Voir les collections
        </Button>
      </div>
      <CollectionsResourceModal title={title}>
        <>
          <div className="fr-flex fr-direction-column fr-direction-sm-row fr-flex-gap-2v fr-align-items-md-center fr-mb-4w">
            {publicCollections > 0 && (
              <div className="fr-flex fr-flex-gap-2v fr-align-items-center">
                <CollectionPrivacyTag
                  isPublic
                  small
                  className={classNames('fr-tag--icon-left', styles.privacyTag)}
                />
                <span className="fr-text--sm fr-text--medium fr-text-mention--grey fr-mb-0">
                  {publicCollections} collection{sPluriel(publicCollections)}
                  &nbsp;publique{sPluriel(publicCollections)}
                </span>
              </div>
            )}
            {publicCollections > 0 && privateCollections > 0 && (
              <span className="fr-hidden fr-unhidden-sm fr-text--sm fr-text--medium fr-text-mention--grey fr-mb-0">
                ·
              </span>
            )}
            {privateCollections > 0 && (
              <div className="fr-flex fr-flex-gap-2v fr-align-items-center">
                <CollectionPrivacyTag
                  isPublic={false}
                  small
                  className={classNames('fr-tag--icon-left', styles.privacyTag)}
                />
                <span className="fr-text--sm fr-text--medium fr-text-mention--grey fr-mb-0">
                  {privateCollections} collection
                  {sPluriel(privateCollections)}
                  &nbsp;privée{sPluriel(privateCollections)}
                </span>
              </div>
            )}
          </div>
          {resource.collections.map(({ collection }) => (
            <div className="fr-flex fr-py-2w fr-justify-content-space-between fr-align-items-center">
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
      </CollectionsResourceModal>
    </>
  )
}

export default ResourceCollectionsModal
