import React from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import Badge from '@codegouvfr/react-dsfr/Badge'
import { ResourceItem } from '@app/web/server/resources'
import { dateAsDay } from '@app/web/utils/dateAsDay'
import styles from './Card.module.css'

const ResourceCard = ({
  resource,
  withImage,
  connected,
}: {
  resource: ResourceItem
  withImage?: boolean
  connected?: boolean
}) => (
  <div className={styles.container}>
    <div className={styles.header}>
      <div className="fr-grid-row fr-grid-row--middle">
        <div className={styles.circle} />
        <span className="fr-text--xs fr-mb-0">
          Publié dans la base{' '}
          <Link href="/" className="fr-link fr-text--xs">
            TODO
          </Link>
        </span>
      </div>
      <span className="fr-text--xs fr-mb-0">
        Modifié le {dateAsDay(resource.created)}
      </span>
    </div>
    <div className={styles.content}>
      <div>
        <h6 className={styles.title}>{resource.title}</h6>
        <div className="fr-text--sm fr-mb-0">{resource.description}</div>
      </div>
      {withImage && (
        <img className={styles.image} src="https://fakeimg.pl/140x80/" alt="" />
      )}
    </div>
    <Badge className="fr-hidden-lg" noIcon severity="success">
      Très recommandée
    </Badge>
    <div className={styles.footer}>
      <div className={classNames(styles.footerLeft, 'fr-text--sm', 'fr-mb-0')}>
        <span className="fr-icon-eye-line fr-icon--sm" />
        <div>
          <b>45</b>
          <span className="fr-hidden fr-unhidden-lg"> Vues</span>
        </div>
        <div>.</div>
        <span className="fr-icon-bookmark-line fr-icon--sm" />
        <div>
          <b>45</b>
          <span className="fr-hidden fr-unhidden-lg"> Enregistrements</span>
        </div>
        <Badge
          className="fr-hidden fr-unhidden-lg fr-mb-1w"
          noIcon
          severity="success"
        >
          Très recommandée
        </Badge>
      </div>
      <div className={classNames(styles.footerRight, 'fr-text--sm', 'fr-mb-0')}>
        {connected && (
          <Link className={classNames('fr-link', styles.iconLink)} href="/">
            <span className="fr-icon-edit-line fr-icon--sm" />
          </Link>
        )}
        <Link className={classNames('fr-link', styles.iconLink)} href="/">
          <span className="fr-icon-bookmark-line fr-icon--sm" />
        </Link>
        <Link className={classNames('fr-link', styles.iconLink)} href="/">
          <span className="fr-icon-links-line fr-icon--sm" />
        </Link>
      </div>
    </div>
  </div>
)

export default ResourceCard
