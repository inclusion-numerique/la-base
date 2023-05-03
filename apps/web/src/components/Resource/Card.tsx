import React from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import Badge from '@codegouvfr/react-dsfr/Badge'
import { ResourceListItem } from '@app/web/server/resources'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import styles from './Card.module.css'
import PublishedInInformation from './PublishedInInformation'
import IconLink from '../Icon/IconLink'
import Separator from '../Separator/Separator'

const ResourceCard = ({
  resource,
  withImage,
  connected,
}: {
  resource: ResourceListItem
  withImage?: boolean
  connected?: boolean
}) => (
  <>
    <Separator />
    <div className={styles.container}>
      <Link href={`/ressources/${resource.slug}`}>
        <div className={styles.header}>
          <PublishedInInformation resource={resource} />
          <div className="fr-hidden fr-unhidden-md fr-text--xs fr-mb-0">
            Modifié le {dateAsDay(resource.updated)}
          </div>
        </div>
        <div className={styles.content}>
          <div>
            <h6 className={styles.title}>{resource.title}</h6>
            <div className="fr-text--sm fr-mb-0">{resource.description}</div>
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
            <span className="fr-icon-eye-line fr-icon--sm" />
            <div>
              <b>45</b>
              <span className={styles.spanMdDisplay}> Vues</span>
            </div>
            <div>.</div>
            <span className="fr-icon-bookmark-line fr-icon--sm" />
            <div>
              <b>45</b>
              <span className={styles.spanMdDisplay}> Enregistrements</span>
            </div>
            <Badge
              className="fr-hidden fr-unhidden-md fr-mb-1w"
              noIcon
              severity="success"
            >
              Très recommandée
            </Badge>
          </div>
          <div
            className={classNames(styles.footerRight, 'fr-text--sm', 'fr-mb-0')}
          >
            {connected && (
              <IconLink
                title="Editer"
                href="/"
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
            <IconLink
              title="Partager"
              href="/"
              icon="fr-icon-links-line"
              small
            />
          </div>
        </div>
      </Link>
    </div>
  </>
)

export default ResourceCard
