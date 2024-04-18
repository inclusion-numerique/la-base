import React from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import Button from '@codegouvfr/react-dsfr/Button'
import { SessionUser } from '@app/web/auth/sessionUser'
import ResourcesViewsAndMetadata from '@app/web/components/Resource/View/ResourcesViewsAndMetadata'
import ResponsiveUploadedImage from '@app/web/components/ResponsiveUploadedImage'
import { ResourceListItem } from '@app/web/server/resources/getResourcesList'
import SaveResourceInCollectionButton from '@app/web/components/Resource/SaveResourceInCollectionButton'
import { resourceCardImageBreakpoints } from '@app/web/components/Resource/resourceCardImageBreakpoints'
import OwnershipInformation from '@app/web/components/OwnershipInformation'
import ResourceDates from '@app/web/components/Resource/ResourceDates'
import styles from './ResourceCard.module.css'
import DeleteResourceButton from './DeleteResourceButton'

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
    <div className={styles.footer}>
      {resource.published && (
        <div className="fr-text--sm fr-mb-0">
          <ResourcesViewsAndMetadata resource={resource} />
        </div>
      )}
      <div className={classNames(styles.footerRight, 'fr-text--sm', 'fr-mb-0')}>
        {isContributor && (
          <>
            <Button
              data-testid="resource-card-edit-link"
              iconId="fr-icon-edit-line"
              size="small"
              priority="tertiary no outline"
              linkProps={{
                href: `/ressources/${resource.slug}/editer`,
              }}
              iconPosition="right"
            >
              Modifier
            </Button>
            {resource.published === null ? (
              <DeleteResourceButton resourceId={resource.id} />
            ) : (
              <SaveResourceInCollectionButton
                user={user}
                resource={resource}
                variant="icon-only"
              />
            )}
          </>
        )}
        {!isContributor && (
          <SaveResourceInCollectionButton
            user={user}
            resource={resource}
            variant="card"
          />
        )}
      </div>
    </div>
  </article>
)

export default ResourceCard
