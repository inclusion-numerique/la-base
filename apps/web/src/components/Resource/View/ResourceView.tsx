import React from 'react'
import classNames from 'classnames'
import { Resource } from '@app/web/server/resources/getResource'
import { hasIndexation } from '@app/web/utils/indexation'
import { SessionUser } from '@app/web/auth/sessionUser'
import SaveResourceInCollectionModal from '@app/web/components/Resource/SaveResourceInCollectionModal'
import ResourceReport from '@app/web/components/Resource/View/ResourceReport'
import OwnershipInformation from '@app/web/components/OwnershipInformation'
import ResourceDates from '@app/web/components/Resource/ResourceDates'
import ResourcePublicStateBadge from '@app/web/components/Resource/View/ResourcePublicStateBadge'
import ResourceDesktopNavigation from '@app/web/components/Resource/View/ResourceDesktopNavigation'
import { getResourceNavigationData } from '@app/web/components/Resource/View/getResourceNavigationData'
import { addAnchorIdsToResourceContents } from '@app/web/components/Resource/View/addAnchorIdsToResourceContents'
import ResponsiveUploadedImage from '@app/web/components/ResponsiveUploadedImage'
import ResourcesViewsAndMetadata from '@app/web/components/Resource/View/ResourcesViewsAndMetadata'
import ResourceActions from '@app/web/components/Resource/View/ResourceActions'
import ResourceMobileNavigation from '@app/web/components/Resource/View/ResourceMobileNavigation'
import ResourceContentView from '@app/web/components/Resource/Contents/ResourceContentView'
import RegisterResourceView from '@app/web/components/Resource/View/RegisterResourceView'
import DeleteResource from '@app/web/components/Resource/DeleteResource/DeleteResource'
import styles from './ResourceView.module.css'
import ResourceInformations from './ResourceInformations'

const ResourceView = ({
  resource,
  user,
  canDelete,
  canWrite,
}: {
  resource: Resource
  user: SessionUser | null
  canWrite: boolean
  canDelete: boolean
}) => {
  const hasInformationSection = resource.isPublic || hasIndexation(resource)
  const contentsWithAnchor = addAnchorIdsToResourceContents(resource.contents)
  const navigationData = getResourceNavigationData({
    slug: resource.slug,
    title: resource.title,
    contentsWithAnchor,
    hasInformationSection,
  })

  return (
    <div className="fr-grid-row fr-pb-20v" data-testid="resource-view">
      <div className="fr-col-12 fr-col-md-4 fr-col-lg-3 fr-hidden fr-unhidden-md">
        <div className={styles.leftColumn}>
          <ResourceDesktopNavigation
            resource={resource}
            navigationData={navigationData}
          />
        </div>
      </div>
      <div className="fr-col-12 fr-col-md-7 fr-col-md-6 fr-pb-20v">
        <div className={styles.contentColumn}>
          {/* This div is used for top anchor */}
          <div id={resource.slug} className="fr-width-full">
            <OwnershipInformation
              user={resource.createdBy}
              base={resource.base}
              attributionWording={
                resource.published ? 'resource' : 'draft-resource'
              }
            />
            <hr className="fr-separator-4v fr-separator-md-6v" />
            <div className="fr-flex fr-direction-column fr-direction-md-row fr-justify-content-space-between fr-align-items-start fr-align-items-md-center fr-flex-gap-3v fr-mb-4v fr-mb-md-6v">
              <div className="fr-text--xs fr-mb-0 fr-flex">
                <ResourceDates canEdit={canWrite} resource={resource} />
              </div>
              {canWrite && (
                <ResourcePublicStateBadge small resource={resource} />
              )}
            </div>
            {resource.image ? (
              <div className={styles.imageContainer}>
                <ResponsiveUploadedImage
                  id={resource.image.id}
                  alt={resource.image.altText ?? ''}
                  breakpoints={[
                    { media: '(min-width: 768px)', width: 620 - 32 },
                    { media: '(min-width: 620px)', width: 768 - 32 },
                    { media: '(min-width: 576px)', width: 620 - 32 },
                    { media: '(min-width: 320px)', width: 576 - 32 },
                    { media: '(max-width: 320px)', width: 320 - 32 },
                  ]}
                />
              </div>
            ) : null}
            <h3 className="fr-mt-4v fr-mb-0 fr-mt-md-8v">{resource.title}</h3>
            <p className="fr-text--lg fr-mt-2v fr-mt-md-3v fr-mb-0">
              {resource.description}
            </p>
            <ResourcesViewsAndMetadata
              resource={resource}
              className="fr-my-4v fr-my-md-6v"
            />
            <ResourceActions
              resource={resource}
              user={user}
              canWrite={canWrite}
              canDelete={canDelete}
            />
            <ResourceMobileNavigation navigationData={navigationData} />
          </div>
          {contentsWithAnchor.map((content, index) => (
            <div
              key={content.id}
              id={content.anchorId}
              className={classNames('fr-py-4v', index === 0 && 'fr-pt-6v')}
            >
              <ResourceContentView content={content} />
            </div>
          ))}
          <RegisterResourceView resourceSlug={resource.slug} />
          {(resource.isPublic || hasIndexation(resource)) && (
            <ResourceInformations resource={resource} />
          )}
        </div>
        {!!user && <SaveResourceInCollectionModal user={user} />}
        {canDelete && (
          <DeleteResource
            redirectTo={
              resource.base
                ? `/bases/${resource.base.slug}`
                : `/profils/${resource.createdBy.slug}`
            }
          />
        )}
        <ResourceReport resourceId={resource.id} />
      </div>
    </div>
  )
}

export default ResourceView
