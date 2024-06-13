import Link from 'next/link'
import React from 'react'
import classNames from 'classnames'
import { Resource } from '@app/web/server/resources/getResource'
import { hasIndexation } from '@app/web/utils/indexation'
import { SessionUser } from '@app/web/auth/sessionUser'
import SaveResourceInCollectionModal from '@app/web/components/Resource/SaveResourceInCollectionModal'
import OwnershipInformation from '@app/web/components/OwnershipInformation'
import ResourceDates from '@app/web/components/Resource/ResourceDates'
import ResponsiveUploadedImage from '@app/web/components/ResponsiveUploadedImage'
import ResourcesViewsAndMetadata from '@app/web/components/Resource/ResourcesViewsAndMetadata'
import ResourceContentView from '@app/web/components/Resource/Contents/ResourceContentView'
import DeleteResource from '@app/web/components/Resource/DeleteResource/DeleteResourceModal'
import { FeedbackBadge } from '@app/web/components/Resource/feedbackBadge/FeedbackBadge'
import SaveCollectionModal from '@app/web/components/Collection/SaveCollectionModal'
import InviteContributorModal from '@app/web/components/Resource/Contributors/InviteContributorModal'
import { addAnchorIdsToResourceContents } from './addAnchorIdsToResourceContents'
import { getResourceNavigationData } from './getResourceNavigationData'
import ResourceMobileNavigation from './ResourceMobileNavigation'
import ResourceReport from './ResourceReport'
import RegisterResourceView from './RegisterResourceView'
import ResourceActions from './ResourceActions'
import ResourceDesktopNavigation from './ResourceDesktopNavigation'
import ResourceInformations from './ResourceInformations'
import ResourcePublicStateBadge from './ResourcePublicStateBadge'
import styles from './ResourceView.module.css'

const CUSTOM_THRESHOLD: [number, number, number, number] = [3.25, 2.5, 1, 0]

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
        <div className="fr-container--slim fr-mx-auto">
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
            <div className="fr-flex fr-flex-gap-3v fr-justify-content-space-between fr-flex-wrap fr-my-md-6v fr-my-2w">
              <div className="fr-text--xs fr-mb-0 fr-flex">
                <ResourceDates canEdit={canWrite} resource={resource} />
              </div>
              {(canWrite || !resource.isPublic) && (
                <span>
                  <ResourcePublicStateBadge small resource={resource} />
                </span>
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
            <h1 className="fr-mt-4v fr-mb-0 fr-mt-md-8v fr-h3">
              {resource.title}
            </h1>
            <p className="fr-text--lg fr-mt-2v fr-mt-md-3v">
              {resource.description}
            </p>
            {resource.published && (
              <ResourcesViewsAndMetadata
                resource={resource}
                showLabels
                showPrivate={false}
                className="fr-my-4v fr-my-md-6v"
              >
                {resource._count.resourceFeedback > 0 && (
                  <>
                    <FeedbackBadge
                      value={resource.feedbackAverage}
                      customThresholds={CUSTOM_THRESHOLD}
                    />
                    <Link href={`/ressources/${resource.slug}/avis`}>
                      {resource._count.resourceFeedback}&nbsp;avis
                    </Link>
                  </>
                )}
              </ResourcesViewsAndMetadata>
            )}
            <ResourceActions
              resource={resource}
              user={user}
              canWrite={canWrite}
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
          {resource._count.resourceFeedback > 0 && (
            <div
              data-testid="resources-feedbacks"
              className="fr-border-top fr-border-bottom fr-py-4w fr-flex"
            >
              <div className="fr-flex fr-direction-lg-row fr-direction-column fr-flex-gap-4v fr-align-items-lg-center fr-flex-grow-1">
                <h2 className="fr-h6 fr-mb-0">
                  {resource._count.resourceFeedback} Avis sur la ressource
                </h2>
                <FeedbackBadge
                  value={resource.feedbackAverage ?? 0}
                  customThresholds={CUSTOM_THRESHOLD}
                />
              </div>
              <div>
                <Link
                  className="fr-link"
                  href={`/ressources/${resource.slug}/avis`}
                >
                  Voir les avis
                </Link>
              </div>
            </div>
          )}

          <RegisterResourceView resourceSlug={resource.slug} />
          {(resource.isPublic || hasIndexation(resource)) && (
            <ResourceInformations resource={resource} />
          )}
        </div>
        {!!user && <SaveResourceInCollectionModal user={user} />}
        {!!user && <SaveCollectionModal user={user} />}
        <InviteContributorModal />
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
