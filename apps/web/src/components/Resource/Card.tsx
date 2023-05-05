import React from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import Badge from '@codegouvfr/react-dsfr/Badge'
import { SessionUser } from '@app/web/auth/sessionUser'
import { ResourceListItem } from '@app/web/server/resources'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import ResourcesViewsAndMetadata from '@app/web/components/Resource/View/ResourcesViewsAndMetadata'
import styles from './Card.module.css'
import PublishedInInformation from './PublishedInInformation'
import IconLink from '../Icon/IconLink'
import Separator from '../Separator/Separator'

const ResourceCard = ({
  resource,
  withImage,
  user,
}: {
  resource: ResourceListItem
  withImage?: boolean
  user: SessionUser | null
}) => (
  <>
    <Separator />
    <div className={styles.container}>
      <div className={styles.header}>
        <PublishedInInformation resource={resource} />
        <div className="fr-hidden fr-unhidden-md fr-text--xs fr-mb-0">
          Modifié le {dateAsDay(resource.updated)}
        </div>
      </div>
      <div className={styles.content}>
        <div>
          <Link href={`/ressources/${resource.slug}`}>
            <h6 className={styles.title}>{resource.title}</h6>
          </Link>
          <Link href={`/ressources/${resource.slug}`}>
            <p className="fr-text--sm fr-mb-0">{resource.description}</p>
          </Link>
        </div>
        <div className="fr-hidden-md fr-text--xs fr-mb-1w">
          Modifié le {dateAsDay(resource.updated)}
        </div>
        {withImage && (
          <img
            className={styles.image}
            src="https://fakeimg.pl/140x80/"
            alt=""
          />
        )}
      </div>
      <Badge className="fr-hidden-md fr-mt-1w" noIcon severity="success">
        Très recommandée
      </Badge>
      <div className={styles.footer}>
        <div
          className={classNames(styles.footerLeft, 'fr-text--sm', 'fr-mb-0')}
        >
          <ResourcesViewsAndMetadata />
        </div>
        <div
          className={classNames(styles.footerRight, 'fr-text--sm', 'fr-mb-0')}
        >
          {user && (
            <IconLink
              title="Editer"
              href={`/ressources/${resource.slug}/editer`}
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
          <IconLink title="Partager" href="/" icon="fr-icon-links-line" small />
        </div>
      </div>
    </div>
  </>
)

export default ResourceCard
