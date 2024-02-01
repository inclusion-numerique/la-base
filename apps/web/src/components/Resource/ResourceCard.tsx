import React from 'react'
import classNames from 'classnames'
import Link from 'next/link'
import Badge from '@codegouvfr/react-dsfr/Badge'
import Button from '@codegouvfr/react-dsfr/Button'
import { SessionUser } from '@app/web/auth/sessionUser'
import ResourcesViewsAndMetadata from '@app/web/components/Resource/View/ResourcesViewsAndMetadata'
import ResponsiveUploadedImage from '@app/web/components/ResponsiveUploadedImage'
import { ResourceListItem } from '@app/web/server/resources/getResourcesList'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import SaveResourceInCollectionButton from '@app/web/components/Resource/SaveResourceInCollectionButton'
import { resourceCardImageBreakpoints } from '@app/web/components/Resource/resourceCardImageBreakpoints'
import OwnershipInformation from '@app/web/components/OwnershipInformation'
import ResourceDates from '@app/web/components/Resource/ResourceDates'
import styles from './ResourceCard.module.css'
import DeleteResourceButton from './DeleteResourceButton'

const getResourceDates = (resource: ResourceListItem) => {
  const lastPublishedDay = resource.lastPublished
    ? dateAsDay(resource.lastPublished)
    : null
  const publishedDay = resource.published ? dateAsDay(resource.published) : null

  // If published, we show the latest publication date
  if (lastPublishedDay) {
    // Published multiple times in different days, we show the latest publication date
    if (lastPublishedDay !== publishedDay) {
      return <div>Mise à jour le {lastPublishedDay}</div>
    }
    // Published once, we show the publication date
    return <div>Publiée le {publishedDay}</div>
  }

  const updatedDay = dateAsDay(resource.updated)
  const createdDay = dateAsDay(resource.created)

  if (updatedDay !== createdDay) {
    return (
      <>
        <div>Créée le {dateAsDay(resource.created)}</div>
        <div className={styles.separator} />
        <div>Modifiée le {dateAsDay(resource.updated)}</div>
      </>
    )
  }

  return <div>Créée le {dateAsDay(resource.created)}</div>
}

const ResourceCard = ({
  resource,
  user,
  className,
}: {
  resource: ResourceListItem
  user: SessionUser | null
  className?: string
}) => {
  // TODO Security this it not the right condition
  const isContributor = user && user.id === resource.createdBy.id

  const isPublished = !!resource.published

  const showUnpublishedModifications =
    isPublished &&
    !!isContributor &&
    resource.updated.getTime() !== resource.published?.getTime()

  const dates = getResourceDates(resource)

  return (
    <article
      className={classNames(styles.container, className)}
      data-testid="resource-card"
    >
      <div className={styles.header}>
        <OwnershipInformation
          user={resource.createdBy}
          base={resource.base}
          attributionWording="none"
        />
        <div className="fr-hidden fr-unhidden-md fr-text--xs fr-mb-0">
          {showUnpublishedModifications && (
            <>
              <Badge small severity="info">
                Modifications non publiées
              </Badge>
              <div
                className={classNames(
                  styles.separator,
                  'fr-hidden fr-unhidden-md',
                )}
              />
            </>
          )}
          <ResourceDates resource={resource} />
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
              showUnpublishedModifications && styles.unpublishedInfosContainer,
              'fr-hidden-md fr-text--xs fr-mb-1w',
            )}
          >
            {dates}
          </div>
          <h6 className={styles.title}>{resource.title}</h6>
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
        <div
          className={classNames(styles.footerRight, 'fr-text--sm', 'fr-mb-0')}
        >
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
}

export default ResourceCard
