import classNames from 'classnames'
import { Route } from 'next'
import Link from 'next/link'
import React from 'react'
import Badge from '@codegouvfr/react-dsfr/Badge'
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

const ResourceCard = ({
  resource,
  user,
}: {
  resource: ResourceListItem
  user: SessionUser | null
}) => (
  <div className={styles.container} data-testid="resource-card">
    <div className={styles.header}>
      <PublishedInInformation resource={resource} />
      <div className="fr-hidden fr-unhidden-md fr-text--xs fr-mb-0">
        Mis à jour le {dateAsDay(resource.updated)}
      </div>
    </div>
    <div className={styles.content}>
      <div className={styles.textAndDescription}>
        <p className="fr-hidden-md fr-text--xs fr-mb-1w">
          Mis à jour le {dateAsDay(resource.updated)}
        </p>

        <h6 className={styles.title}>
          <Link tabIndex={0} href={`/ressources/${resource.slug}`}>
            {resource.title}
          </Link>
        </h6>
        <p className={classNames('fr-text--sm fr-mb-0', styles.description)}>
          <Link tabIndex={-1} href={`/ressources/${resource.slug}`}>
            {resource.description}
          </Link>
        </p>
      </div>
      {!!resource.image && (
        <Link
          href={`/ressources/${resource.slug}`}
          className={styles.imageContainer}
        >
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
        </Link>
      )}
    </div>
    <Badge className="fr-hidden-md fr-mt-1w" small noIcon severity="success">
      Très recommandée
    </Badge>
    <div className={styles.footer}>
      <div className={classNames(styles.footerLeft, 'fr-text--sm', 'fr-mb-0')}>
        <ResourcesViewsAndMetadata />
      </div>
      <div className={classNames(styles.footerRight, 'fr-text--sm', 'fr-mb-0')}>
        {user && (
          <IconLink
            data-testid="resource-card-edit-link"
            title="Editer"
            href={`/ressources/${resource.slug}/editer` as Route}
            icon="fr-icon-edit-line"
            small
          />
        )}
        <IconLink
          title="Mettre en favoris"
          href="/"
          icon="fr-icon-bookmark-line"
          small
        />
        <CopyLinkButton url={getServerUrl(`/ressources/${resource.slug}`)} />
      </div>
    </div>
  </div>
)

export default ResourceCard
