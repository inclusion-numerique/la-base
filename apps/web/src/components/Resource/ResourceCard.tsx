import type { SessionUser } from '@app/web/auth/sessionUser'
import OwnershipInformation from '@app/web/components/OwnershipInformation'
import { FeedbackBadge } from '@app/web/components/Resource/feedbackBadge/FeedbackBadge'
import ResourceDates from '@app/web/components/Resource/ResourceDates'
import { resourceCardImageBreakpoints } from '@app/web/components/Resource/resourceCardImageBreakpoints'
import SaveResourceInCollectionButton from '@app/web/components/Resource/SaveResourceInCollectionButton'
import ResponsiveUploadedImage from '@app/web/components/ResponsiveUploadedImage'
import type { ResourceListItem } from '@app/web/server/resources/getResourcesList'
import Button from '@codegouvfr/react-dsfr/Button'
import classNames from 'classnames'
import Link from 'next/link'
import React from 'react'
import { getServerUrl } from '../../utils/baseUrl'
import { getResourceAttributionWording } from '../../utils/getResourceAttributionWording'
import CopyLinkButton from '../CopyLinkButton'
import styles from './ResourceCard.module.css'
import { ResourceMoreActionsDropdown } from './ResourceMoreActionsDropdown'
import ResourcesViewsAndMetadata from './ResourcesViewsAndMetadata'

const ResourceCard = ({
  children,
  resource,
  user,
  className,
  isContributor,
  titleAs: ResourceTitle = 'h2',
  isDraft = false,
  context = 'list',
  highlightCount,
  withDate = true,
}: {
  children?: React.ReactNode
  resource: ResourceListItem
  user: SessionUser | null
  className?: string
  isContributor: boolean
  titleAs?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  isDraft?: boolean
  context?: 'highlight' | 'list' | 'newsFeed'
  highlightCount?: number
  withDate?: boolean
}) => (
  <article
    className={classNames(styles.container, className)}
    data-testid="resource-card"
  >
    <div className={styles.header}>
      {!children && context === 'list' && (
        <OwnershipInformation
          user={resource.createdBy}
          base={resource.base}
          attributionWording={
            isDraft ? 'draft-resource' : getResourceAttributionWording(resource)
          }
        />
      )}
      {children}
      {withDate && (
        <div className="fr-hidden fr-unhidden-md fr-text--xs fr-mb-0">
          <ResourceDates canEdit={isContributor} resource={resource} />
        </div>
      )}
    </div>
    <div className="fr-flex fr-direction-column fr-justify-content-space-between">
      <Link
        href={`/ressources/${resource.slug}`}
        className={styles.content}
        data-testid="resource-card-link"
      >
        <div className={styles.textAndDescription}>
          {withDate && (
            <div
              className={classNames(
                styles.dates,
                'fr-hidden-md fr-text--xs fr-mb-1w',
              )}
            >
              <ResourceDates canEdit={isContributor} resource={resource} />
            </div>
          )}
          <ResourceTitle
            className={classNames(
              {
                'fr-text--lg': context === 'highlight' && highlightCount === 3,
                'fr-h3': context === 'highlight' && highlightCount !== 3,
                'fr-h6': context !== 'highlight',
                [styles.clampTitle]: context === 'highlight',
              },
              'fr-mb-md-3v fr-mb-1w',
            )}
          >
            {resource.title}
          </ResourceTitle>
          <p
            className={classNames(
              context === 'highlight' && highlightCount !== 3 && 'fr-text--lg',
              'fr-text--sm fr-mb-0',
              styles.description,
            )}
          >
            {resource.excerpt}
          </p>
        </div>
        {!!resource.image && (
          <div
            className={classNames(
              styles.imageContainer,
              context === 'highlight' &&
                !!highlightCount &&
                highlightCount >= 3 &&
                styles.withImage,
            )}
          >
            <ResponsiveUploadedImage
              id={resource.image.id}
              alt={resource.image.altText ?? ''}
              breakpoints={resourceCardImageBreakpoints}
            />
          </div>
        )}
      </Link>
      <div className="fr-flex fr-align-items-center fr-justify-content-space-between fr-direction-row fr-my-2w">
        {resource.published && (
          <div className="fr-text--sm fr-mb-0">
            <ResourcesViewsAndMetadata
              className={classNames(
                context === 'highlight' &&
                  highlightCount &&
                  highlightCount === 3 &&
                  styles.metadataContainer,
              )}
              context="card"
              resource={resource}
            >
              {resource._count.resourceFeedback > 0 && (
                <>
                  {!(context === 'highlight' && highlightCount === 3) && (
                    <span className="fr-hidden fr-unhidden-sm fr-text--medium">
                      ·
                    </span>
                  )}
                  <FeedbackBadge
                    className="fr-mb-sm-0 fr-mb-3v"
                    value={resource.feedbackAverage}
                  />
                  <span className="fr-text--medium fr-mb-sm-0 fr-mb-3v">
                    {resource._count.resourceFeedback}&nbsp;Avis
                  </span>
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
                  prefetch: false,
                }}
              >
                <span className="fr-unhidden-sm fr-hidden fr-mr-1w">
                  Modifier
                </span>
                <span className="ri-edit-line" aria-hidden />
              </Button>
              <ResourceMoreActionsDropdown
                modalControlClassName="ri-lg"
                dropdownControlClassName="fr-text--bold"
                resource={resource}
                copyLink={true}
                canWrite
              />
            </>
          )}
          {!isContributor && context !== 'highlight' && (
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
                url={getServerUrl(`/ressources/${resource.slug}`, {
                  absolutePath: true,
                })}
              />
            </>
          )}
        </div>
      </div>
    </div>
  </article>
)

export default ResourceCard
