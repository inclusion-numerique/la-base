import React from 'react'
import classNames from 'classnames'
import { Route } from 'next'
import Link from 'next/link'
import Badge from '@codegouvfr/react-dsfr/Badge'
import Notice from '@codegouvfr/react-dsfr/Notice'
import { SessionUser } from '@app/web/auth/sessionUser'
import CopyLinkButton from '@app/web/components/CopyLinkButton'
import ResourcesViewsAndMetadata from '@app/web/components/Resource/View/ResourcesViewsAndMetadata'
import ResponsiveUploadedImage from '@app/web/components/ResponsiveUploadedImage'
import { ResourceListItem } from '@app/web/server/resources/getResourcesList'
import { getServerUrl } from '@app/web/utils/baseUrl'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import IconLink from '../Icon/IconLink'
import styles from './Card.module.css'
import PublishedInInformation from './PublishedInInformation'
import DeleteResourceButton from './DeleteResourceButton'

const ResourceCard = ({
  resource,
  user,
}: {
  resource: ResourceListItem
  user: SessionUser | null
}) => {
  const isContributor = user && user.id === resource.createdBy.id

  const dates = resource.published ? (
    isContributor &&
    resource.updated.getTime() !== resource.published.getTime() ? (
      <>
        <Notice
          className={styles.smallNotice}
          title="Modifications non publiées"
        />
        <div className={styles.separator} />
        <div>Mis à jour le {dateAsDay(resource.updated)}</div>
      </>
    ) : (
      <div>Mis à jour le {dateAsDay(resource.updated)}</div>
    )
  ) : (
    <>
      <div>Créé le {dateAsDay(resource.created)}</div>
      {dateAsDay(resource.created) !== dateAsDay(resource.updated) && (
        <>
          <div className={styles.separator} />
          <div>Modifié le {dateAsDay(resource.updated)}</div>
        </>
      )}
    </>
  )

  return (
    <div className={styles.container} data-testid="resource-card">
      <div className={styles.header}>
        <PublishedInInformation resource={resource} />
        <div className="fr-hidden fr-unhidden-md fr-text--xs fr-mb-0">
          {dates}
        </div>
      </div>
      <Link href={`/ressources/${resource.slug}`} className={styles.content}>
        <div className={styles.textAndDescription}>
          <div
            className={classNames(
              styles.dates,
              'fr-hidden-md fr-text--xs fr-mb-1w',
            )}
          >
            {dates}
          </div>
          <h6 className={styles.title}>{resource.title}</h6>
          <p className={classNames('fr-text--sm fr-mb-0', styles.description)}>
            {resource.description}
          </p>
        </div>
        {!!resource.image && (
          <div className={styles.imageContainer}>
            <ResponsiveUploadedImage
              id={resource.image.id}
              alt={resource.image.altText ?? ''}
              breakpoints={[
                { media: '(max-width: 320px)', width: 320 - 32 },
                { media: '(max-width: 576px)', width: 576 - 32 },
                { media: '(max-width: 768px)', width: 768 - 32 },
                { media: '(min-width: 768px)', width: 180 },
              ]}
            />
          </div>
        )}
      </Link>
      <Badge className="fr-hidden-md fr-mt-1w" small noIcon severity="success">
        Très recommandée
      </Badge>
      <div className={styles.footer}>
        {resource.published && (
          <div className="fr-text--sm fr-mb-0">
            <ResourcesViewsAndMetadata />
          </div>
        )}
        <div
          className={classNames(styles.footerRight, 'fr-text--sm', 'fr-mb-0')}
        >
          {isContributor && (
            <IconLink
              data-testid="resource-card-edit-link"
              title="Editer"
              href={`/ressources/${resource.slug}/editer` as Route}
              icon="fr-icon-edit-line"
              small
            />
          )}
          {resource.published === null ? (
            <DeleteResourceButton resourceId={resource.id} />
          ) : (
            <>
              <IconLink
                title="Mettre en favoris"
                href="/"
                icon="fr-icon-bookmark-line"
                small
              />
              <CopyLinkButton
                url={getServerUrl(`/ressources/${resource.slug}`, true)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default ResourceCard
