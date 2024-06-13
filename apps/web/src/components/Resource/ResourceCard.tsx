import React from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import Button from '@codegouvfr/react-dsfr/Button'
import { SessionUser } from '@app/web/auth/sessionUser'
import ResponsiveUploadedImage from '@app/web/components/ResponsiveUploadedImage'
import { ResourceListItem } from '@app/web/server/resources/getResourcesList'
import SaveResourceInCollectionButton from '@app/web/components/Resource/SaveResourceInCollectionButton'
import { resourceCardImageBreakpoints } from '@app/web/components/Resource/resourceCardImageBreakpoints'
import OwnershipInformation from '@app/web/components/OwnershipInformation'
import ResourceDates from '@app/web/components/Resource/ResourceDates'
import { FeedbackBadge } from '@app/web/components/Resource/feedbackBadge/FeedbackBadge'
import { getServerUrl } from '../../utils/baseUrl'
import CopyLinkButton from '../CopyLinkButton'
import styles from './ResourceCard.module.css'
import { ResourceMoreActionsDropdown } from './ResourceMoreActionsDropdown'
import ResourcesViewsAndMetadata from './ResourcesViewsAndMetadata'

const CUSTOM_THRESHOLD: [number, number, number, number] = [3.25, 2.5, 1, 0]

const ResourceCard = ({
  resource,
  user,
  className,
  isContributor,
  titleAs: ResourceTitle = 'h2',
  isDraft = false,
}: {
  resource: ResourceListItem
  user: SessionUser | null
  className?: string
  isContributor: boolean
  titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  isDraft?: boolean
}) => (
  <article
    className={classNames(styles.container, className)}
    data-testid="resource-card"
  >
    <div className={styles.header}>
      <OwnershipInformation
        user={resource.createdBy}
        base={resource.base}
        attributionWording={isDraft ? 'draft-resource' : 'resource'}
        displayUser={false}
      />
      <div className="fr-hidden fr-unhidden-md fr-text--xs fr-mb-0">
        <ResourceDates canEdit={isContributor} resource={resource} />
      </div>
    </div>
    <Link
      href={`/ressources/${resource.slug}`}
      className={styles.content}
      data-testid="resource-card-link"
    >
      <div className={styles.textAndDescription}>
        <div
          className={classNames(
            styles.dates,
            'fr-hidden-md fr-text--xs fr-mb-1w',
          )}
        >
          <ResourceDates canEdit={isContributor} resource={resource} />
        </div>
        <ResourceTitle className="fr-mb-md-3v fr-mb-1w fr-h6">
          {resource.title}
        </ResourceTitle>
        <p className={classNames('fr-text--sm fr-mb-0', styles.description)}>
          {resource.excerpt}
        </p>
      </div>
      {!!resource.image && (
        <div className={styles.imageContainer}>
          <ResponsiveUploadedImage
            id={resource.image.id}
            alt={resource.image.altText ?? ''}
            breakpoints={resourceCardImageBreakpoints}
          />
        </div>
      )}
    </Link>
    <div className="fr-flex fr-align-items-md-center fr-justify-content-space-between fr-direction-row fr-my-2w">
      {resource.published && (
        <div className="fr-text--sm fr-mb-0">
          <ResourcesViewsAndMetadata resource={resource}>
            {resource._count.resourceFeedback > 0 && (
              <>
                <FeedbackBadge
                  value={resource.feedbackAverage}
                  customThresholds={CUSTOM_THRESHOLD}
                />
                {resource._count.resourceFeedback}&nbsp;avis
              </>
            )}
          </ResourcesViewsAndMetadata>
        </div>
      )}
      <div className="fr-flex fr-align-items-center fr-ml-auto fr-mt-auto">
        {isContributor && (
          <>
            <Button
              data-testid="resource-card-edit-link"
              title="Modifier"
              size="small"
              priority="tertiary no outline"
              linkProps={{
                href: `/ressources/${resource.slug}/editer`,
              }}
            >
              <span className="fr-unhidden-sm fr-hidden fr-mr-1w">
                Modifier
              </span>
              <span className="ri-edit-line" aria-hidden />
            </Button>
            <ResourceMoreActionsDropdown
              resource={resource}
              copyLink={false}
              canWrite
            />
          </>
        )}
        {!isContributor && (
          <>
            <SaveResourceInCollectionButton
              className="fr-pl-md-3v fr-pl-0"
              size="small"
              priority="tertiary no outline"
              user={user}
              resource={resource}
            >
              <span className="fr-unhidden-sm fr-hidden">Enregistrer</span>
            </SaveResourceInCollectionButton>
            <CopyLinkButton
              size="small"
              priority="tertiary no outline"
              url={getServerUrl(`/ressources/${resource.slug}`, true)}
            />
          </>
        )}
      </div>
    </div>
  </article>
)

export default ResourceCard
